import {
    UPDATE_SETTINGS,
    UPDATE_ALGOS_PUBLIC,
    UPDATE_PENDING_COMP_STARRED,
    UPDATE_PENDING_BACK_STARRED,
    SettingsState
} from '../types/settings';

export const updateSettings = (settings: SettingsState) => (dispatch: any) => {

    dispatch({
        type: UPDATE_SETTINGS, 
        payload: settings, 
    })

}

export const updateAlgosPublic = (algoPub: boolean) => (dispatch: any) => {
    dispatch({
        type: UPDATE_ALGOS_PUBLIC,
        payload: algoPub 
    })
}

export const updateBackStarred = (backStarred: boolean) => (dispatch: any) => {
    dispatch({
        type: UPDATE_PENDING_BACK_STARRED,
        payload: backStarred 
    })
}

export const updateCompStarred = (compStarred: boolean) => (dispatch: any) => {
    dispatch({
        type: UPDATE_PENDING_COMP_STARRED,
        payload: compStarred 
    })
}
