import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, ChartModule),
    provideAnimationsAsync(),
    // providePrimeNG({ theme: { preset: Aura } })
  ]
}).catch(err => console.error(err));
