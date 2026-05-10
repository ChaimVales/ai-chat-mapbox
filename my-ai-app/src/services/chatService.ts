import { apiClient } from './apiClient';
import type { ChatMessage } from '../types';

export interface OutgoingMessage extends Pick<ChatMessage, 'role' | 'content'> {
  // === FEATURE: image-upload ===
  imageBase64?: string;
  // === END FEATURE: image-upload ===
}

export interface SendChatParams {
  messages: OutgoingMessage[];
  conversationId?: string;
  signal?: AbortSignal;
  // === FEATURE: model-selector ===
  model?: string;
  // === END FEATURE: model-selector ===
  // === FEATURE: temperature-slider ===
  temperature?: number;
  // === END FEATURE: temperature-slider ===
}

export interface ChatResponse {
  reply: string;
  ts: number;
}

export async function sendChat({
  messages,
  conversationId,
  signal,
  model,
  temperature,
}: SendChatParams): Promise<ChatResponse> {
  const { data } = await apiClient.post<ChatResponse>(
    '/api/chat',
    { messages, conversationId, model, temperature },
    { signal },
  );
  return data;
}
