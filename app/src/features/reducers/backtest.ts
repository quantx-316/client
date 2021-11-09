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
import {PageState} from '../types/pages';

type state = {
    backtests: Array<Backtest>,
    pagination: PageState | null,
}

const initialState: state = {
    backtests: [],
    pagination: null,
}

export default function (state = initialState, action: BacktestTypes) {

    switch(action.type) {
        case BACKTEST_CREATE_SUCCESS:
            return {
                ...state,
                backtests: state.backtests.concat([action.payload]),
                pagination: state.pagination ? {
                    ...state.pagination,
                    total: state.pagination.total + 1,
                } : state.pagination
            }
        case BACKTEST_CREATE_FAIL:
            return state 
        case BACKTEST_DELETE_SUCCESS:
            return {
                ...state, 
                backtests: state.backtests.filter(obj => obj.id !== action.payload),
                pagination: state.pagination ? {
                    ...state.pagination,
                    total: state.pagination.total -1,
                } : state.pagination
            }
        case BACKTEST_DELETE_FAIL:
            return state 
        case BACKTEST_FETCH_SUCCESS:
            return {
                ...state, 
                backtests: action.payload.backtests,
                pagination: action.payload.pagination,
            }
        case BACKTEST_FETCH_FAIL:

            console.log("backtest fetch fail");

            return initialState
        default:
            return state 
    }

}