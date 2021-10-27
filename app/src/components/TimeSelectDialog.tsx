import React from 'react';

import Modal, {ModalProps} from './Modal';
import TimeSelect, {TimeSelectProps} from './TimeSelect';

export type TimeSelectDialogProps = ModalProps & TimeSelectProps;

const TimeSelectDialog = ({isOpen, handleClose, title, ...props}: TimeSelectDialogProps) => {

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title={title}
        >
            <TimeSelect 
                {...props}
            />
        </Modal>
    )

}

export default TimeSelectDialog; 
