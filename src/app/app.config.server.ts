import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

const serverConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServerRendering(),
  ]
};


export const config = mergeApplicationConfig(appConfig, serverConfig);
