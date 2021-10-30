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
    ALGO_SELECT,
} from '../types/algos';
import {PageState} from '../types/pages';

type state = {
    algos: Array<Algo>,
    selected_algo_id: number,
    pagination: PageState | null,
}

const initialState: state = {
    algos: [],
    selected_algo_id: -1,
    pagination: null,
}

export default function (state = initialState, action: AlgoTypes) {

    switch(action.type) {
        case ALGO_SELECT: 
            return {
                ...state, 
                selected_algo_id: action.payload,
            }
        case ALGO_CREATE_SUCCESS:
            return {
                ...state,
                algos: state.algos.concat([action.payload]), 
                pagination: state.pagination ? {
                    ...state.pagination,
                    total: state.pagination.total + 1,
                } : state.pagination
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
                algos: state.algos.filter(obj => obj.id !== action.payload),
                pagination: state.pagination ? {
                    ...state.pagination,
                    total: state.pagination.total - 1,
                } : state.pagination
            }
        case ALGO_DELETE_FAIL:
            return state 
        case ALGO_FETCH_SUCCESS:
            return {
                ...state, 
                algos: action.payload.algos,
                pagination: action.payload.pagination, 
            }
        case ALGO_FETCH_FAIL: 
            return {
                ...initialState,
            }  
        default:
            return state 
    }

}