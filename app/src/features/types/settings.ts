
export interface HomeTabState { // change by default 
    competitionShow: boolean, 
    competitionParticipationShow: boolean, 
}

export interface SocialTabState { // change by default 
    usersShow: boolean, 
}

export interface BacktestTabState {
    defaultTab: string, // should be tab name, tabs have tab name to tab id 
}

export interface CompetitionTabState {
    defaultTab: string, // see backtestabstate above 
}

export interface SettingsState {
    algosPublic: boolean,
    pendingBackStarred: boolean, 
    pendingCompStarred: boolean, 
    homeTab: HomeTabState, 
    socialTabUsersShow: boolean, 
    starredTabCompsShow: boolean, 
    backtestDefaultTab: string, 
    compDefaultTab: string,
}

export type SettingsActions = (
    UpdateSettings | UpdateAlgosPub | UpdatePendingBackStarred | UpdatePendingCompStarred
    | UpdateCompParticipation | UpdateCompShow | UpdateUsersShow | UpdateDefaultBacktestTab | UpdateDefaultCompTab
    | UpdateStarredCompShow
)
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

interface UpdateCompParticipation {
    type: typeof UPDATE_COMP_PARTICIPATION,
    payload: boolean, 
}

interface UpdateCompShow {
    type: typeof UPDATE_COMP_SHOW, 
    payload: boolean, 
}

interface UpdateUsersShow {
    type: typeof UPDATE_USERS_SHOW,
    payload: boolean, 
}

interface UpdateDefaultBacktestTab {
    type: typeof UPDATE_DEFAULT_BACKTEST_TAB,
    payload: string, 
}

interface UpdateDefaultCompTab {
    type: typeof UPDATE_DEFAULT_COMP_TAB, 
    payload: string, 
}

interface UpdateStarredCompShow {
    type: typeof UPDATE_STARRED_COMP_SHOW,
    payload: boolean, 
}

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_ALGOS_PUBLIC = 'UPDATE_ALGOS_PUBLIC';
export const UPDATE_PENDING_BACK_STARRED = 'UPDATE_PENDING_BACK_STARRED';
export const UPDATE_PENDING_COMP_STARRED = 'UPDATE_PENDING_COMP_STARRED';
export const UPDATE_COMP_PARTICIPATION = 'UPDATE_COMP_PARTICIPATION';
export const UPDATE_COMP_SHOW = 'UPDATE_COMP_SHOW';
export const UPDATE_USERS_SHOW = 'UPDATE_USERS_SHOW';
export const UPDATE_DEFAULT_BACKTEST_TAB = 'UPDATE_DEFAULT_BACKTEST_TAB';
export const UPDATE_DEFAULT_COMP_TAB = 'UPDATE_DEFAULT_COMP_TAB';
export const UPDATE_STARRED_COMP_SHOW = 'UPDATE_STARRED_COMP_SHOW';
