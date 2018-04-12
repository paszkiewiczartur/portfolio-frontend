import * as CoursesActions from './courses.actions';
import * as fromApp from '../../store/app.reducers';
import { Course } from './../course.model';
import { Draft } from './../../shared/model/draft.model';
import { Tag } from './../../shared/model/tag.model';

export interface CoursesState extends fromApp.AppState {
  courses: State
}

export interface State {
  course: Course;
  courses: Array<Draft>;
  courseTags: Array<Tag>;
  fetchCourseFail: any;
}

const initialState: State = {
    course: null,
    courses: null,
    courseTags: null,
    fetchCourseFail: null
};

export function coursesReducer(state = initialState, action: CoursesActions.CoursesActions) {
  switch (action.type) {
    case (CoursesActions.SET_COURSE):
      return {
        ...state,
        course: action.payload
      };
    case (CoursesActions.SET_COURSES):
      return {
        ...state,
        courses: [...action.payload]
      };
    case (CoursesActions.SET_COURSE_TAGS):
      return {
        ...state,
        courseTags: [...action.payload]
      };
    case (CoursesActions.FETCH_COURSE_FAIL):
      return {
        ...state,
        fetchCourseFail: action.payload
      };
    default:
      return state;
  }
}
