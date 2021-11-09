import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {  
  updateFontSize,
  updateTheme,
} from '../../features/actions/editor';

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


const WIDTH = '800px'

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`))

type BacktestProps = {
    backtest?: Backtest
}

const BacktestComp = (props: BacktestProps) => {

    const dispatch = useDispatch();

    //@ts-ignore 
    const fontSize = useSelector(state => state.editor.fontSize);
    //@ts-ignore 
    const theme = useSelector(state => state.editor.theme);

    useEffect(() => {
      if (theme && !(themes.includes(theme))) {
        dispatch(updateTheme(themes[0]));
      }
    }, [theme])
    useEffect(() => {
      if (fontSize && !(fontsize.includes(fontSize))) {
        dispatch(updateFontSize(fontsize[0]));
      }
    }, [fontSize])


    const onThemeChange = (
        item: any,
        event?: React.SyntheticEvent<HTMLElement, Event> | undefined
      ) => {
        dispatch(updateTheme(item));
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
        dispatch(updateFontSize(item));
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
        <div
          className="centered-top-col"
        >
            <div>
                <div>
                <label>Theme: &nbsp;
                    <Select
                    items={themes}
                    itemRenderer={renderTheme}
                    activeItem={theme}
                    onItemSelect={onThemeChange}
                    filterable={false}
                    >
                    <Button
                        text={theme}
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
                    activeItem={fontSize}
                    onItemSelect={onFontSizeChange}
                    filterable={false}
                    >
                    <Button
                        text={fontSize}
                        rightIcon="double-caret-vertical"
                        outlined={true}
                    />
                    </Select>
                </label>
                </div>

                <AceEditor
                    mode="python"
                    readOnly={true}
                    theme={theme}
                    fontSize={fontSize}
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
