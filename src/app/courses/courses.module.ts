import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { CoursesStartComponent } from './courses-start/courses-start.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseTagsComponent } from './course-edit/course-tags/course-tags.component';
import { coursesReducer } from './store/courses.reducers';
import { CoursesEffects } from './store/courses.effects';
import { SharedModule } from './../shared/shared.module';
import { TagsModule } from './../tags/tags.module';
import { CommentsModule } from './../comments/comments.module';

@NgModule({
    declarations: [
        CoursesComponent,
        CourseComponent,
        CoursesStartComponent,
        CourseEditComponent,
        CourseTagsComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        CoursesRoutingModule,
        TagsModule,
        CommentsModule,    
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forFeature('courses', coursesReducer),
        EffectsModule.forFeature([CoursesEffects])

    ]
})
export class CoursesModule{

}