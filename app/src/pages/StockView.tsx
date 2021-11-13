import react from 'react';
import Base from './Base';
import {
    Tab,
    Tabs,
    InputGroup,
    Icon,
    Button,
    FormGroup,
    Menu,
    MenuItem,
    Card,
  } from '@blueprintjs/core';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const StockView: React.FC = () => {

    return (
        <Tabs
            className="centered-top-col-lite full"
            defaultSelectedTabId={"analysis"}
            renderActiveTabPanelOnly={true}
        >
            <Tab id="analysis" title="Analysis" panel = {
                <AnalysisPanel />
            } />
            <Tab id="profiles" title="Profiles" 
                panel = {<ProfilesPanel />} 
            />
        </Tabs>
    )

}

const ProfilesPanel = () => {

    return (
        <div>

        </div>
    )

}

const AnalysisPanel = () => {
    return (
        <div
            className="centered-col"
            style={{
                padding: "10px"
            }}
        >
            <div
                className="centered"
            >
                <div
                    className="centered"
                    style={{
                        width: "400px"
                    }}
                >
                    <p
                        style={{
                            fontSize: "12px"
                        }}
                    >
                        <b>DISCLAIMER: </b>
                        The range of times per stock and the symbols available 
                        are not representative of the symbols and range of times 
                        available for your algorithm. See 'profiles' for available 
                        symbols. Time ranges are automatically retrieved from the database 
                        when running backtests. 
                    </p>
                </div>
            </div>
            <AdvancedRealTimeChart
            
            />
        </div>
    )
}


export default StockView; 