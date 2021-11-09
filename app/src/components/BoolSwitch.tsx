import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Code, Label, Switch } from "@blueprintjs/core";
import {
    updateAlgosPublic,
    updateBackStarred,
    updateCompStarred,
} from '../features/actions/settings';

type SwitchingCompProps = {
    switched: boolean, 
    onSwitch: any, 
    desc: string, 
}

const SwitchingComp = (props: SwitchingCompProps) => {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                width: "100%",
                padding: "10px"
            }}
        >
            <div
                className="centered"
            >
                <p>
                    {props.desc}
                </p>
            </div>

            <div
                className="centered"
            >
                <Switch 
                    checked={props.switched}
                    onChange={() => props.onSwitch()}
                    innerLabel="false"
                    innerLabelChecked="true"
                />
            </div>
        </div>
    )

}

export default SwitchingComp; 
