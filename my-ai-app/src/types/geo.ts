import type { Feature, FeatureCollection, Geometry, Point, LineString, Polygon } from 'geojson';

// Re-export GeoJSON standard types
export type { Feature, FeatureCollection, Geometry, Point, LineString, Polygon };

/** התוצאה של geoDetector - תמיד GeoJSON אחרי הפענוח */
export interface DetectedGeo {
  source: 'geojson' | 'lat-lng' | 'coords-array' | 'unknown';
  data: FeatureCollection;
  hasGeometry: boolean;
}

/** פורמטים שונים שייתכן ויחזרו מ-API */
export type RawGeoInput =
  | Feature
  | FeatureCollection
  | { lat: number; lng: number; label?: string }
  | { latitude: number; longitude: number; label?: string }
  | Array<[number, number]> // [[lng, lat], ...]
  | Array<{ lat: number; lng: number }>
  | unknown;
