import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import {Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Popover2 } from "@blueprintjs/popover2";

import {logout} from '../../features/actions/auth';

const UserDropdown: React.FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    const goToAuth = (tabId: string) => {
        history.push({
            pathname: "/auth",
            state: {
                tab: tabId,
            }
        })
    }

    const reDirectAfterLogout = () => {
        history.push("/");
    }

    const onLogout = () => {
        dispatch(logout(reDirectAfterLogout));
    }

    //@ts-ignore 
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const UserMenu = (

        isLoggedIn ? 

        <Menu>
            <MenuItem 
                text="Profile" 

            />
            <MenuItem 
                text="Logout" 
                onClick={() => onLogout()}
            />
        </Menu>

        :

        <Menu>
            <MenuItem 
                text="Register" 
                onClick={() => goToAuth("reg")}
            />
            <MenuItem 
                text="Login" 
                onClick={() => goToAuth("log")}
            />
        </Menu>
    )

    return (
        <Popover2 content={UserMenu} placement="bottom">
            <Button className="bp3-minimal" icon="user" />
        </Popover2>
    )

}

export default UserDropdown; 
