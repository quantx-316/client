import { combineReducers } from "redux";
import authReducer from "./auth";
import notifReducer from './notifs';

export default combineReducers({
  auth: authReducer,
  notif: notifReducer,
});