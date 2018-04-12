import { Action } from '@ngrx/store';

export const SET_PRINCIPAL = 'SET_PRINCIPAL';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';

export interface Principal {
    username: string;
    password: string;
}

export enum AuthType {
    Signin,
    Signup
}

export interface SetPrincipalType {
    principal: Principal;
    authType: AuthType;
}

export class SetPrincipal implements Action {
    readonly type = SET_PRINCIPAL;
    constructor(public payload: SetPrincipalType){}
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: Principal) {}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: Principal) {}
}

export class SigninFail implements Action {
  readonly type = SIGNIN_FAIL;
}

export class SignupFail implements Action {
  readonly type = SIGNUP_FAIL;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Authenticate implements Action {
  readonly type = AUTHENTICATE;
}

export type AuthActions = SetPrincipal | TrySignup | TrySignin | Authenticate | Logout | SigninFail | SignupFail;
