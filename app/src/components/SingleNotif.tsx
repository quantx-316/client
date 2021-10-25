import React, { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from 'react-redux';
import notifsActionsHandler from "../features/actions/notifs";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InitNotification = () => {
    const [state, setState] = useState({
        open: true,
        vertical: 'bottom',
        horizontal: 'center',
      });
    const { vertical, horizontal, open } = state;

    const dispatch = useDispatch();
    const notifActionHandler = new notifsActionsHandler(dispatch);

    //@ts-ignore
    const test = useSelector(state => console.log(state));

    //@ts-ignore
    const notif = useSelector(state => state.notif); 
    console.log(notif);
    const msg = notifActionHandler.getSingleNotifMsg(notif);
    const status = notifActionHandler.getSingleNotifStatus(notif);
    const visibility = notifActionHandler.getSingleNotifVisiblity(notif);
    const title = notifActionHandler.getSingleNotifTitle(notif);

    const hideNotification = () => {
        notifActionHandler.hideNotification();
    }
    
    const getMessage = () => {
        if (status === 'error') {
            return msg ?? "An error has occurred."
        } else if (status === 'success') {
            return msg ?? "Successfully executed."
        }
        return "Fatal Error";
    }

    useEffect(() => {
        notifActionHandler.handleNotifVisibility(true);
    }, [])

    const handleClose = () => {
        notifActionHandler.handleNotifVisibility(false);
      };

    return (
        // <div className={classes.bannerSuperCont}>
        //     {
        //         visibility && 
        //         <FadeNotif 
        //             status={status}
        //             title={title}
        //             onCloseNotif={hideNotification}
        //             message={getMessage()}
        //         />  
        //     }
        // </div>
        <div>
            {/* <Snackbar
            //@ts-ignore
            anchorOrigin={{ vertical, horizontal }}
            open={true}
            onClose={handleClose}
            message="I love snacks"
            key={vertical + horizontal}
            /> */}

            <Snackbar
                //@ts-ignore
                anchorOrigin={{ vertical, horizontal }}
                open={visibility}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                >
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )

}

export default InitNotification; 
