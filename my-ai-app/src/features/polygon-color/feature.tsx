import { useColorStore } from '../../store/colorStore';
import { Palette } from 'lucide-react';
import { useState } from 'react';

export function ColorPicker() {
    const { geoColor, setColor } = useColorStore();
    const [open, setOpen] = useState(false);

    return (
        <div className="absolute bottom-12 end-3 z-10">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow"
            >
                <Palette className="w-4 h-4" style={{ color: geoColor }} />
            </button>
            {open && (
                <input
                    type="color"
                    value={geoColor}
                    onChange={(e) => setColor(e.target.value)}
                    className="absolute bottom-12 end-0 w-32 h-10 cursor-pointer"
                />
            )}
        </div>
    );
}