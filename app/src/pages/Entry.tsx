import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useParams} from 'react-router';
import Entry from '../components/Entry';
import {getUserEntryToComp} from '../features/actions/comps';
import {dispatchErrorMsg} from '../features/utils/notifs';

const EntryPage = () => {

    //@ts-ignore 
    const { comp_id, username } = useParams();

    const dispatch = useDispatch();

    const location = useLocation();

    const [entry, setEntry] = useState(null);

    useEffect(() => {
        //@ts-ignore 
        if (location && location.state && location.state.entry) {
            //@ts-ignore 
            setEntry(location.state.entry);
        } else {
            dispatch(getUserEntryToComp(comp_id, username, setEntry));
        }
    }, [username])

    return (
        <Entry 
            //@ts-ignore 
            entry={entry}
        />
    )

}

export default EntryPage;
