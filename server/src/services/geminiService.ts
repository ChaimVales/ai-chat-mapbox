import { GoogleGenerativeAI, type Content } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is not set in .env');

const genAI = new GoogleGenerativeAI(apiKey);

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    // === FEATURE: image-upload ===
    imageBase64?: string;
    // === END FEATURE: image-upload ===
}

export interface ChatOptions {
    // === FEATURE: model-selector ===
    model?: string;
    // === END FEATURE: model-selector ===
    // === FEATURE: temperature-slider ===
    temperature?: number;
    // === END FEATURE: temperature-slider ===
}

function buildChat(messages: ChatMessage[], opts: ChatOptions = {}) {
    if (messages.length === 0) throw new Error('messages array is empty');
    const systemMessage = messages.find((m) => m.role === 'system');
    const conversation = messages.filter((m) => m.role !== 'system');
    const lastMessage = conversation[conversation.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
        throw new Error('Last message must be from user');
    }
    const history: Content[] = conversation.slice(0, -1).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
    }));
    const model = genAI.getGenerativeModel({
        model: opts.model || 'gemini-2.5-flash',
        systemInstruction: systemMessage?.content,
        generationConfig: {
            temperature: opts.temperature,
        },
    });
    return { chat: model.startChat({ history }), lastMessage };
}

// === FEATURE: image-upload ===
function buildPartsFromMessage(msg: ChatMessage): any[] {
    const parts: any[] = [{ text: msg.content }];
    if (msg.imageBase64) {
        // imageBase64 looks like "data:image/png;base64,iVBOR..."
        const match = msg.imageBase64.match(/^data:(image\/\w+);base64,(.*)$/);
        if (match) {
            parts.push({
                inlineData: { mimeType: match[1], data: match[2] },
            });
        }
    }
    return parts;
}
// === END FEATURE: image-upload ===

export async function generateChatResponse(messages: ChatMessage[], opts?: ChatOptions): Promise<string> {
    const { chat, lastMessage } = buildChat(messages, opts);
    const parts = buildPartsFromMessage(lastMessage);
    const result = await chat.sendMessage(parts);
    return result.response.text();
}

export async function* generateChatResponseStream(messages: ChatMessage[], opts?: ChatOptions) {
    const { chat, lastMessage } = buildChat(messages, opts);
    const parts = buildPartsFromMessage(lastMessage);
    const result = await chat.sendMessageStream(parts);
    for await (const chunk of result.stream) {
        yield chunk.text();
    }
}
