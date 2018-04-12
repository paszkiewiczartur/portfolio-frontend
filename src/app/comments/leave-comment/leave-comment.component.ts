import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import * as fromComments from './../store/comments.reducers';
import * as CommentsActions from './../store/comments.actions';
import { CommentForm } from './../comment-form.model';

@Component({
  selector: 'app-leave-comment',
  templateUrl: './leave-comment.component.html',
  styleUrls: ['./leave-comment.component.css']
})
export class LeaveCommentComponent implements OnInit {
    @Input() commentParent: string;
    commentForm: FormGroup;
    commentSent: boolean = false;

    constructor(private store: Store<fromComments.CommentsState>) { }

    ngOnInit() {        
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
        if(!this.commentParent)
            this.commentParent = null;
        let commentForm: CommentForm = {
            ...this.commentForm.value,
            parent: this.commentParent,
            site: null,
            entity: null,
            entrance: null
        }   
        this.store.dispatch(new CommentsActions.LeaveComment(commentForm));
        this.commentSent = true;
        let that = this;
        setTimeout(function(){
            that.store.dispatch(new CommentsActions.FetchComments())
            that.commentSent = false;
            that.commentForm.reset();
        }, 2000);
    }
}
