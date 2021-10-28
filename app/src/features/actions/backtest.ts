import backtestService from "../../services/backtestService";
import {
    Backtest,
    BacktestSubmit,
    BacktestTypes,
    BACKTEST_CREATE_SUCCESS,
    BACKTEST_CREATE_FAIL,
    BACKTEST_DELETE_SUCCESS,
    BACKTEST_DELETE_FAIL,
    BACKTEST_FETCH_SUCCESS,
    BACKTEST_FETCH_FAIL
} from '../types/backtest';
import {dispatchErrorMsg, dispatchSuccessMsg} from '../utils/notifs';
import { getErrorMsg, handleError, genericErrorHandler } from "../utils/other";

export const createBacktest = (backtest: BacktestSubmit, createBacktestCallback: any) => (dispatch: any) => {

    return backtestService.createBacktest(backtest).then(
        (res) => {
            dispatch({
                type: BACKTEST_CREATE_SUCCESS,
                payload: res.data,
            })

            createBacktestCallback();

        },
        (err) => {

            dispatch({
                type: BACKTEST_CREATE_FAIL,
            })

            genericErrorHandler(err, dispatch);

        }
    )
}

export const getBacktestByAlgo = (algoID: number) => (dispatch: any) => {

    return backtestService.getBacktestByAlgoID(algoID).then(
        (res) => {

            dispatch({
                type: BACKTEST_FETCH_SUCCESS,
                payload: res.data,
            })

        },
        (error) => {

            dispatch({
                type: BACKTEST_FETCH_FAIL
            })

            genericErrorHandler(error, dispatch);

        }
    )
}

export const getBacktestByID = (backtestID: number, getBacktestCallback: any) => (dispatch: any) => {

    return backtestService.getBacktestByID(backtestID).then(
        (res) => {
            getBacktestCallback(backtestID);
        },
        (error) => {
            genericErrorHandler(error, dispatch);
        }
    )

}

export const deleteBacktest = (backtestID: number) => (dispatch: any) => {

    return backtestService.deleteBacktest(backtestID).then(
        (res) => {
            
            dispatch({
                type: BACKTEST_DELETE_SUCCESS,
                payload: backtestID
            })

            dispatchSuccessMsg(dispatch, "Successfully deleted")

        },
        (error) => {

            dispatch({
                type: BACKTEST_DELETE_FAIL,
            })

            genericErrorHandler(error, dispatch);

        }
    )

}
