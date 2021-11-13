import {
    StarredState, 
    StarredActions,
    ADD_BACKTEST,
    REMOVE_BACKTEST,
    ADD_COMPETITION,
    REMOVE_COMPETITION,
    UPDATE_BACKTEST,
    UPDATE_COMPETITION,
} from '../types/starred';

let initialState: StarredState = {
    backtests: {},
    competitions: {},
}

try {
    const stringified = JSON.stringify(initialState);
    if (!localStorage.getItem("starred")) {
        localStorage.setItem("starred", stringified);
    } else {
        initialState = JSON.parse(localStorage.getItem("starred") || stringified);
    }
} catch (error) {
    console.log("starred");
    console.log(error);
    localStorage.removeItem("starred");
}

const saveNewState = (newState: StarredState) => {
    try {
        localStorage.setItem("starred", JSON.stringify(newState));
    } catch (error) {
        console.log("ERROR SAVING NEW STATE IN STARRED");
        console.log(newState);
        console.log(error);
        if (localStorage.getItem("starred")) {
            localStorage.removeItem("starred");
        }
    }

}

export default function starredReducer(state = initialState, action: StarredActions): StarredState {

    switch(action.type) {

        case ADD_BACKTEST:

            if (action.payload.hasOwnProperty('secondaryLabel')) {
                //@ts-ignore 
                delete action.payload['secondaryLabel']
            }

            const newState1 = {
                ...state, 
                backtests: {
                    ...state.backtests,
                    [action.payload.id]: action.payload, 
                }
            }

            saveNewState(newState1);

            return newState1;

        case REMOVE_BACKTEST:

            const newState2 = {
                ...state, 
                backtests: {
                    ...state.backtests,
                }
            }

            delete newState2.backtests[action.payload];

            saveNewState(newState2);

            return newState2;
        
        case UPDATE_BACKTEST:

            const newState5 = {
                ...state, 
                backtests: {
                    ...state.backtests,
                }
            }

            if (action.payload.hasOwnProperty('secondaryLabel')) {
                //@ts-ignore 
                delete action.payload['secondaryLabel']
            }

            newState5.backtests[action.payload.id] = action.payload; 

            saveNewState(newState5);

            return newState5;

        case ADD_COMPETITION:

            const newState3 = {
                ...state,
                competitions: {
                    ...state.competitions,
                    [action.payload.id]: action.payload,
                }
            }

            saveNewState(newState3);

            return newState3;

        case REMOVE_COMPETITION:

            const newState4 = {
                ...state, 
                competitions: {
                    ...state.competitions,
                }
            }

            delete newState4.competitions[action.payload];

            saveNewState(newState4);

            return newState4;

        case UPDATE_COMPETITION:

            const newState6 = {
                ...state, 
                competitions: {
                    ...state.competitions,
                }
            }

            newState6.competitions[action.payload.id] = action.payload;

            saveNewState(newState6);

            return newState6; 

        default:
            return state; 
    }

}
