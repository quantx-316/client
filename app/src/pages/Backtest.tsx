import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useParams} from 'react-router';
import Backtest from '../components/Backtest';
import {getBacktestByID} from '../features/actions/backtest';

const BacktestPage = () => {

    //@ts-ignore 
    const { backtest_id } = useParams();

    const dispatch = useDispatch();

    const location = useLocation();

    const [backtest, setBacktest] = useState(null);

    useEffect(() => {
        //@ts-ignore 
        if (location && location.state && location.state.backtest) {
            //@ts-ignore 
            setBacktest(location.state.backtest);
        } else {
            dispatch(getBacktestByID(backtest_id, setBacktest));
        }
    }, [backtest_id])

    return (
        <Backtest 
            //@ts-ignore 
            backtest={backtest}
        />
    )

}

export default BacktestPage;
