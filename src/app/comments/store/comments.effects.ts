import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as CommentsActions from './comments.actions';
import * as fromApp from './../../store/app.reducers';
import { Comment } from './../comment.model';
import { CommentForm } from './../comment-form.model';
import { DataType } from './../../shared/model/data-type.model';
import { CommentsSortService } from './../../shared/services/comments-sorting.service';

@Injectable()
export class CommentsEffects {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromApp.AppState>,
              private commentsSortService: CommentsSortService) {}

@Effect()
prepareFetchComments = this.actions$.ofType(CommentsActions.SET_COMMENT_DATA)
    .map((action: CommentsActions.SetCommentData) => {
        return {
            type: CommentsActions.FETCH_COMMENTS
        };
    });

@Effect()
fetchComments = this.actions$
    .ofType(CommentsActions.FETCH_COMMENTS)
    .withLatestFrom(this.store.select('comments'))
    .switchMap(([action, state]) => {
        let dataType: string = null;
        if(state.commentData.site === DataType.Project){
            dataType = 'Project?project=';
        } else if(state.commentData.site === DataType.Course){
            dataType = 'Course?course=';
        } else if(state.commentData.site === DataType.Book){
            dataType = 'Book?book=';
        }
        return this.httpClient.get<any>('/api/comments/search/findBy' + dataType + (+state.commentData.entity), {
            observe: 'body',
            responseType: 'json'
        });
    })
    .map(
      (data) => {
        let comments: Array<Comment> = [];
        if(data._embedded){
            let preComments: Array<any> = data._embedded.comments;
            for(let x in preComments){
                comments.push(preComments[x].content);
            }
            comments = this.commentsSortService.sortComments(comments);
        } else {
            let comments = [];
        }
        return {
            type: CommentsActions.SET_COMMENTS,
            payload: comments
        };
      }
    );

    
@Effect({dispatch: false})
leaveComment = this.actions$.ofType(CommentsActions.LEAVE_COMMENT)
    .map((action: CommentsActions.LeaveComment) => {
        return action;
    })
    .withLatestFrom(this.store.select('main'))
    .withLatestFrom(this.store.select('comments'))
    .switchMap(([[action, state1], state2]) => {
        action.payload.site = DataType[state2.commentData.site];
        action.payload.entity = state2.commentData.entity;
        action.payload.entrance = state1.entrance_id;
      return this.httpClient.post<CommentForm>('/api/comments/save', action.payload,{
                observe: 'body',
                responseType: 'json'
      });
    });

@Effect()
storeComment = this.actions$.ofType(CommentsActions.STORE_COMMENT)
    .switchMap((action: CommentsActions.StoreComment) => {
      return this.httpClient.post<Comment>('/api/comments', action.payload,{
                observe: 'body',
                responseType: 'json'
      });
    })
    .map(
      (data) => {
        return {
            type: CommentsActions.FETCH_COMMENTS
        };
    });

@Effect()
deleteComment = this.actions$.ofType(CommentsActions.DELETE_COMMENT)
    .switchMap((action: CommentsActions.DeleteComment) => {
      return this.httpClient.get('/api/comments/delete/' + action.payload,{
                observe: 'body',
                responseType: 'json'
      });
    })
    .map(
      (data) => {
        return {
            type: CommentsActions.FETCH_COMMENTS
        };
    });

@Effect()
fetchComment = this.actions$.ofType(CommentsActions.FETCH_COMMENT)
    .switchMap((action: CommentsActions.FetchComment) => {
        return this.httpClient.get<any>('/api/comments/' + action.payload, {
            observe: 'body',
            responseType: 'json'
        });
    })
    .map(
      (data) => {
        return {
            type: CommentsActions.SET_COMMENT,
            payload: data.content
        };
      }
    );


}

