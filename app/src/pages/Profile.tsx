import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Card, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch, H2 } from "@blueprintjs/core";
import {fetchUser} from '../features/actions/users';

const Profile = () => {

    //@ts-ignore 
    const { username } = useParams();

    const location = useLocation();

    const dispatch = useDispatch();

    const [user, setUser] = useState(null);

    useEffect(() => {
        //@ts-ignore 
        if (location && location.state && location.state.user) {
            //@ts-ignore 
            setUser(location.state.user);
        } else {
            // api call for user info 
                // if requesting user is not the owner, only get limited information
            dispatch(fetchUser(username, setUser));
        }
    }, [username])

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
                                    <Button
                                        className={Classes.BUTTON}
                                        icon={"edit"}
                                        onClick={() => {}}
                                    >
                                    </Button>
                                }
                            </div>
                        </div>
                        {
                            //@ts-ignore 
                            user.firstname && 
                            <H5>
                                {/* @ts-ignore */}
                                First Name: {user.firstname}
                            </H5>
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
