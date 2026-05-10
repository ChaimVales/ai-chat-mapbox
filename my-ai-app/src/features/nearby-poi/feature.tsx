/**
 * FEATURE: nearby-poi
 * Find nearby places (pizza, coffee, gas, ATM, etc) using Mapbox Search API.
 * Displays results on the map.
 *
 * Depends on: user-location (needs user's coordinates)
 *
 * Files this feature touches:
 *   - src/components/map/MapView.tsx (add <NearbyButton />)
 *
 * Mapbox API: Geocoding/Search API (free)
 */

import { useState } from 'react';
import { Pizza, Coffee, Fuel, Building2, Search } from 'lucide-react';
import { useUserLocationStore } from '../user-location/feature';
import { useMapStore } from '../../store/mapStore';

const CATEGORIES = [
  { id: 'pizza', label: 'פיצה', icon: Pizza, search: 'pizza' },
  { id: 'coffee', label: 'קפה', icon: Coffee, search: 'coffee' },
  { id: 'gas', label: 'דלק', icon: Fuel, search: 'gas station' },
  { id: 'bank', label: 'בנק/כספומט', icon: Building2, search: 'bank ATM' },
];

async function searchNearby(query: string, lng: number, lat: number) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  // Mapbox Geocoding API with proximity bias
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?proximity=${lng},${lat}&limit=10&language=he&access_token=${token}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.features || [];
}

export function NearbyButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lat, lng, hasLocation } = useUserLocationStore();
  const setGeo = useMapStore((s) => s.setGeo);

  const handleSearch = async (query: string) => {
    if (!hasLocation() || lat === null || lng === null) {
      alert('צריך לשתף מיקום קודם (כפתור "שתף מיקום" במסך הראשי)');
      return;
    }
    setLoading(true);
    try {
      const results = await searchNearby(query, lng, lat);
      // Convert to GeoJSON FeatureCollection
      const features = results.map((r: any) => ({
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: r.center },
        properties: { name: r.text || r.place_name, address: r.place_name, label: r.text },
      }));
      // Add user's location as central point
      features.unshift({
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [lng, lat] },
        properties: { name: 'אתה', label: '📍 אתה כאן' },
      });
      setGeo({ type: 'FeatureCollection', features });
      setOpen(false);
    } catch (err) {
      alert('שגיאה בחיפוש');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-3 end-64 z-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow text-sm"
        title="חפש קרוב אליי"
      >
        <Search className="w-4 h-4" />
        <span>קרוב אליי</span>
      </button>

      {open && (
        <div className="mt-1 bg-white dark:bg-slate-800 rounded-lg shadow p-2 w-48">
          <div className="text-xs text-slate-500 mb-2 px-1">חפש בקרבה:</div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSearch(cat.search)}
              disabled={loading}
              className="flex items-center gap-2 w-full text-start px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-sm disabled:opacity-50"
            >
              <cat.icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          ))}
          <div className="border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
            <input
              type="text"
              placeholder="או חפש משהו אחר..."
              className="w-full px-2 py-1 text-sm bg-slate-100 dark:bg-slate-700 rounded outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  handleSearch(e.currentTarget.value);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
