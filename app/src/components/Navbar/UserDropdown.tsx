import React from 'react';
import {Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Popover2 } from "@blueprintjs/popover2";

const UserDropdown: React.FC = () => {

    const UserMenu = (
        <Menu>
            <MenuItem text="Profile" />
            <MenuItem text="Register" />
            <MenuItem text="Login" />
            <MenuItem text="Logout"/>
        </Menu>
    )

    return (
        <Popover2 content={UserMenu} placement="bottom">
            <Button className="bp3-minimal" icon="user" />
        </Popover2>
    )

}

export default UserDropdown; 
