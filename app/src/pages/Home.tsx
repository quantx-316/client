import React, {useEffect, useState} from 'react';
import { Button, Icon, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch } from "@blueprintjs/core";
import {fetchAlgos, deleteAlgo, selectAlgo} from '../features/actions/algos';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {deleteBacktest, getBacktestByAlgo} from '../features/actions/backtest';
import AlgosList from '../components/AlgosList';
import Backtests from '../components/Backtests';
import HomeHeader from '../components/HomeHeader';
import { PagesRounded } from '@mui/icons-material';

export const Home: React.FC = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    //@ts-ignore 
    const backtests = useSelector(state => state.backtests.backtests);

    //@ts-ignore 
    const algos = useSelector(state => state.algos.algos);
    //@ts-ignore 
    const pagination = useSelector(state => state.algos.pagination);

    const onNewClick = () => {
        history.push({
            pathname: "/editor",
        });
    }

    const fetchNextAlgos = (page: number, size: number, algoAttr: string, algoDir: string) => {
        dispatch(fetchAlgos(page, size, convertAlgoAttr(algoAttr), algoDir));
    }

    const [algoPage, setAlgoPage] = useState(1);
    const [algoSize, setAlgoSize] = useState(10);
    const onAlgoPageChange = (e: any, page: number) => {
        setAlgoPage(page);
        fetchNextAlgos(page, algoSize, algoAttr, algoDir);
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

    const algoAttrsMapping = {
        "Created": "created",
        "Last Edited": "edited_at",
        "Title": "title"
    };
    const [algoAttr, setAlgoAttr] = useState("Last Edited");
    const convertAlgoAttr = (algoAttr: string) => {
        //@ts-ignore
        return algoAttrsMapping[algoAttr];
    }
    const onAlgoAttrChange = (newAttr: string) => {
        setAlgoAttr(newAttr);
        fetchNextAlgos(algoPage, algoSize, newAttr, algoDir);
    }
    const [algoDir, setAlgoDir] = useState("desc");
    const onAlgoDirChange = (newDir: string) => {
        setAlgoDir(newDir);
        fetchNextAlgos(algoPage, algoSize, algoAttr, newDir);
    }

    useEffect(() => {
        fetchNextAlgos(algoPage, algoSize, algoAttr, algoDir);
    }, [])

    //@ts-ignore 
    const selectedAlgoId = useSelector(state => state.algos.selected_algo_id);
    
    const [backtestPage, setBacktestPage] = useState(1);
    const [backtestSize, setBacktestSize] = useState(10);
    //@ts-ignore 
    const backPagination = useSelector(state => state.backtests.pagination);
    const backAttrsMapping = {
        "Score": "score",
        "Test Interval": "test_interval", // this does not do a sort of 1 day vs 1 week, it sorts 1d vs 1w and 'groups' them
        "Test Start": "test_start",
        "Test End": "test_end",
        "Created": "created",
    };
    const [backAttr, setBackAttr] = useState("Created");
    const convertBackAttr = (attr: string) => {
        //@ts-ignore
        return backAttrsMapping[attr];
    }
    const onAttrChange = (newAttr: string) => {
        setBackAttr(newAttr);
        refreshNodes(backtestPage, newAttr, backDir);
    }
    const [backDir, setBackDir] = useState("desc");
    const onDirChange = (newDir: string) => {
        setBackDir(newDir);
        refreshNodes(backtestPage, backAttr, newDir);
    }

    const onPageChange = (e: any, page: number) => {
        setBacktestPage(page);
        refreshNodes(page, backAttr, backDir);
    }

    useEffect(() => {
        onPageChange(null, 1);
    }, [selectedAlgoId])
    const refreshNodes = (page: number, attr: string, dir: string, callBack?: any) => {
        if (selectedAlgoId > 0) {
            dispatch(getBacktestByAlgo(selectedAlgoId, page, backtestSize, convertBackAttr(attr), dir, callBack));
        }
    }

    const pageAfterDelete = () => {
        if (backtestPage > 1 && backtests.length === 1) {
            onPageChange(null, backtestPage-1);
         } else {
            onPageChange(null, backtestPage);
         }
    }

    const onRefreshClick = () => {
        onPageChange(null, backtestPage);
    }

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
                            attrsMapping={algoAttrsMapping}
                            attr={algoAttr}
                            onAttrChange={onAlgoAttrChange}
                            dir={algoDir}
                            onDirChange={onAlgoDirChange}
                        />

                        <Backtests 
                            backtests={backtests}
                            page={backtestPage}
                            onPageChange={onPageChange}
                            pageAfterDelete={pageAfterDelete}
                            pagination={backPagination}
                            attrsMapping={backAttrsMapping}
                            attr={backAttr}
                            onAttrChange={onAttrChange}
                            dir={backDir}
                            onDirChange={onDirChange}
                            onRefresh={onRefreshClick}
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