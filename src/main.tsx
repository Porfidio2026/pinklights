import { createRoot } from 'react-dom/client'
import { initSentry } from './lib/sentry'
import { initPostHog } from './lib/posthog'
import App from './App.tsx'
import './index.css'

// Initialize monitoring before React renders
initSentry();
initPostHog();

createRoot(document.getElementById("root")!).render(<App />);
