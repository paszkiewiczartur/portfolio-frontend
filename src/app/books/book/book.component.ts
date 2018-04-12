import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromBooks from './../store/books.reducers';
import * as BooksActions from './../store/books.actions';
import * as MainActions from './../../shared/store/main.actions';
import { Book } from './../book.model';
import { LanguageService } from './../../shared/services/language.service';
import { LinkType } from './../../shared/model/link-type.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
    path: string;
    booksState: Observable<fromBooks.State>;
    authState: Observable<fromAuth.State>;
    bookEdit: boolean = false;
    
    constructor(private store: Store<fromBooks.BooksState>, private route: ActivatedRoute, private languageService: LanguageService) { }

    ngOnInit() {
        this.booksState = this.store.select('books');
        this.authState = this.store.select('auth');
        this.route.params.subscribe(
            (params: Params) => {
                this.path = params['bookPath'];    
                this.store.dispatch(new BooksActions.FetchBook(this.path));
            }
        );
        /*this.store.select('books').subscribe(
            (booksState: fromBooks.State) => {
                if(booksState.book && !booksState.bookTags){
                    this.store.dispatch(new BooksActions.FetchBookTags(booksState.book.id));                
                }
            }
        );*/
    }
    
    websiteClicked(){
        const linkType: string = LinkType[LinkType.WEBSITE];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
    }
    
    isPolish(){
        if(this.languageService.getLanguage() === 'pl'){
            return true;
        }
        return false;
    }
}
