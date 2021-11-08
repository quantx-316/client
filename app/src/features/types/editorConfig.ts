export interface editorConfigState {
  fontSize: number
  theme: string
  tabSize: number
  timeInterval: string
  startTime: any
  endTime: any
}

export interface updateEditorConfig {
  type: typeof UPDATE_EDITOR_CONFIG,
  payload: editorConfigState
}

export const UPDATE_EDITOR_CONFIG = 'UPDATE_EDITOR_CONFIG'