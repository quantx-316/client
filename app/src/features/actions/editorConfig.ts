import { editorConfigState, SAVE_EDITOR_CONFIG } from "../types/editorConfig"




export default class editorConfigHandler {
  dispatch

  constructor(dispatch: Function) {
    this.dispatch = dispatch
  }

  // get(state: editorConfigState) {
  //   return this.getAttrFromEditorConfigState(state, 'status')
  // }

  saveEditorConfigState(state: editorConfigState, attr: any) {
    const editorConfigState = state 
    this.handleDispatchSaveEditorConfig(editorConfigState.fontSize, editorConfigState.theme, editorConfigState.tabSize, editorConfigState.timeInterval, editorConfigState.startTime, editorConfigState.endTime)

  }
// fontSize: number
//   theme: string
//   tabSize: number
//   timeInterval: string
//   startTime: any
//   endTime: any

  handleDispatchSaveEditorConfig(fontSize: number, theme: string, tabSize: number, timeInterval: string, startTime: any, endTime: any) {

    let configState: editorConfigState = {
      fontSize: fontSize,
      theme: theme,
      tabSize: tabSize,
      timeInterval: timeInterval,
      startTime: startTime,
      endTime: endTime
    }

    this.dispatch({
      type: SAVE_EDITOR_CONFIG,
      payload: configState
    })
  }
}
