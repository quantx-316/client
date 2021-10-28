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
import notifsActionsHandler from '../../features/actions/notifs';
import { Button } from "@blueprintjs/core";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ListNotifs = () => {

    const dispatch = useDispatch();

    const notifActionHandler = new notifsActionsHandler(dispatch);

    //@ts-ignore 
    const notifs = useSelector(state => state.notif.listNotif);

    return (
        <>

            <List
                className="full centered-top-col"
            >

                {
                    (!notifs || (notifs && notifs.length === 0)) &&

                    <h1>
                        No notifications
                    </h1>

                }

                {
                    //@ts-ignore
                    notifs.map((notif) => {

                        return (

                            <ListItem
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}
                            >
                                {
                                    notif.status === "success" ? 
                                    <Alert
                                        // onClose={handleClose}
                                        severity="success"
                                    >
                                        {notif.msg}
                                    </Alert>

                                    :

                                    <Alert
                                        // onClose={handleClose}
                                        severity="error"
                                    >
                                        {notif.msg}
                                    </Alert>
                                }
                            </ListItem>

                        )

                    })
                }

            </List>

            {
                notifs && notifs.length > 0 &&

                <div
                    style={{
                        width: "100%",
                    }}
                    className="centered"
                >
                    <Button
                        onClick={() => notifActionHandler.clearNotifs()}
                    >
                        Clear All
                    </Button>

                </div>


            }

        </>
    )

}


export default ListNotifs;
