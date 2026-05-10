import { useTranslation } from 'react-i18next';
import { Layers } from 'lucide-react';
import { useState } from 'react';
import type { MapStyle } from './MapView';

interface Props {
  current: MapStyle;
  onChange: (style: MapStyle) => void;
}

export function LayersControl({ current, onChange }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const styles: MapStyle[] = ['streets', 'satellite', 'outdoors'];

  return (
    <div className="absolute top-3 start-3 z-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow"
      >
        <Layers className="w-4 h-4" />
        <span className="text-sm">{t('map.layers')}</span>
      </button>

      {open && (
        <ul className="mt-1 bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
          {styles.map((s) => (
            <li key={s}>
              <button
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
                className={`w-full text-start px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${current === s ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
              >
                {t(`map.${s}`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
