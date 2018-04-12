import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, Injectable, ReflectiveInjector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { getLanguage } from './app/app.module';
import { environment } from './environments/environment';
import { LanguageService } from './app/shared/services/language.service';

if (environment.production) {
  enableProdMode();
}

let injector = ReflectiveInjector.resolveAndCreate([LanguageService]);
let langService = injector.get(LanguageService);

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
//    {provide: TRANSLATIONS, deps:[], useFactory: getLang},
//    {provide: TRANSLATIONS, useValue: getLang()},
    {provide: TRANSLATIONS, useValue: langService.getRequire()},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
});

export function getLang() {
  return langService.getRequire();
}