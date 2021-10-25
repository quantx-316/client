import React from "react";
import { Redirect, Route } from "react-router-dom";
import {useSelector} from 'react-redux';

const ProtectedRoute = ({render, isAuthenticated, ...rest}: any) => {

    return (
        <Route 
            {...rest}
            render={() => 
                isAuthenticated ? 

                render() 

                : 

                <Redirect to="/auth" />
            }
        
        />
    )

}

export default ProtectedRoute; 
