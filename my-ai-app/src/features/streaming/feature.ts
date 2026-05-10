/**
 * FEATURE: streaming
 * Streams AI response word-by-word with natural typing delay.
 * Splits Gemini chunks into words/punctuation tokens.
 *
 * Files this feature touches:
 *   - server/src/services/geminiService.ts (generateChatResponseStream)
 *   - server/src/routes/chat.ts (POST /api/chat/stream endpoint)
 *   - src/store/chatStore.ts (use streamChat)
 */

import type { ChatMessage } from '../../types';

interface StreamParams {
  messages: Pick<ChatMessage, 'role' | 'content' | 'imageBase64'>[];
  signal?: AbortSignal;
  onChunk: (text: string) => void;
  model?: string;
  temperature?: number;
  /** Delay (ms) between words for natural typing feel. Default 25ms. */
  wordDelayMs?: number;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function streamChat({
  messages,
  signal,
  onChunk,
  model,
  temperature,
  wordDelayMs = 25,
}: StreamParams): Promise<string> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model, temperature }),
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(`Stream failed: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  const queue: string[] = [];
  let processing = false;

  const processQueue = async () => {
    if (processing) return;
    processing = true;
    while (queue.length > 0) {
      if (signal?.aborted) break;
      const tok = queue.shift()!;
      onChunk(tok);
      if (wordDelayMs > 0) await sleep(wordDelayMs);
    }
    processing = false;
  };

  const enqueueChunk = (chunk: string) => {
    // Split into "word + trailing space" tokens, keeps punctuation attached
    const tokens = chunk.match(/\S+\s*|\s+/g) || [chunk];
    for (const tok of tokens) queue.push(tok);
    void processQueue();
  };

  while (true) {
    if (signal?.aborted) break;
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') {
        while (queue.length > 0 || processing) await sleep(10);
        return fullText;
      }
      try {
        const parsed = JSON.parse(data);
        if (parsed.chunk) {
          fullText += parsed.chunk;
          enqueueChunk(parsed.chunk);
        }
      } catch {
        // ignore
      }
    }
  }

  while (queue.length > 0 || processing) await sleep(10);
  return fullText;
}
