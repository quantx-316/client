import React, {useEffect, useState} from 'react';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch } from "@blueprintjs/core";
import { Icon, Intent, TreeNodeInfo, Tree } from "@blueprintjs/core";
import { cloneDeep } from "lodash-es";
import { Classes as Popover2Classes, ContextMenu2, Tooltip2 } from "@blueprintjs/popover2";
// real ones will have created, edited_at
const testAlgos = [
    {
        "id": 1,
        "title": "Great algo",
    },
    {
        "id": 2,
        "title": "Another great algo",
    }
]

type NodePath = number[];

type TreeAction =
    | { type: "SET_IS_EXPANDED"; payload: { path: NodePath; isExpanded: boolean } }
    | { type: "DESELECT_ALL" }
    | { type: "SET_IS_SELECTED"; payload: { path: NodePath; isSelected: boolean } };

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

function treeExampleReducer(state: TreeNodeInfo[], action: TreeAction) {
    switch (action.type) {
        case "DESELECT_ALL":
            const newState1 = cloneDeep(state);
            forEachNode(newState1, node => (node.isSelected = false));
            return newState1;
        case "SET_IS_EXPANDED":
            const newState2 = cloneDeep(state);
            forNodeAtPath(newState2, action.payload.path, node => (node.isExpanded = action.payload.isExpanded));
            return newState2;
        case "SET_IS_SELECTED":
            const newState3 = cloneDeep(state);
            forNodeAtPath(newState3, action.payload.path, node => (node.isSelected = action.payload.isSelected));
            return newState3;
        default:
            return state;
    }
}

const AlgosList: React.FC = () => {

    const [algos, setAlgos] = useState([]);

    useEffect(() => {

    }, [])

    const [nodes, dispatch] = React.useReducer(treeExampleReducer, INITIAL_STATE);

    const handleNodeClick = React.useCallback(
        (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
            const originallySelected = node.isSelected;
            if (!e.shiftKey) {
                dispatch({ type: "DESELECT_ALL" });
            }
            dispatch({
                payload: { path: nodePath, isSelected: originallySelected == null ? true : !originallySelected },
                type: "SET_IS_SELECTED",
            });
        },
        [],
    );

    const handleNodeCollapse = React.useCallback((_node: TreeNodeInfo, nodePath: NodePath) => {
        dispatch({
            payload: { path: nodePath, isExpanded: false },
            type: "SET_IS_EXPANDED",
        });
    }, []);

    const handleNodeExpand = React.useCallback((_node: TreeNodeInfo, nodePath: NodePath) => {
        dispatch({
            payload: { path: nodePath, isExpanded: true },
            type: "SET_IS_EXPANDED",
        });
    }, []);

    return (
        <Card
            style={{
                minWidth: "500px",
                minHeight: "200px",
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "center",
                flexDirection: "column",
                gap: "10px"
            }}
            elevation={3}
            interactive={true}
        >
            <div
                style={{
                    height: "10%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #d9e1eb"
                }}
            >
                <H1>
                    <a href="#" style={{textDecoration: "none", color: "inherit"}}>Algorithms</a>
                </H1>

                {/*<Button*/}
                {/*    className={Classes.BUTTON}*/}
                {/*    minimal={true}*/}
                {/*>*/}
                {/*    New Algo*/}
                {/*</Button>*/}
            </div>
            
            <Tree
                contents={nodes}
                onNodeClick={handleNodeClick}
                onNodeCollapse={handleNodeCollapse}
                onNodeExpand={handleNodeExpand}
                className={Classes.ELEVATION_0}
            />

            <ButtonGroup>
                <Button
                    className={Classes.BUTTON}
                    icon={"edit"}
                >
                    Edit
                </Button>
                <Button
                    className={Classes.BUTTON}
                    icon={"trash"}
                >
                    Delete
                </Button>
                <Button
                    className={Classes.BUTTON}
                    icon={"new-link"}
                >
                    New
                </Button>
            </ButtonGroup>
            
            {/*{*/}
            {/*    testAlgos.map((testAlgo) => {*/}
            {/*    })  */}
            {/*}*/}

        </Card>
    )
}

const contentSizing = { popoverProps: { popoverClassName: Popover2Classes.POPOVER2_CONTENT_SIZING } };

/* tslint:disable:object-literal-sort-keys so childNodes can come last */
const INITIAL_STATE: TreeNodeInfo[] = [
    {
        id: 0,
        icon: "document",
        label: "Item 0"
    },
    {
        id: 1,
        icon: "document",
        label: "Item 1"
    },
    {
        id: 2,
        icon: "document",
        label: "Item 2",
    },
    {
        id: 3,
        icon: "document",
        label: "Item 0"
    },
    {
        id: 4,
        icon: "document",
        label: "Item 1"
    },
    {
        id: 5,
        icon: "document",
        label: "Item 2",
    },
    {
        id: 6,
        icon: "document",
        label: "Item 0"
    },
    {
        id: 7,
        icon: "document",
        label: "Item 1"
    },
    {
        id: 8,
        icon: "document",
        label: "Item 2",
    },
    {
        id: 9,
        icon: "document",
        label: "Item 0"
    },
    {
        id: 10,
        icon: "document",
        label: "Item 1"
    },
    {
        id: 11,
        icon: "document",
        label: "Item 11",
    },
    {
        id: 12,
        icon: "document",
        label: "Item 0"
    },
    {
        id: 13,
        icon: "document",
        label: "Item 1"
    },
    {
        id: 14,
        icon: "document",
        label: "Item 11",
    },
];

export default AlgosList; 