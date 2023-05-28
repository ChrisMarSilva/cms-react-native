import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {
    loginchave     : '',
    loginMsgErro   : '',
    loginIsLoading : false,
}

export default (state = INITIAL_STATE, action) => {
    //console.log('AuthReducer - action.type: ' + action.type, state); 
    switch(action.type) {
        case ACTION.LOGIN_MODIFICA_CHAVE    : return { ...state, loginchave: action.payload.novachave }
        case ACTION.LOGIN_MODIFICA_MSG_ERRO : return { ...state, loginMsgErro: action.payload.msgErro   }
        case ACTION.LOGIN_EM_ANDAMENTO      : return { ...state, loginIsLoading: true,  loginMsgErro: '' }
        case ACTION.LOGIN_SUCESSO           : return { ...state, loginIsLoading: false, loginMsgErro: '', loginchave: action.payload.chave }
        case ACTION.LOGIN_ERRO              : return { ...state, loginIsLoading: false, loginMsgErro: action.payload.msgErro }
        default                             : return state;
    } 
}