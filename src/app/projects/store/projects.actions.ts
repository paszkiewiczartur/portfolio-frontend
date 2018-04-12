import { Action } from '@ngrx/store';

import { Project } from './../project.model';
import { Draft } from './../../shared/model/draft.model';
import { Tag } from './../../shared/model/tag.model';

export const FETCH_PROJECT = 'FETCH_PROJECT';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SET_PROJECT = 'SET_PROJECT';
export const SET_PROJECTS = 'SET_PROJECTS';
export const STORE_PROJECT = 'STORE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const FETCH_PROJECT_TAGS = 'FETCH_PROJECT_TAGS';
export const SET_PROJECT_TAGS = 'SET_PROJECT_TAGS';
export const FETCH_PROJECT_FAIL = 'FETCH_PROJECT_FAIL';
export const STORE_PROJECTS_ORDER = 'STORE_PROJECTS_ORDER';

export class FetchProject implements Action {
  readonly type = FETCH_PROJECT;
  constructor(public payload: string){}
}

export class FetchProjects implements Action {
  readonly type = FETCH_PROJECTS;
}

export class SetProject implements Action {
  readonly type = SET_PROJECT;
  constructor(public payload: Project) {}
}

export class SetProjects implements Action {
  readonly type = SET_PROJECTS;
  constructor(public payload: Array<Draft>) {}
}

export class StoreProject implements Action {
  readonly type = STORE_PROJECT;
  constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type = DELETE_PROJECT;
  constructor(public payload: number) {}
}

export class FetchProjectTags implements Action {
    readonly type = FETCH_PROJECT_TAGS;
    constructor(public payload: number){}
}

export class SetProjectTags implements Action {
    readonly type = SET_PROJECT_TAGS;
    constructor(public payload: Array<Tag>){}
}

export class FetchProjectFail implements Action {
  readonly type = FETCH_PROJECT_FAIL;
  constructor(public payload: any) {}
}

export class StoreProjectsOrder implements Action {
  readonly type = STORE_PROJECTS_ORDER;
  constructor(public payload: Array<Draft>) {}
}

export type ProjectsActions = 
    FetchProject |
    FetchProjects |
    SetProject |
    SetProjects |
    StoreProject |
    DeleteProject |
    FetchProjectTags |
    SetProjectTags |
    FetchProjectFail |
    StoreProjectsOrder;