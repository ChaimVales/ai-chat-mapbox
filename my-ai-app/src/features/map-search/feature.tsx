import { useEffect } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

interface Props {
    map: mapboxgl.Map | null;
}

export function MapSearch({ map }: Props) {
    useEffect(() => {
        if (!map) return;

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken as string,
            mapboxgl: mapboxgl as never,
            placeholder: 'חפש כתובת...',
            language: 'he',
        });

        map.addControl(geocoder, 'top-left');

        return () => {
            try { map.removeControl(geocoder); } catch { /* ignore */ }
        };
    }, [map]);

    return null;
}