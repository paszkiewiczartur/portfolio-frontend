import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as MainActions from './../../shared/store/main.actions';
import * as CommentsActions from './../../comments/store/comments.actions';
import * as ProjectsActions from './projects.actions';
import * as fromProjects from './projects.reducers';
import { Project } from './../project.model';
import { Draft } from './../../shared/model/draft.model';
import { LinkRequestType } from './../../shared/model/link-request-type.model';
import { DataType } from './../../shared/model/data-type.model';
import { EntitySortService } from './../../shared/services/entity-sorting.service';

@Injectable()
export class ProjectsEffects {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromProjects.ProjectsState>,
              private entitySortService: EntitySortService) {}

@Effect()
  projectFetch = this.actions$
    .ofType(ProjectsActions.FETCH_PROJECT)
    .switchMap((action: ProjectsActions.FetchProject) => {
        console.log(action.payload);
      return this.httpClient.get<Project>('/api/projects/search/findByPath?projectPath=' + action.payload, {
        observe: 'body',
        responseType: 'json'
      })
      .switchMap(
        (project) => {
            let commentData: LinkRequestType = {
                site: DataType.Project,
                entity: project.id
            }
          return [{
                type: ProjectsActions.SET_PROJECT,
                payload: project
            },
            {
                type: CommentsActions.SET_COMMENT_DATA,
                payload: commentData
            },
            {
                type: MainActions.FETCH_LINKS,
                payload: {
                    site: DataType.Project,
                    entity: project.id
                }
            },
            {
                type:ProjectsActions.FETCH_PROJECT_TAGS,
                payload: project.id
            }
            ];
        }
      )        
        .catch(err => {
              return Observable.of({ type: ProjectsActions.FETCH_PROJECT_FAIL, payload: err });
        });
    });

@Effect()
  projectsFetch = this.actions$
    .ofType(ProjectsActions.FETCH_PROJECTS)
    .switchMap((action: ProjectsActions.FetchProjects) => {
      return this.httpClient.get<Array<Draft>>('/api/getProjects', {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map((projects) => {
        this.entitySortService.sort(projects);
      return {
        type: ProjectsActions.SET_PROJECTS,
        payload: projects
      };
    });

@Effect()
  storeProjectsOrder = this.actions$
    .ofType(ProjectsActions.STORE_PROJECTS_ORDER)
    .switchMap((action: ProjectsActions.StoreProjectsOrder) => {
      return this.httpClient.post('/api/setProjectsOrder', action.payload, {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map((projects) => {
      return {
        type: ProjectsActions.FETCH_PROJECTS
      };
    });

@Effect()
  storeProject = this.actions$
    .ofType(ProjectsActions.STORE_PROJECT)
    .switchMap((action: ProjectsActions.StoreProject) => {
      return this.httpClient.post('/api/projects', action.payload, {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((data) => {
      return {
                type: ProjectsActions.FETCH_PROJECTS
            };
    });

@Effect()
  deleteProject = this.actions$
    .ofType(ProjectsActions.DELETE_PROJECT)
    .switchMap((action: ProjectsActions.DeleteProject) => {
      return this.httpClient.delete('/api/projects/' + action.payload, {
        observe: 'body',
        responseType: 'json'
      })
    })
    .switchMap((data) => {
      return [
        {
            type: ProjectsActions.FETCH_PROJECTS
        },
        {
            type: CommentsActions.SET_COMMENTS,
            payload: new Array()
        }
      ];
    });

@Effect()
fetchProjectTags = this.actions$
    .ofType(ProjectsActions.FETCH_PROJECT_TAGS)
    .switchMap((action: ProjectsActions.FetchProjectTags) => {
      return this.httpClient.get<any>('/api/projects/' + action.payload + '/tags', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((data) => {
      return {
            type: ProjectsActions.SET_PROJECT_TAGS,
            payload: data._embedded.tags
        };
    });

}
