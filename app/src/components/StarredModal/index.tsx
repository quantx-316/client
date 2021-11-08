import React from 'react';
import Modal, {ModalProps} from '../Modal';
import ListStarred from './ListStarred';

export type StarredModalProps = ModalProps;

const StarredModal = (props: StarredModalProps) => {

    return (
        <Modal
            {...props}
        >   
            <ListStarred />
        </Modal>
    )

}

export default StarredModal;
