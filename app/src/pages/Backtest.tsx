import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useParams} from 'react-router';
import Backtest from '../components/Backtest';
import {getBacktestByID} from '../features/actions/backtest';
import {removeBacktest} from '../features/actions/starred';
import {dispatchErrorMsg} from '../features/utils/notifs';

const BacktestPage = () => {

    //@ts-ignore 
    const { backtest_id } = useParams();

    const dispatch = useDispatch();

    const location = useLocation();

    const [backtest, setBacktest] = useState(null);

    const onErrorCallBack = () => {
        //@ts-ignore 
        if (location && location.state && location.state.starred) {
            // came from the starred list 
            dispatch(removeBacktest(backtest_id));
            dispatchErrorMsg(dispatch, "You are unauthorized, it has been removed from your starred");
        } else {
            dispatchErrorMsg(dispatch, "You are unauthorized");
        }

    }

    useEffect(() => {
        //@ts-ignore 
        if (location && location.state && location.state.backtest) {
            //@ts-ignore 
            setBacktest(location.state.backtest);
        } else {
            dispatch(getBacktestByID(backtest_id, setBacktest, onErrorCallBack));
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
