/**
 * FEATURE: export-geojson
 * Download current map geometries as a .geojson file.
 *
 * Files: src/components/map/MapView.tsx
 */

import { Download } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';

export function ExportGeoJsonButton() {
  const geo = useMapStore((s) => s.geo);

  const handleExport = () => {
    if (!geo || geo.features.length === 0) {
      alert('אין גיאומטריה להורדה');
      return;
    }
    const blob = new Blob([JSON.stringify(geo, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `geo-${Date.now()}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="absolute bottom-3 end-16 z-10 p-2 bg-white dark:bg-slate-800 rounded-lg shadow"
      aria-label="Export GeoJSON"
      title="הורד GeoJSON"
    >
      <Download className="w-4 h-4" />
    </button>
  );
}
