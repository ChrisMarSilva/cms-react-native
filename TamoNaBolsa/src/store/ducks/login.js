
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import 'react-native-console-time-polyfill';

import * as CONSTANTE from '../../util/Constante'
// import * as HelperNet from '../util/HelperNet'

// Action Types

const ACTION = { 
    // MENU
    NAV_LOGIN: 'tnb/nav/login',
    NAV_HOME: 'tnb/nav/home',
    //LOGIN GERAL
    USER_MODIFICA_NOME: 'tnb/login/modifica/nome',
    USER_MODIFICA_EMAIL: 'tnb/login/modifica/email',
    USER_MODIFICA_SENHA: 'tnb/login/modifica/senha',
    USER_MODIFICA_SENHA_CONF: 'tnb/login/modifica/senha_conf',
    USER_MODIFICA_LEMBRAR: 'tnb/login/modifica/lembrar_login',
    USER_MODIFICA_MSG_LOGIN: 'tnb/login/modifica/msg_login',
    USER_MODIFICA_MSG_RESET_SENHA: 'tnb/login/modifica/msg_reset_senha',
    USER_MODIFICA_MSG_CADASTRO: 'tnb/login/modifica/msg_cadastro',
    USER_MODIFICA_LOGIN_OK_ERRO: 'tnb/login/ok_erro',
    // LOGIN
    USER_LOGIN_EM_ANDAMENTO: 'tnb/login/em_andamento',
    USER_LOGIN_USUARIO_SUCESSO: 'tnb/login/sucesso',
    USER_LOGIN_USUARIO_ERRO: 'tnb/login/erro',
    // LOGOUT
    USER_LOGOUT_EM_ANDAMENTO: 'tnb/logout/em_andamento',
    USER_LOGOUT_USUARIO_SUCESSO: 'tnb/logout/sucesso',
    USER_LOGOUT_USUARIO_ERRO: 'tnb/logout/erro',
    // LOGIN - CADASTRO
    USER_CADASTRO_EM_ANDAMENTO: 'tnb/login/cad/em_andamento',
    USER_CADASTRO_SUCESSO: 'tnb/login/cad/sucesso',
    USER_CADASTRO_ERRO: 'tnb/login/cad/erro',
    // LOGIN - RESETAR SENHA
    USER_RESET_SENHA_EM_ANDAMENTO: 'tnb/login/snh/em_andamento',
    USER_RESET_SENHA_SUCESSO: 'tnb/login/snh/sucesso',
    USER_RESET_SENHA_ERRO: 'tnb/login/snh/erro',
}

// Reducer

