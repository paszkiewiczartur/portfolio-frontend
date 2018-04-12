import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Draft } from './../shared/model/draft.model';
import * as fromAuth from './../auth/store/auth.reducers';
import * as fromCourses from './store/courses.reducers';
import * as CoursesActions from './store/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
    coursesState: Observable<fromCourses.State>;
    authState: Observable<fromAuth.State>;
    menuEdit: boolean = false;
    courses: Array<Draft>;
   
    constructor(private store: Store<fromCourses.CoursesState>) { }

    ngOnInit() {
        this.coursesState = this.store.select('courses');
        this.authState = this.store.select('auth');
        this.store.dispatch(new CoursesActions.FetchCourses());
        console.log("Po fetchCourses");
        this.store.select('courses').subscribe(
            (coursesState: fromCourses.State) => {
                if(coursesState.courses){
                    this.courses = coursesState.courses.slice();
                    console.log("pobrano");
                }
            }
        );
    }
    
    entityUp(index: number){
        console.log("indexUp", index);
        this.courses[index].sequence = this.courses[index].sequence - 1;
        this.courses[index-1].sequence = this.courses[index-1].sequence + 1;
        let course: Draft = JSON.parse(JSON.stringify(this.courses[index]));
        this.courses.splice(index, 1);
        this.courses.splice(index - 1, 0, course);
    }

    entityDown(index: number){
        console.log("indexDown", index);
        this.courses[index+1].sequence = this.courses[index+1].sequence - 1;
        this.courses[index].sequence = this.courses[index].sequence + 1;
        let course: Draft = JSON.parse(JSON.stringify(this.courses[index]));
        this.courses.splice(index, 1);
        this.courses.splice(index + 1, 0, course);
    }

    save(){
        this.store.dispatch(new CoursesActions.StoreCoursesOrder(this.courses));
    }

}
