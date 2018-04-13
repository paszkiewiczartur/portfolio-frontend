import * as CommentsActions from './comments.actions';
import { Comment } from './../comment.model';
import { LinkRequestType } from './../../shared/model/link-request-type.model';

export interface CommentsState {
  comments: State
}

export interface State {
  comments: Array<Comment>;
  comment: Comment;
  commentData: LinkRequestType;
}

const initialState: State = {
  comments: null,
  comment: null,
  commentData: null
}

export function commentsReducer(state = initialState, action: CommentsActions.CommentsActions) {
  switch (action.type) {
    case (CommentsActions.SET_COMMENT_DATA):
      return {
        ...state,
        commentData: action.payload
      };
    case (CommentsActions.SET_COMMENTS):
      return {
        ...state,
        comments: [...action.payload]
      };
    case (CommentsActions.SET_COMMENT):
      return {
        ...state,
        comment: action.payload
      };
    default:
      return state;
  }
}
