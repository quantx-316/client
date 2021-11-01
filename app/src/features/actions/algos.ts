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
    ALGO_SELECT,
    AlgoSubmit,
    Algo,
} from '../types/algos';
import {dispatchErrorMsg, dispatchSuccessMsg} from '../utils/notifs';
import { getErrorMsg, handleError, genericErrorHandler } from "../utils/other";
import {getPagination} from '../utils/pages';


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

export const deleteAlgo = (algoID: number, callBack?: any) => (dispatch: any) => {

    return algoService.deleteAlgo(algoID).then(
        (res) => {

            
            dispatch({
                type: ALGO_DELETE_SUCCESS, 
                payload: algoID,
            })

            callBack();

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

export const fetchAlgos = (page: number, size: number, attr: string, dir: string) => (dispatch: any) => {

    return algoService.getAlgos(page, size, attr, dir).then(
        (res) => {

            dispatch({
                type: ALGO_FETCH_SUCCESS, 
                payload: {
                    //@ts-ignore
                    'algos': res.data.items,
                    'pagination': getPagination(res.data)
                }, 
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

export const fetchPublicAlgos = (username: string, page: number, size: number, attr: string, dir: string, callBack: any) => (dispatch: any) => {

    return algoService.getPublicAlgos(
        username, page, size, attr, dir
    ).then(
        (res) => {
            callBack(res.data);
        },
        (error) => {
            genericErrorHandler(error, dispatch);
        }
    )

}
