type editorConfigState = {
  fontSize: number,
  theme: string,
  tabSize: number,
  timeInterval: string,
  startTime: any,
  endTime: any,
}

export interface SaveEditorConfigSuccessAction {
  type: typeof SAVE_EDITOR_CONFIG_SUCCESS,
  //might not need this
  payload: editorConfigState
}

export interface SaveEditorConfigFailAction {
  type: typeof SAVE_EDITOR_CONFIG_FAIL
}

export interface FetchEditorConfigSuccessAction {
  type: typeof FETCH_EDITOR_CONFIG_SUCCESS,
  payload: editorConfigState
}

export interface FetchEditorConfigFailAction {
  type: typeof FETCH_EDITOR_CONFIG_FAIl
}

export const SAVE_EDITOR_CONFIG_SUCCESS = 'SAVE_EDITOR_CONFIG_SUCCESS'
export const SAVE_EDITOR_CONFIG_FAIL = 'SAVE_EDITOR_CONFIG_FAIL'
export const FETCH_EDITOR_CONFIG_SUCCESS = 'FETCH_EDITOR_CONFIG_SUCCESS'
export const FETCH_EDITOR_CONFIG_FAIl = 'FETCH_EDITOR_CONFIG_FAIl'

export type EditorConfigTypes = SaveEditorConfigFailAction | SaveEditorConfigSuccessAction | FetchEditorConfigSuccessAction | FetchEditorConfigFailAction