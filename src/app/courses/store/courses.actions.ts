import { Action } from '@ngrx/store';

import { Course } from './../course.model';
import { Draft } from './../../shared/model/draft.model';
import { Tag } from './../../shared/model/tag.model';

export const FETCH_COURSE = 'FETCH_COURSE';
export const FETCH_COURSES = 'FETCH_COURSES';
export const SET_COURSE = 'SET_COURSE';
export const SET_COURSES = 'SET_COURSES';
export const STORE_COURSE = 'STORE_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const FETCH_COURSE_TAGS = 'FETCH_COURSE_TAGS';
export const SET_COURSE_TAGS = 'SET_COURSE_TAGS';
export const FETCH_COURSE_FAIL = 'FETCH_COURSE_FAIL';
export const STORE_COURSES_ORDER = 'STORE_COURSES_ORDER';

export class FetchCourse implements Action {
  readonly type = FETCH_COURSE;
  constructor(public payload: string){}
}

export class FetchCourses implements Action {
  readonly type = FETCH_COURSES;
}

export class SetCourse implements Action {
  readonly type = SET_COURSE;
  constructor(public payload: Course) {}
}

export class SetCourses implements Action {
  readonly type = SET_COURSES;
  constructor(public payload: Array<Draft>) {}
}

export class StoreCourse implements Action {
  readonly type = STORE_COURSE;
  constructor(public payload: Course) {}
}

export class DeleteCourse implements Action {
  readonly type = DELETE_COURSE;
  constructor(public payload: number) {}
}

export class FetchCourseTags implements Action {
    readonly type = FETCH_COURSE_TAGS;
    constructor(public payload: number){}
}

export class SetCourseTags implements Action {
    readonly type = SET_COURSE_TAGS;
    constructor(public payload: Array<Tag>){}
}

export class FetchCourseFail implements Action {
  readonly type = FETCH_COURSE_FAIL;
  constructor(public payload: any) {}
}

export class StoreCoursesOrder implements Action {
  readonly type = STORE_COURSES_ORDER;
  constructor(public payload: Array<Draft>) {}
}

export type CoursesActions = 
    FetchCourse |
    FetchCourses |
    SetCourse |
    SetCourses |
    StoreCourse |
    DeleteCourse |
    FetchCourseTags |
    SetCourseTags |
    FetchCourseFail |
    StoreCoursesOrder;