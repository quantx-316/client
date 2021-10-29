import {NotifState, SingleNotifState, UPDATE_NOTIF_ALL, UPDATE_NOTIF_VISIBILITY, ADD_NOTIF_LIST, REMOVE_NOTIF_LIST, UPDATE_NOTIF_STATE} from "../types/notifs";
import {initialSingleNotifState} from '../reducers/notifs';

export default class notifsActionsHandler {
    
    dispatch;

    constructor(dispatch: Function) {
        this.dispatch = dispatch; 
    }

    getSingleNotifStatus(notifState: NotifState) {
        return this.getAttrFromSingleNotifState(notifState, 'status');
    }

    getSingleNotifMsg(notifState: NotifState) {
        return this.getAttrFromSingleNotifState(notifState, 'msg');
    }

    getSingleNotifVisiblity(notifState: NotifState) {
        return this.getAttrFromSingleNotifState(notifState, 'visibility');
    }

    getAttrFromSingleNotifState(notifState: NotifState, attr: string) {
        const singleNotifState = notifState.singleNotif;
        return singleNotifState.hasOwnProperty(attr) ? singleNotifState[attr] : null;
    }

    getNotifStatus(singleNotif: SingleNotifState) {
        return singleNotif.status;
    }

    getNotifMsg(singleNotif: SingleNotifState) {
        return singleNotif.msg;
    }

    getNotifList(notifState: NotifState) {
        const listNotifState = notifState.listNotif;
        return listNotifState;
    }

    showSuccessNotif(msg: string) {
        this.handleDispatchAllNotif("success", msg);
    }

    showErrorNotif(msg: string) {
        this.handleDispatchAllNotif("error", msg);
    }

    clearNotifs() {
        this.dispatch({
            type: UPDATE_NOTIF_STATE,
            payload: {
                singleNotif: initialSingleNotifState,
                listNotif: []
            }
        })
    }

    handleDispatchAllNotif(status: string, msg: string) {

        // this.handleDispatchAddListNotif(status, msg);

        let singleNotifState: SingleNotifState = {
            status: status, 
            msg: msg, 
            visibility: true, 
        }

        this.dispatch({
            type: UPDATE_NOTIF_ALL, 
            payload: singleNotifState
        })
    }

    addNotifToList(status: string, msg: string) {
        this.handleDispatchAddListNotif(status, msg);
    }

    handleDispatchAddListNotif(status: string, msg: string) {
        const currDate = new Date().toLocaleString();

        let singleNotifState: SingleNotifState = {
            status: status,
            msg: msg,
            visibility: true 
        }

        this.dispatch({
            type: ADD_NOTIF_LIST,
            payload: singleNotifState
        })
    }

    removeNotifFromList(idx: number) {
        this.handleDispatchRemoveListNotif(idx);
    }

    handleDispatchRemoveListNotif(idx: number) {
        this.dispatch({
            type: REMOVE_NOTIF_LIST,
            payload: idx 
        })
    }

    hideNotification() {
        this.handleNotifVisibility(false);
    }

    showNotification() {
        this.handleNotifVisibility(true);
    }

    handleNotifVisibility(visibility: boolean) {
        this.dispatch({
            type: UPDATE_NOTIF_VISIBILITY, 
            payload: visibility,
        })
    }

}
