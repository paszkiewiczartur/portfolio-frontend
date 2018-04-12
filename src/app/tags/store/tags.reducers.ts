import * as TagsActions from './tags.actions';
import { Tag } from './../../shared/model/tag.model';
import { Project } from './../../projects/project.model';
import { Course } from './../../courses/course.model';
import { Book } from './../../books/book.model';

export interface State {
    tags: Array<Tag>;
    tag: Tag;
    tagContent: TagsActions.TagContent;
    fetchTagFail: any;
}

const initialState: State = {
    tags: null,
    tag: null,
    tagContent: null,
    fetchTagFail: null
};


export function tagsReducer(state = initialState, action: TagsActions.TagsActions) {
  switch (action.type) {
    case (TagsActions.SET_TAGS):
        console.log("inside SET_TAGS");
      return {
        ...state,
        tags: action.payload
    }
    case (TagsActions.SET_TAG):
      return {
        ...state,
        tag: action.payload
    }
    case (TagsActions.SET_TAG_CONTENT):
      return {
        ...state,
        tagContent: action.payload
    }
    case (TagsActions.FETCH_TAG_FAIL):
      return {
        ...state,
        fetchTagFail: action.payload
      }
    default:
      return state;
  }
}
