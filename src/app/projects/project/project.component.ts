import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromProjects from './../store/projects.reducers';
import * as ProjectsActions from './../store/projects.actions';
import * as MainActions from './../../shared/store/main.actions';
import { Project } from './../project.model';
import { LanguageService } from './../../shared/services/language.service';
import { LinkType } from './../../shared/model/link-type.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
    path: string;
    projectsState: Observable<fromProjects.State>;
    authState: Observable<fromAuth.State>;
    project: Project;
    projectEdit: boolean = false;
    
    constructor(private store: Store<fromProjects.ProjectsState>, private route: ActivatedRoute, private languageService: LanguageService) { }

    ngOnInit() {
        this.projectsState = this.store.select('projects');
        this.authState = this.store.select('auth');
        this.route.params.subscribe(
            (params: Params) => {
                this.path = params['projectPath'];    
                console.log("projectPath: ", this.path);
                this.store.dispatch(new ProjectsActions.FetchProject(this.path));
            }
        );
    }
    
    websiteClicked(){
        const linkType: string = LinkType[LinkType.WEBSITE];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
    }

    githubClicked(){
        const linkType: string = LinkType[LinkType.GITHUB];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
    }
    
    downloadClicked(){
        const linkType: string = LinkType[LinkType.DOWNLOAD];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
    }
    
    isPolish(){
        if(this.languageService.getLanguage() === 'pl'){
            return true;
        }
        return false;
    }
}