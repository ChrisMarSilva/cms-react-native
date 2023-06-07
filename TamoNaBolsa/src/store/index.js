
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger' //import logger from 'redux-logger'

// import nav from './ducks/nav'
import login from './ducks/login'
import portfolio from './ducks/portfolio'
import operacoes from './ducks/operacoes'
import proventos from './ducks/proventos'
import apuracoes from './ducks/apuracoes'
import fatos from './ducks/fatos'
import noticias from './ducks/noticias'
import comentarios from './ducks/comentarios'
import analises from './ducks/analises'
// import { MainStackNavigator, AppNavigatorMiddleware } from '../navigation/MainNavigator'

// const navReducer = createNavigationReducer(MainStackNavigator)

const reducers = combineReducers({
  // nav: navReducer,
  login,
  portfolio,
  operacoes,
  proventos,
  apuracoes,
  fatos,
  noticias,
  comentarios,
  analises,
})

// function logger({ getState }) {
//   return next => action => {
//     console.log('will dispatch', action)
//     const returnValue = next(action)     // Call the next dispatch method in the middleware chain.
//     console.log('state after dispatch', getState())
//     return returnValue // This will likely be the action itself, unless  a middleware further in chain changed it.
//   }
// }

const loggerMiddleware = createLogger({ 
  // predicate, // if specified this function will be called before each action is processed with this middleware.
  // collapsed: (getState, action, logEntry) => !logEntry.error, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
  duration: true, //: Boolean, // print the duration of each action?
  timestamp: true, //: Boolean, // print the timestamp with each action?
  //level: 'log', //: 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
  //colors: ColorsObject, // colors for title, prev state, action and next state: https://github.com/LogRocket/redux-logger/blob/master/src/defaults.js#L12-L18
  //titleFormatter, // Format the title used when logging actions.
  //stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
  //actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
  //errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.
  // logger: console, //: LoggerObject, // implementation of the `console` API.
  logErrors: true, //: Boolean, // should the logger catch, log, and re-throw errors?
  diff: true, //: Boolean, // (alpha) show diff between states?
  //diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`
}) 

const middleware = [thunkMiddleware] //, loggerMiddleware, AppNavigatorMiddleware

const store = createStore(reducers, {}, applyMiddleware(...middleware))

export default store
