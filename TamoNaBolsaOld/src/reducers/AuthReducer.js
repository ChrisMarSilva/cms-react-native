import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {
    txtId: '',
    txtNome: '',
    txtTipo: '',
    txtEmail: '',
    txtSenha: '',
    txtSenhaConf: '',
    txtLembrar: false,
    isLoadingLogin: false,
    txtErroLogin: '',
    isLoadingCadastro: false,
    txtSucessoCadastro: '',
    txtErroCadastro: '',
    isLoadingResetSenha: false,
    txtSucessoResetSenha: '',
    txtErroResetSenha: '',
}

export default (state = INITIAL_STATE, action) => {

    //console.log('AuthReducer = action.type = ' + action.type, state); 

    switch(action.type) {

        // GERAL
        case ACTION.USER_MODIFICA_NOME:
            return { ...state, txtNome: action.payload.novoNome }
        case ACTION.USER_MODIFICA_EMAIL:
            return { ...state, txtEmail: action.payload.novoEmail }
        case ACTION.USER_MODIFICA_SENHA:
            return { ...state, txtSenha: action.payload.novaSenha }
        case ACTION.USER_MODIFICA_SENHA_CONF:
            return { ...state, txtSenhaConf: action.payload.novaSenhaConf }
        case ACTION.USER_MODIFICA_LEMBRAR:
        return { ...state, txtLembrar: action.payload.novoValor }
        case ACTION.USER_MODIFICA_MSG_LOGIN:
            return { ...state, txtErroLogin: action.payload.msgErro }
        case ACTION.USER_MODIFICA_MSG_RESET_SENHA:
            return { ...state, txtErroCadastro: action.payload.msgErro, txtSucessoCadastro: action.payload.msgSucesso }
        case ACTION.USER_MODIFICA_MSG_CADASTRO:
            return { ...state, txtErroResetSenha: action.payload.msgErro, txtSucessoResetSenha: action.payload.msgSucesso }

        // LOGIN
        case ACTION.USER_LOGIN_EM_ANDAMENTO:
            return { ...state, isLoadingLogin: true, txtErroLogin: '' }
        case ACTION.USER_LOGIN_USUARIO_SUCESSO:
            return { ...state, isLoadingLogin: false, txtErroLogin: '', txtId: action.payload.Id, txtNome: action.payload.Nome, txtTipo: action.payload.Tipo }
        case ACTION.USER_LOGIN_USUARIO_ERRO:
            return { ...state, isLoadingLogin: false, txtErroLogin: action.payload.msgErro }

        // LOGIN - CADASTRO
        case ACTION.USER_CADASTRO_EM_ANDAMENTO:
            return { ...state, isLoadingCadastro: true, txtErroCadastro: '', txtSucessoCadastro: '' }
        case ACTION.USER_CADASTRO_SUCESSO:
            return { ...state, isLoadingCadastro: false, txtErroCadastro: '', txtSucessoCadastro: action.payload.msgSucesso, txtNome: '', txtSenha: '', txtSenhaConf: '' }
        case ACTION.USER_CADASTRO_ERRO:
            return { ...state, isLoadingCadastro: false, txtErroCadastro: action.payload.msgErro, txtSucessoCadastro: '' }

        // LOGIN - RESET SENHA
        case ACTION.USER_RESET_SENHA_EM_ANDAMENTO:
            return { ...state, isLoadingResetSenha: true, txtErroResetSenha: '', txtSucessoResetSenha: '' }
        case ACTION.USER_RESET_SENHA_SUCESSO:
            return { ...state, isLoadingResetSenha: false, txtErroResetSenha: '', txtSucessoResetSenha: action.payload.msgSucesso }
        case ACTION.USER_RESET_SENHA_ERRO:
            return { ...state, isLoadingResetSenha: false, txtErroResetSenha: action.payload.msgErro, txtSucessoResetSenha: '' }
            
        default:
            return state;
    }    

}


