import React, {useState, useEffect} from 'react';
import { Backtest } from '../../features/types/backtest';
import { Line } from 'react-chartjs-2'; 
import 'chartjs-adapter-moment';
import { H5, Intent, Label, Slider, Spinner, SpinnerSize, Switch } from "@blueprintjs/core";
import { Cell, Column, Table2, TruncatedFormat, JSONFormat } from "@blueprintjs/table";
// import {dateStrToDate} from '../../features/utils/time';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
    Menu,
    MenuItem,
    Card,
  } from '@blueprintjs/core';
import { Popover2 } from "@blueprintjs/popover2";

type BacktestProps = {
    backtest?: Backtest
}

const options = {
    scales: {
        x: {
            type: 'time'
        }
    }
}

const BacktestPerformance = (props: BacktestProps) => {


    const [data, setData] = useState({
        datasets: [

        ]
    });

    const [rawData, setRawData] = useState({});
    const [errors, setErrors] = useState<null | []>(null);
    const [loading, setLoading] = useState(true);
    const [fakeLoading, setFakeLoading] = useState(true);
    const [executing, setExecuting] = useState(true);

    useEffect(() => {
        if (fakeLoading) {
            setLoading(true);
        } else {
            const timeoutId = setTimeout(() => setLoading(false), 500);
            return function cleanup() {
                clearTimeout(timeoutId);
            }
        }
    }, [fakeLoading])

    const processData = (portfolioArr: any) => {

        console.log('process data');
        console.log(portfolioArr);

        //@ts-ignore 
        const cash = [];
        //@ts-ignore 
        const portVal = [];

        portfolioArr.forEach(function(port: any) {
            
            const cashObj = {
                x: port['time'],
                y: port['portfolio']['cash'],
            }

            const portObj = {
                x: port['time'],
                y: port['portfolio']['value'],
            }

            cash.push(cashObj);
            portVal.push(portObj);
        })

        const cashDataSet = {
            label: 'Cash',
            backgroundColor: "#90EE90",
            borderColor: "#90EE90",
            //@ts-ignore 
            data: cash,
        }

        const portDataSet = {
            label: 'Portfolio Value',
            backgroundColor: "#FF7F7F",
            borderColor: "#FF7F7F",
            //@ts-ignore 
            data: portVal,
        }

        setData({
            ...data,
            datasets: [
                //@ts-ignore 
                cashDataSet,
                //@ts-ignore 
                portDataSet,
            ]
        })

        setFakeLoading(false);

    }   

    const initProcessData = () => {
        //@ts-ignore 
        const rawJSON = JSON.parse(props.backtest.result);
        setRawData(rawJSON);
        if ('errors' in rawJSON) {
            setErrors(rawJSON['errors']);
            setFakeLoading(false);
            return;
        } else { // no error 
            setErrors(null);
            setFakeLoading(true);
            processData(rawJSON['portfolio_over_time']);
        }
    }

    useEffect(() => {
        if (props.backtest && !(props.backtest.result==null)) {
            initProcessData();
            setExecuting(false);
        } else {
            setExecuting(true);
        }
    }, [props.backtest])

    return (
        <div
            className="full"
            style={{
                minWidth: "100%"
            }}
        >

            {
                executing && 
                <div
                    className="full centered"
                >
                    <div
                        className="centered"
                    >
                        <h1>
                            Executing...
                        </h1>
                    </div>
                </div>
            }

            {
                !(errors == null) && !loading && 
                <div
                    className="centered-top-col full"
                >
                    <div
                        className="centered"
                    >
                        <h1>
                            {/* @ts-ignore */}
                            Fatal {errors.length > 1 ? "errors" : "error"} in execution.
                        </h1>
                    </div>

                    {
                        //@ts-ignore 
                        errors.map((err, idx) => {

                            return (
                                <div
                                    className="centered"
                                >
                                    <p>
                                        {/* @ts-ignore */}
                                        <b>{idx + 1}: </b>{err.description}
                                    </p>
                                </div>
                            )

                        })
                    }

                </div>
            }

            {
                !executing && loading && 
                <div
                    className="full centered"
                >
                    <div
                        className="centered"
                    >
                        <Spinner 
                            intent={"primary"}
                            size={200}
                        />
                    </div>
                </div>
            }

            {
                !executing && (errors == null) && !loading && rawData && 
                <Tabs
                    className="centered-top-col-lite full"
                    defaultSelectedTabId={"sum"}
                    renderActiveTabPanelOnly={true}
                >
                    <Tab id="sum" title="Summary" panel = {
                        <SummaryPanel 
                            graphData={data} 
                            graphOptions={options} 
                            rawData={rawData}    
                        />
                    } />
                    <Tab id="det" title="Detailed" 
                        panel = {<DetailedPanel 
                            //@ts-ignore 
                            transactions={rawData.transactions}
                            //@ts-ignore 
                            portfolio={rawData.portfolio_over_time}
                        />} />
                </Tabs>
            }

        </div>
    )

}

