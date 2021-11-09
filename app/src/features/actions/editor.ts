import {
    UPDATE_INTERVAL,
    UPDATE_ENDDATE,
    UPDATE_STARTDATE,
    UPDATE_TABSIZE,
    UPDATE_THEME,
    UPDATE_FONTSIZE
} from '../types/editor';

export const updateInterval = (interval: string) => (dispatch: any) => {
    dispatch({
        type: UPDATE_INTERVAL,
        payload: interval,
    })
}

export const updateEndDate = (endDate: Date) => (dispatch: any) => {
    dispatch({
        type: UPDATE_ENDDATE,
        payload: endDate,
    })
}

export const updateStartDate = (startDate: Date) => (dispatch: any) => {
    dispatch({
        type: UPDATE_STARTDATE, 
        payload: startDate,
    })
}

export const updateTabSize = (tabSize: number) => (dispatch: any) => {
    dispatch({
        type: UPDATE_TABSIZE,
        payload: tabSize,
    })
}

export const updateTheme = (theme: string) => (dispatch: any) => {
    dispatch({
        type: UPDATE_THEME, 
        payload: theme, 
    })
}

export const updateFontSize = (fontSize: number) => (dispatch: any) => {
    dispatch({
        type: UPDATE_FONTSIZE,
        payload: fontSize, 
    })
}
