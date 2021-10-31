import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL
} from "../types/auth";

import { AuthTypes } from "../types/auth";

let user, access; 

try {
  user = JSON.parse(localStorage.getItem("user") || '{}');
} catch (error) {
  console.log('user');
  console.log(error);
  console.log(user);
  localStorage.removeItem("user");
  user = null;
}

try {
  access = JSON.parse(localStorage.getItem("access") || "");
} catch (error) {
  console.log('access');
  console.log(localStorage.getItem('access'));
  console.log(error);
  console.log(access);
  localStorage.removeItem("access");
  access = null; 
}

const initialState = user && access && access !== ""
  ? { isLoggedIn: true, user: user, access: access}
  : { isLoggedIn: false, user: null, access: null};

export default function (state = initialState, action: AuthTypes) {

  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        //@ts-ignore
        user: action.payload.user,
        //@ts-ignore 
        access: action.payload.access, 
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state, 
        user: action.payload,
      }
    case USER_FETCH_FAIL:
      return state;
    default:
      return state;
  }
}