import react, {useEffect, useState} from 'react';
import Base from './Base';
import {useDispatch} from 'react-redux';
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
import { Classes, Popover2 } from "@blueprintjs/popover2";

import {
    fetchQuoteSymbols
} from '../features/actions/quotes';

import { AdvancedRealTimeChart, CompanyProfile, TechnicalAnalysis } from "react-ts-tradingview-widgets";


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

    const dispatch = useDispatch();

    const [symbolMapping, setSymbolMapping] = useState({});
    // symbol : searchableSymbol

    const [selectedSymbol, setSelectedSymbol] = useState(null);

    const onSymbolChange = (newSymbol: string) => {
        //@ts-ignore 
        setSelectedSymbol(newSymbol);
    }

    const callBack = (data: any) => {
        const newMapping = {};

        data.forEach((obj: any) => {

            //@ts-ignore             
            newMapping[obj.symbol] = obj.searchablesymbol;

        })

        setSymbolMapping(newMapping);
    }

    useEffect(() => {
        dispatch(fetchQuoteSymbols(callBack))
    }, [])

    useEffect(() => {
        if (symbolMapping) {
            onSymbolChange(Object.keys(symbolMapping)[0]);
        }
    }, [symbolMapping])

    type SelectionMenuProps = {
        symbolMapping: any, 
    }

    const SelectionMenu = ({symbolMapping}: SelectionMenuProps) => (
        <Menu>
            {
                symbolMapping ? Object.keys(symbolMapping).map((key) => {

                    console.log(key);

                    return (
                        <MenuItem
                            text={key}
                            onClick={() => onSymbolChange(key)}
                        >
                        </MenuItem>
                    )

                })

                :

                <h1>No symbols</h1>
            }
        </Menu>
    )

    return (
        <div
            className="centered-top-col"
            style={{
                gap: "20px"
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
                        These are the symbols available to you for your algorithms. 
                    </p>
                </div>
            </div>
            <div
                className="centered"
            >
                <Popover2 
                    popoverClassName={Classes.POPOVER2_CONTENT_SIZING} 
                    autoFocus={false}
                    enforceFocus={false}
                    placement="bottom" 
                    content={<SelectionMenu symbolMapping={symbolMapping} />}
                >
                    <Button
                        text={selectedSymbol ?? "No symbol chosen"}
                        large={true}
                        outlined={true}
                    /> 
                </Popover2>
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    padding: "20px"
                }}
            >
                {
                    selectedSymbol && symbolMapping && 
                    <Card
                        style={{
                            minWidth: "550px",
                            minHeight: "500px",
                            maxHeight: "500px",
                            overflow: "auto"
                        }}
                        elevation={1}
                    >
                        <CompanyProfile 
                            //@ts-ignore 
                            symbol={symbolMapping[selectedSymbol]}
                        />
                    </Card>
                }

                {
                    selectedSymbol && symbolMapping &&
                    <Card
                        style={{
                            minWidth: "550px",
                            minHeight: "500px",
                            maxHeight: "500px",
                            overflow: "auto"
                        }}
                        elevation={1}
                        className="centered"
                    >
                        <TechnicalAnalysis 
                            //@ts-ignore 
                            symbol={symbolMapping[selectedSymbol]}
                        />
                    </Card>
                }

            </div>
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
                        The range of times per symbol and the symbols available 
                        are not representative of the symbols and range of times 
                        available for your algorithm. See 'profiles' for available 
                        symbols. Available time ranges are automatically retrieved from the database 
                        and limited for you when running backtests. 
                    </p>
                </div>
            </div>
            <AdvancedRealTimeChart
            
            />
        </div>
    )
}


export default StockView; 