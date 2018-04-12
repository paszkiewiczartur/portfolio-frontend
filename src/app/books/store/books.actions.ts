import { Action } from '@ngrx/store';

import { Book } from './../book.model';
import { Draft } from './../../shared/model/draft.model';
import { Tag } from './../../shared/model/tag.model';

export const FETCH_BOOK = 'FETCH_BOOK';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const SET_BOOK = 'SET_BOOK';
export const SET_BOOKS = 'SET_BOOKS';
export const STORE_BOOK = 'STORE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const FETCH_BOOK_TAGS = 'FETCH_BOOK_TAGS';
export const SET_BOOK_TAGS = 'SET_BOOK_TAGS';
export const FETCH_BOOK_FAIL = 'FETCH_BOOK_FAIL';
export const STORE_BOOKS_ORDER = 'STORE_BOOKS_ORDER';

export class FetchBook implements Action {
  readonly type = FETCH_BOOK;
  constructor(public payload: string){}
}

export class FetchBooks implements Action {
  readonly type = FETCH_BOOKS;
}

export class SetBook implements Action {
  readonly type = SET_BOOK;
  constructor(public payload: Book) {}
}

export class SetBooks implements Action {
  readonly type = SET_BOOKS;
  constructor(public payload: Array<Draft>) {}
}

export class StoreBook implements Action {
  readonly type = STORE_BOOK;
  constructor(public payload: Book) {}
}

export class DeleteBook implements Action {
  readonly type = DELETE_BOOK;
  constructor(public payload: number) {}
}

export class FetchBookTags implements Action {
    readonly type = FETCH_BOOK_TAGS;
    constructor(public payload: number){}
}

export class SetBookTags implements Action {
    readonly type = SET_BOOK_TAGS;
    constructor(public payload: Array<Tag>){}
}

export class FetchBookFail implements Action {
  readonly type = FETCH_BOOK_FAIL;
  constructor(public payload: any) {}
}

export class StoreBooksOrder implements Action {
  readonly type = STORE_BOOKS_ORDER;
  constructor(public payload: Array<Draft>) {}
}

export type BooksActions = 
    FetchBook |
    FetchBooks |
    SetBook |
    SetBooks |
    StoreBook |
    DeleteBook |
    FetchBookTags |
    SetBookTags |
    FetchBookFail |
    StoreBooksOrder;