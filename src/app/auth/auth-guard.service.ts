import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("inside auth-guard");
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.State) => {
        console.log("inside auth-guard2");
        console.log(authState.authenticated);
      return authState.authenticated;
    });
  }
}
