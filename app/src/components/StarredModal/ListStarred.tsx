import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
  } from '@blueprintjs/core';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ListStarred = () => {

    const dispatch = useDispatch();

    //@ts-ignore 
    const backtests = useSelector(state => state.starred.backtests);
    //@ts-ignore 
    const competitions = useSelector(state => state.starred.competitions);

    return (
        <Tabs
            className="centered-top-col full"
            renderActiveTabPanelOnly={true}
        >

            <Tab
                id="star-back"
                title="Backtests"
                panel={<div></div>}
            />

            <Tab 
                id="star-comp"
                title="Competitions"
                panel={<div></div>}
            />

        </Tabs>
    )

}


export default ListStarred;
