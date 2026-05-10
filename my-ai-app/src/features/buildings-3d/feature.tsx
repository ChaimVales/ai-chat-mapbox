/**
 * FEATURE: buildings-3d
 * Toggle 3D buildings extrusion on the map.
 *
 * Files: src/components/map/MapView.tsx
 */

import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Building2 } from 'lucide-react';

interface Props {
  map: mapboxgl.Map | null;
}

const LAYER_ID = '3d-buildings';

export function Buildings3DToggle({ map }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!map) return;

    const apply = () => {
      if (enabled) {
        if (map.getLayer(LAYER_ID)) return;
        map.addLayer({
          id: LAYER_ID,
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6,
          },
        });
        map.easeTo({ pitch: 45 });
      } else {
        if (map.getLayer(LAYER_ID)) map.removeLayer(LAYER_ID);
        map.easeTo({ pitch: 0 });
      }
    };

    if (map.isStyleLoaded()) apply();
    else map.once('style.load', apply);
  }, [map, enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`absolute bottom-3 end-3 z-10 p-2 bg-white dark:bg-slate-800 rounded-lg shadow ${enabled ? 'text-blue-600' : ''}`}
      title="3D בניינים"
    >
      <Building2 className="w-4 h-4" />
    </button>
  );
}
