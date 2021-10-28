import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'

const Backtest = () => {

    // const location = useLocation();

    // //@ts-ignore
    // const [tabId, setTabId] = useState(location && location.state && location.state.tab ? location.state.tab : "reg");
  
    const location = useLocation();

    //@ts-ignore
    const [tabId, setTabId] = useState(location && location.state && location.state.tab ? location.state.tab : "reg");


    return (
        <div></div>
    )

}

export default Backtest;
