import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromCourses from './../store/courses.reducers';
import * as CoursesActions from './../store/courses.actions';
import * as MainActions from './../../shared/store/main.actions';
import { Course } from './../course.model';
import { LanguageService } from './../../shared/services/language.service';
import { LinkType } from './../../shared/model/link-type.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    path: string;
    coursesState: Observable<fromCourses.State>;
    authState: Observable<fromAuth.State>;
    course: Course;
    courseEdit: boolean = false;
    
    constructor(private store: Store<fromCourses.CoursesState>, private route: ActivatedRoute, private languageService: LanguageService) { }

    ngOnInit() {
        this.coursesState = this.store.select('courses');
        this.authState = this.store.select('auth');
        this.route.params.subscribe(
            (params: Params) => {
                this.path = params['coursePath'];    
                this.store.dispatch(new CoursesActions.FetchCourse(this.path));
            }
        );
        /*this.store.select('courses').subscribe(
            (coursesState: fromCourses.State) => {
                if(coursesState.course && !coursesState.courseTags){
                    this.store.dispatch(new CoursesActions.FetchCourseTags(coursesState.course.id));                
                }
            }
        );*/

    }
    
    websiteClicked(){
        const linkType: string = LinkType[LinkType.WEBSITE];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
    }
    
    isPolish(){
        if(this.languageService.getLanguage() === 'pl'){
            return true;
        }
        return false;
    }
}