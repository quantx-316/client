import React from 'react';
import {useLocation} from 'react-router';
import Backtest from '../components/Backtest';

const BacktestPage = () => {

    const location = useLocation();

    return (
        <Backtest 
            //@ts-ignore 
            backtest={location && location.state && location.state.backtest ? location.state.backtest : null}
        />
    )

}

export default BacktestPage;
