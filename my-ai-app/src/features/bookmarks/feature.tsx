/**
 * FEATURE: bookmarks
 * Save and quickly jump to favorite map locations.
 *
 * Files: src/components/map/MapView.tsx
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';

interface Bookmark {
  id: string;
  name: string;
  lng: number;
  lat: number;
  zoom: number;
}

interface BookmarksState {
  bookmarks: Bookmark[];
  add: (b: Omit<Bookmark, 'id'>) => void;
  remove: (id: string) => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      add: (b) => set({ bookmarks: [...get().bookmarks, { ...b, id: crypto.randomUUID() }] }),
      remove: (id) => set({ bookmarks: get().bookmarks.filter((x) => x.id !== id) }),
    }),
    { name: 'bookmarks-v1' },
  ),
);

interface Props {
  map: mapboxgl.Map | null;
}

export function BookmarksControl({ map }: Props) {
  const { bookmarks, add, remove } = useBookmarksStore();
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (!map) return;
    const name = prompt('שם הסימנייה:');
    if (!name) return;
    const center = map.getCenter();
    add({ name, lng: center.lng, lat: center.lat, zoom: map.getZoom() });
  };

  const goTo = (b: Bookmark) => {
    map?.flyTo({ center: [b.lng, b.lat], zoom: b.zoom });
    setOpen(false);
  };

  return (
    <div className="absolute top-3 end-32 z-10">
      <button onClick={() => setOpen(!open)} className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow">
        <Star className="w-4 h-4" />
      </button>
      {open && (
        <div className="mt-1 bg-white dark:bg-slate-800 rounded-lg shadow p-2 w-48 max-h-64 overflow-y-auto">
          <button onClick={handleSave} className="w-full text-xs bg-blue-100 dark:bg-blue-900 rounded px-2 py-1 mb-2">
            + שמור מיקום נוכחי
          </button>
          {bookmarks.length === 0 && <div className="text-xs text-slate-400">אין סימניות</div>}
          {bookmarks.map((b) => (
            <div key={b.id} className="flex items-center justify-between text-xs p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <button onClick={() => goTo(b)} className="flex-1 text-start">{b.name}</button>
              <button onClick={() => remove(b.id)}><Trash2 className="w-3 h-3 text-red-500" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
