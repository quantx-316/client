import react from 'react';
import {useLocation} from 'react-router';
import CodeEditor from '../components/Editor';
import Base from './Base';
import {Algo} from '../features/types/algos';

const Editor = () => {

    const location = useLocation();

    return (
        <div>
            <CodeEditor 
                //@ts-ignore
                algo={location && location.state && location.state.algo ? location.state.algo : null}
            />
        </div>
    )
}

export default Editor;