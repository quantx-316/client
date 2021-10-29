import React from 'react';
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
  import Avatar from '@mui/material/Avatar';
  import Typography from '@mui/material/Typography';

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

    const testLeaderboard = [
        {
            username: "bluedevil",
            score: 15
        },
        {
            username: "cameroncrazy",
            score: 10,
        },
        {
            username: "dook",
            score: 5
        },
        {
            username: "dook",
            score: 5
        },
        {
            username: "dook",
            score: 5
        },
        {
            username: "dook",
            score: 5
        },
        {
            username: "dook",
            score: 5
        },
        {
            username: "dook",
            score: 5
        }
    ]

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        
            {
                testLeaderboard.map((obj, idx) => {

                    return (
                        <>
                            <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={obj.username}
                                        secondary={
                                            <React.Fragment>
                                                {/* <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                                >
                                                Ali Connors
                                                </Typography> */}
                                                Score: {obj.score}
                                            </React.Fragment>
                                        }
                                    />
                            </ListItem>

                            {
                                idx < testLeaderboard.length-1 ?
                                <Divider variant="inset" component="li" />
                                :
                                <></>
                            }
                        </>
                       
                    )

                })
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
