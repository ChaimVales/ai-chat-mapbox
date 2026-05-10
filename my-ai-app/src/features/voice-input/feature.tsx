/**
 * FEATURE: voice-input
 * Microphone button - speak instead of typing (uses Web Speech API).
 *
 * Files this feature touches:
 *   - src/components/chat/MessageInput.tsx (add <VoiceButton onTranscript={setText} />)
 *
 * Browser support: Chrome, Edge, Safari (limited). Firefox: no.
 */

import { Mic, MicOff } from 'lucide-react';
import { useState, useRef } from 'react';

interface Props {
  onTranscript: (text: string) => void;
  language?: string;
}

export function VoiceButton({ onTranscript, language = 'he-IL' }: Props) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const start = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert('Voice input not supported in this browser');
      return;
    }
    const recognition = new SR();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      onTranscript(text);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <button
      type="button"
      onClick={listening ? stop : start}
      className={`p-2.5 rounded-xl ${listening ? 'bg-red-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'}`}
      aria-label={listening ? 'Stop' : 'Start voice input'}
    >
      {listening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
    </button>
  );
}
