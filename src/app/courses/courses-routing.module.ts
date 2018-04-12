import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesStartComponent } from './courses-start/courses-start.component';

const coursesRoutes: Routes = [
    { path: '', component: CoursesComponent, children: [
        { path: '', component: CoursesStartComponent, pathMatch: 'full'},
        { path: ':coursePath', component: CourseComponent},
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(coursesRoutes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule{

}