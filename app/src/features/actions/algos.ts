import algoService from "../../services/algoService";
import {
    ALGO_CREATE_SUCCESS,
    ALGO_CREATE_FAIL,
    ALGO_SAVE_SUCCESS,
    ALGO_SAVE_FAIL,
    ALGO_DELETE_SUCCESS,
    ALGO_DELETE_FAIL,
    ALGO_FETCH_FAIL,
    ALGO_FETCH_SUCCESS,
    AlgoSubmit,
    Algo,
} from '../types/algos';
import {dispatchErrorMsg, dispatchSuccessMsg} from '../utils/notifs';
import { getErrorMsg, handleError } from "../utils/other";

export const createAlgo = (algo: AlgoSubmit, createAlgoCallback: any) => (dispatch: any) => {

    return algoService.createAlgo(algo).then(
        (res) => {
            dispatch({
                type: ALGO_CREATE_SUCCESS, 
                payload: res.data, 
            })

            createAlgoCallback(res.data);

            dispatchSuccessMsg(dispatch, "Placeholder algo create success msg")

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

            dispatchSuccessMsg(dispatch, "Placeholder algo update success msg");

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

            dispatchSuccessMsg(dispatch, "Placeholder algo delete success")
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

            dispatchSuccessMsg(dispatch, "Debugging algo fetch success msg");

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
