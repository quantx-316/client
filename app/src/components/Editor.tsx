import React, { useState } from 'react'
import AceEditor from 'react-ace'
import { Select, ItemRenderer } from '@blueprintjs/select'

import { Button, EditableText, MenuItem } from '@blueprintjs/core'

import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'

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

const Editor: React.FC = () => {
  const defaultValue = `def helloworld():
    print('hello world')
  `

  const [editorState, setEditorState] = useState({
    value: defaultValue,
    fontSize: 14,
    theme: 'solarized_dark',
    tabSize: 4,
  })

  const [title, setTitle] = useState('')
  
  const [isSaved, setIsSaved] = useState(false)

  const onEditorChange = (newValue: string) => {
    setEditorState({
      ...editorState,
      value: newValue,
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

  const handleClickRun = () => {}

  const handleClickSave = () => {
    setIsSaved(true)
    //after clicking save button
  }

  const handleTitleChange = (_title: string) => {
    setTitle(_title)
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
          <EditableText placeholder="Enter the title of code" alwaysRenderInput={true} selectAllOnFocus={false} maxLength={100} onChange={e => handleTitleChange(e)}/>
        </div>
        <div>
          <AceEditor
            mode="python"
            theme={editorState.theme}
            fontSize={editorState.fontSize}
            value={editorState.value}
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
            <Button
                rightIcon="saved"
                text="Save"
                onClick={handleClickSave}
                large={true}
                outlined={true}
            />
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
