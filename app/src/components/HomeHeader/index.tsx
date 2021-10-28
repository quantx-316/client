import React from 'react';
import { Button, Card, Icon, IconSize, ButtonGroup, Elevation, H1, H3, H4, H5, Label, Slider, Switch } from "@blueprintjs/core";

const HomeHeader: React.FC = () => {


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
                    <H3>
                        Ranking
                    </H3>
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            gap: "5px",
                            justifyContent: "center",
                        }}
                    >
                        <H4>6</H4>
                        <Icon icon={"chevron-up"} intent={"success"} size={IconSize.LARGE}/>
                        {/* intent=danger for decrease, chevron-down for decrease*/}
                    </div>
                    <span
                        style={{
                            fontSize: "10px"
                        }}
                    >
                        Weekly Change
                    </span>
                </div>
                <div
                    className="centered-top-col"
                >
                    <H3>
                        Submissions
                    </H3>
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            gap: "5px",
                            justifyContent: "center",
                        }}
                    >
                        <H4>6</H4>
                        <Icon icon={"chevron-down"} intent={"danger"} size={IconSize.LARGE}/>
                        {/* intent=danger for decrease, chevron-down for decrease*/}
                    </div>
                    <span
                        style={{
                            fontSize: "10px"
                        }}
                    >
                        Weekly Change
                    </span>
                </div>
                <div
                    className="centered-top-col"
                >
                    <H3>
                        Competitions
                    </H3>
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            gap: "5px",
                            justifyContent: "center",
                        }}
                    >
                        <H4>3</H4>
                        <Icon icon={"chevron-up"} intent={"success"} size={IconSize.LARGE}/>
                        {/* intent=danger for decrease, chevron-down for decrease*/}
                    </div>
                    <span
                        style={{
                            fontSize: "10px"
                        }}
                    >
                        Weekly Change
                    </span>
                </div>
            </div>  
        </Card>
    )
}

export default HomeHeader;