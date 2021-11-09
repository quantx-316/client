import { combineReducers } from "redux";
import authReducer from "./auth";
import notifReducer from './notifs';
import algosReducer from './algos';
import backtestReducer from './backtest';
import starredReducer from './starred';
import settingsReducer from "./settings";
import editorReducer from "./editor";

export default combineReducers({
  auth: authReducer,
  notif: notifReducer,
  algos: algosReducer,
  backtests: backtestReducer,
  starred: starredReducer,
  settings: settingsReducer,
  editor: editorReducer, 
});