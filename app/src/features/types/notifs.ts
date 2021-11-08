export interface NotifState {
    [index: string]: any,
    status: string, 
    msg: string, 
    visibility: boolean,
}

export type GenericUpdateNotif = UpdateNotifStatus | UpdateNotifMsg | UpdateNotifVis | UpdateNotifState; 

// Single Notif 
interface UpdateNotifStatus {
    type: typeof UPDATE_NOTIF_STATUS,
    payload: string, 
}

interface UpdateNotifMsg {
    type: typeof UPDATE_NOTIF_MSG, 
    payload: string,
}

interface UpdateNotifVis {
    type: typeof UPDATE_NOTIF_VISIBILITY,
    payload: boolean,
}

interface UpdateNotifState {
    type: typeof UPDATE_NOTIF_STATE,
    payload: NotifState,
}

export const UPDATE_NOTIF_STATE = 'UPDATE_NOTIF_STATE';
export const UPDATE_NOTIF_STATUS = 'UPDATE_NOTIF_STATUS';
export const UPDATE_NOTIF_MSG = 'UPDATE_NOTIF_MSG';
export const UPDATE_NOTIF_VISIBILITY = 'UPDATE_NOTIF_VISIBILITY';