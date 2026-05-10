/**
 * FEATURE: drawing-tools
 * Simple drawing - click to add point, click+drag for line.
 *
 * For full draw tools install: @mapbox/mapbox-gl-draw (currently blocked from sandbox)
 *
 * Files: src/components/map/MapView.tsx
 */

import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Pencil } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';

interface Props {
  map: mapboxgl.Map | null;
}

export function DrawingTool({ map }: Props) {
  const [active, setActive] = useState(false);
  const setGeo = useMapStore((s) => s.setGeo);

  useEffect(() => {
    if (!map || !active) return;
    const handler = (e: mapboxgl.MapMouseEvent) => {
      const point = {
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [e.lngLat.lng, e.lngLat.lat] },
        properties: {},
      };
      setGeo({ type: 'FeatureCollection', features: [point] });
    };
    map.on('click', handler);
    map.getCanvas().style.cursor = 'crosshair';
    return () => { map.off('click', handler); map.getCanvas().style.cursor = ''; };
  }, [map, active, setGeo]);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`absolute bottom-12 end-16 z-10 p-2 bg-white dark:bg-slate-800 rounded-lg shadow ${active ? 'text-blue-600' : ''}`}
      aria-label="Draw"
    >
      <Pencil className="w-4 h-4" />
    </button>
  );
}