const INITIAL_STATE = { 
    txtId: '',
    txtNome: '',
    txtTipo: '',
    txtEmail: '',
    txtFoto: '',
    txtSenha: '',
    txtSenhaConf: '',
    txtLembrar: false,
    isLoadingLogin: false,
    isLoginOK: false,
    isLoginErro: false,
    txtErroLogin: '',
    isLoadingCadastro: false,
    txtSucessoCadastro: '',
    txtErroCadastro: '',
    isLoadingResetSenha: false,
    txtSucessoResetSenha: '',
    txtErroResetSenha: '',
}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        // GERAL
        case ACTION.USER_MODIFICA_NOME:
            return { ...state, isLoginOK: false, isLoginErro: false, txtNome: action.payload.novoNome }
        case ACTION.USER_MODIFICA_EMAIL:
            return { ...state, isLoginOK: false, isLoginErro: false, txtEmail: action.payload.novoEmail }
        case ACTION.USER_MODIFICA_SENHA:
            return { ...state, isLoginOK: false, isLoginErro: false, txtSenha: action.payload.novaSenha }
        case ACTION.USER_MODIFICA_SENHA_CONF:
            return { ...state, isLoginOK: false, isLoginErro: false, txtSenhaConf: action.payload.novaSenhaConf }
        case ACTION.USER_MODIFICA_LEMBRAR:
            return { ...state, isLoginOK: false, isLoginErro: false, txtLembrar: action.payload.novoValor }
        case ACTION.USER_MODIFICA_MSG_LOGIN:
            return { ...state, isLoginOK: false, isLoginErro: false, txtErroLogin: action.payload.msgErro }
        case ACTION.USER_MODIFICA_MSG_RESET_SENHA:
            return { ...state, isLoginOK: false, isLoginErro: false, txtErroCadastro: action.payload.msgErro, txtSucessoCadastro: action.payload.msgSucesso }
        case ACTION.USER_MODIFICA_MSG_CADASTRO:
            return { ...state, isLoginOK: false, isLoginErro: false, txtErroResetSenha: action.payload.msgErro, txtSucessoResetSenha: action.payload.msgSucesso }
        case ACTION.USER_MODIFICA_LOGIN_OK_ERRO:
            return { ...state, isLoginOK: false, isLoginErro: false }
        // LOGIN
        case ACTION.USER_LOGIN_EM_ANDAMENTO:
            return { ...state, isLoadingLogin: true, isLoginOK: false, isLoginErro: false, txtErroLogin: '', }
        case ACTION.USER_LOGIN_USUARIO_SUCESSO:
            return { ...state, isLoadingLogin: false, isLoginOK: true, isLoginErro: false, txtErroLogin: '', txtId: action.payload.Id, txtNome: action.payload.Nome, txtTipo: action.payload.Tipo, txtEmail: action.payload.Email, txtFoto: action.payload.Foto }
        case ACTION.USER_LOGIN_USUARIO_ERRO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: true, txtErroLogin: action.payload.msgErro, txtId: '', txtNome: '', txtTipo: '', txtEmail: '', txtFoto: '' } 
        // LOGOUT
        case ACTION.USER_LOGOUT_EM_ANDAMENTO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtId: '', txtNome: '', txtTipo: '', txtEmail: '', txtFoto: '', }
        case ACTION.USER_LOGOUT_USUARIO_SUCESSO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtId: '', txtNome: '', txtTipo: '', txtEmail: '', txtFoto: '', }
        case ACTION.USER_LOGOUT_USUARIO_ERRO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtId: '', txtNome: '', txtTipo: '', txtEmail: '', txtFoto: '', } 
            // LOGIN - CADASTRO
        case ACTION.USER_CADASTRO_EM_ANDAMENTO:
            return { ...state, isLoginOK: false, isLoginErro: false, isLoadingCadastro: true, txtErroCadastro: '', txtSucessoCadastro: '' }
        case ACTION.USER_CADASTRO_SUCESSO:
            return { ...state, isLoginOK: false, isLoginErro: false, isLoadingCadastro: false, txtErroCadastro: '', txtSucessoCadastro: action.payload.msgSucesso, txtNome: '', txtSenha: '', txtSenhaConf: '' }
        case ACTION.USER_CADASTRO_ERRO:
            return { ...state, isLoginOK: false, isLoginErro: false, isLoadingCadastro: false, txtErroCadastro: action.payload.msgErro, txtSucessoCadastro: '' }
        // LOGIN - RESET SENHA
        case ACTION.USER_RESET_SENHA_EM_ANDAMENTO:
            return { ...state, isLoginOK: false, isLoginErro: false, isLoadingResetSenha: true, txtErroResetSenha: '', txtSucessoResetSenha: '' }
        case ACTION.USER_RESET_SENHA_SUCESSO:
            return { ...state, isLoginOK: false, isLoginErro: false, isLoadingResetSenha: false, txtErroResetSenha: '', txtSucessoResetSenha: action.payload.msgSucesso }
        case ACTION.USER_RESET_SENHA_ERRO:
            return { ...state, isLoginOK: false, isLoginErro: false, isLoadingResetSenha: false, txtErroResetSenha: action.payload.msgErro, txtSucessoResetSenha: '' }
        // default
        default:
            return state;
        // default
    }
}

// Action Creators

export const modificaNome = (value) => {
    return { type: ACTION.USER_MODIFICA_NOME, payload: { novoNome: value } }
}

export const modificaEmail = (value) => {
    return { type: ACTION.USER_MODIFICA_EMAIL, payload: { novoEmail: value } }
}

export const modificaSenha = (value) => {
    return { type: ACTION.USER_MODIFICA_SENHA, payload: { novaSenha: value } }
}

export const modificaLembrar = (value) => {
    return { type: ACTION.USER_MODIFICA_LEMBRAR, payload: { novoValor: value } }
}

export const modificaSenhaConf = (value) => {
    return { type: ACTION.USER_MODIFICA_SENHA_CONF, payload: { novaSenhaConf: value } }
}

export const modificaMsgLogin = () => {
    return { type: ACTION.USER_MODIFICA_MSG_LOGIN, payload: { msgErro: '' } }
}

export const modificaMsgCadastro = () => {
    return { type: ACTION.USER_MODIFICA_MSG_RESET_SENHA, payload: { msgErro: '', msgSucesso: '' } }
}

export const modificaMsgResetSenha = () => {
    return { type: ACTION.USER_MODIFICA_MSG_CADASTRO, payload: { msgErro: '', msgSucesso: '' } }
}

export const modificaLoginOKErro = () => {
    return { type: ACTION.USER_MODIFICA_LOGIN_OK_ERRO }
}

