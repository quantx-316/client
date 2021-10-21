export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

type user = {email: string, id: number};

interface SetMessageAction {
  payload: any;
  type: typeof SET_MESSAGE
}
interface ClearMessageAction {
  type: typeof CLEAR_MESSAGE
}

interface RegisterSuccessAction {
  payload: boolean;
  type: typeof REGISTER_SUCCESS
}

interface RegisterFailureAction {
  payload: boolean;
  type: typeof REGISTER_FAIL
}

interface LoginSuccess {
  payload: user;
  type: typeof LOGIN_SUCCESS
}

interface LoginFail {
  payload: boolean;
  type: typeof LOGIN_FAIL
}

interface Logout {
  type: typeof LOGOUT
}


export type AuthTypes = RegisterSuccessAction | RegisterFailureAction | LoginSuccess | LoginFail | Logout

export type MessageActionTypes =  SetMessageAction | ClearMessageAction
