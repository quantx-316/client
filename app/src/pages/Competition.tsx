import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useParams} from 'react-router';
import Competition from '../components/Competition';
import {getCompetition} from '../features/actions/comps';
import {dispatchErrorMsg} from '../features/utils/notifs';

const CompPage = () => {

    //@ts-ignore 
    const { comp_id } = useParams();

    const dispatch = useDispatch();

    const location = useLocation();

    const [competition, setCompetition] = useState(null);

    const onErrorCallBack = () => {
        //@ts-ignore 
        if (location && location.state && location.state.starred) {
            // came from the starred list 
            // dispatch(removeBacktest(backtest_id));
            dispatchErrorMsg(dispatch, "You are unauthorized or this does not exist anymore, it has been removed from your starred.");
        } else {
            dispatchErrorMsg(dispatch, "You are unauthorized or this does not exist anymore.");
        }

    }

    useEffect(() => {
        //@ts-ignore 
        if (location && location.state && location.state.competition) {
            //@ts-ignore 
            setCompetition(location.state.competition);
        } else {
            dispatch(getCompetition(comp_id, setCompetition, onErrorCallBack));
        }
    }, [comp_id])

    return (
        <Competition 
            //@ts-ignore 
            competition={competition}
        />
    )

}

export default CompPage;
