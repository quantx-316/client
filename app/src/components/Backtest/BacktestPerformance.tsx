import React, {useState, useEffect} from 'react';
import { Backtest } from '../../features/types/backtest';
import { Line } from 'react-chartjs-2'; 
import 'chartjs-adapter-moment';
import { Cell, Column, Table2, TruncatedFormat, JSONFormat } from "@blueprintjs/table";
// import {dateStrToDate} from '../../features/utils/time';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
  } from '@blueprintjs/core';

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
    const [executing, setExecuting] = useState(true);

    /* 
        {
            label: 'Cash',
            data: [...],
        }

        {
            label: 'Portfolio Value',
            data: [...], 

        }
    
    */

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
            //@ts-ignore 
            data: cash,
        }

        const portDataSet = {
            label: 'Portfolio Value',
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

        setLoading(false);

    }   

    const initProcessData = () => {
        //@ts-ignore 
        const rawJSON = JSON.parse(props.backtest.result);
        setRawData(rawJSON);
        if ('errors' in rawJSON) {
            setErrors(rawJSON['errors']);
            setLoading(false);
            return;
        } else { // no error 
            setErrors(null);
            setLoading(true);
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
                <h1>
                    Executing...
                </h1>
            }

            {
                !(errors == null) && !loading && 
                <ul>
                    {
                        errors.map((err) => {

                            return (
                                <li>
                                    {/* @ts-ignore */}
                                    {err.description}
                                </li>
                            )
                        })
                    }
                </ul>
            }

            {
                !executing && loading && 
                <>
                    <h1>
                        Big fat loading. 
                    </h1>
                </>
            }

            {
                !executing && (errors == null) && !loading && rawData && 
                <Tabs
                    className="centered-top-col-lite full"
                    defaultSelectedTabId={"sum"}
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
            <Line
                data={graphData}
                //@ts-ignore 
                options={graphOptions}
            />
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
                <JSONFormat>{portfolio[row].portfolio.positions}</JSONFormat>
            </Cell>
        )
    };
    const renderErrors = (row: number) => {
        return (
            <Cell>
                {'errors' in portfolio[row].portfolio && portfolio[row].portfolio.errors ? 
                    <JSONFormat>
                        {portfolio[row].portfolio.errors}
                    </JSONFormat>
                    :
                    'N/A'
                }
            </Cell>
        )
    }

    return (
        <div
            className="centered full"
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px"
            }}
        >   
            <div>
                <h2>
                    Transactions
                </h2>
                <div
                    style={{
                        height: "300px",
                    }}
                >
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
                </div>
            </div>
            <div>
                <h2>
                    Portfolio 
                </h2>
                <div
                    style={{
                        height: "300px",
                    }}
                >
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
                </div>
            </div>
        </div>
    )

}

export default BacktestPerformance;
