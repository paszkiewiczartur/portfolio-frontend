import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromBooks from './../store/books.reducers';

@Component({
  selector: 'app-books-start',
  templateUrl: './books-start.component.html',
  styleUrls: ['./books-start.component.css']
})
export class BooksStartComponent implements OnInit {
    authState: Observable<fromAuth.State>;
    bookEdit: boolean = false;
    book1: string;
    book2: string;
    book3: string;
    
    constructor(private store: Store<fromBooks.BooksState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
        this.store.select('books').subscribe(
            (booksState: fromBooks.State) => {
                if(booksState.books){
                    let books = booksState.books.slice();
                    books.sort(function(a, b){return 0.5 - Math.random()});
                    if(books[0])
                        this.book1 = books[0].image;
                    if(books[1])
                        this.book2 = books[1].image;
                    if(books[2])
                        this.book3 = books[2].image;
                }
            }
        );
    }

}
