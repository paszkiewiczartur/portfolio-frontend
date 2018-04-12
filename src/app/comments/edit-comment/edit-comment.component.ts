import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromComments from './../store/comments.reducers';
import * as CommentsActions from './../store/comments.actions';
import { Comment } from './../comment.model';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
    @Input() comment: Comment;
    commentForm: FormGroup;
    
    constructor(private store: Store<fromComments.CommentsState>, private router: Router) { }

    ngOnInit() {
        this.initForm();
    }

    initForm(){
        this.commentForm = new FormGroup({
            'posted': new FormControl(this.comment.posted, Validators.required),
            'content': new FormControl(this.comment.content, Validators.required),
            'nickname': new FormControl(this.comment.nickname, Validators.required)
       });            
    }
    
    onSubmit(){
        let changedComment = {
            ...this.commentForm.value,
            id: this.comment.id
        }
        console.log("this.commentForm.value");
        console.log(this.commentForm.value);
        this.store.dispatch(new CommentsActions.StoreComment(changedComment));
        //this.router.navigate(['/books']);
    }

    deleteComment(){
        console.log("usuwanie commenta o id:", this.comment.id);
        this.store.dispatch(new CommentsActions.DeleteComment(this.comment.id));
    }
}
