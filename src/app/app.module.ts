import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { CommonModule } from'@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BooksModule } from './books/books.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { LanguageService } from './shared/services/language.service';
import { reducers } from './store/app.reducers';
import { environment } from '../environments/environment';
import { AuthEffects } from './auth/store/auth.effects';
import { CommentsEffects } from './comments/store/comments.effects';
import { MainEffects } from './shared/store/main.effects';
import { TagsEffects } from './tags/store/tags.effects';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    CommentsModule,
    ProjectsModule,
    CoursesModule,
    BooksModule,
    TagsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, CommentsEffects, MainEffects, TagsEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    LanguageService,
    {provide: LOCALE_ID,
      deps: [LanguageService],      
      useFactory: getLanguage  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLanguage(languageService: LanguageService) {
  return languageService.getLanguage();
}