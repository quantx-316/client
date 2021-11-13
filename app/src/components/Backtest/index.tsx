import React, {useEffect, useState} from 'react';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
  } from '@blueprintjs/core';
import BacktestEditor from './BacktestEditor';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchErrorMsg } from '../../features/utils/notifs';
import { Backtest } from '../../features/types/backtest';
import BacktestPerformance from './BacktestPerformance';
import {dateStrToDate} from '../../features/utils/time';
import { Classes, Popover2 } from "@blueprintjs/popover2";
import {fetchUserById} from '../../features/actions/users';

import {
    addBacktest,
    removeBacktest,
} from '../../features/actions/starred';
import UserComps from '../UserComps';

import * as test_data from './test.json';
import * as test_err_data from './test_error.json';

const moment = require('moment');

type BacktestProps = {
    backtest?: Backtest
}

const BacktestComp = (props: BacktestProps) => {

    //@ts-ignore 
    const backtests = useSelector(state => state.starred.backtests);

    const dispatch = useDispatch();

    //@ts-ignore 
    const starred = backtests.hasOwnProperty(props.backtest ? props.backtest.id : -1);

    const onStarClick = () => {
        if (!props.backtest) return; 

        if (starred) {
            dispatch(removeBacktest(props.backtest.id));
        } else {
            dispatch(addBacktest(props.backtest));
        }
    }

    const [owner, setOwner] = useState(null);

    useEffect(() => {

        if (props.backtest && props.backtest.owner) {
            dispatch(fetchUserById(props.backtest.owner, setOwner));
        }

    }, [props.backtest])

    return (
        <div
            className="full centered-top-col"
            style={{
                marginTop: "20px"
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '10px'
                }}
            >
                <div
                    className='centered'
                >
                    <h1>Backtest</h1>
                </div>

                <div
                    className='centered'
                >
                    <Popover2 
                        interactionKind="hover" 
                        popoverClassName={Classes.POPOVER2_CONTENT_SIZING} 
                        autoFocus={false}
                        enforceFocus={false}
                        content={starred ? "Unstar" : "Star"}
                    >
                        <Button 
                            minimal={true}
                            large={true}
                            intent="primary"
                            icon={starred ? "star" : "star-empty"}
                            onClick={() => onStarClick()}
                        />
                    </Popover2>
                </div>

            </div>

            <div>
                <p><b>Submitted:</b> {props.backtest && props.backtest.created ? dateStrToDate(props.backtest.created).toString() : ""}</p>

                {/* @ts-ignore */}
                <p><b>By:</b> {owner && owner.username ? owner.username : "N/A"}</p>
            </div>
            

            {
                props.backtest && 
                <Tabs
                    className="centered-top-col-lite full"
                    renderActiveTabPanelOnly={true}
                >
                    <Tab id="code" title="Code Snapshot" panel = {<BacktestEditor backtest={props.backtest} />} />
                    <Tab id="perf" title="Performance" 
                        panel = {<BacktestPerformance backtest={props.backtest} />} />
                    <Tab id="back-sub" title="Competitions" 
                        panel={<BacktestSubmittedPanel 
                                backtestID={props.backtest && props.backtest.id ? props.backtest.id : -1}
                            />}
                    />
                </Tabs>
            }
           
        </div>
    )

}

type BacktestSubmittedPanelProps = {
    backtestID?: number, 
}

const BacktestSubmittedPanel = ({backtestID}: BacktestSubmittedPanelProps) => {

    return (
        <div
            className="full centered-top-col"
        >
            <UserComps 
                selectedBackID={backtestID}
                title="Participated"
                info="Competitions this backtest was submitted to"
            />
        </div>
    )

}


export default BacktestComp;
