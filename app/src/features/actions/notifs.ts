import {
    UPDATE_NOTIF_VISIBILITY, 
    UPDATE_NOTIF_MSG, 
    UPDATE_NOTIF_STATUS,
    UPDATE_NOTIF_STATE,
    NotifState,
} from '../types/notifs';

export const updateNotifState = (notif: NotifState) => (dispatch: any) => {
    dispatch({
        type: UPDATE_NOTIF_STATE,
        payload: notif,
    })
}

export const updateNotifVis = (visibility: boolean) => (dispatch: any) => {
    dispatch({
        type: UPDATE_NOTIF_VISIBILITY,
        payload: visibility,
    })
}

export const updateNotifMsg = (msg: string) => (dispatch: any) => {
    dispatch({
        type: UPDATE_NOTIF_MSG,
        payload: msg,
    })
}

export const updateNotifStatus = (status: string) => (dispatch: any) => {
    dispatch({
        type: UPDATE_NOTIF_STATUS,
        payload: status,
    })
}

