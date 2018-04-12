import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/of';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as MainActions from './../../shared/store/main.actions';
import * as CommentsActions from './../../comments/store/comments.actions';
import * as BooksActions from './books.actions';
import * as fromBooks from './books.reducers';
import { Book } from './../book.model';
import { Draft } from './../../shared/model/draft.model';
import { LinkRequestType } from './../../shared/model/link-request-type.model';
import { DataType } from './../../shared/model/data-type.model';
import { EntitySortService } from './../../shared/services/entity-sorting.service';

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromBooks.BooksState>,
              private entitySortService: EntitySortService) {}

@Effect()
  bookFetch = this.actions$
    .ofType(BooksActions.FETCH_BOOK)
    .switchMap((action: BooksActions.FetchBook) => {
      return this.httpClient.get<Book>('/api/books/search/findByPath?bookPath=' + action.payload, {
        observe: 'body',
        responseType: 'json'
      })
      .switchMap(
        (book) => {
            console.log("Loguję booka");
            console.log(book);
            let commentData: LinkRequestType = {
                site: DataType.Book,
                entity: book.id
            }
          return [{
                type: BooksActions.SET_BOOK,
                payload: book
            },
            {
                type: CommentsActions.SET_COMMENT_DATA,
                payload: commentData
            },
            {
                type: MainActions.FETCH_LINKS,
                payload: {
                    site: DataType.Book,
                    entity: book.id
                }
            },
            {
                type: BooksActions.FETCH_BOOK_TAGS,
                payload: book.id
            }
            ];
        }
      )        
        .catch(err => {
            console.log("ERROR!");
              return Observable.of({ type: BooksActions.FETCH_BOOK_FAIL, payload: err });
        });
    });

@Effect()
  booksFetch = this.actions$
    .ofType(BooksActions.FETCH_BOOKS)
    .switchMap((action: BooksActions.FetchBooks) => {
      return this.httpClient.get<Array<Draft>>('/api/getBooks', {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map((books) => {
        console.log("before sorting");
        console.log(books)
        this.entitySortService.sort(books);
        console.log("after sorting");
        console.log(books)
      return {
        type: BooksActions.SET_BOOKS,
        payload: books
      };
    });

@Effect()
  storeBooksOrder = this.actions$
    .ofType(BooksActions.STORE_BOOKS_ORDER)
    .switchMap((action: BooksActions.StoreBooksOrder) => {
      return this.httpClient.post('/api/setBooksOrder', action.payload, {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map((books) => {
        console.log("Zaraz Fetch_Books");
      return {
        type: BooksActions.FETCH_BOOKS
      };
    });
    
@Effect()
  storeBook = this.actions$
    .ofType(BooksActions.STORE_BOOK)
    .switchMap((action: BooksActions.StoreBook) => {
        console.log("prepare to send Book");
        console.log(action.payload);
      return this.httpClient.post('/api/books', action.payload, {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((data) => {
        console.log("data after post book:");
        console.log(data);
      return {
            type: BooksActions.FETCH_BOOKS
            };
        /*{
            type: MainActions.SET_COMMENTS,
            payload: new Array()
        }
      ];*/
    });

@Effect()
  deleteBook = this.actions$
    .ofType(BooksActions.DELETE_BOOK)
    .switchMap((action: BooksActions.DeleteBook) => {
      return this.httpClient.delete('/api/books/' + action.payload, {
        observe: 'body',
        responseType: 'json'
      })
    })
    .switchMap((data) => {
        console.log("data after delete book:");
        console.log(data);
      return [
        {
        type: BooksActions.FETCH_BOOKS
        },
        {
            type: CommentsActions.SET_COMMENTS,
            payload: new Array()
        }
      ];
    });

@Effect()
fetchBookTags = this.actions$
    .ofType(BooksActions.FETCH_BOOK_TAGS)
    .switchMap((action: BooksActions.FetchBookTags) => {
      return this.httpClient.get<any>('/api/books/' + action.payload + '/tags', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((data) => {
        console.log("data after fetch book tags:");
        console.log(data);
      return {
            type: BooksActions.SET_BOOK_TAGS,
            payload: data._embedded.tags
        };
    });

}
