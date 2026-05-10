import 'mapbox-gl/dist/mapbox-gl.css';
// === FEATURE: latex-math ===
import 'katex/dist/katex.min.css';
// === END FEATURE: latex-math ===
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import './store/themeStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
