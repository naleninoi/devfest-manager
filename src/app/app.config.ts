import { ApplicationConfig, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { API_URL } from './core/tokens';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [
        // provideZoneChangeDetection({ eventCoalescing: true }),
        provideZonelessChangeDetection(),
        provideRouter(routes, withComponentInputBinding(), withViewTransitions()),

        provideHttpClient(withFetch()),

        provideClientHydration(withIncrementalHydration()),

        {
            provide: API_URL,
            useValue: 'http://localhost:3000',
        }
    ],
};
