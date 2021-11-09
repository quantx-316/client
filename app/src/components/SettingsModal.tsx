import React from 'react'; 
import Modal, {ModalProps} from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import BoolSwitch from './BoolSwitch';
import {
    updateAlgosPublic,
    updateBackStarred,
    updateCompStarred,
} from '../features/actions/settings';

export type SettingsModalProps = ModalProps;

const SettingsModal = (props: SettingsModalProps) => {
    const dispatch = useDispatch();

    //@ts-ignore 
    const algosPublic = useSelector(state => state.settings.algosPublic);

    const onAlgosPubClick = () => {
        dispatch(updateAlgosPublic(!algosPublic));
    }

    //@ts-ignore
    const pendingBackStarred = useSelector(state => state.settings.pendingBackStarred);

    const onPendingBackClick = () => {
        dispatch(updateBackStarred(!pendingBackStarred));
    }

    //@ts-ignore 
    const pendingCompStarred = useSelector(state => state.settings.pendingCompStarred);

    const onPendingCompClick = () => {
        dispatch(updateCompStarred(!pendingCompStarred));
    }

    return (
        <Modal
            {...props}
        >
            <div
                className="centered-top-col full"
                style={{
                    padding: "10px",
                    gap: "10px"
                }}
            >
                <BoolSwitch 
                    switched={algosPublic}
                    onSwitch={onAlgosPubClick}
                    desc={"New algorithms are public by default"}
                />
                <BoolSwitch 
                    switched={pendingBackStarred}
                    onSwitch={onPendingBackClick}
                    desc={"New backtests are starred by default"}
                />
                <BoolSwitch 
                    switched={pendingCompStarred}
                    onSwitch={onPendingCompClick}
                    desc={"Entered competitions are starred by default"}
                />
            </div>
        </Modal>
    )

}

export default SettingsModal; 
