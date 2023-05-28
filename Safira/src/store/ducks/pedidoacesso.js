import axios from 'axios'
import 'react-native-console-time-polyfill'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as CONSTANTE from '../../util/Constante'
import { adicionaListaErro, } from './erro'

// Action Types

const ACTION = { 

    // GERAL
    MODIFICA_USUARIO: 'sfr/pdd/acss/modifica/user',
    MODIFICA_SENHA: 'sfr/pdd/acss/modifica/senha',
    MODIFICA_MSG_ERRO: 'sfr/pdd/acss/modifica/msg',
    MODIFICA_ACESSO_OK_ERRO: 'sfr/pdd/acss/ok_erro',

    // ACESSO
    ACESSO_EM_ANDAMENTO: 'sfr/pdd/acss/em_andamento',
    ACESSO_SUCESSO: 'sfr/pdd/acss/sucesso',
    ACESSO_ESPECIAL_SUCESSO: 'sfr/pdd/acss/sucesso/especial',
    ACESSO_ERRO: 'sfr/pdd/acss/erro',
}

// Reducer

const INITIAL_STATE = {
    txtAcessoUsuario: '',
    txtAcessoSenha: '',
    isAcessoLoading: false,
    isAcessoOK: false,
    isAcessoEspecialOK: false,
    txtAcessoMsgErro: '',
}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {

        // GERAL
        case ACTION.MODIFICA_USUARIO:
            return { ...state, isAcessoLoading: false, isAcessoOK: false, isAcessoEspecialOK: false, txtAcessoMsgErro: '', txtAcessoUsuario: action.payload.usuario }
        case ACTION.MODIFICA_SENHA:
            return { ...state, isAcessoLoading: false, isAcessoOK: false, isAcessoEspecialOK: false, txtAcessoMsgErro: '', txtAcessoSenha: action.payload.senha }
        case ACTION.MODIFICA_MSG_ERRO:
            return { ...state, isAcessoLoading: false, isAcessoOK: false, isAcessoEspecialOK: false, txtAcessoMsgErro: action.payload.msgErro }
        case ACTION.MODIFICA_ACESSO_OK_ERRO:
            return { ...state, isAcessoLoading: false, isAcessoOK: false, isAcessoEspecialOK: false, }

        // ACESSO
        case ACTION.ACESSO_EM_ANDAMENTO:
            return { ...state, isAcessoLoading: true, isAcessoOK: false, isAcessoEspecialOK: false, txtAcessoMsgErro: '', }
        case ACTION.ACESSO_SUCESSO:
            return { ...state, isAcessoLoading: false, isAcessoOK: true, isAcessoEspecialOK: false, txtAcessoMsgErro: '', }
        case ACTION.ACESSO_ESPECIAL_SUCESSO:
            return { ...state, isAcessoLoading: false, isAcessoOK: false, isAcessoEspecialOK: true, txtAcessoMsgErro: '', }
        case ACTION.ACESSO_ERRO:
            return { ...state, isAcessoLoading: false, isAcessoOK: false, isAcessoEspecialOK: false, txtAcessoMsgErro: action.payload.msgErro, } 

        // default
        default:
            return state;
    }
}

// Action Creators

export const modificaAcessoUsuario = (value) => {
    return { type: ACTION.MODIFICA_USUARIO, payload: { usuario: value } }
}

export const modificaAcessoSenha  = (value) => {
    return { type: ACTION.MODIFICA_SENHA, payload: { senha: value } }
}

export const modificaAcessoMsg = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO, payload: { msgErro: '' } }
}

export const modificaAcessoOKErro = () => {
    return { type: ACTION.MODIFICA_ACESSO_OK_ERRO }
}

