import React, {useEffect, useState} from 'react';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
  } from '@blueprintjs/core';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchErrorMsg } from '../../features/utils/notifs';
import { Comp } from '../../features/types/comp';
import {dateStrToDate} from '../../features/utils/time';
import { Classes, Popover2 } from "@blueprintjs/popover2";
import {fetchUserById} from '../../features/actions/users';

import {
    addCompetition, 
    removeCompetition, 
} from '../../features/actions/starred';

const moment = require('moment');

type CompProps = {
    competition?: Comp
}

const Competition = (props: CompProps) => {

    //@ts-ignore 
    const comps = useSelector(state => state.starred.competitions);

    const dispatch = useDispatch();

    //@ts-ignore 
    const starred = comps.hasOwnProperty(props.competition ? props.competition.id : -1);

    const onStarClick = () => {
        if (!props.competition) return; 

        console.log("star");
        console.log(starred);
        console.log(props.competition.id);

        if (starred) {
            dispatch(removeCompetition(props.competition.id));
        } else {
            dispatch(addCompetition(props.competition));
        }
    }

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
                    <h1>Competition</h1>
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
                {/* <p><b>Submitted:</b> {props.backtest && props.backtest.created ? dateStrToDate(props.backtest.created).toString() : ""}</p> */}

                {/* @ts-ignore */}
                {/* <p><b>By:</b> {owner && owner.username ? owner.username : "N/A"}</p> */}
            </div>
            

            {
                // props.backtest && 
                <Tabs
                    className="centered-top-col-lite full"
                    renderActiveTabPanelOnly={true}
                >
                    <Tab id="code" title="Code Snapshot" panel = {<div />} />
                    <Tab id="perf" title="Performance" 
                        panel = {<div />} />
                </Tabs>
            }
           
        </div>
    )

}

export default Competition;
