import React, {useEffect} from 'react';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
  } from '@blueprintjs/core';
import BacktestEditor from './BacktestEditor';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchErrorMsg } from '../../features/utils/notifs';
import { Backtest } from '../../features/types/backtest';
import BacktestPerformance from './BacktestPerformance';
import {dateStrToDate} from '../../features/utils/time';

import * as test_data from './test.json';
import * as test_err_data from './test_error.json';

const moment = require('moment');

type BacktestProps = {
    backtest?: Backtest
}

const BacktestComp = (props: BacktestProps) => {

    useEffect(() => {
        console.log('backtest');
        console.log(props.backtest);
    }, [])

    //@ts-ignore 
    const test_info = test_data.default; 
    //@ts-ignore 
    const test_err_info = test_err_data.default;

    return (
        <div
            className="full centered-top-col"
            style={{
                marginTop: "20px"
            }}
        >
            <h1>Backtest</h1>
            
            <p><b>Submitted:</b> {props.backtest && props.backtest.created ? dateStrToDate(props.backtest.created).toString() : ""}</p>
           
            {
                props.backtest && 
                <Tabs
                    className="centered-top-col-lite full"
                    renderActiveTabPanelOnly={true}
                >
                    <Tab id="code" title="Code Snapshot" panel = {<BacktestEditor backtest={props.backtest} />} />
                    <Tab id="perf" title="Performance" 
                        panel = {<BacktestPerformance backtest={props.backtest} />} />
                </Tabs>
            }
           
        </div>
    )

}

export default BacktestComp;
