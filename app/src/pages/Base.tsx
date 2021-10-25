import React from 'react'
import Navbar from '../components/Navbar';
import FadeIn from 'react-fade-in';
import SingleNotif from '../components/SingleNotif';

const Base: React.FC = ({children}) => {
    return (
        <div
            className="full"
        >
            <Navbar />      
            <div
                style={{
                    display: 'flex',
                    gap: "10px"
                }}
                className="full centered"
            >
                {children}
            </div>      

            <SingleNotif />
            
        </div>
    )
}

export default Base;