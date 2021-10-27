import React from 'react';
import { AnchorButton, Button, Classes, Code, Dialog, DialogProps, H5, Switch } from "@blueprintjs/core";

export type ModalProps = {
    isOpen: boolean,
    handleClose: any,
    title: string,
}

const Modal: React.FC<ModalProps> = ({isOpen, handleClose, title, children, ...props}) => {

    return (
        <Dialog 
            {...props} 
            title={title}
            autoFocus={true}
            canEscapeKeyClose={true}
            canOutsideClickClose={false}
            enforceFocus={true}
            shouldReturnFocusOnClose={true}
            usePortal={true}
            isOpen={isOpen} 
            onClose={handleClose}
            style={{
                display: "flex",
                justifyContent: "center",
                alignContent: 'center',
            }}
        >
            {children}
        </Dialog>
    )
}

export default Modal;