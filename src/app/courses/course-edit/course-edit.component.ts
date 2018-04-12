import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromCourses from './../store/courses.reducers';
import * as CoursesActions from './../store/courses.actions';
import { Course } from './../course.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
    @Input() course: Course;
    @ViewChild('secretPassword') secretPassword: ElementRef;
    courseForm: FormGroup;
    newCourse: boolean;
    authenticated: boolean = false;
    password: string = '';
    toggleDelete: boolean = false;
    deletePossible: boolean = false;
    
    constructor(private store: Store<fromCourses.CoursesState>, private router: Router) { }
    
    ngOnInit() {
        this.store.select('auth').subscribe(
            (authState: fromAuth.State) => {
                this.authenticated = authState.authenticated;
                this.password = authState.principal.password;
            }
        );
        if(!this.course){
            console.log("newCourse");
            this.newCourse = true;
        } else {
            console.log("!newCourse");
            this.newCourse = false;
        }
        this.initForm();   
    }

    initForm(){
        let path: string = null;
        let name: string = null;
        let author: string = null;
        let descriptionPl: string = null;
        let descriptionEn: string = null;
        let rating: number = null;
        let imagePath: string = null;
        let link: string = null;
        let lengthInHours: number = null;
        let posted: string = null;
        let lastUpdate: string = null;
        let commentsAvailable: boolean = true;
        
        let date = new Date().toISOString();
        let index = date.indexOf('T');
        let today = date.substr(0,index);
        let haveRead: string = today;
    
        if(this.course){
            path = this.course.path;
            name = this.course.name;
            author = this.course.author;
            descriptionPl = this.course.descriptionPl;
            descriptionEn = this.course.descriptionEn;
            rating = this.course.rating;
            imagePath = this.course.imagePath;
            link = this.course.link;
            lengthInHours = this.course.lengthInHours;
            haveRead = this.course.haveRead;
            posted = this.course.posted;
            lastUpdate = this.course.lastUpdate;
            commentsAvailable = this.course.commentsAvailable;        
        }
        this.courseForm = new FormGroup({
            'path': new FormControl(path, Validators.required),
            'name': new FormControl(name, Validators.required),
            'author': new FormControl(author, Validators.required),
            'descriptionPl': new FormControl(descriptionPl, Validators.required),
            'descriptionEn': new FormControl(descriptionEn, Validators.required),
            'rating': new FormControl(rating),
            'imagePath': new FormControl(imagePath, Validators.required),
            'link': new FormControl(link, Validators.required),
            'lengthInHours': new FormControl(lengthInHours),
            'haveRead': new FormControl(haveRead, Validators.required),
            'posted': new FormControl(posted),
            'lastUpdate': new FormControl(lastUpdate),
            'commentsAvailable': new FormControl(commentsAvailable)
        });            
    }
    
    onSubmit(){
        let course: Course;
        let id: number = null;
        if(this.course){
            id = this.course.id;
        }
        course = {
            ...this.courseForm.value,
            id: id
        }
        this.store.dispatch(new CoursesActions.StoreCourse(course));
        this.router.navigate(['/courses']);
    }
    
    checkPassword(){
        console.log(this.authenticated, this.newCourse, this.password, this.secretPassword.nativeElement.value);
        if(this.authenticated && !this.newCourse){
            if(this.password === this.secretPassword.nativeElement.value){
                this.deletePossible = true;
                console.log("deletePossible");
            }
        }
    }
    
    deleteCourse(){
        if(this.authenticated && !this.newCourse){
            this.store.dispatch(new CoursesActions.DeleteCourse(this.course.id));
            this.router.navigate(['/courses']);            
        }
    }
}