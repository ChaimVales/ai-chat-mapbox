/**
 * FEATURE: image-upload
 * Upload image with message - Gemini supports multimodal (image + text).
 *
 * Files this feature touches:
 *   - src/components/chat/MessageInput.tsx (add <ImageButton onSelect={...} />)
 *   - server/src/services/geminiService.ts (handle imageBase64 in messages)
 *   - src/types/chat.ts (add `imageBase64?: string` to ChatMessage)
 */

import { Image, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
  onSelect: (base64: string) => void;
}

export function ImageButton({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onSelect(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300"
        aria-label="Upload image"
      >
        <Image className="w-5 h-5" />
      </button>
      {preview && (
        <div className="relative inline-block ms-2">
          <img src={preview} alt="" className="w-12 h-12 rounded object-cover" />
          <button onClick={() => { setPreview(null); onSelect(''); }} className="absolute -top-1 -end-1 bg-red-500 rounded-full p-0.5">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      )}
    </>
  );
}
