import 'zone.js';
import '@angular/compiler';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/login.component';
import { NgZone } from '@angular/core';
import { sharedProviders } from './shared/shared-providers';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(LoginComponent, {
      providers: [
        ...getSingleSpaExtraProviders(),
        ...sharedProviders,
      ]
    });
  },
  template: '<app-login />',
  Router: undefined,
  NgZone: NgZone,
  domElementGetter: () => document.getElementById('app-angular')!,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
