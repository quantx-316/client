import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
    Spinner, 
  } from '@blueprintjs/core';
import ListBacktests from './ListBacktests';
import ListComps from './ListComps';

const ListStarred = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [fakeLoading, setFakeLoading] = useState(true);

    //@ts-ignore 
    const backtests = useSelector(state => state.starred.backtests);
    //@ts-ignore 
    const competitions = useSelector(state => state.starred.competitions);

    const [highBacktestLst, setHighBacktestLst] = useState([]);
    const [restBacktestLst, setRestBacktestLst] = useState([]);
    const [highCompLst, setHighCompLst] = useState([]);
    const [restCompLst, setRestCompLst] = useState([]);

    const processBacktestLst = () => {

        console.log('LIST STARRED PROCESS BACKTESTS');

        if (!backtests) {
            setHighBacktestLst([]);
            setRestBacktestLst([]);
        } else {
            const backtestLst = Object.values(backtests);
            //@ts-ignore 
            const high = backtestLst.filter(backtest => backtest.result === null)
            //@ts-ignore 
            const rest = backtestLst.filter(backtest => backtest.result !== null)
            //@ts-ignore 
            setHighBacktestLst(high);
            //@ts-ignore 
            setRestBacktestLst(rest);
        }
    }

    const processCompLst = () => {
        if (!competitions) {
            setHighCompLst([]);
            setRestCompLst([]);
        } else {
            const compLst = Object.values(competitions);
            //@ts-ignore
            setHighCompLst([]);
            setRestCompLst([]);        
        }
    }

    useEffect(() => {
        processBacktestLst();
        processCompLst();
        if (fakeLoading) {
            setFakeLoading(false);
        }
    }, [backtests, competitions])

    useEffect(() => {
        if (fakeLoading) {
            setLoading(true);
        } else {
            const timeoutId = setTimeout(() => setLoading(false), 500);
            return function cleanup() {
                clearTimeout(timeoutId);
            }
        }
    }, [fakeLoading])

    return (
        <div
            style={{
                padding: "20px"
            }}
            className="centered"
        >

            {
                loading && 
                <div
                    className="full centered"
                >
                    <div
                        className="centered"
                    >
                        <Spinner 
                            intent={"primary"}
                            size={50}
                        />
                    </div>
                </div>
            }

            {
                !loading && 
                <Tabs
                    className="centered-top-col full"
                    renderActiveTabPanelOnly={true}
                >

                    <Tab
                        id="star-back"
                        title="Backtests"
                        panel={
                            <ListBacktests 
                                highPriority={highBacktestLst}
                                rest={restBacktestLst}
                            />
                        }
                    />

                    <Tab 
                        id="star-comp"
                        title="Competitions"
                        panel={
                            <ListComps 
                                highPriority={highCompLst}
                                rest={restCompLst}
                            />
                        }
                    />

                </Tabs>
            }

        </div>

    )

}


export default ListStarred;
