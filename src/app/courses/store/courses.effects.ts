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
import * as CoursesActions from './courses.actions';
import * as fromCourses from './courses.reducers';
import { Course } from './../course.model';
import { Draft } from './../../shared/model/draft.model';
import { LinkRequestType } from './../../shared/model/link-request-type.model';
import { DataType } from './../../shared/model/data-type.model';
import { EntitySortService } from './../../shared/services/entity-sorting.service';

@Injectable()
export class CoursesEffects {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromCourses.CoursesState>,
              private entitySortService: EntitySortService) {}

@Effect()
  courseFetch = this.actions$
    .ofType(CoursesActions.FETCH_COURSE)
    .switchMap((action: CoursesActions.FetchCourse) => {
      return this.httpClient.get<Course>('/api/courses/search/findByPath?coursePath=' + action.payload, {
        observe: 'body',
        responseType: 'json'
      })
      .switchMap(
        (course) => {
            console.log("Loguję coursea");
            console.log(course);
            let commentData: LinkRequestType = {
                site: DataType.Course,
                entity: course.id
            }
          return [{
                type: CoursesActions.SET_COURSE,
                payload: course
            },
            {
                type: CommentsActions.SET_COMMENT_DATA,
                payload: commentData
            },
            {
                type: MainActions.FETCH_LINKS,
                payload: {
                    site: DataType.Course,
                    entity: course.id
                }
            },
            {
                type: CoursesActions.FETCH_COURSE_TAGS,
                payload: course.id
            }
            ];
        }
      )        
        .catch(err => {
            console.log("ERROR!");
              return Observable.of({ type: CoursesActions.FETCH_COURSE_FAIL, payload: err });
        });
    });

@Effect()
  coursesFetch = this.actions$
    .ofType(CoursesActions.FETCH_COURSES)
    .switchMap((action: CoursesActions.FetchCourses) => {
      return this.httpClient.get<Array<Draft>>('/api/getCourses', {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map((courses) => {
        console.log("before sorting");
        console.log(courses)
        this.entitySortService.sort(courses);
        console.log("after sorting");
        console.log(courses)
      return {
        type: CoursesActions.SET_COURSES,
        payload: courses
      };
    });

@Effect()
  storeCoursesOrder = this.actions$
    .ofType(CoursesActions.STORE_COURSES_ORDER)
    .switchMap((action: CoursesActions.StoreCoursesOrder) => {
      return this.httpClient.post('/api/setCoursesOrder', action.payload, {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map((courses) => {
        console.log("Zaraz Fetch_Courses");
      return {
        type: CoursesActions.FETCH_COURSES
      };
    });

@Effect()
  storeCourse = this.actions$
    .ofType(CoursesActions.STORE_COURSE)
    .switchMap((action: CoursesActions.StoreCourse) => {
        console.log("prepare to send Course");
        console.log(action.payload);
      return this.httpClient.post('/api/courses', action.payload, {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((data) => {
        console.log("data after post course:");
        console.log(data);
      return {
            type: CoursesActions.FETCH_COURSES
            };
        /*{
            type: MainActions.SET_COMMENTS,
            payload: new Array()
        }
      ];*/
    });

@Effect()
  deleteCourse = this.actions$
    .ofType(CoursesActions.DELETE_COURSE)
    .switchMap((action: CoursesActions.DeleteCourse) => {
      return this.httpClient.delete('/api/courses/' + action.payload, {
        observe: 'body',
        responseType: 'json'
      })
    })
    .switchMap((data) => {
        console.log("data after delete course:");
        console.log(data);
      return [
        {
        type: CoursesActions.FETCH_COURSES
        },
        {
            type: CommentsActions.SET_COMMENTS,
            payload: new Array()
        }
      ];
    });

@Effect()
fetchCourseTags = this.actions$
    .ofType(CoursesActions.FETCH_COURSE_TAGS)
    .switchMap((action: CoursesActions.FetchCourseTags) => {
      return this.httpClient.get<any>('/api/courses/' + action.payload + '/tags', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((data) => {
        console.log("data after fetch course tags:");
        console.log(data);
      return {
            type: CoursesActions.SET_COURSE_TAGS,
            payload: data._embedded.tags
        };
    });
}