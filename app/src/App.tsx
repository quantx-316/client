import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { About } from './pages/About'
import { Home } from './pages/Home'
import Algorithms from './pages/Algorithms';
import Backtests from './pages/Backtests';
import Files from './pages/Files';
import StockView from './pages/StockView';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/files" component={Files} />
        <Route path="/backtests" component={Backtests} />
        <Route path="/stock-view" component={StockView} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
