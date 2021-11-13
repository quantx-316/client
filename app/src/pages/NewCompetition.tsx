import React, {useEffect, useState} from 'react'; 
import {useLocation} from 'react-router-dom';
import NewComp from '../components/NewComp';

const NewCompetitionPage = () => {

    const [compForm, setCompForm] = useState(null);

    const location = useLocation();

    useEffect(() => {

        console.log("NEW COMPETITION PAGE");
        //@ts-ignore 
        if (location && location.state && location.state.compForm) {

            console.log("comp form");
            //@ts-ignore
            console.log(location.state.compForm);

            //@ts-ignore 
            setCompForm(location.state.compForm);
        }
    }, [])

    //@ts-ignore 
    const updating = location && location.state && location.state.compForm; 

    return (
        <NewComp 
            compForm={compForm}
            //@ts-ignore 
            title={updating ? "Edit Competition" : null}
        />
    )

}

export default NewCompetitionPage;
