import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromProjects from './../store/projects.reducers';

@Component({
  selector: 'app-projects-start',
  templateUrl: './projects-start.component.html',
  styleUrls: ['./projects-start.component.css']
})
export class ProjectsStartComponent implements OnInit {
    authState: Observable<fromAuth.State>;
    projectEdit: boolean = false;
    project1: string;
    project2: string;
    project3: string;
    
    constructor(private store: Store<fromProjects.ProjectsState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
        this.store.select('projects').subscribe(
            (projectsState: fromProjects.State) => {
                if(projectsState.projects){
                    let projects = projectsState.projects.slice();
                    console.log("projects");
                    console.log(projects);
                    console.log(projectsState);
                    projects.sort(function(a, b){return 0.5 - Math.random()});
                    if(projects[0])
                        this.project1 = projects[0].image;
                    if(projects[1])
                        this.project2 = projects[1].image;
                    if(projects[2])
                        this.project3 = projects[2].image;
                    console.log(this.project1);
                }
            }
        );

    }

}