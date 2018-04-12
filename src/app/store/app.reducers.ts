import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './../auth/store/auth.reducers';
import * as fromComments from './../comments/store/comments.reducers';
import * as fromMain from './../shared/store/main.reducers';
import * as fromTags from './../tags/store/tags.reducers';

export interface AppState {
  auth: fromAuth.State;
  comments: fromComments.State;
  main: fromMain.State;
  tags: fromTags.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  comments: fromComments.commentsReducer,
  main: fromMain.mainReducer,
  tags: fromTags.tagsReducer
};
