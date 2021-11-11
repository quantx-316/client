import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import {Button, Menu, MenuDivider, MenuItem, Card } from '@blueprintjs/core';
import { Popover2 } from "@blueprintjs/popover2";

import {logout} from '../../features/actions/auth';

const UserDropdown: React.FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //@ts-ignore
    const user = useSelector(state => state.auth.user);

    const goToProfile = () => {
        history.push({
            pathname: "/profile/" + user.username ?? "",
            state: {
                user: user,
            }
        })
    }
    
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
                onClick={() => goToProfile()}
            />
            <Popover2
                interactionKind="hover"
                placement="left"
                autoFocus={false}
                enforceFocus={false}
                content={
                    <Card>
                        All local saved information will be cleared.
                    </Card>
                }
                className="full-width"
            >
                <MenuItem 
                    text="Logout" 
                    onClick={() => onLogout()}
                    style={{
                        width: "100%"
                    }}
                />
            </Popover2>
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
        <Popover2 content={UserMenu} placement="bottom" autoFocus={false} enforceFocus={false}>
            <Button className="bp3-minimal" icon="user" />
        </Popover2>
    )

}

export default UserDropdown; 
