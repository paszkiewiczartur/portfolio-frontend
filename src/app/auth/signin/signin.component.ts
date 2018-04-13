import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from '../store/auth.reducers';
import * as MainActions from './../../shared/store/main.actions';
import { DataType } from './../../shared/model/data-type.model'; 
import { LinkType } from './../../shared/model/link-type.model'; 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    authState: Observable<fromAuth.State>;
    signinEdit: boolean = false;

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.sendVisitLinkEntrance();
        this.authState = this.store.select('auth');
    }

    onSignin(form: NgForm){
        const username = form.value.username;
        const password = form.value.password;
        this.store.dispatch(new AuthActions.SetPrincipal({
                principal:{
                    username: username, 
                    password: password
                },
                authType: AuthActions.AuthType.Signin
            }
        ));
    }

     sendVisitLinkEntrance(){
        const linkRequestType = {
            site: DataType.Signin.toString(),
            entity: 1
        };
        console.log("inside signin.component");
        console.log(linkRequestType);
        this.store.dispatch(new MainActions.FetchLinks(linkRequestType));        
    }

    sendLoginLinkEntrance(){
        const linkType: string = LinkType[LinkType.WEBSITE];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
    }
}
