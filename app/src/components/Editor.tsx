import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import { Select, ItemRenderer } from '@blueprintjs/select'
import {useDispatch, useSelector} from 'react-redux';
import {createAlgo, updateAlgo} from '../features/actions/algos';
import {createBacktest} from '../features/actions/backtest';
import { Button, EditableText, MenuItem, Switch } from '@blueprintjs/core'
import { Classes, Popover2 } from "@blueprintjs/popover2";
import TimeSelectDialog from './TimeSelectDialog';
import {fetchQuoteAllowedTimes, fetchQuoteIntervals} from '../features/actions/quotes';
import { dispatchErrorMsg, dispatchSuccessMsg } from '../features/utils/notifs';
import {dateToUnix, dateStrToDate} from '../features/utils/time';

import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'

import {Algo} from '../features/types/algos';
import {
  addBacktest,
} from '../features/actions/starred';
import {  
  updateEndDate,
  updateFontSize,
  updateInterval,
  updateStartDate,
  updateTabSize,
  updateTheme,
} from '../features/actions/editor';
import { Satellite } from '@mui/icons-material';

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

  const defaultValue = `
# This function will be called for each candle
def backtest_tick(quote_set, portfolio, quote_history):
  actions = []

  # write code here 

  return actions
`

  //@ts-ignore 
  const algosPublic = useSelector(state => state.settings.algosPublic);
  //@ts-ignore 
  const pendingBackStarred = useSelector(state => state.settings.pendingBackStarred);

  const [popOverOpen, setPopoverOpen] = useState(false);

  const [timeIntervals, setTimeIntervals] = useState(null);
  const [timeIntervalsArr, setTimeIntervalsArr] = useState([]);

  //@ts-ignore 
  const selectTimeInterval = useSelector(state => state.editor.interval);
  //@ts-ignore 
  const startDate = useSelector(state => state.editor.startDate);
  //@ts-ignore 
  const endDate = useSelector(state=>state.editor.endDate);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);
  const [runPopoverOpen, setRunPopoverOpen] = useState(false);

  useEffect(() => {
    if (startDate && minDate && startDate < minDate) {
      dispatch(updateStartDate(minDate));
    }
    if (endDate && maxDate && endDate > maxDate) {
      dispatch(updateEndDate(maxDate));
    }
  }, [endDate, startDate])

  const clickRunCallback = (info: any) => {
    setRunPopoverOpen(true);

    console.log("RUN CALLBACK");
    console.log(info);
    
    if (pendingBackStarred && info && info.id) {
      console.log("hello");

      dispatch(addBacktest(info));
      dispatchSuccessMsg(dispatch, "Backtest added to starred");
    }

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
    dispatch(updateInterval(item));
  }

  useEffect(()=> {

    if (timeIntervalsArr && timeIntervalsArr.length > 0) {
      if (!selectTimeInterval || !(selectTimeInterval in timeIntervalsArr)) {
        dispatch(updateInterval(timeIntervalsArr[0]));
      } 
    }
  }, [timeIntervalsArr])

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
    dispatch(updateStartDate(date));
  }

  const onEndDateChange = (date: Date) => {
    dispatch(updateEndDate(date));
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
    //@ts-ignore
    public: props.algo ? props.algo.public : algosPublic,
  })

  //@ts-ignore 
  const fontSize = useSelector(state=>state.editor.fontSize);
  //@ts-ignore 
  const theme = useSelector(state=>state.editor.theme);
  //@ts-ignore 
  const tabSize = useSelector(state=>state.editor.tabSize);

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
  useEffect(() => {
    if (tabSize && !(tabsize.includes(tabSize))) {
      dispatch(updateTabSize(tabsize[0]));
    }
  }, [tabSize])

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

  const onTabSizeChange = (
    item: any,
    event?: React.SyntheticEvent<HTMLElement, Event> | undefined
  ) => {
    dispatch(updateTabSize(item));
  }

  const handleTitleChange = (_title: string) => {
    setAlgoState({
      ...algoState, 
      title: _title,
    })
  }

  const handlePublicChange = (_public: boolean) => {

    if (isNewAlgo) return;

    const newState = {
      ...algoState,
      //@ts-ignore 
      public: _public,
    }

    // setAlgoState(newState)

    dispatch(updateAlgo(newState, updateAlgoCallBack))
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

    console.log("UPDATE ALGO CALLBACK");

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
        test_start_default: dateToUnix(startDate),
        test_end_default: dateToUnix(endDate),
        //@ts-ignore
        test_interval_default: selectTimeInterval,
        public: algosPublic,
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

            <div>
              <label>Tab Size: &nbsp;
                <Select
                  items={tabsize}
                  itemRenderer={renderFontSize}
                  activeItem={tabSize}
                  onItemSelect={onTabSizeChange}
                  filterable={false}
                >
                  <Button
                    text={tabSize}
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
            marginTop: '25px',
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div>
            <label>Title: &nbsp;
              <EditableText placeholder="Enter the title of code" alwaysRenderInput={true} selectAllOnFocus={false} maxLength={100} onChange={e => handleTitleChange(e)} value={algoState.title}/>
            </label>
          </div>

          <div>
            {
              algoState && !isNewAlgo && 
              <Switch 
                labelElement={<em>Public</em>}
                //@ts-ignore 
                checked={algoState.public}
                onClick={() => handlePublicChange(algoState.public ? false : true)}
              />
            }
          </div>
        </div>

        <div>
          <AceEditor
            mode="python"
            // readOnly={true}
            theme={theme}
            fontSize={fontSize}
            value={algoState.code}
            onChange={onEditorChange}
            width={WIDTH}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              tabSize: tabSize,
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
