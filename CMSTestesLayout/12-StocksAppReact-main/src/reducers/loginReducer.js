let initialState = {logged_in: false,
                    token: ''}

let loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'logged_in':
            return {...state,
                    logged_in: action.payload}
        case 'add_token':
            return {...state,
                     token: action.payload}
        default:
            return state
    }
}

export default loginReducer