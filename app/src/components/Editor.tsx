import React, { useState } from 'react'
import AceEditor from 'react-ace'
import { Select, ItemRenderer } from '@blueprintjs/select'
import {useDispatch, useSelector} from 'react-redux';
import {createAlgo, updateAlgo} from '../features/actions/algos';
import { Button, EditableText, MenuItem } from '@blueprintjs/core'
import { Classes, Popover2 } from "@blueprintjs/popover2";
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'

import {Algo} from '../features/types/algos';

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
]

const fontsize = [14, 16, 18, 20, 24, 28, 32, 40]

const tabsize = [2, 4, 6]

const WIDTH = '800px'

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`))

require('ace-builds/src-noconflict/mode-python')
require('ace-builds/src-noconflict/snippets/python')

type EditorProps = {
  algo?: Algo
}

const Editor = (props: EditorProps) => {
  const defaultValue = `def helloworld():
    print('hello world')
  `

  const dispatch = useDispatch();

  //@ts-ignore 
  const user = useSelector(state => state.auth.user);

  const [isNewAlgo, setIsNewAlgo] = useState(props.algo ? false : true);

  const [algoState, setAlgoState] = useState<Algo>({
    id: -1, 
    owner: -1, 
    title: props.algo ? props.algo.title : '', 
    code: props.algo ? props.algo.code : defaultValue, 
    created: props.algo ? props.algo.created : '', 
    edited_at: props.algo ? props.algo.edited_at : '', 
  })

  const [editorState, setEditorState] = useState({
    fontSize: 14,
    theme: 'solarized_dark',
    tabSize: 4,
  })

  const onEditorChange = (newValue: string) => {
    setAlgoState({
      ...algoState, 
      code: newValue,
    })
  }

  const onFontSizeChange = (
    item: any,
    event?: React.SyntheticEvent<HTMLElement, Event> | undefined
  ) => {
    setEditorState({
      ...editorState,
      fontSize: item,
    })
  }

  const renderFontSize: ItemRenderer<number> = (
    fontsize,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={fontsize}
        onClick={handleClick}
        text={fontsize}
      />
    )
  }

  const onThemeChange = (
    item: any,
    event?: React.SyntheticEvent<HTMLElement, Event> | undefined
  ) => {
    setEditorState({
      ...editorState,
      theme: item,
    })
  }

  const renderTheme: ItemRenderer<string> = (
    theme,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={theme}
        onClick={handleClick}
        text={theme}
      />
    )
  }

  const onTabSizeChange = (
    item: any,
    event?: React.SyntheticEvent<HTMLElement, Event> | undefined
  ) => {
    setEditorState({
      ...editorState,
      tabSize: item,
    })
  }

  const handleTitleChange = (_title: string) => {
    setAlgoState({
      ...algoState, 
      title: _title,
    })
  }

  const handleClickRun = () => {}

  const createAlgoCallBack = (algo: Algo) => {
    setAlgoState(algo);
    setIsNewAlgo(false);
  }

  const updateAlgoCallBack = (algo: Algo) => {
    setAlgoState(algo);
  }

  const handleClickSave = () => {
    //after clicking save button

    if (isNewAlgo) {
      dispatch(createAlgo({
        title: algoState.title,
        code: algoState.code,
      }, createAlgoCallBack))
    } else {
      dispatch(updateAlgo(algoState, updateAlgoCallBack))
    }


  }



  return (
    <div style={{}}>
      <div style={{ width: WIDTH }}>
        <div
          style={{
            display: 'flex',
            gap: '15px',
          }}
        >
          <div style={{ display: 'flex' }}>
            <label>Theme: &nbsp;</label>
            <p>
              <span>
                <Select
                  items={themes}
                  itemRenderer={renderTheme}
                  activeItem={editorState.theme}
                  onItemSelect={onThemeChange}
                  filterable={false}
                >
                  <Button
                    text={editorState.theme}
                    rightIcon="double-caret-vertical"
                    outlined={true}
                  />
                </Select>
              </span>
            </p>
          </div>

          <div style={{ display: 'flex' }}>
            <label>Font Size: &nbsp;</label>
            <p>
              <span>
                <Select
                  items={fontsize}
                  itemRenderer={renderFontSize}
                  activeItem={editorState.fontSize}
                  onItemSelect={onFontSizeChange}
                  filterable={false}
                >
                  <Button
                    text={editorState.fontSize}
                    rightIcon="double-caret-vertical"
                    outlined={true}
                  />
                </Select>
              </span>
            </p>
          </div>

          <div style={{ display: 'flex' }}>
            <label>Tab Size: &nbsp;</label>
            <p>
              <span>
                <Select
                  items={tabsize}
                  itemRenderer={renderFontSize}
                  activeItem={editorState.tabSize}
                  onItemSelect={onTabSizeChange}
                  filterable={false}
                >
                  <Button
                    text={editorState.tabSize}
                    rightIcon="double-caret-vertical"
                    outlined={true}
                  />
                </Select>
              </span>
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            
          </div>
        </div>
        <div
          style={{
            marginBottom: '25px'
          }}
        ><label>Title: &nbsp;</label>
          <EditableText placeholder="Enter the title of code" alwaysRenderInput={true} selectAllOnFocus={false} maxLength={100} onChange={e => handleTitleChange(e)} value={algoState.title}/>
        </div>
        <div>
          <AceEditor
            mode="python"
            theme={editorState.theme}
            fontSize={editorState.fontSize}
            value={algoState.code}
            onChange={onEditorChange}
            width={WIDTH}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              tabSize: editorState.tabSize,
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '25px' }}>
          <div style={{marginRight: '10px'}}>
            
            <Popover2 interactionKind="click" popoverClassName={Classes.POPOVER2_CONTENT_SIZING} enforceFocus={false}
                placement="bottom-end" content={
                <h5>Saved!</h5>
            } >
              <Button
                rightIcon="saved"
                text="Save"
                onClick={handleClickSave}
                large={true}
                outlined={true}
            /> 
              </Popover2>
          </div>
          <Button
            rightIcon="arrow-right"
            intent="success"
            text="Run"
            onClick={handleClickRun}
            large={true}
            outlined={true}
          />
        </div>
      </div>
    </div>
  )
}

export default Editor
