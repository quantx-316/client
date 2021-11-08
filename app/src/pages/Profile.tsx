import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Card, Classes, H1, H5, TextArea} from "@blueprintjs/core";
import {fetchUser, updateUser} from '../features/actions/users';
import ProfileEdit from '../components/ProfileEdit';
import {fetchPublicAlgos} from '../features/actions/algos';
import Sorting from '../components/Sorting';
import Pagination from '../components/Pagination';
import Backtests from '../components/Backtests';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { Classes as Popover2Classes, Popover2 } from "@blueprintjs/popover2";

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

    const [publicAlgos, setPublicAlgos] = useState({});
    const [publicAlgosArr, setPublicAlgosArr] = useState([]);

    useEffect(() => {

        console.log(publicAlgos);
        //@ts-ignore 
        setPublicAlgosArr(publicAlgos && publicAlgos.items ? publicAlgos.items: [])
    }, [publicAlgos])

    const [page, setPage] = useState(1);
    const onPageChange = (e: any, newPage: number) => {
        setPage(newPage);
        refreshPublicAlgos(newPage, size, attr, dir);
    }
    const [size, setSize] = useState(10);
    const attrsMapping = {
        "Score": "score",
        "Test Interval": "test_interval",
        "Test Start": "test_start",
        "Test End": "test_end",
        "Created": "created"
    }
    const [attr, setAttr] = useState("Score");
    const convertAttr = (attr: string) => {
        //@ts-ignore 
        return attrsMapping[attr];
    }
    const [dir, setDir] = useState("desc");
    const onDirChange = (newDir: string) => {
        setDir(newDir);
        refreshPublicAlgos(page, size, attr, newDir);
    }
    const onAttrChange = (newAttr: string) => {
        setAttr(newAttr);
        refreshPublicAlgos(page, size, newAttr, dir);
    }

    const refreshPublicAlgos = (
        page: number, 
        size: number, 
        attr: string, 
        dir: string 
    ) => {
        dispatch(fetchPublicAlgos(
            username, 
            page,
            size,
            convertAttr(attr),
            dir,
            setPublicAlgos
        ))
    }

    useEffect(() => {
        refreshPublicAlgos(page, size, attr, dir)
    }, [username])

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

    const [viewPublicScore, setViewPublicScore] = useState(false);


    return (
        <div
            style={{
                display: "flex",
                gap: "10px"
            }}
        >
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
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignContent: "center",
                                        gap: "10px"
                                    }}                                
                                >
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

                                    <div
                                        className="centered"
                                    >

                                        <Popover2
                                            interactionKind="hover" 
                                            autoFocus={false}
                                            popoverClassName={Popover2Classes.POPOVER2_CONTENT_SIZING} 
                                            enforceFocus={false}
                                            placement="right" 
                                            content={viewPublicScore ? "Close" : "View Public Scores"}
                                        >
                                            <Button
                                                className={Classes.BUTTON}
                                                icon={viewPublicScore ? "chevron-left" : "chevron-right"}
                                                onClick={() => setViewPublicScore(viewPublicScore => !viewPublicScore)}
                                            >
                                            </Button>
                                        </Popover2>

                                    </div>
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
                                        <TextArea
                                            growVertically={true}
                                            large={true}
                                            fill={true}
                                            readOnly={true}
                                        >
                                            {/* @ts-ignore */}
                                            {user.description ?? "N/A"}
                                        </TextArea>
                                    </div>
                                </div>
                            }

                    </Card>
            }

            {
                 !editing && viewPublicScore && publicAlgosArr && publicAlgosArr.length && publicAlgosArr.length > 0 &&
                 <Backtests 
                    title={"Public Scores"}
                    info={"Scores for the best performing backtest per algorithm that the user has made public"}
                    backtests={publicAlgosArr}
                    page={page}
                    onPageChange={onPageChange}
                    //@ts-ignore 
                    pagination={publicAlgos.pagination}
                    attrsMapping={attrsMapping}
                    attr={attr}
                    onAttrChange={onAttrChange}
                    dir={dir}
                    onDirChange={onDirChange}
                 />
            }

            {
                user == null && 
                <H1>Loading</H1>
            }
        </div>
    )
}

export default Profile; 
