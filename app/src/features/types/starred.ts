import { Backtest } from "./backtest";

export interface StarredState {
    [index: string]: any, 
    backtests: {
        [index: number]: Backtest,
    },
    competitions: {
        [index: number]: Backtest,
    }
}

export type StarredActions = UpdateBacktest | UpdateCompetition | AddBacktest | RemoveBacktest | AddCompetition | RemoveCompetition; 

interface AddBacktest {
    type: typeof ADD_BACKTEST,
    payload: Backtest,
}

interface RemoveBacktest { // backtest --> id --> remove from whichever one it is in 
    type: typeof REMOVE_BACKTEST,
    payload: number, // id 
}

interface UpdateBacktest {
    type: typeof UPDATE_BACKTEST,
    payload: Backtest, 
}

interface AddCompetition {
    type: typeof ADD_COMPETITION,
    payload: any,
}

interface RemoveCompetition {
    type: typeof REMOVE_COMPETITION, 
    payload: number, 
}

interface UpdateCompetition {
    type: typeof UPDATE_COMPETITION,
    payload: any, 
}

export const ADD_BACKTEST = 'ADD_BACKTEST';
export const REMOVE_BACKTEST = 'REMOVE_BACKTEST';
export const UPDATE_BACKTEST = 'UPDATE_BACKTEST';
export const ADD_COMPETITION = 'ADD_COMPETITION';
export const REMOVE_COMPETITION = 'REMOVE_COMPETITION';
export const UPDATE_COMPETITION = 'UPDATE_COMPETITION';


