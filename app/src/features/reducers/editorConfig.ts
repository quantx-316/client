import {
  SAVE_EDITOR_CONFIG_FAIL,
  SAVE_EDITOR_CONFIG_SUCCESS,
  EditorConfigTypes,
  FETCH_EDITOR_CONFIG_SUCCESS,
  FETCH_EDITOR_CONFIG_FAIl,
} from '../types/editorConfig'

let editorConfig

try {
  editorConfig = JSON.parse(localStorage.getItem('editorConfig') || '{}')
} catch (e) {
  console.log('editorConfig')
  console.log(e)
  console.log(editorConfig)
  localStorage.removeItem('editorConfig')
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
        ...action.payload,
      }
    case FETCH_EDITOR_CONFIG_FAIl:
      return state
    case SAVE_EDITOR_CONFIG_FAIL:
      return state

    default:
      return state
  }
}
