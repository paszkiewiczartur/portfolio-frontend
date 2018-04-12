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
        console.log("inside FETCH_COMMENTS");
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
        console.log(data);
        let comments: Array<Comment> = [];
        if(data._embedded){
            let preComments: Array<any> = data._embedded.comments;
            for(let x in preComments){
                comments.push(preComments[x].content);
            }
            comments = this.commentsSortService.sortComments(comments);
            console.log("po sortowaniu");
            console.log(comments);
        } else {
            let comments = [];
        }
        console.log("zaraz SET_COMMENTS");
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
        console.log("SEND_COMMENT");
        console.log(action);
        console.log(state1);
        console.log(state2);
        action.payload.site = DataType[state2.commentData.site];
        action.payload.entity = state2.commentData.entity;
        action.payload.entrance = state1.entrance_id;
        console.log("before sending comment");
        console.log(action.payload);
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
        console.log("przyszła odpowiedź po store comment");
        console.log(data);
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
        console.log("przyszła odpowiedź po delete");
        console.log(data);
        return {
            type: CommentsActions.FETCH_COMMENTS
        };
    });

@Effect()
fetchComment = this.actions$.ofType(CommentsActions.FETCH_COMMENT)
    .switchMap((action: CommentsActions.FetchComment) => {
        console.log("inside FETCH_COMMENT");
        console.log(action.payload);
        return this.httpClient.get<any>('/api/comments/' + action.payload, {
            observe: 'body',
            responseType: 'json'
        });
    })
    .map(
      (data) => {
        console.log("comment arrived!");
        console.log(data);
        console.log("zaraz SET_COMMENT");
        return {
            type: CommentsActions.SET_COMMENT,
            payload: data.content
        };
      }
    );


}

