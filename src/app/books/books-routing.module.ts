import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BooksComponent } from './books.component';
import { BookComponent } from './book/book.component';
import { BooksStartComponent } from './books-start/books-start.component';

const booksRoutes: Routes = [
    { path: '', component: BooksComponent, children: [
        { path: '', component: BooksStartComponent, pathMatch: 'full'},
        { path: ':bookPath', component: BookComponent}
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(booksRoutes)],
    exports: [RouterModule]
})
export class BooksRoutingModule{

}