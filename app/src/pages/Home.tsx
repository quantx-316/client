import React, {useEffect, useState} from 'react';
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
    const pagination = useSelector(state => state.algos.pagination);

    const onNewClick = () => {
        history.push({
            pathname: "/editor",
        });
    }

    const fetchNextAlgos = (page: number, size: number) => {
        dispatch(fetchAlgos(page, size));
    }

    const [algoPage, setAlgoPage] = useState(1);
    const [algoSize, setAlgoSize] = useState(10);
    const onAlgoPageChange = (e: any, page: number) => {
        setAlgoPage(page);
        fetchNextAlgos(page, algoSize);
    }

    const algoPageAfterDelete = () => {

        console.log(algoPage);
        console.log(algos.length);

        if (algoPage > 1 && algos.length === 1) {
           onAlgoPageChange(null, algoPage-1);
        } else {
            onAlgoPageChange(null, algoPage);
        }
    }

    useEffect(() => {
        fetchNextAlgos(algoPage, algoSize);
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

                {
                    algos && algos.length > 0 ? 
                    <div
                        className="full separated-row"
                    >
                        <AlgosList 
                            page={algoPage}
                            onPageChange={onAlgoPageChange}
                            pageAfterDelete={algoPageAfterDelete}
                            pagination={pagination}
                        />

                        <Backtests 
                        
                        />
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