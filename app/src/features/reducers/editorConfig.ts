import {
  SAVE_EDITOR_CONFIG_FAIL,
  SAVE_EDITOR_CONFIG_SUCCESS,
  EditorConfigTypes,
  FETCH_EDITOR_CONFIG_SUCCESS,
  FETCH_EDITOR_CONFIG_FAIl,
} from '../types/editorConfig'


let editorConfig;

try {
  editorConfig = JSON.parse(localStorage.getItem("editorConfig") || '{}')
} catch (e) {
  console.log('editorConfig')
  console.log(e)
  console.log(editorConfig)
  localStorage.removeItem("editorConfig")
  editorConfig = null
}

const initialState = editorConfig ? editorConfig : null

export default function (state = initialState, action: EditorConfigTypes) {
    switch (action.type) {
    case SAVE_EDITOR_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
      case FETCH_EDITOR_CONFIG_SUCCESS:
        return {
          ...state, 
          ...action.payload
        }
      case FETCH_EDITOR_CONFIG_FAIl:
        return state
    case SAVE_EDITOR_CONFIG_FAIL:
      return state

    default:
      return state
  }

}

// export const defaultEditorConfigState: editorConfigState = {
//   fontSize: 14,
//   theme: 'solarized_dark',
//   tabSize: 4,
//   timeInterval: 'None',
//   startTime: null,
//   endTime: null,
// }
// //might cause error bc of the type of defaultEditorConfigState
// const initialEditorConfigStateStr = localStorage.getItem('editorConfig') || '[]'

// const initialEditorConfigState = (function () {
//   let editorConfig
//   try {
//     editorConfig =
//       JSON.parse(initialEditorConfigStateStr) || defaultEditorConfigState

//     return editorConfig
//   } catch (e) {
//     console.log(e)
//     localStorage.setItem('editorConfig', JSON.stringify([]))
//     return []
//   }
// })()

// const initialState = initialEditorConfigState

// export default function editorConfigReducer(
//   state = initialState,
//   action: EditorConfigTypes
// ): editorConfigState {
  switch (action.type) {
    case SAVE_EDITOR_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case SAVE_EDITOR_CONFIG_FAIL:
      return state

    default:
      return state
  }
// }
