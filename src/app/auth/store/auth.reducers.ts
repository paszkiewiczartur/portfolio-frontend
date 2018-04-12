import * as AuthActions from './auth.actions';

export interface State {
  principal: AuthActions.Principal;
  authType: AuthActions.AuthType;
  authenticated: boolean;
  signinFail: boolean;
  signupFail: boolean;
}

const initialState: State = {
  principal: null,
  authType: null,
  authenticated: false,
  signinFail: false,
  signupFail: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SET_PRINCIPAL):
      return {
        ...state,
        principal: action.payload.principal,
        authType: action.payload.authType
      }
    case (AuthActions.AUTHENTICATE):
        console.log("no nareszcie!");
        console.log(state.principal.username, state.principal.password);
      return {
        ...state,
        authenticated: true,
        failed: false
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        authHeader: null,
        authenticated: false
      };
    case (AuthActions.SIGNUP_FAIL):
      return {
        ...state,
        signupFail: true
      };
    case (AuthActions.SIGNIN_FAIL):
      return {
        ...state,
        signinFail: true
      };
    default:
      return state;
  }
}
