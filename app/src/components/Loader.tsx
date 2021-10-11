import React from 'react';
import { Intent, Spinner, SpinnerSize } from '@blueprintjs/core';

const Loader: React.FC = () => {
    return (
        <div
            className="full centered"
        >
            <Spinner 
                intent={Intent.PRIMARY}
                size={SpinnerSize.LARGE}
                value={0.7}
            />
        </div>
    )
}

export default Loader;