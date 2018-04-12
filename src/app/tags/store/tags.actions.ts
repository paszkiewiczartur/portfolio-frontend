import { Action } from '@ngrx/store';

import { Tag } from './../../shared/model/tag.model';
import { TagDTO } from './../../shared/model/tagDTO.model';
import { Project } from '../../projects/project.model';
import { Course } from '../../courses/course.model';
import { Book } from '../../books/book.model';
 
export const FETCH_TAGS = 'FETCH_TAGS';
export const SET_TAGS = 'SET_TAGS';
export const FETCH_TAG = 'FETCH_TAG';
export const SET_TAG = 'SET_TAG';
export const FETCH_TAG_CONTENT = 'FETCH_TAG_CONTENT';
export const SET_TAG_CONTENT = 'SET_TAG_CONTENT';
export const STORE_TAG = 'STORE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const ADD_TAG_RELATION = 'ADD_TAG_RELATION';
export const DELETE_TAG_RELATION = 'DELETE_TAG_RELATION';
export const FETCH_TAG_FAIL = 'FETCH_TAG_FAIL';

export interface TagContent {
    projects: Array<Project>;
    courses: Array<Course>;
    books: Array<Book>;
}

export class FetchTags implements Action {
    readonly type = FETCH_TAGS;
}

export class SetTags implements Action {
  readonly type = SET_TAGS;
  constructor(public payload: Array<Tag>) {}
}

export class FetchTag implements Action {
    readonly type = FETCH_TAG;
    constructor(public payload: string){}
}

export class SetTag implements Action {
  readonly type = SET_TAG;
  constructor(public payload: Tag) {}
}

export class FetchTagContent implements Action {
    readonly type = FETCH_TAG_CONTENT;
    constructor(public payload: number){}
}

export class SetTagContent implements Action {
    readonly type = SET_TAG_CONTENT;
    constructor(public payload: TagContent){}
}

export class StoreTag implements Action {
    readonly type = STORE_TAG;
    constructor(public payload: Tag){}
}

export class DeleteTag implements Action {
  readonly type = DELETE_TAG;
  constructor(public payload: number) {}
}

export class AddTagRelation implements Action {
    readonly type = ADD_TAG_RELATION;
    constructor(public payload: TagDTO){}
}

export class DeleteTagRelation implements Action {
    readonly type = DELETE_TAG_RELATION;
    constructor(public payload: TagDTO){}
}

export class FetchTagFail implements Action {
    readonly type = FETCH_TAG_FAIL;
    constructor(public payload: any){}
}

export type TagsActions = 
    FetchTags | 
    SetTags | 
    FetchTag | 
    SetTag | 
    FetchTagContent | 
    SetTagContent |
    StoreTag |
    DeleteTag |
    AddTagRelation |
    DeleteTagRelation |
    FetchTagFail;
