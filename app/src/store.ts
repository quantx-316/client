import { applyMiddleware, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
// import { CounterReducer } from './features/counter'
import  rootReducer  from './features/reducers'
/* Create root reducer, containing all features of the application */
// const rootReducer = combineReducers({
//   count: CounterReducer,
//   auth: combineReducer
// })
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
  // /* preloadedState, */ devToolsEnhancer({})
)

export default store
