import {logout} from '../actions/auth';
import { dispatchErrorMsg } from './notifs';

export const getErrorMsg = (error: any) => {
    let msg = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
    return msg;
}

export const handleError = (error: any, dispatch: any) => {

    console.log("HANDLE ERROR");
    console.log(error.response);

    if (!error.response) {
        // network error 
        return 
    } 

    // if (error.response && error.response.status === 401) {
    //     dispatch(logout());
    // }

}

export const genericErrorHandler = (error: any, dispatch: any) => {

    const msg = getErrorMsg(error);

    handleError(error, dispatch);

    dispatchErrorMsg(dispatch, msg);

}
