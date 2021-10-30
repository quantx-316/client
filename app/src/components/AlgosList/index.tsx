import React, {useEffect, useState} from 'react';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch } from "@blueprintjs/core";
import { Icon, Intent, TreeNodeInfo, Tree } from "@blueprintjs/core";
import { cloneDeep } from "lodash-es";
import { Classes as Popover2Classes, ContextMenu2, Tooltip2 } from "@blueprintjs/popover2";
import {useSelector, useDispatch} from 'react-redux';
import {Algo} from '../../features/types/algos';
import {fetchAlgos, deleteAlgo, selectAlgo} from '../../features/actions/algos';
import {useHistory} from 'react-router-dom';
import {dispatchErrorMsg} from '../../features/utils/notifs';
import Pagination from '../Pagination';

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
}

const AlgosList  = (props: AlgosListProps) => {

    const history = useHistory();

    const [selectedInfo, setSelectedInfo] = useState(null);

    useEffect(() => {
        //@ts-ignore
        redDispatch(selectAlgo(selectedInfo ? selectedInfo.id : -1));
    }, [selectedInfo])

    useEffect(() => {
        //@ts-ignore 
        redDispatch(selectAlgo(selectedInfo ? selectedInfo.id : -1));
    }, [])

    function treeExampleReducer(state: any, action: TreeAction) {
        switch (action.type) {
            case "DESELECT_ALL":
                const newState1 = cloneDeep(state);
                forEachNode(newState1, node => {node.isSelected = false});
                // setSelectedInfo(null);
                // ^ this is edited out because there will always be selected info 
                return newState1;
            case "SET_IS_SELECTED":
                const newState2 = cloneDeep(state);
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
                }

                return newState3;
            default:
                return state;
        }
    }

    const [nodes, dispatch] = React.useReducer(treeExampleReducer, []);

    //@ts-ignore
    const algos = useSelector(state => state.algos.algos);
    
    const redDispatch = useDispatch();

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
        <Card
            style={{
                minWidth: "550px",
                minHeight: "450px",
                maxHeight: "450px",
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
            
            {
                nodes && nodes.length > 0 &&
                <Tree
                    contents={nodes}
                    onNodeClick={handleNodeClick}
                    className={Classes.ELEVATION_0}
                />
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
                    <h1>
                        No algos found
                    </h1>
                </div>
            }

            {
                nodes.length > 0 && 
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
                        !(props.pagination==null) &&

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

export default AlgosList; 