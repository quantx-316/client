export interface editorConfigState {
  fontSize: number
  theme: string
  tabSize: number
  timeInterval: string
  startTime: any
  endTime: any
}

export interface SaveEditorConfigSuccessAction {
  type: typeof SAVE_EDITOR_CONFIG_SUCCESS,
  payload: editorConfigState
}

export interface SaveEditorConfigFailAction {
  type: typeof SAVE_EDITOR_CONFIG_FAIL
}

export const SAVE_EDITOR_CONFIG_SUCCESS = 'SAVE_EDITOR_CONFIG_SUCCESS'
export const SAVE_EDITOR_CONFIG_FAIL = 'SAVE_EDITOR_CONFIG_FAIL'

export type EditorConfigTypes = SaveEditorConfigFailAction | SaveEditorConfigSuccessAction