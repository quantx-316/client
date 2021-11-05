import React, {useState, useEffect} from 'react';
import { Backtest } from '../../features/types/backtest';
import { Line } from 'react-chartjs-2'; 
import 'chartjs-adapter-moment';
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
                !executing && (errors == null) && !loading && 
                <Tabs
                    className="centered-top-col-lite full"
                    defaultSelectedTabId={"sum"}
                >
                    <Tab id="sum" title="Summary" panel = {
                        <SummaryPanel data={data} options={options} />
                    } />
                    <Tab id="det" title="Detailed" 
                        panel = {<div></div>} />
                </Tabs>
                // <div
                //     className="full"
                // >
                //     <div
                //         className="full"
                //         style={{
                //             padding: "10px"
                //         }}
                //     >
                //         <h2>Graph: </h2>
                //         <Line
                //             data={data}
                //             //@ts-ignore 
                //             options={options}
                //         />
                //     </div>
                // </div> 
            }

        </div>
    )

}

type SummaryPanelProps = {
    data: any,
    options: any, 
}

const SummaryPanel = ({data, options} : SummaryPanelProps) => {

    return (
        <div
            className="full"
            style={{
                padding: "10px"
            }}
        >
            <h2>Graph: </h2>
            <Line
                data={data}
                //@ts-ignore 
                options={options}
            />
        </div>
    )
}

const DetailedPanel = () => {

    return (
        <div>

        </div>
    )

}

export default BacktestPerformance;
