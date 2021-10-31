import React, {useState, useEffect} from 'react';
import { FormGroup, H5, InputGroup, Intent, Switch, TextArea } from "@blueprintjs/core";

type ProfileEditProps = {
    user: any,
    onFirstNameChange: any,
    onLastNameChange: any, 
    onDescChange: any 
}

const ProfileEdit = (props: ProfileEditProps) => {

    return (

        <div>
            <FormGroup
                labelFor="firstname-input"
                label="First Name"
            >
                <InputGroup 
                    id="firstname-input"
                    value={props.user && props.user.firstname ? props.user.firstname : ""}
                    onChange={props.onFirstNameChange}
                />
            </FormGroup>
            <FormGroup
                labelFor="lastname-input"
                label="Last Name"
            >
                <InputGroup 
                    id="lastname-input"
                    value={props.user && props.user.lastname ? props.user.lastname : ""}
                    onChange={props.onLastNameChange}
                />
            </FormGroup>
            <FormGroup
                labelFor="description-input"
                label="Description"
            >
                <TextArea
                    id="description-input"
                    growVertically={true}
                    large={true}
                    intent={Intent.PRIMARY}
                    value={props.user && props.user.description ? props.user.description : ""}
                    onChange={props.onDescChange}
                />
            </FormGroup>
        </div>


    )

}

export default ProfileEdit; 
