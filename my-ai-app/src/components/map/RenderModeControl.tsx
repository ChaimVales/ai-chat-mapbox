import { useRenderModeStore, type RenderMode } from '../../store/renderModeStore';
import { Layers3 } from 'lucide-react';

const MODES: { value: RenderMode; label: string }[] = [
  { value: 'normal', label: 'רגיל' },
  { value: 'clusters', label: 'אשכולות' },
  { value: 'heatmap', label: 'מפת חום' },
];

export function RenderModeControl() {
  const { mode, setMode } = useRenderModeStore();
  return (
    <div className="absolute top-3 end-48 z-10 bg-white dark:bg-slate-800 rounded-lg shadow p-1 flex gap-1 items-center">
      <Layers3 className="w-4 h-4 text-slate-500 mx-1" />
      {MODES.map((m) => (
        <button
          key={m.value}
          onClick={() => setMode(m.value)}
          className={`text-xs px-2 py-1 rounded ${mode === m.value ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-slate-100'}`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
