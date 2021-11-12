import React, { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from 'react-redux';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
    updateNotifVis
} from '../features/actions/notifs';

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

    //@ts-ignore
    const notif = useSelector(state => state.notif); 

    const hideNotification = () => {
        dispatch(updateNotifVis(false));
    }

    const handleClose = () => {
        hideNotification();
    };

    return (
        <div>

            <Snackbar
                //@ts-ignore
                anchorOrigin={{ vertical, horizontal }}
                open={notif.visibility}
                onClose={handleClose}
                style={{
                    zIndex: 1000000000,
                }}
            >
                {
                    notif.status === "success" ? 
                    <Alert
                        onClose={handleClose}
                        severity="success"
                    >
                        {notif.msg}
                    </Alert>

                    :

                    <Alert
                        onClose={handleClose}
                        severity="error"
                    >
                        {notif.msg}
                    </Alert>
                }
            </Snackbar>
        </div>
    )

}

export default InitNotification; 
