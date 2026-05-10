import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export interface MapboxOptions {
  container: HTMLElement;
  style?: string;
  center?: [number, number];
  zoom?: number;
}

export function useMapbox(options: () => MapboxOptions | null) {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const opts = options();
    if (!opts) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: opts.container,
      style: opts.style || 'mapbox://styles/mapbox/streets-v12',
      center: opts.center || [34.78, 32.07], // ת"א
      zoom: opts.zoom ?? 10,
    });

    // הוסף בקרות
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl({ trackUserLocation: true }), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }), 'bottom-left');

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return mapRef;
}
