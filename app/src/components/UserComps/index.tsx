import React, {useEffect, useState} from 'react';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch, H2 } from "@blueprintjs/core";
import { Icon, Intent, TreeNodeInfo, Tree } from "@blueprintjs/core";
import { Classes as Popover2Classes, Popover2 } from "@blueprintjs/popover2";
import {useDispatch, useSelector} from 'react-redux';
import {Algo} from '../../features/types/algos';
import {fetchAlgos, deleteAlgo} from '../../features/actions/algos';
import {deleteBacktest, getBacktestByAlgo} from '../../features/actions/backtest';
import {useHistory} from 'react-router-dom';
import {dispatchErrorMsg, dispatchSuccessMsg} from '../../features/utils/notifs';
import {dateStrToDate} from '../../features/utils/time';
import Pagination from '../Pagination';
import Sorting from '../Sorting';
import Searching from '../Searching';
import {
    getUsersSubmittedComps,
    getPendingComps,
    getFinishedComps,
    deleteCompetition, 
    getUserOwnedComps,
} from '../../features/actions/comps';
import {getPagination} from '../../features/utils/pages';

type NodePath = number[];

type TreeAction =
    { type: "DESELECT_ALL" }
    | { type: "SET_IS_SELECTED"; payload: { path: NodePath; isSelected: boolean } }
    | { type: "FETCHED_NODES"; payload: Array<Algo>}

function forEachNode(nodes: TreeNodeInfo[] | undefined, callback: (node: TreeNodeInfo) => void) {
    if (nodes === undefined) {
        return;
    }

    for (const node of nodes) {
        callback(node);
        forEachNode(node.childNodes, callback);
    }
}

function forNodeAtPath(nodes: TreeNodeInfo[], path: NodePath, callback: (node: TreeNodeInfo) => void) {
    callback(Tree.nodeFromPath(path, nodes));
}

type UserCompsProps = {
    title?: string, 
    info?: string, 
    username?: string, // 4 separate searching conditions 
    owner?: string, 
    selectedAlgoID?: number, 
    finished?: boolean, 
}

