import {
    UPDATE_SETTINGS,
    UPDATE_ALGOS_PUBLIC,
    UPDATE_PENDING_COMP_STARRED,
    UPDATE_PENDING_BACK_STARRED,
    UPDATE_COMP_PARTICIPATION,
    UPDATE_COMP_SHOW,
    UPDATE_DEFAULT_BACKTEST_TAB,
    UPDATE_USERS_SHOW,
    UPDATE_DEFAULT_COMP_TAB,
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

export const showCompParticipation = (show: boolean) => (dispatch: any) => {
    dispatch({
        type: UPDATE_COMP_PARTICIPATION,
        payload: show 
    })
}

export const showComp = (show: boolean) => (dispatch: any) => {
    dispatch({
        type: UPDATE_COMP_SHOW,
        payload: show 
    })
}

export const showUsers = (show: boolean) => (dispatch: any) => {
    dispatch({
        type: UPDATE_USERS_SHOW,
        payload: show 
    })
}

export const updateDefaultBacktestTab = (tab: string) => (dispatch: any) => {
    dispatch({
        type: UPDATE_DEFAULT_BACKTEST_TAB,
        payload: tab 
    })
}


export const updateDefaultCompTab = (tab: string) => (dispatch: any) => {
    dispatch({
        type: UPDATE_DEFAULT_COMP_TAB,
        payload: tab 
    })
}
