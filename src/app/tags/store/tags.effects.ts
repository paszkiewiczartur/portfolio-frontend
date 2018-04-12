import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/observable/combineLatest';
import 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/do';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import * as MainActions from './../../shared/store/main.actions';
import * as TagsActions from './tags.actions';
import * as fromTags from './tags.reducers';
import { Tag } from './../../shared/model/tag.model';
import { DataType } from './../../shared/model/data-type.model';
import { Project } from './../../projects/project.model';
import { Course } from './../../courses/course.model';
import { Book } from './../../books/book.model';

@Injectable()
export class TagsEffects {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

@Effect()
fetchTag = this.actions$
    .ofType(TagsActions.FETCH_TAG)
    .switchMap((action: TagsActions.FetchTag) => {
      return this.httpClient.get<Tag>('/api/tags/search/findByPath?tagPath=' + action.payload, {
        observe: 'body',
        responseType: 'json'
      })
      .switchMap(
        (tag) => {
            console.log("Loguję tag");
            console.log(tag);
          return [{
                type: TagsActions.SET_TAG,
                payload: tag
            },
            {
                type: TagsActions.FETCH_TAG_CONTENT,
                payload: tag.id
            },
            {
                type: MainActions.FETCH_LINKS,
                payload: {
                    site: DataType.Tag,
                    entity: tag.id
                }
            }
            ];
        }
      ).catch(err => {
            console.log("FETCH_TAG_FAIL ERROR!");
              return Observable.of({type: TagsActions.FETCH_TAG_FAIL, payload: err});
        });
    });


@Effect()
  fetchTags = this.actions$
    .ofType(TagsActions.FETCH_TAGS)
    .switchMap((action: TagsActions.FetchTags) => {
        console.log("inside fetch tags");
      return this.httpClient.get<Array<Tag>>('/api/getTags', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map(
      (tags) => {
      console.log("przyszły tagi");
      console.log(tags)
        return {
          type: TagsActions.SET_TAGS,
          payload: tags
        };
      }
    );

@Effect()
  storeTag = this.actions$
    .ofType(TagsActions.STORE_TAG)
    .switchMap((action: TagsActions.StoreTag) => {
        console.log("prepare to send tag");
        console.log(action.payload);
      return this.httpClient.post('/api/tags', action.payload, {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((data) => {
        console.log("data after post tag:");
        console.log(data);
      return {
            type: TagsActions.FETCH_TAGS
        };
    });

@Effect()
  deleteTag = this.actions$
    .ofType(TagsActions.DELETE_TAG)
    .switchMap((action: TagsActions.DeleteTag) => {
      return this.httpClient.delete('/api/tags/' + action.payload, {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((data) => {
        console.log("data after delete tag:");
        console.log(data);
      return{
            type: TagsActions.FETCH_TAGS
        };
    });

@Effect()
fetchTagContent = this.actions$
    .ofType(TagsActions.FETCH_TAG_CONTENT)
    .switchMap((action: TagsActions.FetchTagContent) => {
        const observables = new Array();
        observables.push(
            this.httpClient.get<any>('/api/tags/' + action.payload + '/projects', {
                observe: 'body',
                responseType: 'json'
            }));
        observables.push(
            this.httpClient.get<any>('/api/tags/' + action.payload + '/courses', {
                observe: 'body',
                responseType: 'json'
            }));
        observables.push(
            this.httpClient.get<any>('/api/tags/' + action.payload + '/books', {
                observe: 'body',
                responseType: 'json'
            }));
    
        return Observable.forkJoin(observables)
            .switchMap((data: any) => {
        console.log("przyszedł TAG_CONTENT");
        console.log(data);
        let tagContent:{projects:Array<Project>; courses:Array<Course>; books:Array<Book>;} = {
            projects: null,
            courses: null,
            books: null
        };
        for(let tagArray of data){
            if(tagArray._embedded.projects)
                tagContent.projects = tagArray._embedded.projects;
            if(tagArray._embedded.courses)
                tagContent.courses = tagArray._embedded.courses;
            if(tagArray._embedded.books)
                tagContent.books = tagArray._embedded.books;
        }
      return Observable.of({
            type: TagsActions.SET_TAG_CONTENT,
            payload: tagContent
        });
      })
    });
    
@Effect({dispatch: false})
addTagRelation = this.actions$
    .ofType(TagsActions.ADD_TAG_RELATION)
    .switchMap((action: TagsActions.AddTagRelation) => {
      return this.httpClient.post('/api/tags/saveRelation', action.payload, {
        observe: 'body',
        responseType: 'json'
      });       
    });

@Effect({dispatch: false})
deleteTagRelation = this.actions$
    .ofType(TagsActions.DELETE_TAG_RELATION)
    .switchMap((action: TagsActions.DeleteTagRelation) => {
      return this.httpClient.post('/api/tags/deleteRelation', action.payload, {
        observe: 'body',
        responseType: 'json'
      });        
    });
}
