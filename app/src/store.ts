import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
// import { CounterReducer } from './features/counter'
import  rootReducer  from './features/reducers'
/* Create root reducer, containing all features of the application */
// const rootReducer = combineReducers({
//   count: CounterReducer,
//   auth: combineReducer
// })

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
