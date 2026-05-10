/**
 * FEATURE: user-location
 * Get and store user's geolocation. Other features (nearby-poi, routing) use this.
 *
 * Files this feature touches:
 *   - src/components/welcome/WelcomeScreen.tsx (add <LocationButton />)
 *   - src/store/chatStore.ts (system prompt includes location if available)
 *
 * To remove: delete folder + remove import + remove location injection from chatStore.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MapPin, Loader2, Check, X } from 'lucide-react';
import { useState } from 'react';

interface LocationState {
  lat: number | null;
  lng: number | null;
  city: string | null;
  setLocation: (lat: number, lng: number) => void;
  setCity: (city: string) => void;
  clearLocation: () => void;
  hasLocation: () => boolean;
}

export const useUserLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      lat: null,
      lng: null,
      city: null,
      setLocation: (lat, lng) => set({ lat, lng }),
      setCity: (city) => set({ city }),
      clearLocation: () => set({ lat: null, lng: null, city: null }),
      hasLocation: () => get().lat !== null && get().lng !== null,
    }),
    { name: 'user-location-v1' },
  ),
);

/**
 * Reverse geocode coords → city name using Mapbox API.
 */
async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&types=place&language=he`,
    );
    const data = await res.json();
    return data.features?.[0]?.place_name || null;
  } catch {
    return null;
  }
}

export function LocationButton() {
  const { lat, lng, city, setLocation, setCity, clearLocation, hasLocation } = useUserLocationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    setError(null);
    setLoading(true);
    if (!navigator.geolocation) {
      setError('הדפדפן לא תומך');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(latitude, longitude);
        const cityName = await reverseGeocode(latitude, longitude);
        if (cityName) setCity(cityName);
        setLoading(false);
      },
      (err) => {
        setError(err.message || 'נכשל');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const isSet = hasLocation();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={isSet ? clearLocation : requestLocation}
        disabled={loading}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
          isSet
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
        title={isSet ? `מיקום: ${city || `${lat?.toFixed(3)}, ${lng?.toFixed(3)}`}` : 'שתף מיקום'}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isSet ? (
          <Check className="w-4 h-4" />
        ) : (
          <MapPin className="w-4 h-4" />
        )}
        <span>{isSet ? city || 'מיקום' : 'שתף מיקום'}</span>
        {isSet && (
          <X
            className="w-3 h-3 ms-1 opacity-50 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              clearLocation();
            }}
          />
        )}
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
