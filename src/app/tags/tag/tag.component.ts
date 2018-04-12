import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import * as TagsActions from './../store/tags.actions';
import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromTags from './../store/tags.reducers';
import * as fromApp from './../../store/app.reducers';
import { Tag } from './../../shared/model/tag.model';
import { LanguageService } from './../../shared/services/language.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
    path: string;
    tagsState: Observable<fromTags.State>;
    authState: Observable<fromAuth.State>;
    tag: Tag;
    tagEdit: boolean = false;
    
    constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private languageService: LanguageService) { }

    ngOnInit() {
        this.tagsState = this.store.select('tags');
        this.authState = this.store.select('auth');
        this.route.params.subscribe(
            (params: Params) => {
                this.path = params['tagPath'];    
                this.store.dispatch(new TagsActions.FetchTag(this.path));
            }
        );
    }

    isPolish(){
        if(this.languageService.getLanguage() === 'pl'){
            return true;
        }
        return false;
    }
}
