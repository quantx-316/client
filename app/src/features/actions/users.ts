import userService from '../../services/userService';
import { getErrorMsg, handleError, genericErrorHandler } from "../utils/other";
import {USER_FETCH_SUCCESS, USER_FETCH_FAIL} from '../types/auth';


export const fetchUserById = (userID: number, callBack?: any) => (dispatch: any) => {
    return userService.getUserByID(userID).then(
        (res) => {
            if (callBack) {
                callBack(res.data);
            }
        },
        (error) => {
            genericErrorHandler(error, dispatch);
        }
    )
}


export const fetchUser = (username: string, callBack: any, failCallback?: any) => (dispatch: any) => {

    return userService.getUser(username).then(
        (res) => {
            callBack(res.data);
        },
        (error) => {
            genericErrorHandler(error, dispatch);

            if (failCallback) {
                failCallback();
            }
        }
    )

}

export const updateUser = (user: any, callBack: any) => (dispatch: any) => {

    return userService.updateUser(user).then(
        (res) => {
            callBack(res.data);
            dispatch({
                type: USER_FETCH_SUCCESS, 
                payload: res.data,
            })
        },
        (error) => {
            genericErrorHandler(error, dispatch);
            dispatch({
                type: USER_FETCH_FAIL,
            })
        }
    )

}

export const getCurrentUser = (errCallBack: any) => (dispatch: any) => {

    return userService.getCurrentUser().then(
        (res) => {
            dispatch({
                type: USER_FETCH_SUCCESS, 
                payload: res.data,
            })
        },
        (error) => {
            genericErrorHandler(error, dispatch);
            dispatch({
                type: USER_FETCH_FAIL,
            })
            errCallBack();
        }
    )

}
