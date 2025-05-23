import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import * as Sentry from "@sentry/react";
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

Sentry.init({
  dsn: import.meta.env.SENTRY_LARAVEL_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration({
      instrumentNavigation: true, // TODO: Understand if this is needed. Inertia, React, and Sentry are all instrumenting the same things?
      instrumentPageLoad: true, // TODO: Understand if this is needed
    }),
    Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      })
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
