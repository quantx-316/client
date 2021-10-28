import authService from "../../services/authService";
import {dispatchErrorMsg, dispatchSuccessMsg} from '../utils/notifs';
import {getErrorMsg} from '../utils/other';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    RELOGIN,
    LOGOUT,
} from '../types/auth';

export const login = (email: string, password: string) => (dispatch: any) => {

    return authService.login(email, password).then(
        (res) => {

            let access, user; 

            try {
                //@ts-ignore 
                access = JSON.parse(localStorage.getItem("access"));
                //@ts-ignore 
                user = JSON.parse(localStorage.getItem("user"));
            } catch (error) {
                console.log(error);
            }

            if (!access || !user) {
                return Promise.reject();
            }

            dispatch({
                type: LOGIN_SUCCESS, 
                payload: {
                    //@ts-ignore 
                    user: user, 
                    access: access, 
                }
            })

            dispatchSuccessMsg(dispatch, "Successfully logged in!");

            return Promise.resolve();
        },
        (error) => {

            const msg = getErrorMsg(error);

            dispatch({
                type: LOGIN_FAIL, 
            })

            dispatchErrorMsg(dispatch, msg);

            return Promise.reject();
        }
    )

}

export const register = (username: string, email: string, password: string) => (dispatch: any) => {


    return authService.register(email, username, password).then(

        (response) => {

            dispatch({
                type: REGISTER_SUCCESS, 
            })

            dispatchSuccessMsg(dispatch, "Successfully registered!");

            return Promise.resolve();
        },
        (error) => {
            const msg = getErrorMsg(error);

            dispatch({
                type: REGISTER_FAIL, 
            })

            dispatchErrorMsg(dispatch, msg);

            return Promise.reject();
        }

    )

}

export const logout = (callBack: any) => (dispatch: any) => {
    authService.logout();

    dispatch({
        type: LOGOUT,
    })

    callBack();
}