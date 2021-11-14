import React, {useEffect, useState} from 'react';
import { Button, Icon, Card, H2, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch } from "@blueprintjs/core";
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Backtests from '../../components/Backtests';
import {
    getCompetitionEntries,
    getUserEntryToComp,
    submitBacktest,
} from '../../features/actions/comps';
import { dateStrToDate } from '../../features/utils/time';
import {getPagination} from '../../features/utils/pages';
import EligibleBacktests from './EligibleBacktests';
import { dispatchErrorMsg } from '../../features/utils/notifs';
import {addCompetition} from '../../features/actions/starred';

type CompSubmissionsProp = {
    compID: number, 
    competition: any, 
}

const CompSubmissions = (props: CompSubmissionsProp) => {
    // your submission 

    // back tests

    const history = useHistory();

    //@ts-ignore 
    const user = useSelector(state=>state.auth.user);

    //@ts-ignore 
    const pendingCompStarred = useSelector(state=>state.settings.pendingCompStarred);

    const [backtests, setBacktests] = useState([]);

    useEffect(() => {
        ezFetchSubmissions();
    }, [props.compID])

    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const [pagination, setPagination] = useState(null);

    const attrsMapping = {
        "Score": "score",
        "Test Start": "test_start",
        "Test End": "test_end",
        "Created": "created",
    }
    const searchAttrsMapping = {
        "Code": "code_snapshot",
        "Username": "username",
    }
    const [searchAttr, setSearchAttr] = useState("Username");
    const convertSearchAttr = (searchAttr: string) => {
        //@ts-ignore 
        return searchAttrsMapping[searchAttr];
    }
    const [searchQuery, setSearchQuery] = useState("");
    const [searchExclusive, setSearchExclusive] = useState(false);
    const onSearchAttrChange = (searchAttr: string) => {
        return;
    }
    const onSearchQueryChange = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    }
    const onSearchExclusiveChange = () => {
        const newExcl = !searchExclusive;
        setSearchExclusive(newExcl);
        fetchSubmissions(
            page, 
            size,
            attr, 
            dir, 
            searchAttr, 
            searchQuery, 
            newExcl,
        )
    }
    const [attr, setAttr] = useState("Score");
    const convertAttr = (attr: string) => {
        //@ts-ignore
        return attrsMapping[attr];
    }

    const refreshNodes = (
        page: number, 
        attr: string, 
        dir: string, 
    ) => {
        fetchSubmissions(
            page, 
            size,
            attr, 
            dir, 
            searchAttr, 
            searchQuery, 
            searchExclusive,
        )
    }

    const onAttrChange = (newAttr: string) => {
        setAttr(newAttr);
        refreshNodes(page, newAttr, dir);
    }
    const [dir, setDir] = useState("desc");
    const onDirChange = (newDir: string) => {
        setDir(newDir);
        refreshNodes(page, attr, newDir);
    }
    const onPageChange = (e: any, page: number) => {
        setPage(page);
        refreshNodes(page, attr, dir);
    }
    const onRefreshClick = () => {
        onPageChange(null, page);
    }

    const ezFetchSubmissions = () => {

        fetchSubmissions(
            page, 
            size,
            attr, 
            dir, 
            searchAttr, 
            searchQuery, 
            searchExclusive,
        )
    }

    const onFetch = (data: any) => {
        setBacktests(data.items);
        //@ts-ignore 
        setPagination(getPagination(data));
    }

    const fetchSubmissions = (
        page: number, 
        backtestSize: number, 
        attr: string, 
        dir: string, 
        search_by: string,
        search_query: string,
        exclusive: boolean,
    ) => {

        if (props.compID >= 0) {
            dispatch(getCompetitionEntries(
                props.compID, 
                page, 
                backtestSize, 
                convertAttr(attr), 
                dir, 
                convertSearchAttr(search_by),
                search_query,
                exclusive,
                onFetch
            )
            );
        }
    }

    const onViewClick = (selectedInfo: any) => {
        if (props.compID >= 0 && selectedInfo && selectedInfo.owner) {
            history.push({
                pathname: "/competition/" + props.compID + "/entry/" + selectedInfo.owner,
                state: {
                    entry: selectedInfo,
                }
            })
        }
    }



    const [userSub, setUserSub] = useState(null);

    useEffect(() => {
        if (user && user.username) {
            dispatch(
                getUserEntryToComp(
                    props.compID, user.username, 
                    setUserSub
                )
            )
        }
    }, [])

    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const handleModalClose = () => {
        setSubmitModalOpen(false);
    }
    const handleModalOpen = () => {
        setSubmitModalOpen(true);
    }

    const onCallBack = (data: any) => {
        setUserSub(data);
        ezFetchSubmissions();

        if (pendingCompStarred) {
            dispatch(addCompetition(props.competition))
        }

        handleModalClose();
    }

    const onSubmitClick = (selectedInfo: any) => {
        if (props.compID < 0) {
            dispatchErrorMsg(dispatch, "Invalid comp id, try again later, reload, or report if persists");
            return 
        }
        if (!selectedInfo || selectedInfo.id < 0 || selectedInfo.score < 0) {
            dispatchErrorMsg(dispatch, "Invalid selected information");
            return 
        }

        dispatch(
            submitBacktest(
                props.compID, 
                selectedInfo.id,
                onCallBack,
            )
        )

    }

    return (

        <div
            className="centered-col"
            style={{
                gap: "10px"
            }}
        >
            <div
                className="centered"
            >
                {
                    user && props.competition && props.competition.owner !== user.username &&

                    <Card
                    style={{
                        minWidth: "550px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignContent: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                    elevation={1}
                >
                    <div
                        style={{
                            height: "40px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            className="centered"
                        >
                            <H1>
                                Your Submission
                            </H1>
                        </div>

                        <div
                            className="centered"
                        >
                            <Button
                                className={Classes.BUTTON}
                                icon={"key-enter"}
                                intent={"success"}
                                onClick={() => handleModalOpen()}
                            >
                                New
                            </Button>
                        </div>

                    </div>
                    
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        {
                            userSub &&
                            <>
                            
                                <p>
                                    <b>Score: </b>
                                    {/* @ts-ignore */}
                                    {userSub.score ?? "N/A"}
                                </p>
                                <p>
                                    <b>Interval: </b> 
                                    {/* @ts-ignore */}
                                    {userSub.test_interval}
                                </p>
                                <p> 
                                    <b>Start: </b>
                                    {/* @ts-ignore */}
                                    {dateStrToDate(userSub.test_start).toString()}
                                </p>
                                <p>
                                    <b>End: </b>
                                    {/* @ts-ignore */}
                                    {dateStrToDate(userSub.test_end).toString()}
                                </p>
                                <p>
                                    <b>Created: </b>
                                    {/* @ts-ignore */}
                                    {dateStrToDate(userSub.created).toString()}
                                </p>
                            
                            </>
                        }

                        {
                            !userSub && 
                            <div
                                className="centered"
                            >
                                <H2>
                                    No submission found
                                </H2>
                            </div>
                        }
                    
                    </div>

                </Card>
                }
            </div>
        
            <div
                className="centered"
            >

                <Backtests 
                    title={"All Submissions"}
                    backtests={backtests}
                    info={"User submissions to this competition"}
                    page={page}
                    onPageChange={onPageChange}
                    onViewClick={onViewClick}
                    pagination={pagination}
                    attrsMapping={attrsMapping}
                    attr={attr}
                    onAttrChange={onAttrChange}
                    dir={dir}
                    onDirChange={onDirChange}
                    onRefresh={onRefreshClick}
                    showUser={true}
                
                    searchAttrsMapping={searchAttrsMapping}
                    searchAttr={searchAttr}
                    onSearchAttrChange={onSearchAttrChange}
                    searchQuery={searchQuery}
                    onSearchQueryChange={onSearchQueryChange}
                    searchExclusive={searchExclusive}
                    onExclusiveChange={onSearchExclusiveChange}
                    onSearchSubmit={ezFetchSubmissions}
                />

            </div>

            <EligibleBacktests 
                compID={props.compID}
                title="Select a backtest"
                isOpen={submitModalOpen}
                handleClose={handleModalClose}
                onSubmitClick={onSubmitClick}
            />

        </div>



    )

}

export default CompSubmissions;
