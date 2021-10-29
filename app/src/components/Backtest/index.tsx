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

type BacktestProps = {
    backtest?: Backtest
}

const BacktestComp = (props: BacktestProps) => {

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if (props.backtest == null) {
            history.push("/home");
            dispatchErrorMsg(dispatch, "No valid backtest information given, redirected to home.")
        }
    }, [])

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
    
    return (
        <div
            className="full centered-top-col"
            style={{
                marginTop: "20px"
            }}
        >
            <h1>Backtest</h1>
            
            <p>Submitted {props.backtest && props.backtest.created ? props.backtest.created : ""}</p>
            <Tabs
                className="centered-top-col"
            >
                <Tab id="code" title="Code Snapshot" panel = {<BacktestEditor backtest={props.backtest} />} />
                <Tab id="perf" title="Performance" panel = {<div />} />
            </Tabs>
        </div>
    )

}

export default BacktestComp;
