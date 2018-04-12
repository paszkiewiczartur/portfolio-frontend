import * as ProjectsActions from './projects.actions';
import * as fromApp from '../../store/app.reducers';
import { Project } from './../project.model';
import { Draft } from './../../shared/model/draft.model';
import { Tag } from './../../shared/model/tag.model';

export interface ProjectsState extends fromApp.AppState {
  projects: State
}

export interface State {
  project: Project;
  projects: Array<Draft>;
  projectTags: Array<Tag>;
  fetchProjectFail: any;
}

const initialState: State = {
    project: null,
    projects: null,
    projectTags: null,
    fetchProjectFail: null
};

export function projectsReducer(state = initialState, action: ProjectsActions.ProjectsActions) {
  switch (action.type) {
    case (ProjectsActions.SET_PROJECT):
      return {
        ...state,
        project: action.payload
      };
    case (ProjectsActions.SET_PROJECTS):
      return {
        ...state,
        projects: [...action.payload]
      };
    case (ProjectsActions.SET_PROJECT_TAGS):
      return {
        ...state,
        projectTags: [...action.payload]
      };
    case (ProjectsActions.FETCH_PROJECT_FAIL):
      return {
        ...state,
        fetchProjectFail: action.payload
      };
    default:
      return state;
  }
}
