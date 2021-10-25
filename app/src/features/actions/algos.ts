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
import { getErrorMsg } from "../utils/other";

export const createAlgo = (algo: AlgoSubmit) => (dispatch: any) => {

    return algoService.createAlgo(algo).then(
        (res) => {
            dispatch({
                type: ALGO_CREATE_SUCCESS, 
                payload: res.data, 
            })

            dispatchSuccessMsg(dispatch, "Placeholder algo create success msg")

        },
        (error) => {
            const msg = getErrorMsg(error);

            dispatch({
                type: ALGO_CREATE_FAIL
            })

            dispatchErrorMsg(dispatch, msg);
        }
    )

}

export const updateAlgo = (newAlgo: Algo) => (dispatch: any) => {

    return algoService.updateAlgo(newAlgo).then(
        (res) => {
            dispatch({
                type: ALGO_SAVE_SUCCESS, 
                payload: res.data,
            })

            dispatchSuccessMsg(dispatch, "Placeholder algo update success msg");

        },
        (error) => {
            const msg = getErrorMsg(error);

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

            dispatch({
                type: ALGO_FETCH_FAIL
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

            dispatch({
                type: ALGO_FETCH_FAIL
            })

            dispatchErrorMsg(dispatch, msg);
        }
    )

}

// export const login = (email: string, password: string) => (dispatch: any) => {

//     return authService.login(email, password).then(
//         (res) => {

//             let access, user; 

//             try {
//                 //@ts-ignore 
//                 access = JSON.parse(localStorage.getItem("access"));
//                 //@ts-ignore 
//                 user = JSON.parse(localStorage.getItem("user"));
//             } catch (error) {
//                 console.log(error);
//             }

//             if (!access || !user) {
//                 return Promise.reject();
//             }

//             dispatch({
//                 type: LOGIN_SUCCESS, 
//                 payload: {
//                     //@ts-ignore 
//                     user: user, 
//                     access: access, 
//                 }
//             })

//             const notifActionHandler = new notifsActionsHandler(dispatch);

//             notifActionHandler.showSuccessNotif("Successfully logged in!");

//             return Promise.resolve();
//         },
//         (error) => {
//             let msg = (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//               error.message ||
//               error.toString();

//               dispatch({
//                   type: LOGIN_FAIL, 
//               })

//               const notifActionHandler = new notifsActionsHandler(dispatch);

//               notifActionHandler.showErrorNotif(msg);

//               return Promise.reject();
//         }
//     )

// }

// export const register = (username: string, email: string, password: string) => (dispatch: any) => {


//     return authService.register(email, username, password).then(

//         (response) => {

//             const notifActionHandler = new notifsActionsHandler(dispatch);

//             dispatch({
//                 type: REGISTER_SUCCESS, 
//             })

//             notifActionHandler.showSuccessNotif("Successfully registered!");

//             return Promise.resolve();
//         },
//         (error) => {
//             let msg = (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//               error.message ||
//               error.toString();

//               const notifActionHandler = new notifsActionsHandler(dispatch);

//               dispatch({
//                   type: REGISTER_FAIL, 
//               })

//               notifActionHandler.showErrorNotif(msg);

//               return Promise.reject();
//         }

//     )

// }

// export const logout = () => (dispatch: any) => {
//     authService.logout();

//     dispatch({
//         type: LOGOUT,
//     })
// }