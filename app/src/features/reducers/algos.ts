import AlgosList from '../../components/AlgosList';
import {
    AlgoTypes,
    Algo,
    ALGO_CREATE_SUCCESS,
    ALGO_CREATE_FAIL,
    ALGO_SAVE_SUCCESS,
    ALGO_SAVE_FAIL,
    ALGO_DELETE_SUCCESS,
    ALGO_DELETE_FAIL,
    ALGO_FETCH_FAIL,
    ALGO_FETCH_SUCCESS,
} from '../types/algos';

type state = {
    algos: Array<Algo>
}

const initialState: state = {
    algos: [],
}

export default function (state = initialState, action: AlgoTypes) {

    switch(action.type) {
        case ALGO_CREATE_SUCCESS:
            return {
                ...state,
                algos: state.algos.map(obj => obj.id === action.payload.id ? action.payload : obj), 
            }
        case ALGO_CREATE_FAIL:
            return state 
        case ALGO_SAVE_SUCCESS:
            return {
                ...state, 
                algos: state.algos.map(obj => obj.id === action.payload.id ? action.payload : obj),
            }
        case ALGO_SAVE_FAIL:
            return state 
        case ALGO_DELETE_SUCCESS:
            return {
                ...state, 
                algos: state.algos.filter(obj => obj.id !== action.payload)
            }
        case ALGO_DELETE_FAIL:
            return state 
        case ALGO_FETCH_SUCCESS:
            return {
                ...state, 
                algos: action.payload, 
            }
        case ALGO_FETCH_FAIL: 
            return {
                ...initialState,
            }  
        default:
            return state 
    }

}