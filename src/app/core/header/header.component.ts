import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  isCollapsed: boolean = true;
  @ViewChild('searchTextInput') searchTextInput: ElementRef;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
     this.authState = this.store.select('auth');
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
  
  search(){
    let searchText: string = this.searchTextInput.nativeElement.value;
    if(searchText){
        this.router.navigate(['/search', searchText]);
    } else {
        this.router.navigate(['/search']);
    }
    this.isCollapsed = true;
    this.searchTextInput.nativeElement.value = "";
  }

    searchLink(searchTextInput: HTMLInputElement){
        this.isCollapsed = true;
        if(searchTextInput.value){
            console.log("jest coś");
            return '/search/' + searchTextInput.value;
        } else {
            return '/search';
        }
    }
}

