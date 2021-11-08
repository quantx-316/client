import React from 'react';
import { Backtest } from '../../features/types/backtest';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { dateStrToDate } from '../../features/utils/time';

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

    return (
        <div>

            <List
                className="full centered-top-col"
            >
                {
                    //@ts-ignore
                    highPriority.map((back) => {

                        return (

                            <ListItem
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}
                            >
                                {
                                    <Alert 
                                        severity="error"
                                    >
                                        {dateStrToDate(back.created).toString()}
                                    </Alert>
                                }
                            </ListItem>

                        )

                    })
                }

                {
                    rest.map((back) => {

                        return (
                            <ListItem
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}
                            >
                                {
                                    <Alert 
                                        severity="success"
                                    >
                                        {dateStrToDate(back.created).toString()}
                                    </Alert>
                                }
                            </ListItem>
                        )

                    })
                }

            </List>
        </div>
    )

}

export default ListBacktests; 
