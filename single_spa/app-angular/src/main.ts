import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { sharedProviders } from './shared/shared-providers';

bootstrapApplication(AppComponent, {
  providers: [
    ...sharedProviders,
  ],
}).catch(err => console.error(err));
