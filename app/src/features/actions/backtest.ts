import algoService from "../../services/algoService";
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
import { getErrorMsg, handleError } from "../utils/other";

export const selectAlgo = (algo_id: number) => (dispatch: any) => {
    dispatch({
        type: ALGO_SELECT,
        payload: algo_id,
    })
}

export const createAlgo = (algo: AlgoSubmit, createAlgoCallback: any) => (dispatch: any) => {

    return algoService.createAlgo(algo).then(
        (res) => {
            dispatch({
                type: ALGO_CREATE_SUCCESS, 
                payload: res.data, 
            })

            createAlgoCallback(res.data);
        },
        (error) => {
            const msg = getErrorMsg(error);

            handleError(error, dispatch);

            dispatch({
                type: ALGO_CREATE_FAIL
            })

            dispatchErrorMsg(dispatch, msg);
        }
    )

}

export const updateAlgo = (newAlgo: Algo, updateAlgoCallback: any) => (dispatch: any) => {

    return algoService.updateAlgo(newAlgo).then(
        (res) => {
            dispatch({
                type: ALGO_SAVE_SUCCESS, 
                payload: res.data,
            })

            updateAlgoCallback(res.data);
        },
        (error) => {
            const msg = getErrorMsg(error);
            handleError(error, dispatch);

            dispatch({
                type: ALGO_FETCH_FAIL
            })

            dispatchErrorMsg(dispatch, msg);
        }
    )

}

export const deleteAlgo = (algoID: number) => (dispatch: any) => {

    return algoService.deleteAlgo(algoID).then(
        (res) => {

            
            dispatch({
                type: ALGO_DELETE_SUCCESS, 
                payload: algoID,
            })

            dispatchSuccessMsg(dispatch, "Successfully deleted")
        },
        (error) => {
            const msg = getErrorMsg(error);
            handleError(error, dispatch);

            dispatch({
                type: ALGO_DELETE_FAIL
            })

            dispatchErrorMsg(dispatch, msg);
        }
    )

}

export const fetchAlgos = () => (dispatch: any) => {

    return algoService.getAlgos().then(
        (res) => {

            dispatch({
                type: ALGO_FETCH_SUCCESS, 
                payload: res.data, 
            })

        },
        (error) => {
            const msg = getErrorMsg(error);
            handleError(error, dispatch);

            dispatch({
                type: ALGO_FETCH_FAIL
            })

            dispatchErrorMsg(dispatch, msg);
        }
    )

}
