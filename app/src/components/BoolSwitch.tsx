import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Code, Label, Switch, Card } from "@blueprintjs/core";
import {
    updateAlgosPublic,
    updateBackStarred,
    updateCompStarred,
} from '../features/actions/settings';
import { Popover2 } from '@blueprintjs/popover2';

type SwitchingCompProps = {
    switched: boolean, 
    onSwitch: any, 
    desc: string, 
    buttonDesc?: String
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
                {
                    props.buttonDesc &&
                    <Popover2
                        interactionKind="hover"
                        autoFocus={false}
                        enforceFocus={false}
                        content={
                            <Card>
                                {props.buttonDesc}
                            </Card>
                        }
                    >
                        <Switch 
                            checked={props.switched}
                            onChange={() => props.onSwitch()}
                            innerLabel="false"
                            innerLabelChecked="true"
                        />
                    </Popover2>
                }
                {
                    !props.buttonDesc &&
                    <Switch 
                        checked={props.switched}
                        onChange={() => props.onSwitch()}
                        innerLabel="false"
                        innerLabelChecked="true"
                    />
                }
            </div>
        </div>
    )

}

export default SwitchingComp; 
