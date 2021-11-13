import { Backtest } from '../types/backtest';
import {
    ADD_BACKTEST,
    REMOVE_BACKTEST,
    ADD_COMPETITION,
    REMOVE_COMPETITION,
    UPDATE_BACKTEST,
    UPDATE_COMPETITION,
} from '../types/starred';

export const addBacktest = (backtest: Backtest) => (dispatch: any) => {
    dispatch({
        type: ADD_BACKTEST,
        payload: backtest,
    })
}

export const removeBacktest = (id: number) => (dispatch: any) => {
    dispatch({
        type: REMOVE_BACKTEST, 
        payload: id, 
    })
}

export const updateBacktest = (backtest: Backtest) => (dispatch: any) => {
    dispatch({
        type: UPDATE_BACKTEST,
        payload: backtest, 
    })
}

export const addCompetition = (competition: any) => (dispatch: any) => {

    dispatch({
        type: ADD_COMPETITION,
        payload: competition,
    })

}

export const removeCompetition = (id: number) => (dispatch: any) => {
    dispatch({
        type: REMOVE_COMPETITION, 
        payload: id, 
    })
}

export const updateCompetition = (competition: any) => (dispatch: any) => {

    dispatch({
        type: UPDATE_COMPETITION,
        payload: competition,
    })

}


