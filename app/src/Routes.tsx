import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { About } from './pages/About'
import { Home } from './pages/Home'
import Backtests from './pages/Backtests';
import Files from './pages/Files';
import StockView from './pages/StockView';
import Base from './pages/Base';
import Landing from './pages/Landing';

const Routes: React.FC = () => {
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
        <Route 
          path="/home" 
          exact 
          render={() => (
            <Base>
              <Home />
            </Base>
          )}
        />
        <Route 
          path="/about" 
          exact 
          render={() => (
            <Base>
              <About />
            </Base>
          )}
        />
        <Route 
          path="/files" 
          exact 
          render={() => (
            <Base>
              <Files />
            </Base>
          )}
        />
        <Route 
          path="/backtests" 
          exact 
          render={() => (
            <Base>
              <Backtests />
            </Base>
          )}
        />
        <Route 
          path="/stock-view" 
          exact 
          render={() => (
            <Base>
              <StockView />
            </Base>
          )}
        />
      </Switch>
    </HashRouter>
  )
}

export default Routes;
