import {
    updateNotifState
} from '../actions/notifs';



export const dispatchSuccessMsg = (dispatch: any, msg: string) => {

    const newNotif = {
        status: "success",
        msg: msg, 
        visibility: true,
    }

    dispatch(updateNotifState(newNotif));
}

export const dispatchErrorMsg = (dispatch: any, msg: string) => {

    const newNotif = {
        status: "error",
        msg: msg,
        visibility: true,
    }

    dispatch(updateNotifState(newNotif));
}
