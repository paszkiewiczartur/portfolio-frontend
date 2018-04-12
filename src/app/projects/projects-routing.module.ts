import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsStartComponent } from './projects-start/projects-start.component';
import { HomeComponent } from './../core/home/home.component';

const projectsRoutes: Routes = [
    { path: '', component: ProjectsComponent, children: [
        { path: '', component: ProjectsStartComponent, pathMatch: 'full'}, 
        { path: ':projectPath', component: ProjectComponent}
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(projectsRoutes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule{

}