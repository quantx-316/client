import React, {useState, useEffect} from 'react';
import { Backtest } from '../../features/types/backtest';
import { Line } from 'react-chartjs-2'; 
import 'chartjs-adapter-moment';
// import {dateStrToDate} from '../../features/utils/time';

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
        <div>

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
                <>
                    <h1>WIP:</h1>

                    <Line
                        data={data}
                        //@ts-ignore 
                        options={options}
                    />

                </>
            }

        </div>
    )

}

export default BacktestPerformance;
