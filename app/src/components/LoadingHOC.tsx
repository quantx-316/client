import React, {useState, useEffect} from 'react';
import Loader from './Loader';

type LoadingHOCProps = {
    WrappedComponent: React.ElementType
}

const loadingDelay = 1;

const LoadingHOC = ({WrappedComponent, ...props} : LoadingHOCProps) => {
    
    function HOC() {
        const [isLoading, setLoading] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => setLoading(false), 1 * 1000);

            return () => {
                clearTimeout(timer);
            }
        }, [])

        return (
            <>
                {isLoading && <Loader />}
                {!isLoading && <WrappedComponent {...props} />}
            </>
        )
    }

    return HOC;
}

export default LoadingHOC;