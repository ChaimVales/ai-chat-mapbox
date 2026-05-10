import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import mapboxgl from 'mapbox-gl';
import { LayersControl } from './LayersControl';
// === FEATURE: clusters + heatmap ===
import { RenderModeControl } from './RenderModeControl';
// === END FEATURE: clusters + heatmap ===
import { LayerToggleControl } from '../../features/layer-toggle/feature';
import { ColorPicker } from '../../features/polygon-color/feature';
import { MapSearch } from '../../features/map-search/feature';
// === FEATURE: distance-measurement ===
import { DistanceTool } from '../../features/distance-measurement/feature';
// === END FEATURE: distance-measurement ===
// === FEATURE: area-measurement ===
import { AreaTool } from '../../features/area-measurement/feature';
// === END FEATURE: area-measurement ===
// === FEATURE: drawing-tools ===
import { DrawingTool } from '../../features/drawing-tools/feature';
// === END FEATURE: drawing-tools ===
// === FEATURE: export-geojson ===
import { ExportGeoJsonButton } from '../../features/export-geojson/feature';
// === END FEATURE: export-geojson ===
// === FEATURE: bookmarks ===
import { BookmarksControl } from '../../features/bookmarks/feature';
// === END FEATURE: bookmarks ===
// === FEATURE: buildings-3d ===
import { Buildings3DToggle } from '../../features/buildings-3d/feature';
// === END FEATURE: buildings-3d ===
// === FEATURE: terrain-toggle ===
import { TerrainToggle } from '../../features/terrain-toggle/feature';
// === END FEATURE: terrain-toggle ===

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export type MapStyle = 'streets' | 'satellite' | 'outdoors';

const STYLE_URLS: Record<MapStyle, string> = {
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',
};

interface Props {
  onMapReady?: (map: mapboxgl.Map) => void;
}

export function MapView({ onMapReady }: Props) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const isInitialMount = useRef(true);
  const [style, setStyle] = useState<MapStyle>('streets');
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !TOKEN) return;

    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: STYLE_URLS[style],
      center: [34.78, 32.07],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl({ trackUserLocation: true }), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }), 'bottom-left');

    map.on('load', () => {
      map.resize();
      onMapReady?.(map);
      setMapInstance(map);
    });

    mapRef.current = map;

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (mapRef.current) mapRef.current.setStyle(STYLE_URLS[style]);
  }, [style]);

  if (!TOKEN) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <p style={{ color: 'red' }}>{t('map.noToken')}</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={containerRef}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <LayersControl current={style} onChange={setStyle} />
      <LayerToggleControl />
      <ColorPicker />
      <MapSearch map={mapInstance} />
      <DistanceTool map={mapInstance} />
      <AreaTool map={mapInstance} />
      <DrawingTool map={mapInstance} />
      <ExportGeoJsonButton />
      <BookmarksControl map={mapInstance} />
      <Buildings3DToggle map={mapInstance} />
      <TerrainToggle map={mapInstance} />
      {/* === FEATURE: clusters + heatmap === */}
      <RenderModeControl />
      {/* === END FEATURE: clusters + heatmap === */}
    </div>
  );
}
