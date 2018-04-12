import { Action } from '@ngrx/store';

import { Comment } from './../comment.model';
import { CommentForm } from './../comment-form.model';
import { LinkRequestType } from './../../shared/model/link-request-type.model';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const SET_COMMENT_DATA = 'SET_COMMENT_DATA';
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_COMMENT = 'SET_COMMENT';
export const LEAVE_COMMENT = 'LEAVE_COMMENT';
export const STORE_COMMENT = 'STORE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export class FetchComments implements Action {
  readonly type = FETCH_COMMENTS;
}

export class FetchComment implements Action {
  readonly type = FETCH_COMMENT;
  constructor(public payload: number){}
}

export class SetCommentData implements Action {
    readonly type = SET_COMMENT_DATA;
    constructor(public payload: LinkRequestType){}
}

export class SetComments implements Action {
  readonly type = SET_COMMENTS;
  constructor(public payload: Array<Comment>) {}
}

export class SetComment implements Action {
  readonly type = SET_COMMENT;
  constructor(public payload: Comment) {}
}

export class LeaveComment implements Action {
    readonly type = LEAVE_COMMENT;
    constructor(public payload: CommentForm){}
}

export class StoreComment implements Action {
    readonly type = STORE_COMMENT;
    constructor(public payload: Comment){}
}

export class DeleteComment implements Action {
    readonly type = DELETE_COMMENT;
    constructor(public payload: number){}
}

export type CommentsActions = 
    FetchComments |
    FetchComment |
    SetCommentData |
    SetComments |
    SetComment |
    LeaveComment |
    StoreComment |
    DeleteComment;
    