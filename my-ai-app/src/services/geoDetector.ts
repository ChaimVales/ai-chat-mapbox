import type {
  Feature,
  FeatureCollection,
  Geometry,
  Point,
  LineString,
  Polygon,
  DetectedGeo,
} from '../types';

/**
 * מנסה לחלץ גיאומטריה מתוך טקסט / אובייקט שהגיע מ-API.
 * תומך בכמה פורמטים:
 *   - GeoJSON Feature / FeatureCollection
 *   - { lat, lng } / { latitude, longitude }
 *   - מערך נקודות [[lng, lat], ...]
 *   - JSON code blocks בתוך טקסט (```json ... ```)
 */
export function detectGeo(input: string | unknown): DetectedGeo {
  const empty: DetectedGeo = {
    source: 'unknown',
    data: { type: 'FeatureCollection', features: [] },
    hasGeometry: false,
  };

  // 1. אם זה string - תנסה להוציא JSON ממנו
  if (typeof input === 'string') {
    const extracted = extractJsonFromText(input);
    if (!extracted) return empty;
    return detectGeo(extracted);
  }

  // 2. נסה parse כ-GeoJSON
  const asGeoJson = tryGeoJson(input);
  if (asGeoJson) {
    return { source: 'geojson', data: asGeoJson, hasGeometry: asGeoJson.features.length > 0 };
  }

  // 3. נסה parse כ-{ lat, lng }
  const asLatLng = tryLatLng(input);
  if (asLatLng) {
    return { source: 'lat-lng', data: asLatLng, hasGeometry: true };
  }

  // 4. נסה parse כמערך [[lng, lat], ...] (קו)
  const asArray = tryCoordsArray(input);
  if (asArray) {
    return { source: 'coords-array', data: asArray, hasGeometry: true };
  }

  return empty;
}

// ==== Helpers ====

function extractJsonFromText(text: string): unknown | null {
  // נסה למצוא JSON בקוד-בלוק
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch {
      // ignore parse errors
    }
  }

  // נסה parse את כל הטקסט
  try {
    return JSON.parse(text);
  } catch { }

  return null;
}

function tryGeoJson(obj: any): FeatureCollection | null {
  if (!obj || typeof obj !== 'object') return null;

  if (obj.type === 'FeatureCollection' && Array.isArray(obj.features)) {
    return obj as FeatureCollection;
  }

  if (obj.type === 'Feature' && obj.geometry) {
    return { type: 'FeatureCollection', features: [obj as Feature] };
  }

  if (['Point', 'LineString', 'Polygon'].includes(obj.type) && obj.coordinates) {
    return {
      type: 'FeatureCollection',
      features: [{ type: 'Feature', geometry: obj as Geometry, properties: {} }],
    };
  }

  return null;
}

function tryLatLng(obj: any): FeatureCollection | null {
  if (!obj || typeof obj !== 'object') return null;

  const lat = obj.lat ?? obj.latitude;
  const lng = obj.lng ?? obj.longitude ?? obj.lon;

  if (typeof lat === 'number' && typeof lng === 'number') {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [lng, lat] },
          properties: { label: obj.label },
        },
      ],
    };
  }

  return null;
}

function tryCoordsArray(obj: any): FeatureCollection | null {
  if (!Array.isArray(obj) || obj.length === 0) return null;

  // [[lng, lat], [lng, lat], ...]
  const isCoordPairs = obj.every(
    (p) =>
      Array.isArray(p) && p.length === 2 && typeof p[0] === 'number' && typeof p[1] === 'number',
  );

  if (isCoordPairs) {
    if (obj.length === 1) {
      return {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', geometry: { type: 'Point', coordinates: obj[0] }, properties: {} },
        ],
      };
    }
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: obj as [number, number][] },
          properties: {},
        },
      ],
    };
  }

  // [{lat, lng}, ...]
  if (obj.every((p) => p && typeof p.lat === 'number' && typeof p.lng === 'number')) {
    const coords = obj.map((p) => [p.lng, p.lat] as [number, number]);
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: coords },
          properties: {},
        },
      ],
    };
  }

  return null;
}
