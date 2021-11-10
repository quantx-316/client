import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
    Spinner,
  } from '@blueprintjs/core';
  import { Classes, Popover2 } from "@blueprintjs/popover2";
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import Divider from '@mui/material/Divider';
  import ListItemText from '@mui/material/ListItemText';
  import ListItemAvatar from '@mui/material/ListItemAvatar';
  import ListItemButton from '@mui/material/ListItemButton';
  import Avatar from '@mui/material/Avatar';
  import Typography from '@mui/material/Typography';
  import {getBacktestLeaderboard} from '../features/actions/backtest';
  import {dateStrToDate} from '../features/utils/time';
  import Pagination from '../components/Pagination';

const Social: React.FC = () => {
    return (
        <div
            className="full centered-top-col"
            style={{
                marginTop: "20px"
            }}
        >
            <Tabs
                className="centered-top-col full"
            >
                <Tab id="lead" title="Users" panel = {<LeaderboardPanel />} />
                <Tab id="comp" title="Competitions" panel = {<CompetitionPanel />} />
            </Tabs>
        </div>
    )
}

const LeaderboardPanel = () => {

    const [leaderboard, setLeaderboard] = useState({});
    const [leaderboardArr, setLeaderboardArr] = useState([]);

    const dispatch = useDispatch();

    const history = useHistory();

    const onUserClick = (username: string) => {
        history.push('/profile/' + username);
    }

    const [page, setPage] = useState(1);
    const onPageChange = (e: any, newPage: number) => {
        setPage(newPage);
        refreshLeaderboard(newPage, size, attr, dir, usernameQuery);
    }
    const [size, setSize] = useState(10);
    const attrsMapping = {
        "Score": "score",
    }
    const attr = "Score"
    const convertAttr = (attr: string) => {
        //@ts-ignore 
        return attrsMapping[attr];
    }
    const [dir, setDir] = useState("desc");
    const onDirChange = () => {
        const newDir = dir === "desc" ? "asc" : "desc"; 
        setDir(newDir);
        refreshLeaderboard(page, size, attr, newDir, usernameQuery);
    }

    const [usernameQuery, setUsernameQuery] = useState("");
    const onUserNameChange = (e: any) => {
        setUsernameQuery(e.target.value);
    }
    const onSearchSubmit = (e: any) => {
        e.preventDefault();
        setFakeLoading(true);
        refreshLeaderboard(page, size, attr, dir, usernameQuery);
    }

    const onLeaderBoardRefresh = (data: any) => {
        setLeaderboard(data);
        setFakeLoading(false);
    }

    const refreshLeaderboard = (
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        usernameQuery: string,
    ) => {
        dispatch(getBacktestLeaderboard(
            page, 
            size, 
            convertAttr(attr),
            dir,
            usernameQuery,
            onLeaderBoardRefresh,
        ));
    }

    useEffect(() => {
        //@ts-ignore 
        setLeaderboardArr(leaderboard && leaderboard.items ? leaderboard.items : []);
    }, [leaderboard])

    useEffect(() => {
        console.log("SOCIAL LEADERBOARD USE EFFECT")
        refreshLeaderboard(page, size, attr, dir, usernameQuery);
    }, [])

    const onKeyPress = (e: any) => {
        if (e.which === 13) {
            setFakeLoading(true);
            refreshLeaderboard(page, size, attr, dir, usernameQuery);
        }
    }

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

    return (
        <div
            className="full"
        >
            {
                loading && 
                <div
                    className="full centered"
                >
                    <div
                        className="centered"
                    >
                        <Spinner 
                            intent={"primary"}
                            size={100}
                        />
                    </div>
                </div>
            }

            {
                !loading &&
                    <div
                        className="centered-col full"
                        style={{
                            gap: "10px"
                        }}
                    >

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px"
                                        }}
                                    >

                                        <div className="bp3-input-group .modifier">
                                            <span className="bp3-icon bp3-icon-search"></span>
                                            <input 
                                                type="text" 
                                                className="bp3-input" 
                                                placeholder="Search by username" 
                                                value={usernameQuery}
                                                onChange={onUserNameChange}
                                                onKeyPress={onKeyPress}
                                            />
                                            <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"
                                                onClick={onSearchSubmit}
                                            ></button>
                                        </div>

                                        <div>
                                            <Popover2
                                                interactionKind="hover"
                                                placement="right"
                                                popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
                                                autoFocus={false}
                                                enforceFocus={false}
                                                content={dir === "asc" ? "Ascending Score" : "Descending Score"}
                                            >

                                                <Button 
                                                    //@ts-ignore
                                                    icon={dir === "asc" ? "chevron-up" : "chevron-down"}
                                                    onClick={() => onDirChange()}
                                                />
                                            
                                            </Popover2>

                                        </div>

                                    </div>

                        <List 
                                    sx={{bgcolor: 'background.paper' }}
                                >


                                    {
                                        leaderboardArr.map((obj, idx) => {

                                            return (
                                                    <ListItem 
                                                        alignItems="flex-start"
                                                        //@ts-ignore 
                                                        key={obj.username}
                                                    >
                                                        <ListItemButton
                                                            //@ts-ignore 
                                                            onClick={() => onUserClick(obj.username)}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                //@ts-ignore 
                                                                primary={obj.username}
                                                                secondary={
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: "column"
                                                                        }}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                            }}
                                                                        >
                                                                            <p>Highest Score: &nbsp; </p>
                                                                            {/* @ts-ignore */}
                                                                            <p> {obj.score}</p>
                                                                        </div>

                                                                    </div>
                                                                }
                                                            />

                                                        </ListItemButton>
                                                            
                                                    </ListItem>
                                            
                                            )

                                        })
                                    }

                                    {
                                        //@ts-ignore
                                        leaderboard && leaderboard.pagination &&

                                        <Pagination 
                                            //@ts-ignore
                                            pagination={leaderboard.pagination}
                                            onPageChange={onPageChange}
                                            page={page}
                                        />

                                    }

                            </List>
                    </div>
            }
           
        </div>
    
    
    )

}

const CompetitionPanel = () => {

    return (
        <div>
            
        </div>
    )

}


export default Social; 
