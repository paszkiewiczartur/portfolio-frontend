import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromProjects from './../store/projects.reducers';
import * as ProjectsActions from './../store/projects.actions';
import { Project } from './../project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
    @Input() project: Project;
    @ViewChild('secretPassword') secretPassword: ElementRef;
    projectForm: FormGroup;
    newProject: boolean;
    authenticated: boolean = false;
    password: string = '';
    toggleDelete: boolean = false;
    deletePossible: boolean = false;
    
    constructor(private store: Store<fromProjects.ProjectsState>, private router: Router) { }
    
    ngOnInit() {
        this.store.select('auth').subscribe(
            (authState: fromAuth.State) => {
                this.authenticated = authState.authenticated;
                this.password = authState.principal.password;
            }
        );
        if(!this.project){
            this.newProject = true;
        } else {
            this.newProject = false;
        }
        this.initForm();   
    }

    initForm(){
        let path: string = null;
        let name: string = null;
        let nameLong: string = null;
        let descriptionPl: string = null;
        let descriptionEn: string = null;
        let imagePath: string = null;
        let githubLink: string = null;
        let link: string = null;
        let linkToDownload: string = null;
        let lengthPl: string = null;
        let lengthEn: string = null;
        let posted: string = null;
        let lastUpdate: string = null;
        let commentsAvailable: boolean = true;
        
        let date = new Date().toISOString();
        let index = date.indexOf('T');
        let today = date.substr(0,index);
        let workStarted: string = today;
    
        if(this.project){
            path = this.project.path;
            name = this.project.name;
            nameLong = this.project.nameLong;
            descriptionPl = this.project.descriptionPl;
            descriptionEn = this.project.descriptionEn;
            imagePath = this.project.imagePath;
            githubLink = this.project.githubLink;
            link = this.project.link;
            linkToDownload = this.project.linkToDownload;
            lengthPl = this.project.lengthPl;
            lengthEn = this.project.lengthEn;
            workStarted = this.project.workStarted;
            posted = this.project.posted;
            lastUpdate = this.project.lastUpdate;
            commentsAvailable = this.project.commentsAvailable;        
        }
        this.projectForm = new FormGroup({
            'path': new FormControl(path, Validators.required),
            'name': new FormControl(name, Validators.required),
            'nameLong': new FormControl(nameLong),
            'descriptionPl': new FormControl(descriptionPl, Validators.required),
            'descriptionEn': new FormControl(descriptionEn, Validators.required),
            'imagePath': new FormControl(imagePath, Validators.required),
            'githubLink': new FormControl(githubLink, Validators.required),
            'link': new FormControl(link),
            'linkToDownload': new FormControl(linkToDownload),
            'lengthPl': new FormControl(lengthPl, Validators.required),
            'lengthEn': new FormControl(lengthEn, Validators.required),
            'workStarted': new FormControl(workStarted, Validators.required),
            'posted': new FormControl(posted),
            'lastUpdate': new FormControl(lastUpdate),
            'commentsAvailable': new FormControl(commentsAvailable)
        });            
    }
    
    onSubmit(){
        let project: Project;
        let id: number = null;
        if(this.project){
            id = this.project.id;
        }
        project = {
            ...this.projectForm.value,
            id: id
        }
        this.store.dispatch(new ProjectsActions.StoreProject(project));
        this.router.navigate(['/projects']);
    }
    
    checkPassword(){
        if(this.authenticated && !this.newProject){
            if(this.password === this.secretPassword.nativeElement.value){
                this.deletePossible = true;
            }
        }
    }
    
    deleteProject(){
        if(this.authenticated && !this.newProject){
            this.store.dispatch(new ProjectsActions.DeleteProject(this.project.id));
            this.router.navigate(['/projects']);            
        }
    }
}