
import {combineReducers} from 'redux'
import loginReducer from './loginReducer'
import viewReducer from './viewReducer'

const appReducer = combineReducers({
    viewReducer,
    loginReducer})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
        }
    return appReducer(state, action)
    }

export default rootReducer