type SummaryPanelProps = {
    graphData: any,
    graphOptions: any, 
    rawData: any, 
}

const SummaryPanel = ({graphData, graphOptions, rawData} : SummaryPanelProps) => {

    return (
        <div
            className="full"
            style={{
                padding: "10px"
            }}
        >
            <div>
                <h5>
                    Return On Investment (ROI): {rawData.roi}
                </h5>
                <h5>
                    Final Portfolio Value: {rawData.final_value}
                </h5>
            </div>

            <h2>Graph: </h2>
            <div
                style={{
                    padding: "50px"
                }}
            >
                <Line
                    data={graphData}
                    //@ts-ignore 
                    options={graphOptions}
                />
            </div>
        </div>
    )
}

type DetailedPanelProps = {
    transactions: any, 
    portfolio: any, 
}

const DetailedPanel = ({transactions, portfolio} : DetailedPanelProps) => {

    const renderAction = (row: number) => <Cell>{transactions[row].action}</Cell>;
    const renderSymbol = (row: number) => <Cell>{transactions[row].symbol}</Cell>;
    const renderShares = (row: number) => <Cell>{transactions[row].num_shares}</Cell>;

    const renderTime = (row: number) => {

        return (
            <Cell>
                <TruncatedFormat>
                    {portfolio[row].time}
                </TruncatedFormat>           
            </Cell>
        )
    
    }
    const renderValue = (row: number) => <Cell>{portfolio[row].portfolio.value}</Cell>;
    const renderCash = (row: number) => <Cell>{portfolio[row].portfolio.cash}</Cell>;
    const renderPositions = (row: number) => {
        return (
            <Cell>
                <Popover2
                    content={
                    <Card>
                        <pre>
                            {JSON.stringify(portfolio[row].portfolio.positions, null, 2)}
                        </pre>
                    </Card>
                    }
                    autoFocus={false}
                    enforceFocus={false}
                    interactionKind='hover'
                >
                    <JSONFormat>{portfolio[row].portfolio.positions}</JSONFormat>
                </Popover2>
            </Cell>
        )
    };
    const renderErrors = (row: number) => {

        const error = 'errors' in portfolio[row].portfolio && portfolio[row].portfolio.errors; 

        return (
            <Cell
                interactive={true}
            >
                {error ? 
                    <Popover2
                        content={
                        <Card>
                            <pre>
                                {JSON.stringify(portfolio[row].portfolio.errors, null, 4)}
                            </pre>
                        </Card>
                        }
                        autoFocus={false}
                        enforceFocus={false}
                        interactionKind='hover'
                    >
                        <JSONFormat>
                            {portfolio[row].portfolio.errors}
                        </JSONFormat>
                    </Popover2>
                    :
                    'N/A'
                }
            </Cell>
        )
    }

    const [tab, setTab] = useState('port');

    const SimpleSelectMenu = (
        <Menu>
            <MenuItem 
                text="Transactions"
                onClick={() => setTab('trans')}
            />
            <MenuItem 
                text="Portfolio"
                onClick={() => setTab('port')}
            /> 
        </Menu>
    )

    const TransTable = () => (
        <Table2
            numRows={transactions.length}
        >
            <Column 
                name="Action"
                cellRenderer={renderAction}
            />  

            <Column 
                name="Symbol"
                cellRenderer={renderSymbol}
            />

            <Column 
                name="# Shares"
                cellRenderer={renderShares}
            />  
        </Table2>
    )


    const PortTable = () => {
        return (
            <Table2
                numRows={portfolio.length}
            >
                <Column 
                    name="Time (UTC)"
                    cellRenderer={renderTime}
                />  

                <Column 
                    name="Value"
                    cellRenderer={renderValue}
                />

                <Column 
                    name="Cash"
                    cellRenderer={renderCash}
                />  

                <Column 
                    name="Positions"
                    cellRenderer={renderPositions}
                />

                <Column 
                    name="Errors"
                    cellRenderer={renderErrors}
                />
            </Table2>
        )
    }
    

    return (
        <div
            className="centered full"
            style={{
                display: "flex",
                // flexDirection: "column",
                padding: "20px"
            }}
        >   
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >
                <div>
                    <Popover2
                        content={SimpleSelectMenu}
                        placement="bottom"
                        autoFocus={false}
                        enforceFocus={false}
                    >
                        <Button 
                            text={tab === 'trans' ? "Transactions" : "Portfolio"}
                        />
                    </Popover2>
                </div>
                <div
                    style={{
                        height: "300px",
                    }}
                >
                    {
                        tab === 'trans' &&
                        <TransTable />
                    }
                    {
                        tab === "port" && 
                        <PortTable />
                    }
                </div>
            </div>
        </div>
    )

}

export default BacktestPerformance;
