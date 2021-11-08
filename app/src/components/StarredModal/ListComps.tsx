import React from 'react';

type ListCompProps = {
    highPriority: Array<any>,
    rest: Array<any>,
}

const ListComps = ({highPriority, rest}: ListCompProps) => {

    return (
        <div>
            {
                ((!highPriority && !rest) || (
                    highPriority && highPriority.length === 0
                    && rest && rest.length === 0
                    )) && 
                <div
                    className="centered"
                >   
                    <h2>
                        None starred
                    </h2>
                </div>
            }
        </div>
    )

}

export default ListComps; 