export const verificaAcessoLiberaLimite = (urlPadrao = '', usuario = '', senha = '', form = '', recurso = '', cartao = '', celular = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.ACESSO_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Pedido.Acesso.Error.Url.Vazio')
            dispatch({ type: ACTION.ACESSO_ERRO, payload: { msgErro: "URL não informada." } }) 
            return false
        }

        if (usuario === '') {
            console.log('@Safira:Pedido.Acesso.Error.Email.Vazio')
            dispatch({ type: ACTION.ACESSO_ERRO, payload: { msgErro: "Login não informado." } }) 
            return false
        }

        if ( senha === '') {
            console.log('@Safira:Pedido.Acesso.Error.Senha.Vazio')
            dispatch({ type: ACTION.ACESSO_ERRO, payload: { msgErro: "Senha não informada." } })
            return false
        }

        if ( form === '') {
            console.log('@Safira:Pedido.Acesso.Error.Form.Vazio')
            dispatch({ type: ACTION.ACESSO_ERRO, payload: { msgErro: "Form não informado." } })
            return false
        }

        if ( senha === '') {
            console.log('@Safira:Pedido.Acesso.Error.Recurso.Vazio')
            dispatch({ type: ACTION.ACESSO_ERRO, payload: { msgErro: "Recurso não informado." } })
            return false
        }

        const urlAcesso    = urlPadrao + "Acesso"
        const paramsAcesso = {"usuario": usuario, "senha": senha, "form": form, "recurso": recurso}

        // console.log('@Safira:Pedido.Acesso.Params:', JSON.stringify(paramsAcesso))
 
        axios({
            method : 'POST',
            url    : urlAcesso,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
            data   : JSON.stringify(paramsAcesso),
        }).then((response) => {

            // const dados  = response.data
            // const acesso = dados.acesso ? dados.acesso : false

            AsyncStorage.setItem(CONSTANTE.SESSAO_USER_LIBERADOR, usuario)

            if ( form.toString().trim().toLowerCase() == "frmBar".toLowerCase() && recurso.toString().trim().toLowerCase() == "VendaEspecial".toLowerCase() ){
                dispatch({ type: ACTION.ACESSO_ESPECIAL_SUCESSO })
                return true
            }

            const urlLimite    = urlPadrao + "LiberaLimiteCartao"
            const paramsLimite = {"codigoCartao": cartao, "operador": usuario, "netName": celular}

            // console.log('@Safira:Pedido.Limite.Params:', JSON.stringify(paramsLimite))

            axios({
                method : 'POST',
                url    : urlLimite,
                timeout: CONSTANTE.URL_TIMEOUT,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
                data   : JSON.stringify(paramsLimite),
            }).then((response) => {
                // const dados  = response.data
                // const acesso = dados.acesso ? dados.acesso : false
                dispatch({ type: ACTION.ACESSO_SUCESSO })
            }).catch((error) => {
                const msgErroStatus  = error.response ? error.response.status : '400' // 400 Bad Request
                const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
                console.log('@Safira:Pedido.Acesso.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', urlLimite)
                const msgErro = msgErroStatus == '401' ? 'Usuário/Senha inválido' : '('+msgErroStatus+') Falha ao Liberar Limite'
                dispatch({ type: ACTION.ACESSO_ERRO, payload: { msgErro: msgErro } })
                registrarErro(urlLimite, paramsLimite, msgErroStatus, msgErroMessage, dispatch)
            })

        }).catch((error) => {
            const msgErroStatus  = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Pedido.Acesso.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', urlAcesso)
            const msgErro = msgErroStatus == '401' ? 'Usuário/Senha inválido' : '('+msgErroStatus+') Falha ao verificar Acesso'
            dispatch({ type: ACTION.ACESSO_ERRO, payload: { msgErro: msgErro } })
            if ( msgErroStatus != "401") registrarErro(urlAcesso, paramsAcesso, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.ACESSO_ERRO, payload: { msgErro: 'Erro ao verificar verificar Acesso' } })
        console.log('@Safira:Pedido.Acesso.Error', error)
        registrarErro(urlAcesso, paramsAcesso, '', error, dispatch)
    }
}

const registrarErro = (url, params, statuscod, message, dispatch) => {
    try {
        // console.log(url, params, statuscod, message)
        dispatch(adicionaListaErro('acessolimite', url, params, statuscod, message))
    }
    catch (error) {
        console.log('@Safira:Pedido.Acesso-Error', error)
    }
}
