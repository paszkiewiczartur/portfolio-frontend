import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest } from '@angular/common/http';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, 
              private router: Router,
              private httpClient: HttpClient) {
  }

@Effect()
afterSetPrincipal = this.actions$
    .ofType(AuthActions.SET_PRINCIPAL)
    .map((action: AuthActions.SetPrincipal) => {
        if(action.payload.authType === AuthActions.AuthType.Signin){
            return {
                type: AuthActions.TRY_SIGNIN,
                payload: action.payload.principal
            }; 
        }    
    });

    
@Effect()
authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
        return action.payload;
    })
    .switchMap((authData: AuthActions.Principal) => {
        let result:string = authData.username + ':' + authData.password;
          let authHeader: string = 'Basic ' + btoa(authData.username+':'+authData.password);
        return this.httpClient.post('/login', {}, {
            headers: {
                'Authorization': authHeader
            },
            observe: 'body',
            responseType: 'json'
        })
    })
        .map((data) => {
              this.router.navigate(["/"]);
              return {
                  type: AuthActions.AUTHENTICATE
                };
        })
        .catch(err => {
          return Observable.of({ type: AuthActions.SIGNIN_FAIL});
        });
    //});


  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(() => {
      this.router.navigate(['/']);
    });

}
