import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Draft } from './../shared/model/draft.model';
import * as fromAuth from './../auth/store/auth.reducers';
import * as fromProjects from './store/projects.reducers';
import * as ProjectsActions from './store/projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projectsState: Observable<fromProjects.State>;
    authState: Observable<fromAuth.State>;
    menuEdit: boolean = false;
    projects: Array<Draft>;
   
    constructor(private store: Store<fromProjects.ProjectsState>) { }

    ngOnInit() {
        this.projectsState = this.store.select('projects');
        this.authState = this.store.select('auth');
        this.store.dispatch(new ProjectsActions.FetchProjects());
        this.store.select('projects').subscribe(
            (projectsState: fromProjects.State) => {
                if(projectsState.projects){
                    this.projects = projectsState.projects.slice();
                }
            }
        );
    }
    
    entityUp(index: number){
        this.projects[index].sequence = this.projects[index].sequence - 1;
        this.projects[index-1].sequence = this.projects[index-1].sequence + 1;
        let project: Draft = JSON.parse(JSON.stringify(this.projects[index]));
        this.projects.splice(index, 1);
        this.projects.splice(index - 1, 0, project);
    }

    entityDown(index: number){
        this.projects[index+1].sequence = this.projects[index+1].sequence - 1;
        this.projects[index].sequence = this.projects[index].sequence + 1;
        let project: Draft = JSON.parse(JSON.stringify(this.projects[index]));
        this.projects.splice(index, 1);
        this.projects.splice(index + 1, 0, project);
    }

    save(){
        this.store.dispatch(new ProjectsActions.StoreProjectsOrder(this.projects));
    }

}
