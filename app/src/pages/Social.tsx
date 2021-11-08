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
  } from '@blueprintjs/core';
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
  import Sorting from '../components/Sorting';
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
                <Tab id="lead" title="Global Leaderboard" panel = {<LeaderboardPanel />} />
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
        refreshLeaderboard(newPage, size, attr, dir);
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
        refreshLeaderboard(page, size, attr, newDir);
    }
    const onAttrChange = (newAttr: string) => {
        setAttr(newAttr);
        refreshLeaderboard(page, size, newAttr, dir);
    }

    const refreshLeaderboard = (
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
    ) => {
        dispatch(getBacktestLeaderboard(
            page, 
            size, 
            convertAttr(attr),
            dir,
            setLeaderboard
        ));
    }

    useEffect(() => {
        //@ts-ignore 
        setLeaderboardArr(leaderboard && leaderboard.items ? leaderboard.items : []);
    }, [leaderboard])

    useEffect(() => {
        console.log("SOCIAL LEADERBOARD USE EFFECT")
        refreshLeaderboard(page, size, attr, dir);
    }, [])

    return (
        <List 
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >
                <Sorting 
                    attrsMapping={attrsMapping}
                    attr={attr}
                    onAttrChange={onAttrChange}
                    dir={dir}
                    onDirChange={onDirChange}
                />
            </div>

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
                                                    <p>Score: </p>
                                                    {/* @ts-ignore */}
                                                    <p>{obj.score}</p>
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
    )

}

const CompetitionPanel = () => {

    return (
        <div>
            
        </div>
    )

}


export default Social; 
