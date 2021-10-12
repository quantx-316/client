import React from 'react';
import AlgosList from '../components/AlgosList';
import Backtests from '../components/Backtests';

export const Home: React.FC = () => {

    return (
        <div
            className="full centered-top-col"
            style={{
                padding: "5%"
            }}
        >
            <div
                className="full centered-top-col"
            >
                <div
                    className="navbar-like"
                >
                    
                </div>
                <div
                    className="full spaced-row"
                >
                    <AlgosList />

                    <Backtests />
                </div>
            </div>
        </div>
    )
}