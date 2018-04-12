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

/* @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });
*/

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
    //btoa(unescape(encodeURIComponent(credentials.email+':'+credentials.password)))
        let result:string = authData.username + ':' + authData.password;
        console.log(authData.username, authData.password);
        console.log(encodeURIComponent(result));
        console.log(btoa(result));
        console.log(btoa(encodeURIComponent(result)));
//          let authHeader: string = 'Basic ' + btoa(encodeURIComponent(authData.username+':'+authData.password));
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
            console.log("received from TRY_SIGNIN");
            console.log(data);
              this.router.navigate(["/"]);
              return {
                  type: AuthActions.AUTHENTICATE
                };
        })
        .catch(err => {
            console.log("obsługa błędów działa!");
            console.log(err);
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
