import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import { Select, ItemRenderer } from '@blueprintjs/select'
import {useDispatch, useSelector} from 'react-redux';
import {createAlgo, updateAlgo} from '../features/actions/algos';
import {createBacktest} from '../features/actions/backtest';
import { Button, EditableText, MenuItem } from '@blueprintjs/core'
import { Classes, Popover2 } from "@blueprintjs/popover2";
import TimeSelectDialog from './TimeSelectDialog';
import {fetchQuoteAllowedTimes, fetchQuoteIntervals} from '../features/actions/quotes';
import { dispatchErrorMsg, dispatchSuccessMsg } from '../features/utils/notifs';
import {dateToUnix} from '../features/utils/time';

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

  const [popOverOpen, setPopoverOpen] = useState(false);

  // also need dropdown for time interval 
  const [timeIntervals, setTimeIntervals] = useState(null);
  const [timeIntervalsArr, setTimeIntervalsArr] = useState([]);
  const [selectTimeInterval, setSelectTimeInterval] = useState(null); 

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  const [runPopoverOpen, setRunPopoverOpen] = useState(false);

  const clickRunCallback = () => {
    setRunPopoverOpen(true);
  }

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setRunPopoverOpen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [runPopoverOpen])

  const handleClickRun = () => {
    if (timeIntervals == null || minDate == null || maxDate == null) {
      dispatchErrorMsg(dispatch, "Editor state not fully loaded")
      return
    }

    if (startDate == null || endDate == null || selectTimeInterval == null) {
      dispatchErrorMsg(dispatch, "Start/End date & Time Interval required")
      return
    }

    if (algoState == null || algoState.id < 0) {
      dispatchErrorMsg(dispatch, "Current algorithm is not valid, loading failed or not saved yet")
    }

    if (startDate >= endDate) {
      dispatchErrorMsg(dispatch, "End date must be strictly greater than end date");
    }

    const startTime = dateToUnix(startDate);
    const endTime = dateToUnix(endDate);

    //@ts-ignore 
    const realInterval = timeIntervals[selectTimeInterval];

    const submit = {
      algo: algoState.id,
      test_interval: realInterval,
      test_start: startTime,
      test_end: endTime,
    }

    dispatch(createBacktest(submit, clickRunCallback));

  }


  const dispatch = useDispatch();

  const renderTimeInterval: ItemRenderer<string> = (
    timeInterval,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={timeInterval}
        onClick={handleClick}
        text={timeInterval}
      />
    )
  }

  const onTimeIntervalChange = (
    item: any,
    event?: React.SyntheticEvent<HTMLElement, Event> | undefined
  ) => {
    setSelectTimeInterval(item)
  }


  useEffect(() => {
    //@ts-ignore
    setTimeIntervalsArr(Object.keys(timeIntervals ?? {}));
  }, [timeIntervals])

  useEffect(() => {
    fetchQuoteIntervals(dispatch, setTimeIntervals);
  }, [])

  useEffect(() => {
    fetchQuoteAllowedTimes(dispatch, setMinDate, setMaxDate);
  }, [])

  const onStartDateChange = (date: Date) => {
    setStartDate(date);
  }

  const onEndDateChange = (date: Date) => {
    setEndDate(date);
  }

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const onStartDateClose = () => {
    setStartDateOpen(false);
  }
  const onStartDateOpen = () => {
    setStartDateOpen(true);
  }
  const onEndDateClose = () => {
    setEndDateOpen(false);
  }
  const onEndDateOpen = () => {
    setEndDateOpen(true);
  }

  const [isNewAlgo, setIsNewAlgo] = useState(props.algo ? false : true);

  const [algoState, setAlgoState] = useState<Algo>(props.algo ?? 
  {
    id: -1, 
    owner: -1, 
    //@ts-ignore
    title: props.algo ? props.algo.title : '', 
    //@ts-ignore
    code: props.algo ? props.algo.code : defaultValue, 
    //@ts-ignore
    created: props.algo ? props.algo.created : '', 
    //@ts-ignore
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



  useEffect(() => {
    
    const timer = setTimeout(() => {
      setPopoverOpen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [popOverOpen])

  const createAlgoCallBack = (algo: Algo) => {
    setAlgoState(algo);
    setIsNewAlgo(false);
    setPopoverOpen(true);
  }

  const updateAlgoCallBack = (algo: Algo) => {
    setAlgoState(algo);
    setPopoverOpen(true);
  }

  const handleClickSave = () => {
    //after clicking save button

    console.log('handle click save');
    console.log(isNewAlgo);
    console.log(algoState);

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
    <div
      className="full"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "25px"
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: "800px"
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '15px',
              width: '100%'
            }}
          >

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

            <div>
              <label>Tab Size: &nbsp;
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
              </label>
            </div>


            <div>
              <label>Time Interval: &nbsp;
                  <Select
                    items={timeIntervalsArr}
                    itemRenderer={renderTimeInterval}
                    activeItem={selectTimeInterval}
                    onItemSelect={onTimeIntervalChange}
                    filterable={false}
                  >
                    <Button
                      text={selectTimeInterval ?? "None"}
                      rightIcon="double-caret-vertical"
                      outlined={true}
                    />
                  </Select>   
                </label>
            </div>

          </div>

        </div>


        <div
          style={{
            marginBottom: '25px',
            marginTop: '25px'
          }}
        ><label>Title: &nbsp;</label>
          <EditableText placeholder="Enter the title of code" alwaysRenderInput={true} selectAllOnFocus={false} maxLength={100} onChange={e => handleTitleChange(e)} value={algoState.title}/>
        </div>



        <div>
          <AceEditor
            mode="python"
            // readOnly={true}
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
      
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignContent: "center",
              gap: "10px",
              marginBottom: "20px"
            }}
          >

              <Button
                rightIcon="calendar"
                text={startDate ? startDate.toString() : "No start date"}
                onClick={() => onStartDateOpen()}
                outlined={true}
              />


              <Button
                rightIcon="calendar"
                text={endDate ? endDate.toString() : "No end date"}
                onClick={() => onEndDateOpen()}
                outlined={true} 
              />


          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <div style={{marginRight: '10px'}}>
              
              <Popover2 
                interactionKind="click" 
                popoverClassName={Classes.POPOVER2_CONTENT_SIZING} 
                autoFocus={false}
                enforceFocus={false}
                placement="bottom-end" 
                isOpen={popOverOpen}
                content="Saved"
              >
                <Button
                  rightIcon="saved"
                  text={isNewAlgo ? "Create": "Save"}
                  onClick={handleClickSave}
                  large={true}
                  outlined={true}
              /> 
                </Popover2>
            </div>
            <div>
                <Popover2 
                  interactionKind="click" 
                  popoverClassName={Classes.POPOVER2_CONTENT_SIZING} 
                  autoFocus={false}
                  enforceFocus={false}
                  placement="bottom-end" 
                  isOpen={runPopoverOpen}
                  content="Run started"
                >
                  <Button
                    rightIcon="arrow-right"
                    intent="success"
                    text="Run"
                    onClick={handleClickRun}
                    large={true}
                    outlined={true}
                  />
                </Popover2>
            </div>

          </div>

        </div>
      </div>


      <TimeSelectDialog 
        isOpen={startDateOpen}
        handleClose={onStartDateClose}
        title={"Select start date"}
        onDateChange={onStartDateChange}
        minDate={minDate}
        maxDate={maxDate}
      />

      <TimeSelectDialog 
        isOpen={endDateOpen}
        handleClose={onEndDateClose}
        title={"Select end date"}
        onDateChange={onEndDateChange}
        minDate={minDate}
        maxDate={maxDate}
      />

    </div>
  )
}

export default Editor
