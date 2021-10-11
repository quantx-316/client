import React from 'react'
import Navbar from '../components/Navbar';

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
                <div
                    style={{
                        margin: "10px",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {children}
                </div>
            </div>      
            
        </div>
    )
}

export default Base;