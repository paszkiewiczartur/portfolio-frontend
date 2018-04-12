import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment/comment.component';
import { LeaveCommentComponent } from './leave-comment/leave-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { SingleCommentComponent } from './single-comment/single-comment.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        CommentsComponent,
        CommentComponent,
        LeaveCommentComponent,
        EditCommentComponent,
        SingleCommentComponent
    ],
    exports: [
        CommentsComponent,
        CommentComponent,
        LeaveCommentComponent,
        EditCommentComponent
    ]
})
export class CommentsModule{

}