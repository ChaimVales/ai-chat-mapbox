# Nearby POI Feature

חיפוש מקומות קרובים (פיצה, קפה, בנק, דלק) לפי המיקום של המשתמש.

## תלות
דורש `user-location` (כדי לדעת איפה המשתמש).

## איך להפעיל
ב-MapView.tsx:
```tsx
import { NearbyButton } from '../../features/nearby-poi/feature';
<NearbyButton />
```

## איך להסיר
מחק תיקייה + הסר את ה-button מ-MapView.
