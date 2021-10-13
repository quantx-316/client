import React, {useState, useEffect} from 'react';
import { Alignment, Classes, H3, H5, InputGroup, Navbar, Switch, Tab, TabId, Tabs } from "@blueprintjs/core";
import Backtests from './Backtests';
import Files from './Files';

type CodeTabsProps = {
    className: string,
}

const CodeTabs: React.FC<CodeTabsProps> = ({...props} : CodeTabsProps) => {

    return (
        <Tabs
            id="CodeTabs"
            {...props}
        >
            <Tab id="files" title="Files" panel={<Backtests />} />
            <Tab id="backtests" title="Backtests" panel={<Files />} />
        </Tabs>
    )
}

export default CodeTabs;