import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { routes } from '../app/app.routes';

export const sharedProviders = [
  provideHttpClient(),
  provideRouter(routes),
  importProvidersFrom(BrowserAnimationsModule, ToastrModule.forRoot()),
];