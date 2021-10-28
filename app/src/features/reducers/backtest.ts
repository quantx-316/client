import {
    Backtest,
    BacktestTypes,
    BACKTEST_CREATE_SUCCESS,
    BACKTEST_CREATE_FAIL,
    BACKTEST_DELETE_SUCCESS,
    BACKTEST_DELETE_FAIL,
    BACKTEST_FETCH_SUCCESS,
    BACKTEST_FETCH_FAIL
} from '../types/backtest';

type state = {
    backtests: Array<Backtest>
}

const initialState: state = {
    backtests: []
}

export default function (state = initialState, action: BacktestTypes) {

    switch(action.type) {
        case BACKTEST_CREATE_SUCCESS:
            return {
                ...state,
                backtests: state.backtests.concat([action.payload])
            }
        case BACKTEST_CREATE_FAIL:
            return state 
        case BACKTEST_DELETE_SUCCESS:
            return {
                ...state, 
                backtests: state.backtests.filter(obj => obj.id !== action.payload)
            }
        case BACKTEST_DELETE_FAIL:
            return state 
        case BACKTEST_FETCH_SUCCESS:
            return {
                ...state, 
                backtests: action.payload
            }
        case BACKTEST_FETCH_FAIL:
            return state 
        default:
            return state 
    }

}