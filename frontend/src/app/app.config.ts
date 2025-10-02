import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { provideHttpClient } from '@angular/common/http';

//PrimeNG Component Library imports
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme:  {
        preset: Aura,
        options: {
          prefix: 'my',
          darkModeSelector: '.my-app-dark'
        }
      }
  })
  ]
};
