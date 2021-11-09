import React, {useEffect, useState} from 'react';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch, H2 } from "@blueprintjs/core";
import { Icon, Intent, TreeNodeInfo, Tree, Spinner } from "@blueprintjs/core";
import {useSelector, useDispatch} from 'react-redux';
import { Classes as Popover2Classes, Popover2 } from "@blueprintjs/popover2";
import {Algo} from '../../features/types/algos';
import {fetchAlgos, deleteAlgo, selectAlgo} from '../../features/actions/algos';
import {useHistory} from 'react-router-dom';
import {dispatchErrorMsg} from '../../features/utils/notifs';
import {dateStrToDate} from '../../features/utils/time';
import Pagination from '../Pagination';
import Sorting from '../Sorting';
import Searching from '../Searching';
import { BACKTEST_FETCH_FAIL } from '../../features/types/backtest';

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

type AlgosListProps = {
    page: number, 
    onPageChange: any,
    pageAfterDelete: any,
    pagination: any,
    attrsMapping: any, 
    attr: string,
    onAttrChange: any, 
    dir: string,
    onDirChange: any,

    searchAttrsMapping: any, 
    searchAttr: any, 
    onSearchAttrChange: any, 
    searchQuery: string, 
    onSearchQueryChange: any, 
    searchExclusive: boolean, 
    onExclusiveChange: any, 
    onSearchSubmit: any, 
}

const AlgosList  = (props: AlgosListProps) => {
    const redDispatch = useDispatch();

    const history = useHistory();

    const [selectedInfo, setSelectedInfo] = useState(null);

    const [hoveringInfo, setHoveringInfo] = useState(null);


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


    const onNodeEnter = React.useCallback(
        (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
            console.log("ON NODE ENTER");
            console.log(nodePath);
            console.log(node);
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

    useEffect(() => {
        //@ts-ignore
        redDispatch(selectAlgo(selectedInfo ? selectedInfo.id : -1));
    }, [selectedInfo])

    function treeExampleReducer(state: any, action: TreeAction) {
        switch (action.type) {
            case "DESELECT_ALL":
                //@ts-ignore 
                const newState1 = state.map((obj) => ({...obj}))                
                forEachNode(newState1, node => {node.isSelected = false});
                // setSelectedInfo(null);
                // ^ this is edited out because there will always be selected info 
                return newState1;
            case "SET_IS_SELECTED":
                //@ts-ignore 
                const newState2 = state.map((obj) => ({...obj}))                
                forNodeAtPath(newState2, action.payload.path, node => {

                    if (action.payload.isSelected) {
                        //@ts-ignore
                        setSelectedInfo(node)
                    }
                    node.isSelected = true

                    // we will not allow deselection (so that backtest appears)
                });
                return newState2;
            case "FETCHED_NODES":
                const newState3 = action.payload.map((obj) => (
                    {
                        ...obj, 
                        icon: "code",
                        label: obj.title,
                    }
                ))

                if (newState3.length > 0) {
                    newState3[0] = {
                        ...newState3[0], 
                        //@ts-ignore 
                        isSelected: true,
                    }
                    //@ts-ignore
                    setSelectedInfo(newState3[0])
                } else {
                    setSelectedInfo(null);
                    redDispatch({
                        type: BACKTEST_FETCH_FAIL,
                    })
                }

                setFakeLoading(false);

                return newState3;
            default:
                return state;
        }
    }

    const [nodes, dispatch] = React.useReducer(treeExampleReducer, []);

    //@ts-ignore
    const algos = useSelector(state => state.algos.algos);
    
    useEffect(() => {
        dispatch({
            type: "FETCHED_NODES",
            payload: algos,
        })
    }, [algos])

    const handleNodeClick = React.useCallback(
        (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
            const originallySelected = node.isSelected;
            dispatch({ type: "DESELECT_ALL" });
            dispatch({
                payload: { path: nodePath, isSelected: originallySelected == null ? true : !originallySelected },
                type: "SET_IS_SELECTED",
            });
        },
        [],
    );

    const onNewClick = () => {
        history.push({
            pathname: "/editor",
        });
    }

    const onEditClick = () => {

        //@ts-ignore 
        if (selectedInfo && selectedInfo.id) {
            history.push({
                pathname: "/editor",
                state: {
                    algo: selectedInfo,
                }
            });
            return 
        } 

        dispatchErrorMsg(redDispatch, "Invalid selected information");
    }

    const onDeleteClick = () => {
        //@ts-ignore
        if (selectedInfo && selectedInfo.id) {
            //@ts-ignore
            redDispatch(deleteAlgo(selectedInfo.id, props.pageAfterDelete));
            return 
        }

        dispatchErrorMsg(redDispatch, "Invalid selected information");
    }

    return (
        <div>
            {
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
                        <H1>
                            Algorithms
                        </H1>

                        <Button
                            className={Classes.BUTTON}
                            icon={"new-link"}
                            intent={"success"}
                            onClick={() => onNewClick()}
                        >
                            New
                        </Button>
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
                                                    <b>Title: </b>
                                                    {/* @ts-ignore */}
                                                    {hoveringInfo.title}
                                                </p>
                                                <p> 
                                                    <b>Created: </b>
                                                    {/* @ts-ignore */}
                                                    
                                                    {dateStrToDate(hoveringInfo.created).toString()}
                                                </p>
                                                <p>
                                                    <b>Edited: </b>
                                                    {/* @ts-ignore */}
                                                    
                                                    {dateStrToDate(hoveringInfo.edited_at).toString()}
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
                                No algos found
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
                                    icon={"edit"}
                                    onClick={() => onEditClick()}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className={Classes.BUTTON}
                                    icon={"trash"}
                                    onClick={() => onDeleteClick()}
                                >
                                    Delete
                                </Button>
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
            }
        </div>
    )
}

export default AlgosList; 