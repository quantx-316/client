import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch, H2 } from "@blueprintjs/core";
import {fetchUser, updateUser} from '../features/actions/users';
import ProfileEdit from '../components/ProfileEdit';

const Profile = () => {

    //@ts-ignore 
    const { username } = useParams();

    const location = useLocation();

    const dispatch = useDispatch();

    const [user, setUser] = useState(null);

    const [editing, setEditing] = useState(false);

    const onUserChange = (user: any) => {
        setUser(user);
    }

    useEffect(() => {
        //@ts-ignore 
        if (location && location.state && location.state.user) {
            //@ts-ignore 
            onUserChange(location.state.user);
        } else {
            // api call for user info 
                // if requesting user is not the owner, only get limited information
            dispatch(fetchUser(username, onUserChange));
        }
    }, [username])

    const [editUser, setEditUser] = useState(null);

    const onFirstNameChange = (e: any) => {
        setUser({
            //@ts-ignore
            ...user,
            firstname: e.target.value,
        })
    }
    const onLastNameChange = (e: any) => {
        setUser({
            //@ts-ignore 
            ...user, 
            lastname: e.target.value,
        })
    }
    
    const onDescChange = (e: any) => {
        setUser({
            //@ts-ignore 
            ...user, 
            description: e.target.value,
        })
    }

    const userSaveCallback = (user: any) => {
        setUser(user);
        setEditing(false);
    }

    const onSaveClick = () => {
        dispatch(updateUser(user, userSaveCallback))
    }


    return (
        <div>
            {
                user && 

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
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignContent: "center"
                                }}
                            >
                                <H1>
                                    {/* @ts-ignore */}
                                    {user.username}
                                </H1>
                                
                                <div
                                    className="centered"
                                >
                                    {
                                        //@ts-ignore 
                                        user.email && 
                                        (
                                            editing ? 
                                            <Button
                                                className={Classes.BUTTON}
                                                icon={"saved"}
                                                onClick={() => onSaveClick()}
                                            >
                                            </Button>

                                            :

                                            <Button
                                                className={Classes.BUTTON}
                                                icon={"edit"}
                                                onClick={() => setEditing(true)}
                                            >
                                            </Button>
                                        )

                                    }
                                </div>
                            </div>

                            {
                                editing &&

                                <ProfileEdit 
                                    user={user}
                                    onFirstNameChange={onFirstNameChange}
                                    onLastNameChange={onLastNameChange}
                                    onDescChange={onDescChange}
                                />
                            }

                            {
                                !editing && 
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div>
                                        <p>
                                            {/* @ts-ignore */}
                                            <b>First Name: </b>{user.firstname ?? "N/A"}
                                        </p>    
                                        <p>
                                            {/* @ts-ignore */}
                                            <b>Last Name: </b>{user.lastname ?? "N/A"}
                                        </p>                         
                                    </div>
                                    <div>
                                        <H5>
                                            Description
                                        </H5>
                                        <p>
                                            {/* @ts-ignore */}
                                            {user.description ?? "N/A"}
                                        </p>
                                    </div>
                                </div>
                            }

                    </Card>
            }

            {
                user == null && 
                <H1>Loading</H1>
            }
        </div>
    )
}

export default Profile; 
