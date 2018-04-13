import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Draft } from './../shared/model/draft.model';
import * as fromAuth from './../auth/store/auth.reducers';
import * as fromBooks from './store/books.reducers';
import * as BooksActions from './store/books.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    booksState: Observable<fromBooks.State>;
    authState: Observable<fromAuth.State>;
    menuEdit: boolean = false;
    books: Array<Draft>;
   
    constructor(private store: Store<fromBooks.BooksState>) { }

    ngOnInit() {
        this.booksState = this.store.select('books');
        this.authState = this.store.select('auth');
        this.store.dispatch(new BooksActions.FetchBooks());
        this.store.select('books').subscribe(
            (booksState: fromBooks.State) => {
                if(booksState.books){
                    this.books = booksState.books.slice();
                }
            }
        );
    }
    
    entityUp(index: number){
        this.books[index].sequence = this.books[index].sequence - 1;
        this.books[index-1].sequence = this.books[index-1].sequence + 1;
        let book: Draft = JSON.parse(JSON.stringify(this.books[index]));
        this.books.splice(index, 1);
        this.books.splice(index - 1, 0, book);
    }

    entityDown(index: number){
        this.books[index+1].sequence = this.books[index+1].sequence - 1;
        this.books[index].sequence = this.books[index].sequence + 1;
        let book: Draft = JSON.parse(JSON.stringify(this.books[index]));
        this.books.splice(index, 1);
        this.books.splice(index + 1, 0, book);
    }

    save(){
        this.store.dispatch(new BooksActions.StoreBooksOrder(this.books));
    }

}
