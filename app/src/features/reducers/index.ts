import { combineReducers } from "redux";
import authReducer from "./auth";
import notifReducer from './notifs';
import algosReducer from './algos';

export default combineReducers({
  auth: authReducer,
  notif: notifReducer,
  algos: algosReducer,
});