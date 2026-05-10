/**
 * FEATURE: distance-measurement
 * Click 2+ points on map to measure distance.
 *
 * Files this feature touches:
 *   - src/components/map/MapView.tsx (add <DistanceTool map={mapInstance} />)
 */

import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Ruler, X } from 'lucide-react';

interface Props {
  map: mapboxgl.Map | null;
}

export function DistanceTool({ map }: Props) {
  const [active, setActive] = useState(false);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!map || !active) return;
    const handler = (e: mapboxgl.MapMouseEvent) => {
      setPoints((prev) => [...prev, [e.lngLat.lng, e.lngLat.lat]]);
    };
    map.on('click', handler);
    map.getCanvas().style.cursor = 'crosshair';
    return () => {
      map.off('click', handler);
      map.getCanvas().style.cursor = '';
    };
  }, [map, active]);

  useEffect(() => {
    if (points.length < 2) { setDistance(0); return; }
    let total = 0;
    for (let i = 1; i < points.length; i++) total += haversine(points[i - 1], points[i]);
    setDistance(total);
  }, [points]);

  const reset = () => { setPoints([]); setDistance(0); };

  return (
    <div className="absolute top-3 end-32 z-10 bg-white dark:bg-slate-800 rounded-lg shadow p-2">
      <button onClick={() => { setActive(!active); reset(); }} className={`flex items-center gap-1 text-xs ${active ? 'text-blue-600' : ''}`}>
        <Ruler className="w-4 h-4" /> {active ? 'מדידה פעילה' : 'מדוד מרחק'}
      </button>
      {distance > 0 && (
        <div className="text-xs mt-1 flex items-center gap-2">
          <span>{distance < 1000 ? `${distance.toFixed(0)} מ׳` : `${(distance / 1000).toFixed(2)} ק״מ`}</span>
          <button onClick={reset}><X className="w-3 h-3" /></button>
        </div>
      )}
    </div>
  );
}

function haversine([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]): number {
  const R = 6371000;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
