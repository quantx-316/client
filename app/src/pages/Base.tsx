import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

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
                className="full"
            >
                <Sidebar/>
                <div
                    style={{
                        margin: "10px"
                    }}
                >
                    {children}
                </div>
            </div>      
            
        </div>
    )
}

export default Base;