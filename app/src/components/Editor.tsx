import React, { useState } from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

require('ace-builds/src-noconflict/mode-python');
require('ace-builds/src-noconflict/snippets/python');

const Editor: React.FC = () => {

  const defaultValue = `def helloworld():
    print('hello world')
  `

  const [editorState, setEditorState] = useState({
    value: defaultValue,
    fontSize: 14, 
    theme: "solarized_dark",
    tabSize: 4,
  });

  const onEditorChange = (newValue: string) => {
    setEditorState({
      ...editorState,
      value: newValue,
    })
  };

  const onFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditorState({
      ...editorState,
      fontSize: parseInt(e.target.value, 14)
    });
  }

  const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditorState({
      ...editorState, 
      theme: e.target.value,
    })
  }

  const onTabSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditorState({
      ...editorState, 
      tabSize: parseInt(e.target.value, 4)
    })
  }

  return (
    <div>
      <AceEditor
        mode="python"
        theme={editorState.theme}
        value={editorState.value}
        onChange={onEditorChange}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          tabSize: editorState.tabSize 
        }}
      />

    </div>
  )
}

export default Editor;