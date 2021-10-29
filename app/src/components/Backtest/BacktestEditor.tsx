import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Backtest } from '../../features/types/backtest';
import { dispatchErrorMsg } from '../../features/utils/notifs';
import AceEditor from 'react-ace'
import { Button, EditableText, MenuItem } from '@blueprintjs/core'
import { Select, ItemRenderer } from '@blueprintjs/select'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'

import {Algo} from '../../features/types/algos';

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

type BacktestProps = {
    backtest?: Backtest
}

const BacktestComp = (props: BacktestProps) => {

    // export interface Backtest {
    //     id: number, 
    //     algo: number, 
    //     owner: number, 
    //     result: string, 
    //     code_snapshot: string, 
    //     test_interval: string,
    //     test_start: Date,
    //     test_end: Date, 
    //     created: Date,
    // }
    const [editorState, setEditorState] = useState({
        fontSize: 14,
        theme: 'solarized_dark',
      })

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
    
    return (
        <div>
            <div>
                <div>
                <label>Theme: &nbsp;
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
                </label>
                </div>

                <div>
                <label>Font Size: &nbsp;
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
                </label>
                </div>

                <AceEditor
                    mode="python"
                    readOnly={true}
                    theme={editorState.theme}
                    fontSize={editorState.fontSize}
                    //@ts-ignore
                    value={props.backtest.code_snapshot}
                    width={WIDTH}
                    setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    // tabSize: editorState.tabSize,
                    }}
                />
            </div>
        </div>
    )

}

export default BacktestComp;
