import { DateInput } from "@blueprintjs/datetime";

export interface EditorState {
    fontSize: number, 
    theme: string, 
    tabSize: number, 
    startDate: Date | null, 
    endDate: Date | null, 
    interval: string | null, 
}

export type EditorActions = UpdateFontSize | UpdateTheme | UpdateTabSize | UpdateStartDate | UpdateEndDate | UpdateInterval;

interface UpdateFontSize {
    type: typeof UPDATE_FONTSIZE, 
    payload: number, 
}

interface UpdateTheme {
    type: typeof UPDATE_THEME, 
    payload: string,
}

interface UpdateTabSize {
    type: typeof UPDATE_TABSIZE, 
    payload: number, 
}

interface UpdateStartDate {
    type: typeof UPDATE_STARTDATE, 
    payload: Date,
}

interface UpdateEndDate {
    type: typeof UPDATE_ENDDATE, 
    payload: Date,
}

interface UpdateInterval {
    type: typeof UPDATE_INTERVAL, 
    payload: string,
}

export const UPDATE_FONTSIZE = 'UPDATE_FONTSIZE';
export const UPDATE_THEME = 'UPDATE_THEME';
export const UPDATE_TABSIZE = 'UPDATE_TABSIZE';
export const UPDATE_STARTDATE = 'UPDATE_STARTDATE';
export const UPDATE_ENDDATE = 'UPDATE_ENDDATE';
export const UPDATE_INTERVAL = 'UPDATE_INTERVAL';
