import React from 'react';
import { Backtest } from '../../features/types/backtest';

type BacktestProps = {
    backtest?: Backtest
}

const BacktestPerformance = (props: BacktestProps) => {

    return (
        <div>

            {
                //@ts-ignore
                props.backtest && props.backtest.result == null && 
                <h1>
                    Executing...
                </h1>
            }

            {
                //@ts-ignore 
                props.backtest && !(props.backtest.result==null) &&

                <>
                    <h1>placeholder performance</h1>

                    <h3>Backtest Results (raw):</h3>
                    <code>
                        {JSON.stringify(props.backtest.result, null, 4)}
                    </code>
                </>
            }

        </div>
    )

}

export default BacktestPerformance;
