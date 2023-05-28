import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    //console.log('HomeReducer - action.type: ' + action.type, state); 
    switch(action.type) {
        default: return state;
    }
}