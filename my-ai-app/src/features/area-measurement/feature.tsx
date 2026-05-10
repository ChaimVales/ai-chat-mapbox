/**
 * FEATURE: area-measurement
 * Click points on map to define a polygon, see its area.
 *
 * Requires: @turf/area (or compute manually)
 * Files: src/components/map/MapView.tsx
 */

import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Pentagon, X } from 'lucide-react';

interface Props {
  map: mapboxgl.Map | null;
}

export function AreaTool({ map }: Props) {
  const [active, setActive] = useState(false);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [area, setArea] = useState(0);

  useEffect(() => {
    if (!map || !active) return;
    const handler = (e: mapboxgl.MapMouseEvent) => {
      setPoints((prev) => [...prev, [e.lngLat.lng, e.lngLat.lat]]);
    };
    map.on('click', handler);
    map.getCanvas().style.cursor = 'crosshair';
    return () => { map.off('click', handler); map.getCanvas().style.cursor = ''; };
  }, [map, active]);

  useEffect(() => {
    if (points.length < 3) { setArea(0); return; }
    setArea(polygonArea(points));
  }, [points]);

  const reset = () => { setPoints([]); setArea(0); };

  return (
    <div className="absolute top-16 end-32 z-10 bg-white dark:bg-slate-800 rounded-lg shadow p-2">
      <button onClick={() => { setActive(!active); reset(); }} className={`flex items-center gap-1 text-xs ${active ? 'text-blue-600' : ''}`}>
        <Pentagon className="w-4 h-4" /> {active ? 'מודד שטח...' : 'מדוד שטח'}
      </button>
      {area > 0 && (
        <div className="text-xs mt-1 flex items-center gap-2">
          <span>{area < 1e6 ? `${area.toFixed(0)} מ²` : `${(area / 1e6).toFixed(2)} קמ²`}</span>
          <button onClick={reset}><X className="w-3 h-3" /></button>
        </div>
      )}
    </div>
  );
}

// Spherical polygon area approximation
function polygonArea(coords: [number, number][]): number {
  if (coords.length < 3) return 0;
  const R = 6371000;
  let area = 0;
  for (let i = 0; i < coords.length; i++) {
    const j = (i + 1) % coords.length;
    const [lng1, lat1] = coords[i];
    const [lng2, lat2] = coords[j];
    area += (lng2 - lng1) * Math.PI / 180 * (2 + Math.sin(lat1 * Math.PI / 180) + Math.sin(lat2 * Math.PI / 180));
  }
  return Math.abs(area * R * R / 2);
}
