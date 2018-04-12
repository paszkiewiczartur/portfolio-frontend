import * as BooksActions from './books.actions';
import * as fromApp from '../../store/app.reducers';
import { Book } from './../book.model';
import { Draft } from './../../shared/model/draft.model';
import { Tag } from './../../shared/model/tag.model';

export interface BooksState extends fromApp.AppState {
  books: State
}

export interface State {
  book: Book;
  books: Array<Draft>;
  bookTags: Array<Tag>;
  fetchBookFail: any;
}

const initialState: State = {
    book: null,
    books: null,
    bookTags: null,
    fetchBookFail: null
};

export function booksReducer(state = initialState, action: BooksActions.BooksActions) {
  switch (action.type) {
    case (BooksActions.SET_BOOK):
      return {
        ...state,
        book: action.payload
      };
    case (BooksActions.SET_BOOKS):
      return {
        ...state,
        books: [...action.payload]
      };
    case (BooksActions.SET_BOOK_TAGS):
      return {
        ...state,
        bookTags: [...action.payload]
      };
    case (BooksActions.FETCH_BOOK_FAIL):
      return {
        ...state,
        fetchBookFail: action.payload
      };
    default:
      return state;
  }
}
