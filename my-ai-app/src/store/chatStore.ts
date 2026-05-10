import { create } from 'zustand';
import type { ChatMessage } from '../types';
import { sendChat } from '../services/chatService';
import { detectGeo } from '../services/geoDetector';
import { useMapStore } from './mapStore';
// === FEATURE: system-prompt ===
import { useSystemPromptStore } from '../features/system-prompt/feature';
import { DEFAULT_SYSTEM_PROMPT } from '../features/system-prompt/defaultPrompt';
// === END FEATURE: system-prompt ===
// === FEATURE: user-location ===
import { useUserLocationStore } from '../features/user-location/feature';
// === END FEATURE: user-location ===
// === FEATURE: model-selector ===
import { useModelStore } from '../features/model-selector/feature';
// === END FEATURE: model-selector ===
// === FEATURE: temperature-slider ===
import { useTemperatureStore } from '../features/temperature-slider/feature';
// === END FEATURE: temperature-slider ===
// === FEATURE: streaming ===
import { streamChat } from '../features/streaming/feature';
// === END FEATURE: streaming ===

// === FEATURE: streaming === - global toggle (set to false to disable streaming)
const USE_STREAMING = true;
// === END FEATURE: streaming ===

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  abortController: AbortController | null;

  sendMessage: (content: string, imageBase64?: string) => Promise<void>;
  stopGeneration: () => void;
  clearChat: () => void;
  loadConversation: (messages: ChatMessage[]) => void;

  regenerate: () => Promise<void>;
  editMessage: (id: string, newContent: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  abortController: null,

  sendMessage: async (content: string, imageBase64?: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now(),
      // === FEATURE: image-upload ===
      ...(imageBase64 ? { imageBase64 } : {}),
      // === END FEATURE: image-upload ===
    };
    set({
      messages: [...get().messages, userMessage],
      isLoading: true,
      error: null,
    });

    const controller = new AbortController();
    set({ abortController: controller });

    try {
      const messages = get().messages.map((m) => ({
        role: m.role,
        content: m.content,
        // === FEATURE: image-upload ===
        ...(m.imageBase64 ? { imageBase64: m.imageBase64 } : {}),
        // === END FEATURE: image-upload ===
      }));

      // === FEATURE: system-prompt + user-location ===
      const userSysPrompt = useSystemPromptStore.getState().systemPrompt;
      const loc = useUserLocationStore.getState();
      let finalSysPrompt = DEFAULT_SYSTEM_PROMPT;
      if (loc.hasLocation()) {
        finalSysPrompt += `\n\n## מיקום נוכחי של המשתמש (שתף מיקום):\n- קואורדינטות: ${loc.lat}, ${loc.lng}\n- עיר: ${loc.city || 'לא ידוע'}\n\nכשהמשתמש שואל "קרוב אליי" או "איפה X הקרובה" - השתמש במיקום הזה.`;
      }
      if (userSysPrompt) {
        finalSysPrompt += `\n\n## הוראות נוספות מהמשתמש:\n${userSysPrompt}`;
      }
      messages.unshift({ role: 'system', content: finalSysPrompt });
      // === END FEATURE: system-prompt + user-location ===

      // === FEATURE: model-selector + temperature-slider ===
      const model = useModelStore.getState().model;
      const temperature = useTemperatureStore.getState().temperature;
      // === END ===

      let fullReply = '';

      if (USE_STREAMING) {
        // === FEATURE: streaming ===
        const assistantId = crypto.randomUUID();
        set({
          messages: [
            ...get().messages,
            { id: assistantId, role: 'assistant', content: '', timestamp: Date.now() },
          ],
        });

        fullReply = await streamChat({
          messages,
          signal: controller.signal,
          model,
          temperature,
          wordDelayMs: 70,
          onChunk: (chunk) => {
            const updated = get().messages.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m,
            );
            set({ messages: updated });
          },
        });
        set({ isLoading: false, abortController: null });
        // === END FEATURE: streaming ===
      } else {
        const { reply } = await sendChat({
          messages,
          signal: controller.signal,
          model,
          temperature,
        });
        fullReply = reply;
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: reply,
          timestamp: Date.now(),
        };
        set({
          messages: [...get().messages, assistantMessage],
          isLoading: false,
          abortController: null,
        });
      }

      const detected = detectGeo(fullReply);
      if (detected.hasGeometry) {
        useMapStore.getState().setGeo(detected.data);
      }
    } catch (err: unknown) {
      const error = err as { name?: string; code?: string; message?: string };
      if (
        error?.name === 'CanceledError' ||
        error?.code === 'ERR_CANCELED' ||
        error?.name === 'AbortError'
      ) {
        set({ isLoading: false, abortController: null });
        return;
      }
      set({
        isLoading: false,
        error: error?.message || 'Unknown error',
        abortController: null,
      });
    }
  },

  stopGeneration: () => {
    get().abortController?.abort();
    set({ abortController: null, isLoading: false });
  },

  clearChat: () => {
    get().abortController?.abort();
    set({ messages: [], isLoading: false, error: null, abortController: null });
  },

  loadConversation: (messages) => {
    set({ messages, isLoading: false, error: null });
  },

  // === FEATURE: regenerate ===
  regenerate: async () => {
    const msgs = get().messages;
    if (msgs.length < 2) return;
    const lastUserIdx = [...msgs].reverse().findIndex((m) => m.role === 'user');
    if (lastUserIdx < 0) return;
    const userIdx = msgs.length - 1 - lastUserIdx;
    const lastUser = msgs[userIdx];
    set({ messages: msgs.slice(0, userIdx) });
    await get().sendMessage(lastUser.content);
  },
  // === END FEATURE: regenerate ===

  // === FEATURE: edit-message ===
  editMessage: async (id, newContent) => {
    const msgs = get().messages;
    const idx = msgs.findIndex((m) => m.id === id);
    if (idx < 0) return;
    set({ messages: msgs.slice(0, idx) });
    await get().sendMessage(newContent);
  },
  // === END FEATURE: edit-message ===
}));
