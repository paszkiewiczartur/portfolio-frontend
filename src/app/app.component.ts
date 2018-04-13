import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromMain from './shared/store/main.reducers';
import * as MainActions from './shared/store/main.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
    
    constructor(private httpClient: HttpClient, private store: Store<fromMain.MainState>){}

    ngOnInit(){
        this.store.select('main').dispatch(new MainActions.FetchVisitData());
    }
}
