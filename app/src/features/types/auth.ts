export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const RELOGIN = "RELOGIN";
export const LOGOUT = "LOGOUT";
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'; 
export const USER_FETCH_FAIL = 'USER_FETCH_FAIL';

type user = {email: string, id: number};

interface UserFetchSuccessAction {
  type: typeof USER_FETCH_SUCCESS,
  payload: user,
}

interface UserFetchFailAction {
  type: typeof USER_FETCH_FAIL
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAIL
}

interface LoginSuccess {
  payload: user,
  type: typeof LOGIN_SUCCESS
}

interface LoginFail {
  type: typeof LOGIN_FAIL
}

interface Logout {
  type: typeof LOGOUT
}

interface Relogin {
    type: typeof RELOGIN, 
}


export type AuthTypes = RegisterSuccessAction | RegisterFailureAction | LoginSuccess | LoginFail | Logout | Relogin | UserFetchFailAction | UserFetchSuccessAction
