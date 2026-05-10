/**
 * FEATURE: routing
 * Get directions from user's location (or A) to address (B).
 * Uses Mapbox Directions API + Geocoding.
 *
 * Depends on: user-location (optional - if not set, asks for both A and B)
 *
 * Files this feature touches:
 *   - src/components/map/MapView.tsx (add <RoutingButton />)
 */

import { useState } from 'react';
import { Navigation, Loader2 } from 'lucide-react';
import { useUserLocationStore } from '../user-location/feature';
import { useMapStore } from '../../store/mapStore';

async function geocode(address: string): Promise<[number, number] | null> {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&language=he&access_token=${token}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.features?.[0]?.center || null;
}

async function getDirections(
  fromLng: number,
  fromLat: number,
  toLng: number,
  toLat: number,
  mode: 'driving' | 'walking' = 'driving',
) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${fromLng},${fromLat};${toLng},${toLat}?geometries=geojson&overview=full&language=he&access_token=${token}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.routes?.[0] || null;
}

export function RoutingButton() {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [mode, setMode] = useState<'driving' | 'walking'>('driving');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const { lat, lng, hasLocation } = useUserLocationStore();
  const setGeo = useMapStore((s) => s.setGeo);

  const handleRoute = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    setInfo(null);
    try {
      // Resolve start point
      let fromCoords: [number, number] | null = null;
      if (from.trim()) {
        fromCoords = await geocode(from);
      } else if (hasLocation() && lng !== null && lat !== null) {
        fromCoords = [lng, lat];
      } else {
        alert('לא יודע מאיפה להתחיל - שתף מיקום או תכתוב כתובת');
        setLoading(false);
        return;
      }
      if (!fromCoords) {
        setInfo('לא נמצאה כתובת התחלה');
        setLoading(false);
        return;
      }

      // Resolve destination
      const toCoords = await geocode(destination);
      if (!toCoords) {
        setInfo('לא נמצאה כתובת יעד');
        setLoading(false);
        return;
      }

      // Get directions
      const route = await getDirections(fromCoords[0], fromCoords[1], toCoords[0], toCoords[1], mode);
      if (!route) {
        setInfo('לא נמצא מסלול');
        setLoading(false);
        return;
      }

      // Display on map - LineString + start + end points
      const features: any[] = [
        {
          type: 'Feature',
          geometry: route.geometry,
          properties: { name: 'מסלול' },
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: fromCoords },
          properties: { name: 'התחלה', label: '🟢 התחלה' },
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: toCoords },
          properties: { name: 'יעד', label: '🏁 יעד' },
        },
      ];
      setGeo({ type: 'FeatureCollection', features });

      // Show summary info
      const km = (route.distance / 1000).toFixed(1);
      const min = Math.round(route.duration / 60);
      setInfo(`${km} ק"מ, ${min} דקות`);
    } catch (err) {
      setInfo('שגיאה בקבלת מסלול');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-16 end-64 z-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow text-sm"
        title="ניווט"
      >
        <Navigation className="w-4 h-4" />
        <span>ניווט</span>
      </button>

      {open && (
        <div className="mt-1 bg-white dark:bg-slate-800 rounded-lg shadow p-3 w-72">
          <div className="text-xs text-slate-500 mb-2">קבל מסלול:</div>

          <input
            type="text"
            placeholder={hasLocation() ? 'מהמיקום שלי (אופציונלי)' : 'מאיפה? (כתובת)'}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-2 py-1.5 mb-2 text-sm bg-slate-100 dark:bg-slate-700 rounded outline-none"
          />

          <input
            type="text"
            placeholder="לאן? (כתובת)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRoute()}
            className="w-full px-2 py-1.5 mb-2 text-sm bg-slate-100 dark:bg-slate-700 rounded outline-none"
          />

          <div className="flex gap-1 mb-2">
            <button
              onClick={() => setMode('driving')}
              className={`flex-1 text-xs py-1 rounded ${mode === 'driving' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-slate-100 dark:bg-slate-700'}`}
            >
              🚗 רכב
            </button>
            <button
              onClick={() => setMode('walking')}
              className={`flex-1 text-xs py-1 rounded ${mode === 'walking' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-slate-100 dark:bg-slate-700'}`}
            >
              🚶 הליכה
            </button>
          </div>

          <button
            onClick={handleRoute}
            disabled={loading || !destination.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 rounded disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'חשב מסלול'}
          </button>

          {info && <div className="text-xs mt-2 text-center text-slate-600 dark:text-slate-300">{info}</div>}
        </div>
      )}
    </div>
  );
}
