import {
    SettingsState, 
    SettingsActions, 
    UPDATE_SETTINGS, 
    UPDATE_ALGOS_PUBLIC,
    UPDATE_PENDING_BACK_STARRED,
    UPDATE_PENDING_COMP_STARRED,
} from '../types/settings';

let initialState: SettingsState = {
    algosPublic: true,
    pendingBackStarred: true,
    pendingCompStarred: true,
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
