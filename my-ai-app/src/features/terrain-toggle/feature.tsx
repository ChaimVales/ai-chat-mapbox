/**
 * FEATURE: terrain-toggle
 * 3D terrain (height/topography) toggle.
 *
 * Files: src/components/map/MapView.tsx
 */

import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Mountain } from 'lucide-react';

interface Props {
  map: mapboxgl.Map | null;
}

export function TerrainToggle({ map }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!map) return;
    const apply = () => {
      if (enabled) {
        if (!map.getSource('mapbox-dem')) {
          map.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14,
          });
        }
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      } else {
        map.setTerrain(null);
      }
    };
    if (map.isStyleLoaded()) apply();
    else map.once('style.load', apply);
  }, [map, enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`absolute bottom-3 end-12 z-10 p-2 bg-white dark:bg-slate-800 rounded-lg shadow ${enabled ? 'text-blue-600' : ''}`}
      title="טופוגרפיה"
    >
      <Mountain className="w-4 h-4" />
    </button>
  );
}
