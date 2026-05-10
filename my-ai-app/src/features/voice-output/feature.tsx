/**
 * FEATURE: voice-output
 * Speaker button on each AI message - reads it aloud (uses Speech Synthesis API).
 *
 * Files this feature touches:
 *   - src/components/chat/MessageBubble.tsx (add <SpeakButton /> on assistant messages)
 */

import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export function SpeakButton({ text, language = 'he-IL' }: { text: string; language?: string }) {
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  return (
    <button
      onClick={speak}
      className="inline-flex items-center text-xs text-slate-400 hover:text-blue-500 ms-2"
      aria-label={speaking ? 'Stop' : 'Speak'}
    >
      {speaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
    </button>
  );
}
