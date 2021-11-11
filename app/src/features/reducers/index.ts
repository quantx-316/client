import { combineReducers } from "redux";
import authReducer from "./auth";
import notifReducer from './notifs';
import algosReducer from './algos';
import backtestReducer from './backtest';
import starredReducer from './starred';
import settingsReducer from "./settings";
import editorReducer from "./editor";

const appReducer = combineReducers({
  auth: authReducer,
  notif: notifReducer,
  algos: algosReducer,
  backtests: backtestReducer,
  starred: starredReducer,
  settings: settingsReducer,
  editor: editorReducer, 
});

const rootReducer = (state: any, action: any) => {

  if (action.type === "LOGOUT") {
    localStorage.clear();
    //@ts-ignore 
    window.location.reload(true);
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

export default rootReducer; 