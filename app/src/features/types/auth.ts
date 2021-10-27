export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const RELOGIN = "RELOGIN";
export const LOGOUT = "LOGOUT";

type user = {email: string, id: number};

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAIL
}

interface LoginSuccess {
  payload: user;
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


export type AuthTypes = RegisterSuccessAction | RegisterFailureAction | LoginSuccess | LoginFail | Logout | Relogin
