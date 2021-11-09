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
import {getPagination} from '../utils/pages';

export const createBacktest = (backtest: BacktestSubmit, createBacktestCallback: any) => (dispatch: any) => {

    return backtestService.createBacktest(backtest).then(
        (res) => {
            dispatch({
                type: BACKTEST_CREATE_SUCCESS,
                payload: res.data,
            })

            createBacktestCallback(res.data);

        },
        (err) => {

            dispatch({
                type: BACKTEST_CREATE_FAIL,
            })

            genericErrorHandler(err, dispatch);

        }
    )
}

export const getBacktestByAlgo = (algoID: number, page: number, size: number, attr: string, dir: string, callBack?: any) => (dispatch: any) => {

    return backtestService.getBacktestByAlgoID(algoID, page, size, attr, dir).then(
        (res) => {

            dispatch({
                type: BACKTEST_FETCH_SUCCESS,
                payload: {
                    //@ts-ignore
                    'backtests': res.data.items,
                    'pagination': getPagination(res.data)
                },
            })

            if (callBack) {
                callBack();
            }

        },
        (error) => {

            dispatch({
                type: BACKTEST_FETCH_FAIL
            })

            genericErrorHandler(error, dispatch);

        }
    )
}

export const getBacktestByID = (backtestID: number, getBacktestCallback: any, failCallBack?: any) => (dispatch: any) => {

    return backtestService.getBacktestByID(backtestID).then(
        (res) => {
            getBacktestCallback(res.data);
        },
        (error) => {
            genericErrorHandler(error, dispatch);

            if (failCallBack) {
                failCallBack();
            }
        }
    )

}

export const deleteBacktest = (backtestID: number, callBack?: any) => (dispatch: any) => {

    return backtestService.deleteBacktest(backtestID).then(
        (res) => {
            
            dispatch({
                type: BACKTEST_DELETE_SUCCESS,
                payload: backtestID
            })

            callBack();

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

export const getBacktestLeaderboard = (page: number, size: number, attr: string, dir: string, callBack: any) => (dispatch: any) => {

    return backtestService.backtestLeaderboard(
        page, size, attr, dir 
    ).then(
        (res) => {
            callBack(res.data);
        },
        (error) => {
            genericErrorHandler(error, dispatch);
        }
    )

} 
