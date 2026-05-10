/**
 * FEATURE: clusters
 * Group nearby points into clusters (instead of overlapping markers).
 *
 * Files: src/components/map/GeoLayer.tsx (modify the source to use clustering)
 */

import mapboxgl from 'mapbox-gl';
import type { FeatureCollection } from '../../types';

const SOURCE = 'clustered-geo';

export function applyClusters(map: mapboxgl.Map, geo: FeatureCollection) {
  // Remove existing
  ['cluster-circles', 'cluster-count', 'unclustered'].forEach((id) => {
    if (map.getLayer(id)) map.removeLayer(id);
  });
  if (map.getSource(SOURCE)) map.removeSource(SOURCE);

  map.addSource(SOURCE, {
    type: 'geojson',
    data: geo,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addLayer({
    id: 'cluster-circles',
    type: 'circle',
    source: SOURCE,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 50, '#f28cb1'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 50, 40],
    },
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: SOURCE,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-size': 12,
    },
  });

  map.addLayer({
    id: 'unclustered',
    type: 'circle',
    source: SOURCE,
    filter: ['!', ['has', 'point_count']],
    paint: { 'circle-color': '#11b4da', 'circle-radius': 6, 'circle-stroke-width': 1, 'circle-stroke-color': '#fff' },
  });
}
