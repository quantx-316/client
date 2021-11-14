import React, {useEffect, useState} from 'react';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
  } from '@blueprintjs/core';
import BacktestEditor from '../Backtest/BacktestEditor';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchErrorMsg } from '../../features/utils/notifs';
import { Backtest } from '../../features/types/backtest';
import BacktestPerformance from '../Backtest/BacktestPerformance';
import {dateStrToDate} from '../../features/utils/time';
import { Classes, Popover2 } from "@blueprintjs/popover2";
import {fetchUserById} from '../../features/actions/users';
import {truncateUsername} from '../../features/utils/text';

import {
    addBacktest,
    removeBacktest,
} from '../../features/actions/starred';
import UserComps from '../UserComps';

type CompEntryProps = {
    entry?: any
}

const CompEntry = (props: CompEntryProps) => {

    //@ts-ignore 
    const backtests = useSelector(state => state.starred.backtests);

    const dispatch = useDispatch();

    const history = useHistory();

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
                    <h1>Competition Entry</h1>
                </div>

            </div>

            <div>
                <div
                    style={{
                        display: 'flex',
                        gap: '5px'
                    }}
                >
                    {
                        props.entry && props.entry.comp_id >= 0 &&
                        <p>
                            <a
                                onClick={() => history.push("/competition/" + props.entry.comp_id)}
                            >
                                Competition 
                            </a>
                        </p>
                    }

                    {
                        props.entry && props.entry.backtest_id >= 0 &&
                        <p>
                            <a
                                onClick={() => history.push("/backtest/" + props.entry.backtest_id)}
                            >
                                Backtest 
                            </a>
                        </p>
                    }
                </div>

                {/* @ts-ignore */}
                <p><b>By: </b> {props.entry && props.entry.owner ? 

                        <a
                            //@ts-ignore 
                            onClick={() => history.push("/profile/" + props.entry.owner)}
                        >
                            {/* @ts-ignore */}
                            {truncateUsername(props.entry.owner)}
                        </a> : "N/A"}
                        
                </p>
            </div>
            

            {
                props.entry && 
                <Tabs
                    className="centered-top-col-lite full"
                    renderActiveTabPanelOnly={true}
                >
                    <Tab id="entry-code" title="Code Snapshot" panel = {<BacktestEditor backtest={props.entry} />} />
                    <Tab id="entry-perf" title="Performance" 
                        panel = {<BacktestPerformance backtest={props.entry} />} />
                </Tabs>
            }
           
        </div>
    )

}

export default CompEntry;
