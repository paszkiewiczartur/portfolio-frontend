import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import * as fromApp from './../store/app.reducers';
import * as fromComments from './store/comments.reducers';
import * as CommentsActions from './store/comments.actions';
import { CommentForm } from './comment-form.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    commentsState: Observable<fromComments.State>;
    commentForm: FormGroup;
    
    
    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {        
        this.commentsState = this.store.select('comments');
        this.initForm();
    }
    
    private initForm(){
        this.commentForm = new FormGroup({
            'email': new FormControl(null, Validators.email),
            'nickname': new FormControl(null, Validators.required),
            'content': new FormControl(null, Validators.required)
        });            
    }
    
    onSubmit(){
        let commentForm: CommentForm = {
            ...this.commentForm.value,
            parent: null,
            site: null,
            entity: null,
            entrance: null
        }   
        this.store.dispatch(new CommentsActions.LeaveComment(commentForm));
    }

}
