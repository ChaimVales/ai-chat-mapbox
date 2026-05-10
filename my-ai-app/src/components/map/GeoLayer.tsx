import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import bbox from '@turf/bbox';
import type { FeatureCollection } from '../../types';
import { useLayerStore } from '../../store/layerStore';
import { useColorStore } from '../../store/colorStore';
// === FEATURE: click-popup ===
import { attachClickPopup } from '../../features/click-popup/feature';
// === END FEATURE: click-popup ===
// === FEATURE: clusters + heatmap ===
import { useRenderModeStore } from '../../store/renderModeStore';
import { applyClusters } from '../../features/clusters/feature';
import { applyHeatmap } from '../../features/heatmap/feature';
// === END FEATURE: clusters + heatmap ===

interface Props {
  map: mapboxgl.Map | null;
  geo: FeatureCollection | null;
}

const SOURCE_ID = 'detected-geo';
const POINT_LAYER = 'detected-geo-points';
const LINE_LAYER = 'detected-geo-lines';
const POLY_FILL = 'detected-geo-polygons-fill';
const POLY_LINE = 'detected-geo-polygons-line';

export function GeoLayer({ map, geo }: Props) {
  const { showPoints, showLines, showPolygons } = useLayerStore();
  const geoColor = useColorStore((s) => s.geoColor);
  const renderMode = useRenderModeStore((s) => s.mode);

  useEffect(() => {
    if (!map) return;

    const apply = () => {
      // Cleanup all previous layers/sources
      [POINT_LAYER, LINE_LAYER, POLY_FILL, POLY_LINE, 'cluster-circles', 'cluster-count', 'unclustered', 'heatmap-layer'].forEach((id) => {
        if (map.getLayer(id)) map.removeLayer(id);
      });
      ['detected-geo', 'clustered-geo', 'heatmap-source'].forEach((id) => {
        if (map.getSource(id)) map.removeSource(id);
      });

      if (!geo || geo.features.length === 0) return;

      // === FEATURE: clusters + heatmap === - alternative renderers
      if (renderMode === 'clusters') {
        applyClusters(map, geo);
      } else if (renderMode === 'heatmap') {
        applyHeatmap(map, geo);
      } else {
        // Normal rendering
        map.addSource(SOURCE_ID, { type: 'geojson', data: geo });

        map.addLayer({
          id: POINT_LAYER, type: 'circle', source: SOURCE_ID, filter: ['==', '$type', 'Point'],
          layout: { visibility: showPoints ? 'visible' : 'none' },
          paint: { 'circle-radius': 8, 'circle-color': geoColor, 'circle-stroke-width': 3, 'circle-stroke-color': '#fff' },
        });

        map.addLayer({
          id: LINE_LAYER, type: 'line', source: SOURCE_ID, filter: ['==', '$type', 'LineString'],
          layout: { visibility: showLines ? 'visible' : 'none' },
          paint: { 'line-color': geoColor, 'line-width': 4 },
        });

        map.addLayer({
          id: POLY_FILL, type: 'fill', source: SOURCE_ID, filter: ['==', '$type', 'Polygon'],
          layout: { visibility: showPolygons ? 'visible' : 'none' },
          paint: { 'fill-color': geoColor, 'fill-opacity': 0.25 },
        });

        map.addLayer({
          id: POLY_LINE, type: 'line', source: SOURCE_ID, filter: ['==', '$type', 'Polygon'],
          layout: { visibility: showPolygons ? 'visible' : 'none' },
          paint: { 'line-color': geoColor, 'line-width': 2 },
        });
      }
      // === END FEATURE: clusters + heatmap ===

      try {
        const [minX, minY, maxX, maxY] = bbox(geo);
        if (geo.features.length === 1 && geo.features[0].geometry.type === 'Point') {
          const geom = geo.features[0].geometry;
          if (geom.type === 'Point') {
            const [lng, lat] = geom.coordinates;
            map.flyTo({ center: [lng, lat], zoom: 14, duration: 1000 });
          }
        } else {
          map.fitBounds([[minX, minY], [maxX, maxY]], { padding: 50, duration: 1000 });
        }
      } catch (err) {
        console.warn('[GeoLayer] could not fit bounds', err);
      }

      // === FEATURE: click-popup ===
      attachClickPopup(map);
      // === END FEATURE: click-popup ===
    };

    if (map.isStyleLoaded()) {
      apply();
    } else {
      map.once('style.load', apply);
    }
  }, [map, geo, showPoints, showLines, showPolygons, geoColor, renderMode]);

  return null;
}
