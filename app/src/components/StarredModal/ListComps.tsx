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
import {removeCompetition} from '../../features/actions/starred';
import {truncateTitle} from '../../features/utils/text';

type ListCompProps = {
    highPriority: Array<any>,
    rest: Array<any>,
}

const ListComps = ({highPriority, rest}: ListCompProps) => {

    const history = useHistory();

    const dispatch = useDispatch();

    const onCompRemove = (compID: number) => {
        dispatch(removeCompetition(compID));
    }

    const onCompClick = (compID: number) => {
        history.push('/competition/' + compID);
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
                            In Progress  
                        </p>
                    </div>
                }
                {
                    //@ts-ignore
                    highPriority.map((comp) => { // high priority ==> executing 

                        return (
                            <ListItem
                                secondaryAction={
                                    <IconButton 
                                        edge="end"
                                        onClick={() => onCompRemove(comp.id)}
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
                                    onClick={() => onCompClick(comp.id)}
                                >
                                    <Text>
                                        {truncateTitle(comp.title)}
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
                    rest.map((comp) => {

                        return (
                            <ListItem
                                secondaryAction={
                                    <IconButton 
                                        edge="end"
                                        onClick={() => onCompRemove(comp.id)}
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
                                    onClick={() => onCompClick(comp.id)}
                                >
                                    <Text>
                                        {truncateTitle(comp.title)}
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

export default ListComps; 
