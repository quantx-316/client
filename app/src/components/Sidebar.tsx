import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {Icon, IconSize} from '@blueprintjs/core';
import { Link } from 'react-router-dom';

type SidebarProps = {
    style?: React.CSSProperties
}

const Sidebar: React.FC<SidebarProps> = ({style}) => {

    const activeStyle = {
        background: 'rgba(var(--bs-dark-rgb), 1) !important'
    }

    return (
        <ProSidebar
            collapsed={true}
            style={style}
        >
            <Menu iconShape="circle">
                <MenuItem 
                    icon={<Icon icon="manually-entered-data" size={IconSize.STANDARD} />}
                    active={useLocation().pathname === "/algorithms"}
                    style={
                        useLocation().pathname === "/algorithms" ? 
                        activeStyle : {}
                    }
                >
                    <Link to="/algorithms" />
                </MenuItem>
                <MenuItem>
                
                </MenuItem>
                <MenuItem>
                
                </MenuItem>
            </Menu>

        </ProSidebar>
    )
}

export default Sidebar;