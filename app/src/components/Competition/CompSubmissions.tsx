import React, {useEffect, useState} from 'react';
import { Button, Icon, Card, H2, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch } from "@blueprintjs/core";
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Backtests from '../../components/Backtests';
import {
    getCompetitionEntries,
    getUserEntryToComp,
} from '../../features/actions/comps';
import {getPagination} from '../../features/utils/pages';

type CompSubmissionsProp = {
    compID: number, 
}

const CompSubmissions = (props: CompSubmissionsProp) => {
    // your submission 

    // back tests

    const history = useHistory();

    //@ts-ignore 
    const user = useSelector(state=>state.auth.user);

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
    }
    const [searchAttr, setSearchAttr] = useState("Code");
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
    const [attr, setAttr] = useState("Created");
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

        if (props.compID > 0) {
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
        console.log("on view click");
        console.log(selectedInfo);
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
                                onClick={() => {}}
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

        </div>



    )

}

export default CompSubmissions;
