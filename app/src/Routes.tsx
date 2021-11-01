import React, {useEffect} from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
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
import NotFound from './pages/NotFound';
import {getCurrentUser} from './features/actions/users';
import {logout} from './features/actions/auth';
import {dispatchErrorMsg} from './features/utils/notifs';
import ProtectedRoute from './components/ProtectedRoute';
import Backtest from './pages/Backtest';

const Routes: React.FC = () => {  

  //@ts-ignore 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatchErrorMsg(dispatch, "Please log in again.")
  }

  const onUserVerifyError = () => {
    dispatch(logout(onLogout));
  }

  useEffect(() => {
    console.log('ROUTES USE EFFECT');

    if (isLoggedIn) {
      dispatch(getCurrentUser(onUserVerifyError))
    }

  }, [])

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
          path="/backtest/:backtest_id"
          exact 
          isAuthenticated={isLoggedIn}
          //@ts-ignore 
          render={routeProps => (
            <Base>
              <Backtest {...routeProps} />
            </Base>
          )}
        />
        <ProtectedRoute 
          path="/stock-view" 
          exact 
          isAuthenticated={isLoggedIn}
          //@ts-ignore 
          render={routeProps => (
            <Base>
              <StockView {...routeProps} />
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
          path="/profile/:username" 
          exact 
          isAuthenticated={isLoggedIn}
          //@ts-ignore 
          render={routeProps => (
            <Base>
              <Profile {...routeProps} />
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

        <Route 
          path="/404"
          render={() => (
            <Base>
              <NotFound />
            </Base>
          )}
        />

        <Redirect to="/404" />

      </Switch>
    </HashRouter>
  )
}

export default Routes;
