import axios from 'axios'
import 'react-native-console-time-polyfill'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as CONSTANTE from '../../util/Constante'
import { adicionaListaErro, } from './erro'

// Action Types

const ACTION = { 

    //LOGIN GERAL
    MODIFICA_EMAIL: 'sfr/lgn/modifica/email',
    MODIFICA_SENHA: 'sfr/lgn/modifica/senha',
    MODIFICA_CODIGO: 'sfr/lgn/modifica/codigo',
    MODIFICA_NOME: 'sfr/lgn/modifica/nome',
    MODIFICA_MSG_LOGIN: 'sfr/lgn/modifica/msg_login',
    MODIFICA_LOGIN_OK_ERRO: 'sfr/lgn/ok_erro',

    // LOGIN
    LOGIN_EM_ANDAMENTO: 'sfr/lgn/login/em_andamento',
    LOGIN_SUCESSO: 'sfr/lgn/login/sucesso',
    LOGIN_ERRO: 'sfr/lgn/login/erro',

    // LOGOUT
    LOGOUT_EM_ANDAMENTO: 'sfr/lgn/logout/em_andamento',
    LOGOUT_SUCESSO: 'sfr/lgn/logout/sucesso',
    LOGOUT_ERRO: 'sfr/lgn/logout/erro',

}

// Reducer

const INITIAL_STATE = {
    txtCodigo: '',
    txtNome: '',
    txtEmail: '',
    txtSenha: '',
    isLoadingLogin: false,
    isLoginOK: false,
    isLoginErro: false,
    txtErroLogin: '',
}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {

        // GERAL
        case ACTION.MODIFICA_EMAIL:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtEmail: action.payload.novoEmail }
        case ACTION.MODIFICA_SENHA:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtSenha: action.payload.novaSenha }
        case ACTION.MODIFICA_CODIGO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtCodigo: action.payload.novoCodigo }
        case ACTION.MODIFICA_NOME:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtNome: action.payload.novoNome }
        case ACTION.MODIFICA_MSG_LOGIN:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: action.payload.msgErro }
        case ACTION.MODIFICA_LOGIN_OK_ERRO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false }

        // LOGIN
        case ACTION.LOGIN_EM_ANDAMENTO:
            return { ...state, isLoadingLogin: true, isLoginOK: false, isLoginErro: false, txtErroLogin: '', }
        case ACTION.LOGIN_SUCESSO:
            return { ...state, isLoadingLogin: false, isLoginOK: true, isLoginErro: false, txtErroLogin: '', txtCodigo: action.payload.codigo, txtNome: action.payload.nome, }
        case ACTION.LOGIN_ERRO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: true, txtErroLogin: action.payload.msgErro, txtCodigo: '', txtNome: '' } 

        // LOGOUT
        case ACTION.LOGOUT_EM_ANDAMENTO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtCodigo: '', txtNome: '', }
        case ACTION.LOGOUT_SUCESSO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtCodigo: '', txtNome: '', }
        case ACTION.LOGOUT_ERRO:
            return { ...state, isLoadingLogin: false, isLoginOK: false, isLoginErro: false, txtErroLogin: '', txtCodigo: '', txtNome: '', } 

        // default
        default:
            return state;
    }
}

// Action Creators

export const modificaEmail = (value) => {
    return { type: ACTION.MODIFICA_EMAIL, payload: { novoEmail: value } }
}

export const modificaSenha = (value) => {
    return { type: ACTION.MODIFICA_SENHA, payload: { novaSenha: value } }
}

export const modificaCodigo = (value) => {
    return { type: ACTION.MODIFICA_CODIGO, payload: { novoCodigo: value } }
}

export const modificaNome = (value) => {
    return { type: ACTION.MODIFICA_NOME, payload: { novoNome: value } }
}

export const modificaMsgLogin = () => {
    return { type: ACTION.MODIFICA_MSG_LOGIN, payload: { msgErro: '' } }
}

export const modificaLoginOKErro = () => {
    return { type: ACTION.MODIFICA_LOGIN_OK_ERRO }
}

