import authService from "../../services/authService";
import notifsActionsHandler from "./notifs";
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

            const notifActionHandler = new notifsActionsHandler(dispatch);

            notifActionHandler.showSuccessNotif("Successfully logged in!");

            return Promise.resolve();
        },
        (error) => {
            let msg = (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

              dispatch({
                  type: LOGIN_FAIL, 
              })

              const notifActionHandler = new notifsActionsHandler(dispatch);

              notifActionHandler.showErrorNotif(msg);

              return Promise.reject();
        }
    )

}

export const register = (username: string, email: string, password: string) => (dispatch: any) => {


    return authService.register(email, username, password).then(

        (response) => {

            const notifActionHandler = new notifsActionsHandler(dispatch);

            dispatch({
                type: REGISTER_SUCCESS, 
            })

            notifActionHandler.showSuccessNotif("Successfully registered!");

            return Promise.resolve();
        },
        (error) => {
            let msg = (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

              const notifActionHandler = new notifsActionsHandler(dispatch);

              dispatch({
                  type: REGISTER_FAIL, 
              })

              notifActionHandler.showErrorNotif(msg);

              return Promise.reject();
        }

    )

}

export const logout = () => (dispatch: any) => {
    authService.logout();

    dispatch({
        type: LOGOUT,
    })
}