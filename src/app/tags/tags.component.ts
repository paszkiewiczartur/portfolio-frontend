import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromApp from './../store/app.reducers';
import * as fromTags from './store/tags.reducers';
import * as TagsActions from './store/tags.actions';
import { LanguageService } from './../shared/services/language.service';
import { Tag } from './../shared/model/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
    tagsState: Observable<fromTags.State>;
    max: number;
   
    constructor(private store: Store<fromApp.AppState>, private languageService: LanguageService) { }

    ngOnInit() {
        this.tagsState = this.store.select('tags');
        this.store.dispatch(new TagsActions.FetchTags());
        console.log("Po fetchTags");
        this.store.select('tags').subscribe(
            (tagsState: fromTags.State) => {
                if(tagsState.tags){
                    let tags: Array<Tag> = tagsState.tags.slice();
                    this.max = Math.max.apply(Math,tags.map(function(o){return o.amount;}))
                }
            }
        );
    }
    
    isPolish(){
        if(this.languageService.getLanguage() === 'pl'){
            return true;
        }
        return false;
    }

    setClasses(amount: number) {
        if(amount < this.max/3){
            return "label-light";
        } else if (amount < 2*this.max/3){
            return "label-mid";
        } else {
            return "label-dark";
        }
    }

}
