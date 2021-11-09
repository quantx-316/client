import { combineReducers } from "redux";
import authReducer from "./auth";
import notifReducer from './notifs';
import algosReducer from './algos';
import backtestReducer from './backtest';
import starredReducer from './starred';
import EditorConfigReducer from  './editorConfig'
import settingsReducer from "./settings";

export default combineReducers({
  auth: authReducer,
  notif: notifReducer,
  algos: algosReducer,
  backtests: backtestReducer,
  starred: starredReducer,
  editorConfig: EditorConfigReducer,
  settings: settingsReducer,
});