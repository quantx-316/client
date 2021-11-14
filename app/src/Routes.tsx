import React, {useEffect, useState} from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import { dispatchSuccessMsg } from './features/utils/notifs';
import Dev from './pages/Dev'
import { Home } from './pages/Home'
import Files from './pages/Files';
import StockView from './pages/StockView';
import Base from './pages/Base';
import Navbar from './components/Navbar/index';
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
import Competition from './pages/Competition';
import NewCompetition from './pages/NewCompetition';
import {getBacktestByID} from './features/actions/backtest';
import {getCompetition} from './features/actions/comps';
import {addBacktest, removeBacktest, addCompetition, removeCompetition} from './features/actions/starred';
import {selectAlgo} from './features/actions/algos';
import { dateStrToDate } from './features/utils/time';

const Routes: React.FC = () => {  

  //@ts-ignore 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  //@ts-ignore 
  const backtests = useSelector(state => state.starred.backtests);
  //@ts-ignore 
  const competitions = useSelector(state => state.starred.competitions);

  const [backtestsToPing, setBacktestsToPing] = useState([]);
  const [compToPing, setCompsToPing] = useState([]);

  const processBacktests = (avoid_id?: number) => {
    if (!backtests) {
      setBacktestsToPing([]);
    } else {
      const backtestLst = Object.values(backtests);
      //@ts-ignore 
      let high = backtestLst.filter(backtest => backtest.result === null)
      //@ts-ignore 
      high = high.filter(backtest => backtest.id !== avoid_id)
      //@ts-ignore 
      setBacktestsToPing(high);
    }
  }

  const processComps = (avoid_id?: number) => {

    if (!competitions) {
      setCompsToPing([]);
    } else {
      const compLst = Object.values(competitions);

      //@ts-ignore 
      let high = compLst.filter(comp => dateStrToDate(comp.end_time) > new Date());

      //@ts-ignore 
      high = high.filter(comp => comp.id !== avoid_id);

      //@ts-ignore 
      setCompsToPing(high);
    }
  }

  const getBacktestCallback = (data: any) => {
    if (data && data.result) {
      dispatchSuccessMsg(dispatch, "Starred backtest finished executing");
      dispatch(addBacktest(data));
      processBacktests(data.id);
      dispatch(selectAlgo(-1));
      dispatch(selectAlgo(data.algo));
    }
  }

  const failCallback = (backtest_id: number) => {
    dispatch(removeBacktest(backtest_id));
    dispatchErrorMsg(dispatch, "Starred backtest deleted");
  }

  const pingBacktests = () => {
    if (backtestsToPing && backtestsToPing.length > 0) {
      backtestsToPing.forEach(backtest => {
        //@ts-ignore 
        dispatch(getBacktestByID(backtest.id, getBacktestCallback, () => failCallback(backtest.id)))
      })
    }

  }

  const getCompCallback = (data: any) => {
    if (data && data.end_time) {
      const endTime = dateStrToDate(data.end_time);
      if (new Date() >= endTime) {
        dispatchSuccessMsg(dispatch, "Starred competition is finished.");
        dispatch(addCompetition(data));
        processComps(data.id);
      }
    }
  }

  const failCompCallback = (compID: number) => {
    dispatch(removeCompetition(compID));
    dispatchErrorMsg(dispatch, "Starred competition deleted");
  }

  const pingCompetitions = () => {

    console.log("PINGING COMPETITIONS");
    if (compToPing && compToPing.length > 0) {
      console.log("pinging competitions");

      compToPing.forEach(comp => {
        //@ts-ignore 
        dispatch(getCompetition(comp.id, getCompCallback, () => failCompCallback(comp.id)))
      })
    }
  }

  useEffect(() => {

    if (backtestsToPing && backtestsToPing.length > 0) {

      const intervalId = setInterval(() => pingBacktests(), 1000 * 3) // 1000 is one second, so three seconds, backtests shouldnt take too long
      // backtests require more frequent pinging than competitions, which is why they are separated
      return function cleanup() {
        clearInterval(intervalId);
      }
    }
  }, [backtestsToPing])

  useEffect(() => {

    if (compToPing && compToPing.length > 0) {
      // 1000 * 60 * 10
      const intervalId = setInterval(() => pingCompetitions(), 1000 * 60 * 10) // 1000 * 60 = 1 min, * 10 = 10 min
      return function cleanup() {
        clearInterval(intervalId);
      }
    }

  }, [compToPing])

  useEffect(() => {
    processBacktests();
    processComps();
  }, [backtests, competitions])

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatchErrorMsg(dispatch, "Please log in again.")
  }

  const onUserVerifyError = () => {
    dispatch(logout(onLogout));
  }

  useEffect(() => {
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
            <>
              <Navbar />      
              <Landing />
            </>
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
          path="/competition/editor"
          exact 
          isAuthenticated={isLoggedIn}
          //@ts-ignore 
          render={routeProps => (
            <Base>
              <NewCompetition {...routeProps} />
            </Base>
          )}
        />
        <ProtectedRoute 
          path="/competition/:comp_id"
          exact 
          isAuthenticated={isLoggedIn}
          //@ts-ignore 
          render={routeProps => (
            <Base>
              <Competition {...routeProps} />
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
