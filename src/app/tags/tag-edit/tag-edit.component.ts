import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromApp from '../../store/app.reducers';
import * as fromTags from './../store/tags.reducers';
import * as TagsActions from './../store/tags.actions';
import { Tag } from './../../shared/model/tag.model';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {
    @Input() tag: Tag;
    @ViewChild('secretPassword') secretPassword: ElementRef;
    tagForm: FormGroup;
    newTag: boolean;
    authenticated: boolean = false;
    password: string = '';
    toggleDelete: boolean = false;
    deletePossible: boolean = false;

    constructor(private store: Store<fromApp.AppState>, private router: Router) { }
    ngOnInit() {
        this.store.select('auth').subscribe(
            (authState: fromAuth.State) => {
                this.authenticated = authState.authenticated;
                this.password = authState.principal.password;
            }
        );
        if(!this.tag){
            console.log("newTag");
            this.newTag = true;
        } else {
            console.log("!newTag");
            this.newTag = false;
        }
        this.initForm();   
    }

    initForm(){
        let path: string = null;
        let name: string = null;
        let nameEn: string = null;
        let amount: number = null;
        let added: string = null;
        if(this.tag){
            path = this.tag.path;
            name = this.tag.name;
            nameEn = this.tag.nameEn;
            amount = this.tag.amount;
            added = this.tag.added;
        }
        this.tagForm = new FormGroup({
            'path': new FormControl(path, Validators.required),
            'name': new FormControl(name, Validators.required),
            'nameEn': new FormControl(nameEn, Validators.required),
            'amount': new FormControl(amount),
            'added': new FormControl(added)
        });            
    }
    
    onSubmit(){
        let tag: Tag;
        let id: number = null;
        if(this.tag){
            id = this.tag.id;
        }
        tag = {
            ...this.tagForm.value,
            id: id
        }
        this.store.dispatch(new TagsActions.StoreTag(tag));
        if(!this.newTag){
            this.router.navigate(['/tags']);
        } else {
            this.router.navigate(['/']);
        }
    }
    
    checkPassword(){
        if(this.authenticated && !this.newTag){
            if(this.password === this.secretPassword.nativeElement.value){
                this.deletePossible = true;
            }
        }
    }
    
    deleteTag(){
        if(this.authenticated && !this.newTag){
            this.store.dispatch(new TagsActions.DeleteTag(this.tag.id));
            this.router.navigate(['/tags']);            
        }
    }
}
