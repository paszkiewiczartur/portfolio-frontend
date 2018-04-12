import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { ContactComponent } from './core/contact/contact.component';
import { SearchComponent } from './core/search/search.component';
import { UploadComponent } from './core/upload/upload.component';
import { SingleCommentComponent } from './comments/single-comment/single-comment.component';
import { AuthGuard } from './auth/auth-guard.service';

import { ProjectsModule } from './projects/projects.module';
import { CoursesModule } from './courses/courses.module';
import { BooksModule } from './books/books.module';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: 'about-me', component: AboutComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'search', component: SearchComponent},
    { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
    { path: 'search/:searchText', component: SearchComponent},
    { path: 'comments/:id', component: SingleCommentComponent},
/*    { path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule'},
    { path: 'courses', loadChildren: 'app/courses/courses.module#CoursesModule'},
    { path: 'books', loadChildren: 'app/books/books.module#BooksModule'}*/
    { path: 'projects', loadChildren: () => ProjectsModule},
    { path: 'courses', loadChildren: () => CoursesModule},
    { path: 'books', loadChildren: () => BooksModule}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules/*, enableTracing: true*/ })],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { 

}
