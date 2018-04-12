import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromApp from './../../store/app.reducers';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    @Input() node;
    @Input() treeDepth;
    commentEdit: boolean = false;
    showLeaveComment: boolean = false;
    authState: Observable<fromAuth.State>;
  
    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }
    
    toggleShowLeaveComment(){
        this.showLeaveComment = !this.showLeaveComment;
    }
}
