import React, {useEffect} from 'react';
import { Button, Icon, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch } from "@blueprintjs/core";
import {fetchAlgos, deleteAlgo, selectAlgo} from '../features/actions/algos';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import AlgosList from '../components/AlgosList';
import Backtests from '../components/Backtests';
import HomeHeader from '../components/HomeHeader';

export const Home: React.FC = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    //@ts-ignore 
    const algos = useSelector(state => state.algos.algos);

    //@ts-ignore 
    const user = useSelector(state => state.auth.user);

    const onNewClick = () => {
        history.push({
            pathname: "/editor",
        });
    }

    useEffect(() => {
        console.log("fetch algos");
        dispatch(fetchAlgos());
    }, [])

    return (
        <div
            className="full centered-top-col"
            style={{
                padding: "20px"
            }}
        >
            <div
                className="full centered-top-col"
                style={{
                    gap: "10px"
                }}
            >
                <div
                    className="navbar-like"
                >
                    <HomeHeader />
                </div>
                
                {/* <div
                    style={{
                        width: "100%"
                    }}
                >

                    {
                        user && user.username ? 
                        <h1>
                            Welcome back, '{user.username}'.
                        </h1>

                        :

                        <h1>
                            Please try logging in again.
                        </h1>
                    }

                </div> */}

                {
                    algos && algos.length > 0 ? 
                    <div
                        className="full separated-row"
                    >
                        <AlgosList />

                        
                        <div
                            className="centered"
                        >
                        
                            <Icon
                                icon={"chevron-right"}
                                size={100}
                            />

                        </div>


                        <Backtests />
                    </div>

                    :

                    <div
                        className="full centered-col"
                    >
                        <h1
                            className="centered"
                        >
                            Start with an idea.
                        </h1>

                        <div
                            className="centered"
                        >

                            <Button
                                className={Classes.BUTTON}
                                icon={"new-link"}
                                intent={"success"}
                                onClick={() => onNewClick()}
                            >
                                New Algorithm
                            </Button>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}