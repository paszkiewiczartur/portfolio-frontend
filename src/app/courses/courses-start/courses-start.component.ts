import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromCourses from './../store/courses.reducers';

@Component({
  selector: 'app-courses-start',
  templateUrl: './courses-start.component.html',
  styleUrls: ['./courses-start.component.css']
})
export class CoursesStartComponent implements OnInit {
    authState: Observable<fromAuth.State>;
    courseEdit: boolean = false;
    course1: string;
    course2: string;
    course3: string;

    constructor(private store: Store<fromCourses.CoursesState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
        this.store.select('courses').subscribe(
            (coursesState: fromCourses.State) => {
                if(coursesState.courses){
                    let courses = coursesState.courses.slice();
                    courses.sort(function(a, b){return 0.5 - Math.random()});
                    if(courses[0])
                        this.course1 = courses[0].image;
                    if(courses[1])
                        this.course2 = courses[1].image;
                    if(courses[2])
                        this.course3 = courses[2].image;
                }
            }
        );
    }

}