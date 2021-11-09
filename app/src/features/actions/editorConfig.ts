import {
  FETCH_EDITOR_CONFIG_FAIl,
  FETCH_EDITOR_CONFIG_SUCCESS,
  SAVE_EDITOR_CONFIG_FAIL,
  SAVE_EDITOR_CONFIG_SUCCESS,
} from '../types/editorConfig'

export const saveEditorConfig = (
  fontSize: number,
  theme: string,
  tabSize: number,
  timeInterval: any,
  startTime: any,
  endTime: any
) => (dispatch: any) => {


  const editorConfig = {
    fontSize: fontSize,
    theme: theme,
    tabSize: tabSize,
    timeInterval: timeInterval,
    startTime: startTime,
    endTime: endTime
  }
  try {
    //@ts-ignore
    localStorage.setItem("editorConfig", JSON.stringify(editorConfig))
    console.log("try")
  } catch (error) {
    console.log(error)
  }

  if (
    !fontSize ||
    !theme ||
    !tabSize || 
    !startTime || 
    !endTime
  ) {
    dispatch({
      type: SAVE_EDITOR_CONFIG_FAIL,
    })
    return Promise.reject()
  }

  dispatch({
    type: SAVE_EDITOR_CONFIG_SUCCESS,
    payload: {
      editorConfig: editorConfig,
    },
  })
  console.log('dipatche')
  //maybe dispatch success msg?

  return Promise.resolve()
}

export const fetchEditorConfig = (editorConfig: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    console.log('fetchEditorConfig')
    dispatch({
      type: FETCH_EDITOR_CONFIG_SUCCESS,
      payload: editorConfig,
    })
      .then((res: any) => {
        resolve(res)
      })
      .catch((err: any) => {
        dispatch({
          type: FETCH_EDITOR_CONFIG_FAIl,
        })
      })
  })
}
