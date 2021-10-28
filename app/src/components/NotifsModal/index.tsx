import React from 'react';
import Modal, {ModalProps} from '../Modal';
import ListNotifs from './ListNotifs';

export type NotifsModalProps = ModalProps;

const NotifsModal = (props: NotifsModalProps) => {

    return (
        <Modal
            {...props}
        >   
            <ListNotifs />
        </Modal>
    )

}

export default NotifsModal;
