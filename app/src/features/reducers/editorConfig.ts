import { editorConfigState, updateEditorConfig, UPDATE_EDITOR_CONFIG} from "../types/editorConfig"

export const defaultEditorConfigState: editorConfigState = {
  fontSize: 14,
  theme: 'solarized_dark',
  tabSize: 4,
  timeInterval: 'None',
  startTime: null,
  endTime: null
}
//might cause error bc of the type of defaultEditorConfigState
const initialEditorConfigStateStr = localStorage.getItem('editorConfig') || '[]'

const initialEditorConfigState = function() {
  try {
    return JSON.parse(initialEditorConfigStateStr) || defaultEditorConfigState
  } catch(e) {
    console.log(e)
    localStorage.setItem('editorConfig', JSON.stringify([]))
    return []
  }
}();

const initialState: editorConfigState = {
  editorConfigState: initialEditorConfigState
}


export default function editorConfigReducer(state = initialState, action: updateEditorConfig): editorConfigState {
  switch(action.type) {
    case UPDATE_EDITOR_CONFIG:
      return {
        ...state,
        ...action.payload
      }
      default:
        return state;
  }
}