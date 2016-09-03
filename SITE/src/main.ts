import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { appRouteProviders } from './app/app.routes';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  Title,
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  appRouteProviders
]).catch(err => console.error(err));

