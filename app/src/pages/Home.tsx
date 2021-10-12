import React from 'react';
import AlgosList from '../components/AlgosList';
import Backtests from '../components/Backtests';
import HomeHeader from '../components/HomeHeader';

export const Home: React.FC = () => {

    return (
        <div
            className="full centered-top-col"
            style={{
                padding: "5%"
            }}
        >
            <div
                className="full-height almost-full-width centered-top-col"
            >
                <div
                    className="navbar-like"
                >
                    <HomeHeader />
                </div>
                <div
                    className="full separated-row"
                >
                    <AlgosList />

                    <Backtests />
                </div>
            </div>
        </div>
    )
}