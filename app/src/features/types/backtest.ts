import {PageState} from './pages';

export const BACKTEST_CREATE_SUCCESS = "BACKTEST_CREATE_SUCCESS";
export const BACKTEST_CREATE_FAIL = "BACKTEST_CREATE_FAIL";
export const BACKTEST_DELETE_SUCCESS = "BACKTEST_DELETE_SUCCESS";
export const BACKTEST_DELETE_FAIL = "BACKTEST_DELETE_FAIL";
export const BACKTEST_FETCH_SUCCESS = "BACKTEST_FETCH_SUCCESS";
export const BACKTEST_FETCH_FAIL = "BACKTEST_FETCH_FAIL";

export interface BacktestSubmit {
    algo: number,
    test_interval: string,
    test_start: number,
    test_end: number,
}

export interface Backtest {
    id: number, 
    algo: number, 
    owner: number, 
    result: string, 
    code_snapshot: string, 
    test_interval: string,
    test_start: Date,
    test_end: Date, 
    created: Date,
}

interface BacktestCreateSuccessAction {
    type: typeof BACKTEST_CREATE_SUCCESS,
    payload: Backtest, 
}

interface BacktestCreateFailAction {
    type: typeof BACKTEST_CREATE_FAIL,
}

interface BacktestDeleteSuccessAction {
    type: typeof BACKTEST_DELETE_SUCCESS, 
    payload: number,
}

interface BacktestDeleteFailAction {
    type: typeof BACKTEST_DELETE_FAIL,
}

interface BacktestFetchSuccessAction {
    type: typeof BACKTEST_FETCH_SUCCESS,
    payload: {
        backtests: Array<Backtest>,
        pagination: PageState,
    }
}

interface BacktestFetchFailAction {
    type: typeof BACKTEST_FETCH_FAIL,
}

export type BacktestTypes = BacktestFetchFailAction | BacktestFetchSuccessAction | BacktestDeleteFailAction | BacktestDeleteSuccessAction | BacktestCreateFailAction | BacktestCreateSuccessAction; 
