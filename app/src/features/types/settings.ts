
export interface SettingsState {
    algosPublic: boolean,
    pendingBackStarred: boolean, 
    pendingCompStarred: boolean, 
}

export type SettingsActions = UpdateSettings | UpdateAlgosPub | UpdatePendingBackStarred | UpdatePendingCompStarred;

interface UpdateSettings {
    type: typeof UPDATE_SETTINGS, 
    payload: SettingsState,
}

interface UpdateAlgosPub {
    type: typeof UPDATE_ALGOS_PUBLIC,
    payload: boolean, 
}

interface UpdatePendingBackStarred {
    type: typeof UPDATE_PENDING_BACK_STARRED,
    payload: boolean, 
}

interface UpdatePendingCompStarred {
    type: typeof UPDATE_PENDING_COMP_STARRED,
    payload: boolean, 
}

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_ALGOS_PUBLIC = 'UPDATE_ALGOS_PUBLIC';
export const UPDATE_PENDING_BACK_STARRED = 'UPDATE_PENDING_BACK_STARRED';
export const UPDATE_PENDING_COMP_STARRED = 'UPDATE_PENDING_COMP_STARRED';
