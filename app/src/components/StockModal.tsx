import React from 'react';
import Modal, {ModalProps} from './Modal';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

type StockProps = ModalProps;

const Stock = (props: StockProps) => {


    return (
        <Modal
            {...props}
        >
            <AdvancedRealTimeChart 
            />
        </Modal>
    )

}

export default Stock;
