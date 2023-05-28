//import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose, } from 'redux'
import thunkMiddleware from 'redux-thunk'

import config from './ducks/config'
import login from './ducks/login'
import cartao from './ducks/cartao'
import moca from './ducks/moca'
import produto from './ducks/produto'
import pedido from './ducks/pedido'
import pedidoacesso from './ducks/pedidoacesso'
import consumo from './ducks/consumo'
import erro from './ducks/erro'

const reducers = combineReducers({
    config,
    login,
    cartao,
    moca,
    produto,
    pedido,
    pedidoacesso,
    consumo,
    erro,
})

const loggerMiddleware = store => next => action => {
    //console.group(action.type)
    //console.info('dispatching', action)
    let result = next(action)
    //console.log('next state', store.getState())
    //console.groupEnd()
    return result
}

// const loggerMiddleware = createLogger({ 
//   // predicate, // if specified this function will be called before each action is processed with this middleware.
//   // collapsed: (getState, action, logEntry) => !logEntry.error, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
//   duration: true, //: Boolean, // print the duration of each action?
//   timestamp: true, //: Boolean, // print the timestamp with each action?
//   //level: 'log', //: 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
//   //colors: ColorsObject, // colors for title, prev state, action and next state: https://github.com/LogRocket/redux-logger/blob/master/src/defaults.js#L12-L18
//   //titleFormatter, // Format the title used when logging actions.
//   //stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
//   //actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
//   //errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.
//   // logger: console, //: LoggerObject, // implementation of the `console` API.
//   logErrors: true, //: Boolean, // should the logger catch, log, and re-throw errors?
//   diff: true, //: Boolean, // (alpha) show diff between states?
//   //diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`
// }) 

const round = number => Math.round(number * 100) / 100

const monitorReducerEnhancer =
    createStore => (reducer, initialState, enhancer) => {
        const monitoredReducer = (state, action) => {
            const start = performance.now()
            const newState = reducer(state, action)
            const end = performance.now()
            const diff = round(end - start)
            // console.log('reducer process time:', diff)
            return newState
        }
        return createStore(monitoredReducer, initialState, enhancer)
    }

// const middlewares = [thunkMiddleware]
const middlewares = [loggerMiddleware, thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
const composedEnhancers = compose(...enhancers)

// const store = createStore(reducers, {}, applyMiddleware(...middlewares))
const store = createStore(reducers, {}, composedEnhancers) // undefined

// const store = configureStore({
//     reducer: {
//         config: config,
//         login: login,
//         cartao: cartao,
//         moca: moca,
//         produto: produto,
//         pedido: pedido,
//         pedidoacesso: pedidoacesso,
//         consumo: consumo,
//         erro: erro,
//     }
// })

export default store
