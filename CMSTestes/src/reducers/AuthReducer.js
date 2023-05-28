import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {
    loginNome      : '',
    loginMsgErro   : '',
    loginIsLoading : false,
}

export default (state = INITIAL_STATE, action) => {
    //console.log('AuthReducer - action.type: ' + action.type, state); 
    switch(action.type) {
        case ACTION.LOGIN_MODIFICA_NOME : return { ...state, loginIsLoading: false, loginMsgErro: '', loginNome: action.payload.novoNome }
        case ACTION.LOGIN_SUCESSO       : return { ...state, loginIsLoading: false, loginMsgErro: '', loginNome: action.payload.novoNome }
        case ACTION.LOGIN_EM_ANDAMENTO  : return { ...state, loginIsLoading: true,  loginMsgErro: '' }
        case ACTION.LOGIN_MSG_ERRO      : return { ...state, loginIsLoading: false, loginMsgErro: action.payload.msgErro }
        default                         : return state;
    } 
}