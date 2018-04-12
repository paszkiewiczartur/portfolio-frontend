import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromCourses from './../../store/courses.reducers';
import * as CoursesActions from './../../store/courses.actions';
import * as fromTags from './../../../tags/store/tags.reducers';
import * as TagsActions from './../../../tags/store/tags.actions';
import * as MainActions from './../../../shared/store/main.actions';
import { Tag } from './../../../shared/model/tag.model';
import { TagDTO } from './../../../shared/model/tagDTO.model';
import { DataType } from './../../../shared/model/data-type.model';

@Component({
  selector: 'app-course-tags',
  templateUrl: './course-tags.component.html',
  styleUrls: ['./course-tags.component.css']
})
export class CourseTagsComponent implements OnInit {
    @Input() entityId: number;
    tagsAdded: Array<Tag>;
    tagsState: Observable<fromTags.State>;
    tagRelationAdded: boolean;
    tagRelationDeleted: boolean;
    
    constructor(private store: Store<fromCourses.CoursesState>) { }
    
    ngOnInit() {
        this.store.dispatch(new TagsActions.FetchTags());
        this.store.select('courses').subscribe(
            (coursesState: fromCourses.State) => {
                this.tagsAdded = coursesState.courseTags;
            }
        );
        this.tagsState = this.store.select('tags');
    }
    
    isTagAdded(id: number){
        let found: boolean = false;
        if(this.tagsAdded){
            for(let tag of this.tagsAdded){
                if(tag.id === id){
                    found = true;
                    break;
                }
            }        
        }
        return found;
    }
    
    addTagRelation(id: number){
        const tagDTO: TagDTO = {
            entity: this.entityId,
            site: DataType[DataType.Course],
            tag: id
        }
        this.store.dispatch(new TagsActions.AddTagRelation(tagDTO));
        this.tagRelationAdded = true;
        let that = this;
        setTimeout(function(){
            that.store.dispatch(new CoursesActions.FetchCourseTags(that.entityId));
            that.tagRelationAdded = false;
        }, 2000);
    }
    
    deleteTagRelation(id: number){
        const tagDTO: TagDTO = {
            entity: this.entityId,
            site: DataType[DataType.Course],
            tag: id
        }
        this.store.dispatch(new TagsActions.DeleteTagRelation(tagDTO));
        this.tagRelationDeleted = true;
        let that = this;
        setTimeout(function(){
            that.store.dispatch(new CoursesActions.FetchCourseTags(that.entityId));
            that.tagRelationDeleted = false;
        }, 2000);
    }

}