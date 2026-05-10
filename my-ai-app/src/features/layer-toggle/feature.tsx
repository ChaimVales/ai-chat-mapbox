import { useLayerStore } from '../../store/layerStore';
import { Circle, Minus, Pentagon } from 'lucide-react';
import type { ReactNode } from 'react';

export function LayerToggleControl() {
    const { showPoints, showLines, showPolygons, togglePoints, toggleLines, togglePolygons } = useLayerStore();

    return (
        <div className="absolute top-3 end-16 z-10 bg-white dark:bg-slate-800 rounded-lg shadow p-2 flex flex-col gap-1">
            <ToggleButton active={showPoints} onClick={togglePoints} icon={<Circle className="w-4 h-4" />} label="Points" />
            <ToggleButton active={showLines} onClick={toggleLines} icon={<Minus className="w-4 h-4" />} label="Lines" />
            <ToggleButton active={showPolygons} onClick={togglePolygons} icon={<Pentagon className="w-4 h-4" />} label="Polygons" />
        </div>
    );
}

interface ToggleButtonProps {
    active: boolean;
    onClick: () => void;
    icon: ReactNode;
    label: string;
}

function ToggleButton({ active, onClick, icon, label }: ToggleButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-2 py-1 rounded text-xs ${active ? 'bg-blue-100 dark:bg-blue-900' : 'opacity-50'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}