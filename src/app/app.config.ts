import { ApplicationConfig, provideAppInitializer, inject, provideBrowserGlobalErrorListeners, provideEnvironmentInitializer } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './helpers/jwt-interceptor';
import { authInterceptor } from './helpers/auth-interceptor';
import { ColorSchemeService } from './services/color-scheme.service';
import { SeoService } from './services/seo.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'enabled'
      })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor, authInterceptor])
    ),
    provideAppInitializer(() => {
      const initColorSchemeService = inject(ColorSchemeService);
    }),
    provideEnvironmentInitializer(() => {
      const seoService = inject(SeoService);
      seoService.initMetaListener();
    })
  ]
};
