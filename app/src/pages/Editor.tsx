import react from 'react';
import CodeEditor from '../components/Editor';
import Base from './Base';
import {Algo} from '../features/types/algos';

type EditorProps = {
    algo?: Algo
}

const Editor = (props: EditorProps) => {

    return (
        <div>
            <CodeEditor 
                algo={props.algo}
            />
        </div>
    )
}

export default Editor;