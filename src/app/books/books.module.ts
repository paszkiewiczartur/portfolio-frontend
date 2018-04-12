import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { BooksRoutingModule } from './books-routing.module';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books.component';
import { BooksStartComponent } from './books-start/books-start.component';
import { SharedModule } from './../shared/shared.module';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookTagsComponent } from './book-edit/book-tags/book-tags.component';
import { TagsModule } from './../tags/tags.module';
import { CommentsModule } from './../comments/comments.module';
import { booksReducer } from './store/books.reducers';
import { BooksEffects } from './store/books.effects';

@NgModule({
    declarations: [
        BooksComponent,
        BookComponent,
        BooksStartComponent,
        BookEditComponent,
        BookTagsComponent
    ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        FormsModule,
        TagsModule,
        CommentsModule,    
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forFeature('books', booksReducer),
        EffectsModule.forFeature([BooksEffects])
    ]
})
export class BooksModule{

}