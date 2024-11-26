import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from "ngx-toastr";
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideToastr(
    {
      timeOut: 1000,
      progressBar: false,
      positionClass: 'toast-top-right'
    }
  ), importProvidersFrom([BrowserAnimationsModule])]
};
