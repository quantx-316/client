import { 
    NotifState,
    GenericUpdateNotif, 
    UPDATE_NOTIF_VISIBILITY, 
    UPDATE_NOTIF_MSG, 
    UPDATE_NOTIF_STATUS,
    UPDATE_NOTIF_STATE,
} from "../types/notifs";

export const initialSingleNotifState: NotifState = {
    status: "error",
    title: "Generic Error",
    msg: "An error has occurred.",
    visibility: false,
}

const initialState: NotifState = initialSingleNotifState;

export default function notifsReducer(state = initialState, action: GenericUpdateNotif): NotifState {
    switch(action.type) {
        case UPDATE_NOTIF_STATE:

            return { 
                ...state,
                ...action.payload
            }
        case UPDATE_NOTIF_VISIBILITY:
            return {
                ...state,
                visibility: action.payload,
            }
        case UPDATE_NOTIF_MSG: 
            return {
                ...state, 
                msg: action.payload,
            }
        case UPDATE_NOTIF_STATUS: 
            return {
                ...state, 
                status: action.payload,
            }
        default: 
            return state;
    }
}
