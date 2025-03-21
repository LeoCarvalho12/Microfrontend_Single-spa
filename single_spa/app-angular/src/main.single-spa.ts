import 'zone.js';
import '@angular/compiler';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; 
import { NgZone } from '@angular/core';
import { sharedProviders } from './shared/shared-providers';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, {
      providers: [
        ...getSingleSpaExtraProviders(),
        ...sharedProviders,
        provideRouter(routes)
      ]
    });
  },
  template: '<app-root />',
  Router: undefined,
  NgZone: NgZone,
  domElementGetter: () => document.getElementById('app-angular')!,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