export const autenticarUsuario = (txtEmail = '', txtSenha = '', txtLembrar = true, isSplashScreem = false) => async dispatch => {
    try {

        dispatch({ type: ACTION.USER_LOGIN_EM_ANDAMENTO })

        if (txtEmail === '') {
            dispatch({ type: ACTION.USER_LOGIN_USUARIO_ERRO, payload: { msgErro: "E-mail não informado." } }) 
            return false
        }
        
        if ( txtSenha === '') {
            dispatch({ type: ACTION.USER_LOGIN_USUARIO_ERRO, payload: { msgErro: "Senha não informada." } })
            return false
        }
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_LOGIN,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Dados = response.data.data.Dados
            if (Resultado === "OK") {
                AsyncStorage.setItem(CONSTANTE.SESSAO_USER_ID, Dados.Id)
                AsyncStorage.setItem(CONSTANTE.SESSAO_USER_NOME, Dados.Nome)
                AsyncStorage.setItem(CONSTANTE.SESSAO_USER_TIPO, Dados.Tipo)
                AsyncStorage.setItem(CONSTANTE.SESSAO_USER_FOTO, Dados.Foto) 
                AsyncStorage.setItem(CONSTANTE.SESSAO_USER_EMAIL, Dados.Email)
                AsyncStorage.setItem(CONSTANTE.SESSAO_USER_SENHA, txtSenha)
                AsyncStorage.setItem(CONSTANTE.SESSAO_USER_LEMBRAR, txtLembrar ? 'S' : 'N');
                dispatch({ type: ACTION.USER_LOGIN_USUARIO_SUCESSO, payload: { Id: Dados.Id, Nome: Dados.Nome, Tipo: Dados.Tipo, Email: Dados.Email, Foto: Dados.Foto } })
            } else {
                dispatch ({ type: ACTION.USER_LOGIN_USUARIO_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Auth-Login.Mensagem:', Mensagem)
            }
        }).catch((error) => {
             dispatch ({ type: ACTION.USER_LOGIN_USUARIO_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Auth-Login.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.USER_LOGIN_USUARIO_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Auth-Login.Error', error)
    }
}

export const desautenticarUsuario = () => async dispatch => {
    try {

        dispatch({ type: ACTION.USER_LOGOUT_EM_ANDAMENTO })

        axios({
            method: 'post',
            url: CONSTANTE.URL_LOGOUT,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({  }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            if (Resultado === "OK") {
                AsyncStorage.clear()
                AsyncStorage.setItem(CONSTANTE.SESSAO_USER, 'S')
                // dispatch({ type: ACTION.USER_LOGOUT_USUARIO_SUCESSO })
            } else {
                // dispatch({ type: ACTION.USER_LOGOUT_USUARIO_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Auth-Logout.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            // dispatch({ type: ACTION.USER_LOGOUT_USUARIO_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Auth-Logout.axios', error)
        })
        
    }
    catch (error) {
        // dispatch({ type: ACTION.USER_LOGOUT_USUARIO_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Auth-Logout.Error', error)
    }
}

export const resetarSenhaUsuario = (txtEmail = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.USER_RESET_SENHA_EM_ANDAMENTO })

        if (txtEmail === '') {
            dispatch({ type: ACTION.USER_RESET_SENHA_ERRO, payload: { msgErro: "E-mail não informado." } }) 
            return false
        }
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_RESETAR_SENHA,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ txtUserEmail: txtEmail }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Dados = response.data.data.Dados
            if (Resultado === "OK") {
                dispatch({ type: ACTION.USER_RESET_SENHA_SUCESSO, payload: { msgSucesso: Mensagem } })
            } else {
                dispatch({ type: ACTION.USER_RESET_SENHA_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Auth-Senha.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch({ type: ACTION.USER_RESET_SENHA_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Auth-Senha.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.USER_RESET_SENHA_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Auth-Senha.Error', error)
    }
}

export const cadastrarUsuario = (txtNome = '', txtEmail = '', txtSenha = '', txtSenhaConf = '',) => async dispatch => {
    try {

        dispatch({ type: ACTION.USER_CADASTRO_EM_ANDAMENTO })

        if (txtNome.trim() == '') {
            dispatch({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: "Nome não informado." } }) 
            return false
        }

        if (txtEmail.trim() == '') {
            dispatch({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: "E-mail não informado." } }) 
            return false
        }
        
        if ( txtSenha.trim() == '') {
            dispatch({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: "Senha não informada." } })
            return false
        }

        // if ( txtSenhaConf.trim() === '') {
        //     dispatch ({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: "Confirmação de Senha não informada." } });
        //     return false;
        // }

        // if ( txtSenha.trim() != txtSenhaConf.trim()) {
        //     dispatch ({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: "As senhas informadas não são iguais." } });
        //     return false;
        // }
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_CADASTRO_USUARIO,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ txtUserNome: txtNome, txtUserEmail: txtEmail, txtUserSenha: txtSenha }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Dados = response.data.data.Dados
            if (Resultado === "OK") {
                dispatch({ type: ACTION.USER_CADASTRO_SUCESSO, payload: { msgSucesso: Mensagem.replace('<br/>', '\n') } })
            } else {
                dispatch({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: Mensagem.replace('<br/>', '\n') } })
                console.log('@TamoNaBolsa:Auth-Cad.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Auth-Cad.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Auth-Cad.Error', error)
    }
}
