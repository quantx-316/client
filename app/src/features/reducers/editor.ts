import {
    EditorState, 
    EditorActions, 
    UPDATE_INTERVAL,
    UPDATE_ENDDATE,
    UPDATE_STARTDATE,
    UPDATE_TABSIZE,
    UPDATE_THEME,
    UPDATE_FONTSIZE
} from '../types/editor';
import {dateToStr, dateStrToDate} from '../../features/utils/time';


let initialState: EditorState = {
    fontSize: 14, 
    tabSize: 4, 
    theme: 'solarized_dark',
    startDate: null,
    endDate: null,
    interval: null, 
}

try {
    const stringified = JSON.stringify(initialState);
    if (!localStorage.getItem("editor")) {
        localStorage.setItem("editor", stringified);
    } else {
        initialState = JSON.parse(localStorage.getItem("editor") || stringified);
        if (initialState.startDate) {
            initialState.startDate = dateStrToDate(initialState.startDate);
        }
        if (initialState.endDate) {
            initialState.endDate = dateStrToDate(initialState.endDate);
        }
    }
} catch (error) {
    console.log("editor");
    console.log(error);
    localStorage.removeItem("editor");
}

const saveNewState = (newState: EditorState) => {

    const realNewState = {...newState}

    if (realNewState.startDate) {
        realNewState.startDate = dateToStr(realNewState.startDate);
    }
    if (realNewState.endDate) {
        realNewState.endDate = dateToStr(realNewState.endDate);
    }
    try {
        console.log("saving state");
        console.log(realNewState);
        localStorage.setItem("editor", JSON.stringify(realNewState));
    } catch (error) {
        console.log("ERROR SAVING NEW EDITOR STATE");
        console.log(newState);
        console.log(realNewState);
        console.log(error);

        if (localStorage.getItem("editor")) {
            localStorage.removeItem("editor");
        }

    }

}

export default function editorReducer(state = initialState, action: EditorActions): EditorState {

    switch(action.type) {

        case UPDATE_INTERVAL: 

            const newState = {
                ...state, 
                interval: action.payload,
            }

            saveNewState(newState);

            return newState;
        case UPDATE_FONTSIZE:

            const newState2 = {
                ...state,
                fontSize: action.payload,
            }

            saveNewState(newState2);

            return newState2;
        case UPDATE_ENDDATE: 

            const newState3 = {
                ...state,
                endDate: action.payload,
            }

            saveNewState(newState3);

            return newState3;
        case UPDATE_THEME: 

            const newState4 = {
                ...state, 
                theme: action.payload, 
            }

            saveNewState(newState4);

            return newState4; 
        case UPDATE_STARTDATE: 

            const newState5 = {
                ...state, 
                startDate: action.payload,
            }

            saveNewState(newState5);

            return newState5;
        case UPDATE_TABSIZE: 

            const newState6 = {
                ...state,
                tabSize: action.payload,
            }

            saveNewState(newState6);

            return newState6;
        default:
            return state

    }

}
