import {
    SettingsState, 
    SettingsActions, 
    UPDATE_SETTINGS, 
    UPDATE_ALGOS_PUBLIC,
    UPDATE_PENDING_BACK_STARRED,
    UPDATE_PENDING_COMP_STARRED,
    UPDATE_COMP_PARTICIPATION,
    UPDATE_COMP_SHOW,
    UPDATE_DEFAULT_BACKTEST_TAB,
    UPDATE_USERS_SHOW,
    UPDATE_DEFAULT_COMP_TAB,
    UPDATE_STARRED_COMP_SHOW,
    UPDATE_PROFILE_COMP_PART_SHOW,
    UPDATE_PROFILE_COMP_SHOW,
    UPDATE_PROFILE_TAB_SHOW,
} from '../types/settings';

let initialState: SettingsState = {
    algosPublic: true,
    pendingBackStarred: true,
    pendingCompStarred: true,
    homeTab: {
        competitionShow: false,
        competitionParticipationShow: true, 
    },
    profileTab: {
        tabShow: false,
        competitionShow: false, 
        competitionParticipationShow: true, 
    },
    socialTabUsersShow: true, 
    starredTabCompsShow: false, 
    backtestDefaultTab: "Code",
    compDefaultTab: "",
}

try {
    const stringified = JSON.stringify(initialState);
    if (!localStorage.getItem("settings")) {
        localStorage.setItem("settings", stringified);
    } else {
        initialState = JSON.parse(localStorage.getItem("settings") || stringified);
    }
} catch (error) {
    console.log("settings");
    console.log(error);
    localStorage.removeItem("settings");
}

const saveNewState = (newState: SettingsState) => {
    try {
        localStorage.setItem("settings", JSON.stringify(newState));
    } catch (error) {
        console.log('error saving new state in settings');
        console.log(newState);
        console.log(error);
        if (localStorage.getItem("settings")) {
            localStorage.removeItem('settings');
        }
    }
}

export default function settingsReducer(state = initialState, action : SettingsActions): SettingsState {

    switch(action.type) {

        case UPDATE_PROFILE_TAB_SHOW: 

            const newState13 = {
                ...state, 
                profileTab: {
                    ...state.profileTab, 
                    tabShow: action.payload, 
                }
            }

            saveNewState(newState13);

            return newState13; 

        case UPDATE_PROFILE_COMP_SHOW: 

            const newState12 = {
                ...state, 
                profileTab: {
                    ...state.profileTab, 
                    competitionShow: action.payload, 
                }
            }

            saveNewState(newState12);

            return newState12; 

        case UPDATE_PROFILE_COMP_PART_SHOW: 

            const newState11 = {
                ...state, 
                profileTab: {
                    ...state.profileTab, 
                    competitionParticipationShow: action.payload, 
                }
            }

            saveNewState(newState11);

            return newState11; 

        case UPDATE_STARRED_COMP_SHOW:

            const newState10 = {
                ...state, 
                starredTabCompsShow: action.payload, 
            }

            saveNewState(newState10);

            return newState10; 

        case UPDATE_DEFAULT_COMP_TAB: 

            const newState9 = {
                ...state, 
                compDefaultTab: action.payload, 
            }

            saveNewState(newState9);

            return newState9;

        case UPDATE_DEFAULT_BACKTEST_TAB: 

            const newState8 = {
                ...state, 
                backtestDefaultTab: action.payload, 
            }

            saveNewState(newState8);

            return newState8;

        case UPDATE_USERS_SHOW:

            const newState7 = {
                ...state, 
                socialTabUsersShow: action.payload, 
            }

            saveNewState(newState7);

            return newState7; 

        case UPDATE_COMP_SHOW: 

            const newState6 = {
                ...state, 
                homeTab: {
                    ...state.homeTab, 
                    competitionShow: action.payload, 
                }
            }

            saveNewState(newState6);

            return newState6; 

        case UPDATE_COMP_PARTICIPATION: 

            const newState5 = {
                ...state, 
                homeTab: {
                    ...state.homeTab, 
                    competitionParticipationShow: action.payload, 
                }
            }

            saveNewState(newState5);

            return newState5; 

        case UPDATE_ALGOS_PUBLIC: 

            const newState2 = {
                ...state,
                algosPublic: action.payload,
            }

            saveNewState(newState2);

            return newState2;
        
        case UPDATE_PENDING_COMP_STARRED:

            const newState3 = {
                ...state, 
                pendingCompStarred: action.payload,
            }

            saveNewState(newState3);

            return newState3; 
        
        case UPDATE_PENDING_BACK_STARRED: 

            const newState4 = {
                ...state, 
                pendingBackStarred: action.payload, 
            }

            saveNewState(newState4);

            return newState4;

        case UPDATE_SETTINGS: 

            const newState = {
                ...state,
                ...action.payload,
            }

            saveNewState(newState);

            return newState;
        default:    
            return state; 
    }

}
