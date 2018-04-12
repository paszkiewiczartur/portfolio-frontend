import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromTags from './../store/tags.reducers';
import * as fromApp from './../../store/app.reducers';
@Component({
  selector: 'app-tags-start',
  templateUrl: './tags-start.component.html',
  styleUrls: ['./tags-start.component.css']
})
export class TagsStartComponent implements OnInit {
    authState: Observable<fromAuth.State>;
    tagEdit: boolean = false;
    
    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

}
