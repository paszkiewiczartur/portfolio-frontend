import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import * as fromComments from './../store/comments.reducers';
import * as CommentsActions from './../store/comments.actions';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {
    commentsState: Observable<fromComments.State>;
    id: number;
    
    constructor(private store: Store<fromComments.CommentsState>, private route: ActivatedRoute) { }

    ngOnInit() {
        this.commentsState = this.store.select('comments');
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];    
                console.log("inside singleCommentComponent");
                console.log(this.id);
                this.store.dispatch(new CommentsActions.FetchComment(this.id));
            }
        );
    }

}
