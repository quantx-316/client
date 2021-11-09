import React, {useEffect, useState} from 'react';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch, H2 } from "@blueprintjs/core";
import { Icon, Intent, TreeNodeInfo, Tree } from "@blueprintjs/core";
import { Classes as Popover2Classes, Popover2 } from "@blueprintjs/popover2";
import {useSelector, useDispatch} from 'react-redux';
import {Algo} from '../../features/types/algos';
import {fetchAlgos, deleteAlgo} from '../../features/actions/algos';
import {deleteBacktest, getBacktestByAlgo} from '../../features/actions/backtest';
import {useHistory} from 'react-router-dom';
import {dispatchErrorMsg, dispatchSuccessMsg} from '../../features/utils/notifs';
import {dateStrToDate} from '../../features/utils/time';
import Pagination from '../Pagination';
import Sorting from '../Sorting';
import Searching from '../Searching';

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

// type BacktestProps = {
//     page: number, 
//     onPageChange: any,
//     pageAfterDelete: any,
//     pagination: any,
// }

type BacktestProps = {
    title?: string,
    info?: string, 
    backtests: any, 
    page: number, 
    onPageChange: any, 
    pageAfterDelete?: any, // if not provided, no delete
    pagination: any, 
    attrsMapping: any, 
    attr: any, 
    onAttrChange: any, 
    dir: any, 
    onDirChange: any, 
    onRefresh?: any, 

    searchAttrsMapping: any, 
    searchAttr: any, 
    onSearchAttrChange: any, 
    searchQuery: string, 
    onSearchQueryChange: any, 
    searchExclusive?: boolean, 
    onExclusiveChange?: any, 
    onSearchSubmit: any, 
}

const Backtest = ({backtests, ...props}: BacktestProps) => {

    const history = useHistory();

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
                        icon: "chart",
                        label: dateStrToDate(obj.created).toString(),
                        //@ts-ignore
                        secondaryLabel: (obj.result == null ? 
                            <b className="nice-red">Executing</b>
                            :
                            //@ts-ignore
                            <b className="nice-green">{obj.score}</b>)
                    }
                ))

                setFakeLoading(false);

                return newState3;
            default:
                return state;
        }
    }

    const [nodes, dispatch] = React.useReducer(treeExampleReducer, []);

    const redDispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCHED_NODES",
            payload: backtests,
        })
    }, [backtests])

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

    const onViewClick = () => {

        //@ts-ignore 
        if (selectedInfo && selectedInfo.id) {            
            history.push({
                //@ts-ignore 
                pathname: "/backtest/" + selectedInfo.id,
                state: {
                    backtest: selectedInfo,
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
            redDispatch(deleteBacktest(selectedInfo.id, props.pageAfterDelete))
            return 
        }

        dispatchErrorMsg(redDispatch, "Invalid selected information");
    }

    const [refreshOpen, setRefreshOpen] = useState(false);

    useEffect(() => {
    
        const timer = setTimeout(() => {
          setRefreshOpen(false);
        }, 1000);
    
        return () => clearTimeout(timer);
    }, [refreshOpen])

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
                            props.title ? 
                            props.title :
                            "Backtests"
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
                            props.info && 
                            <Popover2
                                interactionKind="hover" 
                                autoFocus={false}
                                popoverClassName={Popover2Classes.POPOVER2_CONTENT_SIZING} 
                                enforceFocus={false}
                                placement="left" 
                                content={props.info}
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
                {
                    props.onRefresh &&
                    
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
                            onClick={() => props.onRefresh()}
                        >
                        </Button>
                    </Popover2>
                }
            </div>
            <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
            >
                <Sorting 
                    attrsMapping={props.attrsMapping}
                    attr={props.attr}
                    onAttrChange={props.onAttrChange}
                    dir={props.dir}
                    onDirChange={props.onDirChange}
                />

                <Searching 
                    attrsMapping={props.searchAttrsMapping}
                    attr={props.searchAttr}
                    query={props.searchQuery}
                    onQueryChange={props.onSearchQueryChange}
                    onAttrChange={props.onSearchAttrChange}
                    exclusive={props.searchExclusive}
                    onExclusiveChange={props.onExclusiveChange}
                    onSubmit={props.onSearchSubmit}
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
                                            <b>Score: </b>
                                            {/* @ts-ignore */}
                                            {hoveringInfo.score ?? "N/A"}
                                        </p>
                                        <p>
                                            <b>Interval: </b> 
                                            {/* @ts-ignore */}
                                            {hoveringInfo.test_interval}
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
                        No backtests found
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
                            props.pageAfterDelete && 
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
                    !(props.pagination==null) && !loading &&

                    <Pagination 
                        pagination={props.pagination}
                        onPageChange={props.onPageChange}
                        page={props.page}
                    />

                }

                </div>
            }

        </Card>
    )
}

export default Backtest; 