const UserComps = ({title, info, username, owner, selectedAlgoID, finished}: UserCompsProps) => {

    const history = useHistory();

    //@ts-ignore 
    const user = useSelector(state => state.auth.user);



    const [hoveringInfo, setHoveringInfo] = useState(null);
    const [selectedInfo, setSelectedInfo] = useState(null);

    const [loading, setLoading] = useState(true);
    const [fakeLoading, setFakeLoading] = useState(true);

    useEffect(() => {
        if (fakeLoading) {
            setLoading(true);
        } else {
            const timeoutId = setTimeout(() => setLoading(false), 300);
            return function cleanup() {
                clearTimeout(timeoutId);
            }
        }
    }, [fakeLoading])

    const [compPage, setCompPage] = useState(1);
    const [compSize, setCompSize] = useState(10);
    const [compPagination, setCompPagination] = useState(null);
    const onCompPageChange = (e: any, page: number) => {
        setCompPage(page);
        // MAKE CHANGE 
        fetchCompetitions(
            page, compSize, 
            compAttr, compDir, 
            compSearchAttr, compSearchQuery, 
            compSearchExcl, onCompetitionFetch,
        )
    } 
    const onCompPaginationChange = (pagination: any) => {
        setCompPagination(pagination);
        // MAKE CHANGE 

    }   

    const compAttrsMapping = {
        "Created": "created",
        "Edited At": "edited_at",
        "End Time": "end_time",
        "Test Start": "test_start",
        "Test End": "test_end",
    }
    const [compDir, setCompDir] = useState("desc");
    const onCompDirChange = () => {
        const newDir = compDir === 'asc' ? 'desc' : 'asc';
        setCompDir(newDir);
        fetchCompetitions(
            compPage, compSize, 
            compAttr, newDir, 
            compSearchAttr, compSearchQuery, 
            compSearchExcl, onCompetitionFetch,
        )
    }
    const [compAttr, setCompAttr] = useState("Created")
    const convertCompAttr = (attr: string) => {
        //@ts-ignore 
        return  compAttrsMapping[attr];
    }
    const onCompAttrChange = (newAttr: string) => {
        setCompAttr(newAttr);
        fetchCompetitions(
            compPage, compSize, 
            newAttr, compDir, 
            compSearchAttr, compSearchQuery, 
            compSearchExcl, onCompetitionFetch,
        )
    }

    const compSearchAttrsMapping = {
        "Title": "title",
        "Description": "description",
    }
    const [compSearchAttr, setCompSearchAttr] = useState("Title");
    const convertCompSearchAttr = (searchAttr: string) => {
        //@ts-ignore 
        return compSearchAttrsMapping[searchAttr];
    }
    const onCompSearchAttrChange = (newAttr: string) => {
        setCompSearchAttr(newAttr);
        fetchCompetitions(
            compPage, compSize, 
            compAttr, compDir, 
            newAttr, compSearchQuery, 
            compSearchExcl, onCompetitionFetch,
        )
    }
    const [compSearchExcl, setCompSearchExcl] = useState(false);
    const onCompSearchExclChange = () => {
        const newExcl = !compSearchExcl; 
        setCompSearchExcl(newExcl);
        fetchCompetitions(
            compPage, compSize, 
            compAttr, compDir, 
            compSearchAttr, compSearchQuery, 
            newExcl, onCompetitionFetch,
        )
    }
    const [compSearchQuery, setCompSearchQuery] = useState("");
    const onSearchQueryChange = (searchQuery: string) => {
        setCompSearchQuery(searchQuery);
    }

    function treeExampleReducer(state: any, action: TreeAction) {
        switch (action.type) {
            case "DESELECT_ALL":
                //@ts-ignore 
                const newState1 = state.map((obj) => ({...obj}))

                forEachNode(newState1, node => {node.isSelected = false});
                setSelectedInfo(null);
                return newState1;
            case "SET_IS_SELECTED":
                //@ts-ignore
                const newState2 = state.map((obj) => ({...obj}))
                forNodeAtPath(newState2, action.payload.path, node => {
                    node.isSelected = action.payload.isSelected

                    console.log("FOR NODE AT PATH");

                    //@ts-ignore 
                    if (action.payload.isSelected) {
                        //@ts-ignore
                        setSelectedInfo(node)
                    } else {
                        setSelectedInfo(null);
                    }
                });
                return newState2;
            case "FETCHED_NODES":

                const newState3 = action.payload.map((obj) => (
                    {
                        ...obj, 
                        icon: "social-media",
                        label: obj.title,
                        // //@ts-ignore
                        // secondaryLabel: (obj.result == null ? 
                        //     <b className="nice-red">Executing</b>
                        //     :
                        //     //@ts-ignore
                        //     <b className="nice-green">{obj.score}</b>)
                    }
                ))

                setFakeLoading(false);

                return newState3;
            default:
                return state;
        }
    }

    const [competitions, setCompetitions] = useState([]);


    const fetchCompetitions = (
        page: number, 
        size: number, 
        attr: string, 
        dir: string, 
        search_by: string,
        search_query: string,
        exclusive: boolean,
        callBack?: any,
    ) => {
        const realAttr = convertCompAttr(attr);
        const realSearchAttr = convertCompSearchAttr(search_by);

        if (username !== null && username) {
            redDispatch(
                getUsersSubmittedComps(
                    //@ts-ignore 
                    username, 
                    page, size, 
                    realAttr, dir, 
                    realSearchAttr, search_query, exclusive,
                    callBack,  
                )
            )
        } else if (owner !== null && owner) {
            redDispatch(
                getUserOwnedComps(
                    owner, 
                    page, size, 
                    realAttr, dir, 
                    realSearchAttr, search_query, exclusive,
                    callBack,  
                )
            )
        } else if (selectedAlgoID !== null && selectedAlgoID) {
            // might not want to do this 
        } else if (finished !== null && finished) {
            const func = finished ? getFinishedComps : getPendingComps;

            redDispatch(
                func(
                    page, size, 
                    realAttr, dir, 
                    realSearchAttr, search_query, exclusive,
                    callBack,  
                )
            )
        }
    }

    const onCompetitionFetch = (data: any) => {
        setCompetitions(data.items);
        //@ts-ignore 
        setCompPagination(getPagination(data));
    }

    useEffect(() => {
        setFakeLoading(true);
        fetchCompetitions(
            compPage, compSize, 
            compAttr, compDir, 
            compSearchAttr, compSearchQuery, 
            compSearchExcl, onCompetitionFetch,
        )
    }, [username, selectedAlgoID, finished, owner])


    const [nodes, dispatch] = React.useReducer(treeExampleReducer, []);

    const redDispatch = useDispatch();

    useEffect(() => {

        console.log("use effect");
        console.log(competitions);

        dispatch({
            type: "FETCHED_NODES",
            payload: competitions,
        })
    }, [competitions])

    const onNodeEnter = React.useCallback(
        (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
            //@ts-ignore 
            setHoveringInfo(node);
        },
        [],
    );

    const onNodeLeave = React.useCallback(
        (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
            setHoveringInfo(null);
        },
        [],
    );

    const handleNodeClick = React.useCallback(
        (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
            const originallySelected = node.isSelected;
            dispatch({ type: "DESELECT_ALL" });
            console.log(nodePath);
            dispatch({
                payload: { path: nodePath, isSelected: originallySelected == null ? true : !originallySelected },
                type: "SET_IS_SELECTED",
            });
        },
        [],
    );

    const pageAfterDelete = () => {
        if (compPage > 1 && competitions.length === 1) {
            onCompPageChange(null, compPage-1);
         } else {
            onCompPageChange(null, compPage);
         }
    }

    const onViewClick = () => {

        //@ts-ignore 
        if (selectedInfo && selectedInfo.id) {            
            history.push({
                //@ts-ignore 
                pathname: "/competition/" + selectedInfo.id,
                state: {
                    competition: selectedInfo,
                }
            })
            
            return;
        }

        dispatchErrorMsg(redDispatch, "Invalid selected information");
    }

    const onDeleteClick = () => {
        //@ts-ignore
        if (selectedInfo && selectedInfo.id) {
            //@ts-ignore 
            redDispatch(deleteCompetition(selectedInfo.id, pageAfterDelete));
            return;
        }

        dispatchErrorMsg(redDispatch, "Invalid selected information");
    }

    const [refreshOpen, setRefreshOpen] = useState(false);

    const onRefresh = () => {
        fetchCompetitions(
            compPage, compSize, 
            compAttr, compDir, 
            compSearchAttr, compSearchQuery, 
            compSearchExcl, () => setRefreshOpen(true),
        )
    }

    useEffect(() => {
    
        const timer = setTimeout(() => {
          setRefreshOpen(false);
        }, 1000);
    
        return () => clearTimeout(timer);
    }, [refreshOpen])

    
    const onSearchSubmit = () => {
        setFakeLoading(true);
        fetchCompetitions(
            compPage, compSize, 
            compAttr, compDir, 
            compSearchAttr, compSearchQuery, 
            compSearchExcl, onCompetitionFetch,
        )    
    }

    return (
        <Card
            style={{
                minWidth: "550px",
                minHeight: "500px",
                maxHeight: "500px",
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
                    alignItems: "center",
                    borderBottom: "1px solid #d9e1eb"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >
                    <H1>
                        {
                            title ? 
                            title :
                            "Competitions"
                        }
                    </H1>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        {
                            info && 
                            <Popover2
                                interactionKind="hover" 
                                autoFocus={false}
                                popoverClassName={Popover2Classes.POPOVER2_CONTENT_SIZING} 
                                enforceFocus={false}
                                placement="left" 
                                content={info}
                            >
                                <Button 
                                    className={Classes.BUTTON}
                                    icon={"info-sign"}
                                    minimal={true}
                                />
                            </Popover2>
                        }
                    </div>
                    

                </div>
                    <Popover2 
                        interactionKind="click" 
                        autoFocus={false}
                        popoverClassName={Popover2Classes.POPOVER2_CONTENT_SIZING} 
                        enforceFocus={false}
                        placement="bottom-end" 
                        isOpen={refreshOpen}
                        content="Refreshed"
                    >
                        <Button
                            className={Classes.BUTTON}
                            icon={"refresh"}
                            // intent={"success"}
                            onClick={() => onRefresh()}
                        >
                        </Button>
                    </Popover2>
            </div>
            <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
            >
                <Sorting 
                    attrsMapping={compAttrsMapping}
                    attr={compAttr}
                    onAttrChange={onCompAttrChange}
                    dir={compDir}
                    onDirChange={onCompDirChange}
                />

                <Searching 
                    attrsMapping={compSearchAttrsMapping}
                    attr={compSearchAttr}
                    query={compSearchQuery}
                    onQueryChange={onSearchQueryChange}
                    onAttrChange={onCompSearchAttrChange}
                    exclusive={compSearchExcl}
                    onExclusiveChange={onCompSearchExclChange}
                    onSubmit={onSearchSubmit}
                />

            </div>
        
            {
                nodes && nodes.length > 0 && 

                <Popover2
                    isOpen={!(hoveringInfo==null)}
                    autoFocus={false}
                    enforceFocus={false}
                    content={
                        <Card
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {
                                !(hoveringInfo==null) && 
                                (
                                    <>
                                        <p>
                                            <b>Title: </b>
                                            {/* @ts-ignore */}
                                            {hoveringInfo.title ?? "N/A"}
                                        </p>
                                        <p>
                                            <b>Description: </b> 
                                            {/* @ts-ignore */}
                                            {hoveringInfo.description ?? "N/A"}
                                        </p>
                                        <p>
                                            <b>Owner: </b> 
                                            {/* @ts-ignore */}
                                            {hoveringInfo.owner ?? "N/A"}
                                        </p>
                                        <p> 
                                            <b>Start: </b>
                                            {/* @ts-ignore */}
                                            
                                            {dateStrToDate(hoveringInfo.test_start).toString()}
                                        </p>
                                        <p>
                                            <b>End: </b>
                                            {/* @ts-ignore */}
                                            
                                            {dateStrToDate(hoveringInfo.test_end).toString()}
                                        </p>
                                        <p>
                                            <b>Created: </b>
                                            {/* @ts-ignore */}
                                            
                                            
                                            {dateStrToDate(hoveringInfo.created).toString()}
                                        </p>
                                    </>
                                )
                            }
                        </Card>
                    }
                    placement="left"
                >
                    <Tree
                        contents={nodes}
                        onNodeClick={handleNodeClick}
                        className={`${Classes.ELEVATION_0} ${loading ? "bp3-skeleton" : ""}`}
                        onNodeMouseEnter={onNodeEnter}
                        onNodeMouseLeave={onNodeLeave}
                    />
                </Popover2>
            }

            {
                nodes.length === 0 && 
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <H2>
                        No competitions found
                    </H2>
                </div>
            }

            {
                nodes.length > 0 && !loading && 

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <ButtonGroup>
                        <Button
                            className={Classes.BUTTON}
                            icon={"eye-open"}
                            onClick={() => onViewClick()}
                        >
                            View
                        </Button>

                        {
                            ( (username && user && user.username && user.username === username) ||
                            (owner && user && user.username && user.username === owner) ) && 
                            <Button
                                className={Classes.BUTTON}
                                icon={"trash"}
                                onClick={() => onDeleteClick()}
                            >
                                Delete
                            </Button>
                        }
                    </ButtonGroup>
                

                {
                    !(compPagination==null) && !loading &&

                    <Pagination 
                        pagination={compPagination}
                        onPageChange={onCompPageChange}
                        page={compPage}
                    />

                }

                </div>
            }

        </Card>
    )
}

export default UserComps; 
