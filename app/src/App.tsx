import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { About } from './pages/About'
import { Home } from './pages/Home'
import Algorithms from './pages/Algorithms';
import Backtests from './pages/Backtests';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/algorithms" component={Algorithms} />
        <Route path="/backtests" component={Backtests} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
