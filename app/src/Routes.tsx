import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import {useSelector} from "react-redux";
import Dev from './pages/Dev'
import { Home } from './pages/Home'
import Backtests from './pages/Backtests';
import Files from './pages/Files';
import StockView from './pages/StockView';
import Base from './pages/Base';
import Landing from './pages/Landing';
import Editor from "./pages/Editor";
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Social from './pages/Social';

import ProtectedRoute from './components/ProtectedRoute';

const Routes: React.FC = () => {  

  //@ts-ignore 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <HashRouter>
      <Switch>
        <Route 
          path="/" 
          exact 
          render={() => (
            <Base>
              <Landing />
            </Base>
          )}
        />
        <ProtectedRoute 
          path="/home" 
          exact 
          isAuthenticated={isLoggedIn}
          render={() => (
            <Base>
              <Home />
            </Base>
          )}
        />
        <Route 
          path="/dev" 
          exact 
          render={() => (
            <Base>
              <Dev />
            </Base>
          )}
        />
        <ProtectedRoute 
          path="/files" 
          exact 
          isAuthenticated={isLoggedIn}
          render={() => (
            <Base>
              <Files />
            </Base>
          )}
        />
        <ProtectedRoute 
          path="/backtests" 
          exact 
          isAuthenticated={isLoggedIn}
          render={() => (
            <Base>
              <Backtests />
            </Base>
          )}
        />
        <ProtectedRoute 
          path="/stock-view" 
          exact 
          isAuthenticated={isLoggedIn}
          render={() => (
            <Base>
              <StockView />
            </Base>
          )}
        />
        <ProtectedRoute 
          path="/editor" 
          exact 
          isAuthenticated={isLoggedIn}
          render={() => (
            <Base>
              <Editor />
            </Base>
          )}
        />
        <Route 
          path="/auth" 
          exact 
          render={() => (
            <Base>
              <Auth />
            </Base>
          )}
        />
        <ProtectedRoute 
          path="/profile" 
          exact 
          isAuthenticated={isLoggedIn}
          render={() => (
            <Base>
              <Profile />
            </Base>
          )}
        />

        <ProtectedRoute 
          path="/social" 
          exact 
          isAuthenticated={isLoggedIn}
          render={() => (
            <Base>
              <Social />
            </Base>
          )}
        />
      </Switch>
    </HashRouter>
  )
}

export default Routes;
