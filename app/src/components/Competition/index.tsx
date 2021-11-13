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
import {truncateUsername} from '../../features/utils/text';

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

    const history = useHistory();

    const dispatch = useDispatch();

    //@ts-ignore 
    const starred = comps.hasOwnProperty(props.competition ? props.competition.id : -1);

    const onStarClick = () => {
        if (!props.competition) return; 

        if (starred) {
            dispatch(removeCompetition(props.competition.id));
        } else {
            dispatch(addCompetition(props.competition));
        }
    }

    useEffect(() => {
        console.log(props.competition);
    }, [])

    return (
        <div
            className="full centered-top-col"
            style={{
                marginTop: "20px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
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

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    {/* @ts-ignore */}
                    <p><b>By: </b> 
                        {props.competition && props.competition.owner 
                        ? 
                        <a
                            onClick={
                                //@ts-ignore 
                                () => history.push("/profile/" + props.competition.owner)
                            }
                        >
                            {/* @ts-ignore */}
                            {truncateUsername(props.competition.owner)}
                        </a>
                        
                        : "N/A"}
                    </p>
                </div>

            </div>
            

            {
                // props.backtest && 
                <Tabs
                    className="centered-top-col-lite full"
                    renderActiveTabPanelOnly={true}
                    defaultSelectedTabId={"overview"}
                >
                    <Tab id="overview" title="Overview" panel = {<div />} />
                    <Tab id="submissions" title="Submissions" // your submission vs other submissions
                        panel = {<div />} />
                </Tabs>
            }
           
        </div>
    )

}

export default Competition;
