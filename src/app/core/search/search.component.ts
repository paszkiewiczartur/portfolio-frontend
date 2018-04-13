import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import * as fromApp from './../../store/app.reducers';
import * as fromMain from './../../shared/store/main.reducers';
import * as MainActions from './../../shared/store/main.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    mainState: Observable<fromMain.State>;
    warningEmptyInput: boolean = false;
    warningOnlyWhiteSigns: boolean = false;
    @ViewChild('searchTextInput') searchTextInput: ElementRef;
    searchText: string;
  
    constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.mainState = this.store.select('main');
        this.route.params.subscribe(
            (params: Params) => {
                this.searchText = params['searchText'].trim();   
                
                if(this.searchText){
                    this.store.dispatch(new MainActions.FetchSearchData(this.searchText));
                    this.searchTextInput.nativeElement.value = this.searchText;
                }
            }
        );  
    }
    
    search(){
        this.warningOnlyWhiteSigns = false;
        this.warningEmptyInput = false;
        this.searchText = this.searchTextInput.nativeElement.value;
        
        let valid: boolean = true;
        if(!this.searchText.length){
            valid = false;
            this.warningEmptyInput = true;
        } else if(this.searchText.trim().length == 0){
            valid = false;
            this.warningOnlyWhiteSigns = true;
        } 
        if(valid){
            this.store.dispatch(new MainActions.FetchSearchData(this.searchText.trim()));
        }
    }
    
    moveTo(path: string){
        this.router.navigate([path]);
    }

}
