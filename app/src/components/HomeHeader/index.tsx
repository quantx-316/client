import React from 'react';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H3, H5, Label, Slider, Switch } from "@blueprintjs/core";

const HomeHeader: React.FC = () => {


    return (
        <Card
            className="full"
            elevation={3}
            interactive={true}
            style={{
                gap: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "space-between"
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
                    <a href="#" style={{textDecoration: "none", color: "inherit"}}>Overview</a>
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
                    <p>
                        Increased by 5 from last week.
                    </p>
                </div>
                <div
                    className="centered-top-col"
                >
                    <H3>
                        Submissions
                    </H3>
                    <p>
                        Submitted 6 more than last week.
                    </p>
                </div>
                <div
                    className="centered-top-col"
                >
                    <H3>
                        Alerts
                    </H3>
                    <p>
                        AAPL increased by 5% from last week.
                    </p>
                </div>
            </div>  
        </Card>
    )
}

export default HomeHeader;