export const autenticarUsuario = (urlPadrao = '', login = '', senha = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.LOGIN_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Login.Error.Url.Vazio')
            dispatch({ type: ACTION.LOGIN_ERRO, payload: { msgErro: "URL não informada." } }) 
            return false
        }

        if (login === '') {
            console.log('@Safira:Login.Error.Email.Vazio')
            dispatch({ type: ACTION.LOGIN_ERRO, payload: { msgErro: "Login não informado." } }) 
            return false
        }

        if ( senha === '') {
            console.log('@Safira:Login.Error.Senha.Vazio')
            dispatch({ type: ACTION.LOGIN_ERRO, payload: { msgErro: "Senha não informada." } })
            return false
        }

        const url    = urlPadrao + "Login"
        const params = {"usuario": login, "senha": senha}

        axios({
            method : 'POST',
            url    : url,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
            data   : JSON.stringify(params),
        }).then((response) => {

            const dados  = response.data
            const codigo = dados.codigo.toString()
            const nome   = dados.nome.toString()

            AsyncStorage.setItem(CONSTANTE.SESSAO_USER_CODIGO, codigo)
            AsyncStorage.setItem(CONSTANTE.SESSAO_USER_NOME, nome)
            AsyncStorage.setItem(CONSTANTE.SESSAO_USER_EMAIL, login)
            AsyncStorage.setItem(CONSTANTE.SESSAO_USER_SENHA, senha)

            dispatch({ type: ACTION.LOGIN_SUCESSO, payload: { codigo: codigo, nome: nome, } })

        }).catch((error) => {
            const msgErroStatus  = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Login.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', url)
            const msgErro = msgErroStatus == '401' ? 'Login/Senha inválido' : '('+msgErroStatus+') Falha ao verificar Login'
            dispatch({ type: ACTION.LOGIN_ERRO, payload: { msgErro: msgErro } })
            if ( msgErroStatus != "401") registrarErro(url, params, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.LOGIN_ERRO, payload: { msgErro: 'Erro ao verificar Login' } })
        console.log('@Safira:Login.Error', error)
        registrarErro(url, params, '', error, dispatch)
    }
}

export const desautenticarUsuario = () => async dispatch => {
    try {

        dispatch({ type: ACTION.LOGOUT_EM_ANDAMENTO })
        
        // AsyncStorage.clear()
        AsyncStorage.setItem(CONSTANTE.SESSAO_USER_CODIGO, '')
        AsyncStorage.setItem(CONSTANTE.SESSAO_USER_NOME, '')
        // AsyncStorage.setItem(CONSTANTE.SESSAO_USER_EMAIL, '')
        AsyncStorage.setItem(CONSTANTE.SESSAO_USER_SENHA, '')
        //  AsyncStorage.removeItem(CONSTANTE.SESSAO_USER_SENHA)

        // axios({
        //     method: 'post',
        //     url: CONSTANTE.URL_LOGOUT,
        //     timeout: CONSTANTE.URL_TIMEOUT,
        //     headers: { 'Content-Type': 'application/json' },
        // }).then((response) => {
        //     // dispatch({ type: ACTION.LOGOUT_SUCESSO })
        // }).catch((error) => {
        //     let message = error.response ? error.response.status + ' - ' + error.response.data.message : error
        //     console.log('@Safira:Logout.Error.Axios', message);
        //     // dispatch({ type: ACTION.LOGOUT_ERRO, payload: { msgErro: message } })
        // })
        
    }
    catch (error) {
        // dispatch({ type: ACTION.LOGOUT_USUARIO_ERRO, payload: { msgErro: error } })
        console.log('@Safira:Auth-Logout.Error', error)
    }
}

const registrarErro = (url, params, statuscod, message, dispatch) => {
    try {
        // console.log(url, params, statuscod, message)
        dispatch(adicionaListaErro('login', url, params, statuscod, message))
    }
    catch (error) {
        console.log('@Safira:Auth-Error', error)
    }
}
