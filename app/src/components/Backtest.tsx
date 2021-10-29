import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Backtest } from '../features/types/backtest';
import { dispatchErrorMsg } from '../features/utils/notifs';

type BacktestProps = {
    backtest?: Backtest
}

const BacktestComp = (props: BacktestProps) => {

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if (props.backtest == null) {
            history.push("/home");
            dispatchErrorMsg(dispatch, "No valid backtest information given. Select from Home.")
        }
    }, [])

    return (
        <div>

        </div>
    )

}

export default BacktestComp;
