import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Backtest } from '../../features/types/backtest';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { dateStrToDate } from '../../features/utils/time';
import { Text, TextArea } from "@blueprintjs/core";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {removeBacktest} from '../../features/actions/starred';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

type ListBacktestsProps = {
    highPriority: Array<Backtest>,
    rest: Array<Backtest>,
}

const ListBacktests = ({highPriority, rest}: ListBacktestsProps) => {

    const history = useHistory();

    const dispatch = useDispatch();

    const onBacktestClick = (id: number) => {
        history.push({
            pathname: "/backtest/" + id, 
            state: {
                starred: true, 
            }
        });
    }

    const onBacktestRemove = (id: number) => {
        dispatch(removeBacktest(id));
    }

    return (
        <div>

            <List
                className="full centered-top-col"
                style={{
                    maxHeight: "300px",
                    overflow: "auto",
                }}
            >
                {
                    ((!highPriority && !rest) || (
                        highPriority && highPriority.length === 0
                        && rest && rest.length === 0
                        )) && 
                    <div
                        className="centered"
                    >   
                        <h2>
                            None starred
                        </h2>
                    </div>
                }
                {
                    highPriority && highPriority.length > 0 &&
                    <div
                        className="centered"
                    >
                        <p>
                            Executing 
                        </p>
                    </div>
                }
                {
                    //@ts-ignore
                    highPriority.map((back) => { // high priority ==> executing 

                        return (
                            <ListItem
                                secondaryAction={
                                    <IconButton 
                                        edge="end"
                                        onClick={() => onBacktestRemove(back.id)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemButton
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center'
                                    }}
                                    onClick={() => onBacktestClick(back.id)}
                                >
                                    <Text>
                                        {dateStrToDate(back.created).toString()}
                                    </Text>
                                </ListItemButton>
                            </ListItem>

                        )

                    })
                }
                {
                    rest && rest.length > 0 &&
                    <div
                        className="centered"
                    >
                        <p>
                            Finished 
                        </p>
                    </div>
                }
                {
                    rest.map((back) => {

                        return (
                            <ListItem
                                secondaryAction={
                                    <IconButton 
                                        edge="end"
                                        onClick={() => onBacktestRemove(back.id)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                            >

                                <ListItemButton
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                    }}
                                    onClick={() => onBacktestClick(back.id)}
                                >
                                    <Text>
                                        {dateStrToDate(back.created).toString()}
                                    </Text>
                                </ListItemButton>
                            </ListItem>
                        )

                    })
                }

            </List>
        </div>
    )

}

export default ListBacktests; 
