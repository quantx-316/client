import React from 'react';
import { Button, Card, Icon, IconSize, ButtonGroup, Elevation, H1, H3, H4, H5, Label, Slider, Switch } from "@blueprintjs/core";
import {useSelector} from 'react-redux';
import { NoEncryption } from '@mui/icons-material';
import { Classes as PopoverClasses, Popover2 } from "@blueprintjs/popover2";

type HomeHeaderProps = {
    competitionShow: boolean, 
    onCompetitionShow: any, 
    backtestShow: boolean, 
    onBacktestShow: any, 
}

const HomeHeader = (props: HomeHeaderProps) => {


    //@ts-ignore 
    const algoPagination = useSelector(state => state.algos.pagination);
    //@ts-ignore 
    const backTestPagination = useSelector(state => state.backtests.pagination);


    return (
        <Card
            className="full"
            elevation={1}
            style={{
                gap: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #d9e1eb"
                }}
            >
                <H1>
                   Overview
                </H1>
            </div>
            <div
                className="spaced-row"
            >
                <div
                    className="centered-top-col"
                >
                    <Popover2
                        interactionKind="click"
                        popoverClassName={PopoverClasses.POPOVER2_CONTENT_SIZING}
                        autoFocus={false}
                        enforceFocus={false}
                        content={"Algorithms cannot be disabled"}
                    >
                        <Button
                            className="centered"
                            style={{
                                fontSize: "16px"
                            }}
                            onClick={() => {}}
                        >
                            <b>
                                Algorithms 
                            </b>
                        </Button>
                    </Popover2>

                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            gap: "5px",
                            justifyContent: "center",
                        }}
                    >
                        {
                            algoPagination && 
                            <H4>
                                {algoPagination.total}
                            </H4>
                        }

                        {
                            algoPagination==null && 
                            <H4>
                                -
                            </H4>
                        }
                    </div>
                    <span
                        style={{
                            fontSize: "10px"
                        }}
                    >
                        Total Created
                    </span>
                </div>
                <div
                    className="centered-top-col"
                >
                    <Button
                        className="centered"
                        style={{
                            fontSize: "16px"
                        }}
                        onClick={() => props.onCompetitionShow()}
                    >
                        {
                            props.competitionShow ?
                            <b>
                                Competitions 
                            </b>

                            :

                            'Competitions'
                        }
                    </Button>
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            gap: "5px",
                            justifyContent: "center",
                        }}
                    >
                        <H4>
                            -
                        </H4>
                    </div>
                    <span
                        style={{
                            fontSize: "10px"
                        }}
                    >
                        Total Participated
                    </span>
                </div>
                <div
                    className="centered-top-col"
                >
                    <Button
                        className="centered"
                        style={{
                            fontSize: "16px"
                        }}
                        onClick={() => props.onBacktestShow()}
                    >
                        {
                            props.backtestShow ? 
                            <b>
                                Backtest
                            </b>
                            :
                            'Backtest'
                        }
                    </Button>
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            gap: "5px",
                            justifyContent: "center",
                        }}
                    >
                        {

                        }
                        {
                            backTestPagination && 
                            <H4>
                                {backTestPagination.total}
                            </H4>
                        }

                        {
                            backTestPagination==null && 
                            <H4>
                                -
                            </H4>
                        }
                    </div>
                    <span
                        style={{
                            fontSize: "10px"
                        }}
                    >
                        For Chosen Algorithm 
                    </span>
                </div>
            </div>  
        </Card>
    )
}

export default HomeHeader;