import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsStartComponent } from './projects-start/projects-start.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectTagsComponent } from './project-edit/project-tags/project-tags.component';
import { projectsReducer } from './store/projects.reducers';
import { ProjectsEffects } from './store/projects.effects';
import { SharedModule } from './../shared/shared.module';
import { TagsModule } from './../tags/tags.module';
import { CommentsModule } from './../comments/comments.module';


@NgModule({
    declarations: [
        ProjectsComponent,
        ProjectComponent,
        ProjectsStartComponent,
        ProjectEditComponent,
        ProjectTagsComponent
    ],
    imports: [
        TagsModule,
        CommentsModule,    
        FormsModule,
        SharedModule,
        CommonModule,
        ProjectsRoutingModule,
        ReactiveFormsModule,
        StoreModule.forFeature('projects', projectsReducer),
        EffectsModule.forFeature([ProjectsEffects])
    ]
})
export class ProjectsModule{

}