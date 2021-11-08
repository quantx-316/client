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
  timeInterval: string,
  startTime: any,
  endTime: any
) => (dispatch: any) => {
  let editorConfig
  try {
    //@ts-ignore
    editorConfig = JSON.parse(localStorage.getItem('editorConfig'))
  } catch (error) {
    console.log(error)
  }

  const {
    fontSize,
    theme,
    tabSize,
    timeInterval,
    startTime,
    endTime,
  } = editorConfig

  if (
    !fontSize ||
    !theme ||
    !tabSize ||
    !timeInterval ||
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

  //maybe dispatch success msg?

  return Promise.resolve()
}

export const fetchEditorConfig = (editorConfig: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
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
