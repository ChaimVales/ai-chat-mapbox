/**
 * FEATURE: click-popup
 * Click on a geometry feature to see a popup with its properties.
 *
 * Files: src/components/map/GeoLayer.tsx
 */

import mapboxgl from 'mapbox-gl';

const LAYERS = ['detected-geo-points', 'detected-geo-lines', 'detected-geo-polygons-fill'];

export function attachClickPopup(map: mapboxgl.Map): () => void {
  const handler = (e: mapboxgl.MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, { layers: LAYERS.filter((l) => map.getLayer(l)) });
    if (features.length === 0) return;
    const f = features[0];
    const props = f.properties || {};
    const html = `<div style="font-size:12px;padding:4px">
      <strong>${f.geometry.type}</strong>
      ${props.label ? `<br/>${props.label}` : ''}
      ${Object.entries(props).filter(([k]) => k !== 'label').map(([k, v]) => `<br/><b>${k}:</b> ${v}`).join('')}
    </div>`;
    new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(html).addTo(map);
  };

  LAYERS.forEach((layer) => {
    if (map.getLayer(layer)) {
      map.on('click', layer, handler as any);
      map.on('mouseenter', layer, () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', layer, () => { map.getCanvas().style.cursor = ''; });
    }
  });

  return () => {
    LAYERS.forEach((layer) => map.off('click', layer, handler as any));
  };
}
