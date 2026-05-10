import { useState } from 'react';
import type mapboxgl from 'mapbox-gl';
import { useMapStore } from './store/mapStore';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { ChatLauncher } from './components/chat/ChatLauncher';
import { ChatWindow } from './components/chat/ChatWindow';
import { ChatPanel } from './components/chat/ChatPanel';
import { MapView } from './components/map/MapView';
import { GeoLayer } from './components/map/GeoLayer';
import { SplitView } from './components/layout/SplitView';
// === FEATURE: resizable-panels ===
import { ResizableSplitView } from './features/resizable-panels/feature';
const USE_RESIZABLE = true; // set to false for fixed split
// === END FEATURE: resizable-panels ===
// === FEATURE: keyboard-shortcuts ===
import { KeyboardShortcuts } from './features/keyboard-shortcuts/feature';
// === END FEATURE: keyboard-shortcuts ===
// === FEATURE: onboarding-tour ===
import { OnboardingTour } from './features/onboarding-tour/feature';
// === END FEATURE: onboarding-tour ===

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const geo = useMapStore((s) => s.geo);

  const splitMode = !!geo && geo.features.length > 0;

  if (splitMode) {
    const mapContent = (
      <>
        <MapView onMapReady={setMap} />
        <GeoLayer map={map} geo={geo} />
      </>
    );
    return (
      <>
        {USE_RESIZABLE ? (
          <ResizableSplitView chat={<ChatPanel />} map={mapContent} />
        ) : (
          <SplitView active={true} chat={<ChatPanel />} map={mapContent} />
        )}
        <KeyboardShortcuts />
        <OnboardingTour />
      </>
    );
  }

  return (
    <div className="relative min-h-screen">
      <WelcomeScreen onPromptSelect={() => setIsChatOpen(true)} />
      <ChatLauncher onClick={() => setIsChatOpen(true)} isOpen={isChatOpen} />
      <ChatWindow open={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {/* === FEATURE: keyboard-shortcuts === */}
      <KeyboardShortcuts />
      {/* === END FEATURE: keyboard-shortcuts === */}
      {/* === FEATURE: onboarding-tour === */}
      <OnboardingTour />
      {/* === END FEATURE: onboarding-tour === */}
    </div>
  );
}

export default App;
