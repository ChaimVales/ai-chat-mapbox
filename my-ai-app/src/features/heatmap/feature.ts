/**
 * FEATURE: heatmap
 * Renders points as a heatmap (hot/cold zones).
 *
 * Files: src/components/map/GeoLayer.tsx (alternative rendering for points)
 */

import mapboxgl from 'mapbox-gl';
import type { FeatureCollection } from '../../types';

export function applyHeatmap(map: mapboxgl.Map, geo: FeatureCollection) {
  const SOURCE = 'heatmap-source';
  const LAYER = 'heatmap-layer';

  if (map.getLayer(LAYER)) map.removeLayer(LAYER);
  if (map.getSource(SOURCE)) map.removeSource(SOURCE);

  map.addSource(SOURCE, { type: 'geojson', data: geo });

  map.addLayer({
    id: LAYER,
    type: 'heatmap',
    source: SOURCE,
    paint: {
      'heatmap-weight': 1,
      'heatmap-intensity': 1,
      'heatmap-color': [
        'interpolate', ['linear'], ['heatmap-density'],
        0, 'rgba(33,102,172,0)',
        0.2, 'rgb(103,169,207)',
        0.4, 'rgb(209,229,240)',
        0.6, 'rgb(253,219,199)',
        0.8, 'rgb(239,138,98)',
        1, 'rgb(178,24,43)',
      ],
      'heatmap-radius': 30,
    },
  });
}
