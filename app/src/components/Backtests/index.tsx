import React, {useEffect, useState} from 'react';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch } from "@blueprintjs/core";
import { Icon, Intent, TreeNodeInfo, Tree } from "@blueprintjs/core";
import { cloneDeep } from "lodash-es";
import { Classes as Popover2Classes, ContextMenu2, Tooltip2 } from "@blueprintjs/popover2";
import {useSelector, useDispatch} from 'react-redux';
import {Algo} from '../../features/types/algos';
import {fetchAlgos, deleteAlgo} from '../../features/actions/algos';
import {deleteBacktest, getBacktestByAlgo} from '../../features/actions/backtest';
import {useHistory} from 'react-router-dom';
import {dispatchErrorMsg, dispatchSuccessMsg} from '../../features/utils/notifs';
import {dateStrToDate} from '../../features/utils/time';

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

const Backtest: React.FC = () => {

    //@ts-ignore 
    const selectedAlgoId = useSelector(state => state.algos.selected_algo_id);

    //@ts-ignore 
    const backtests = useSelector(state => state.backtests.backtests);

    useEffect(() => {

        console.log(selectedAlgoId);
        redDispatch(getBacktestByAlgo(selectedAlgoId));
    }, [selectedAlgoId])

    const history = useHistory();

    const [selectedInfo, setSelectedInfo] = useState(null);

    function treeExampleReducer(state: any, action: TreeAction) {
        switch (action.type) {
            case "DESELECT_ALL":
                const newState1 = cloneDeep(state);
                forEachNode(newState1, node => {node.isSelected = false});
                setSelectedInfo(null);
                return newState1;
            case "SET_IS_SELECTED":
                const newState2 = cloneDeep(state);
                forNodeAtPath(newState2, action.payload.path, node => {
                    node.isSelected = action.payload.isSelected

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
                    }
                ))
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

        // //@ts-ignore 
        // if (selectedInfo && selectedInfo.id) {
        //     history.push({
        //         pathname: "/editor",
        //         state: {
        //             algo: selectedInfo,
        //         }
        //     });
        //     return 
        // } 

        //@ts-ignore 
        if (selectedInfo && selectedInfo.id) {            
            history.push({
                pathname: "/backtest",
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
            redDispatch(deleteBacktest(selectedInfo.id))
            return 
        }

        dispatchErrorMsg(redDispatch, "Invalid selected information");
    }

    return (
        <Card
            style={{
                minWidth: "500px",
                minHeight: "400px",
                maxHeight: "400px",
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
                    Backtests
                </H1>

                {/* <Button
                    className={Classes.BUTTON}
                    icon={"new-link"}
                    intent={"success"}
                    onClick={() => onNewClick()}
                >
                    New
                </Button> */}
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
                        No backtests found
                    </h1>
                </div>
            }

            {
                nodes.length > 0 && 
                <ButtonGroup>
                    <Button
                        className={Classes.BUTTON}
                        icon={"eye-open"}
                        onClick={() => onViewClick()}
                    >
                        View
                    </Button>
                    <Button
                        className={Classes.BUTTON}
                        icon={"trash"}
                        onClick={() => onDeleteClick()}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            }

        </Card>
    )
}

export default Backtest; 
