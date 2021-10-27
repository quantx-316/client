import notifsActionsHandler from '../actions/notifs';

export const dispatchSuccessMsg = (dispatch: any, msg: string) => {

    const notifActionHandler = new notifsActionsHandler(dispatch);

    notifActionHandler.showSuccessNotif(msg);
}

export const dispatchErrorMsg = (dispatch: any, msg: string) => {

    const notifActionHandler = new notifsActionsHandler(dispatch);

    notifActionHandler.showErrorNotif(msg);
}
