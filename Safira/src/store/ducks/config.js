import axios from 'axios'
import * as CONSTANTE from '../../util/Constante'
import { adicionaListaErro, } from './erro'

// Action Types

const ACTION = {

    // GERAL
    MODIFICA_URL: 'sfr/cnfg/modifica/url',
    MODIFICA_MSG_CONFIG: 'sfr/cnfg/modifica/msg',

    // Veiricar Url
    CONFIG_EM_ANDAMENTO: 'sfr/cnfg/teste/em_andamento',
    CONFIG_SUCESSO: 'sfr/cnfg/teste/sucesso',
    CONFIG_ERRO: 'sfr/cnfg/teste/erro',

    // Veiricar Vsr
    CONFIG_VERSAO_EM_ANDAMENTO: 'sfr/cnfg/vsr/em_andamento',
    CONFIG_VERSAO_SUCESSO: 'sfr/cnfg/vsr/sucesso',
    CONFIG_VERSAO_ERRO: 'sfr/cnfg/vsr/erro',

}

// Reducer

const INITIAL_STATE = {

    // Veiricar Url
    txtURL: '',
    isLoadingConfig: false,
    isConfigOK: false,
    txtConfigErro: '',

    // Veiricar Vsr
    txtVsrEndPoint: '',
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // GERAL
        case ACTION.MODIFICA_URL:
            return { ...state, txtURL: action.payload.novaUrl, }
        case ACTION.MODIFICA_MSG_CONFIG:
            return { ...state, isLoadingConfig: false, isConfigOK: false, txtConfigErro: action.payload.msgErro }

        // VERIFICAR URL
        case ACTION.CONFIG_EM_ANDAMENTO:
            return { ...state, isLoadingConfig: true, isConfigOK: false, txtConfigErro: '', }
        case ACTION.CONFIG_SUCESSO:
            return { ...state, isLoadingConfig: false, isConfigOK: true, txtConfigErro: '', }
        case ACTION.CONFIG_ERRO:
            return { ...state, isLoadingConfig: false, isConfigOK: false, txtConfigErro: action.payload.msgErro, }

        // VERIFICAR VERSAO
        case ACTION.CONFIG_VERSAO_EM_ANDAMENTO:
            return { ...state, txtVsrEndPoint: '', }
        case ACTION.CONFIG_VERSAO_SUCESSO:
            return { ...state, txtVsrEndPoint: action.payload.versao, }
        case ACTION.CONFIG_VERSAO_ERRO:
            return { ...state, txtVsrEndPoint: '', txtConfigErro: action.payload.msgErro, }

        // default
        default:
            return state;
    }
}

// Action Creators

export const modificaUrl = (value) => {
    return { type: ACTION.MODIFICA_URL, payload: { novaUrl: value } }
}

export const modificaMsgConfig = () => {
    return { type: ACTION.MODIFICA_MSG_CONFIG, payload: { msgErro: '' } }
}

export const verificarUrl = (urlPadrao = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.CONFIG_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Config.Error.Url.Vazio')
            dispatch({ type: ACTION.CONFIG_ERRO, payload: { msgErro: "URL não informada." } })
            return false
        }

        const url = urlPadrao + "mocas"
        const params = {}

        axios({
            method: 'GET', // GET // POST
            url: url,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
        }).then((response) => {
            dispatch({ type: ACTION.CONFIG_SUCESSO })
        }).catch((error) => {
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Config.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', url)
            const msgErro = '(' + msgErroStatus + ') Falha ao verificar Configuração'
            dispatch({ type: ACTION.CONFIG_ERRO, payload: { msgErro: msgErro } })
            registrarErro(url, params, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.CONFIG_ERRO, payload: { msgErro: 'Erro ao verificar Configuração' } })
        console.log('@Safira:Config.Error', error)
        registrarErro(url, params, '', error, dispatch)
    }
}

export const verificarVersao = (urlPadrao = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.CONFIG_VERSAO_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Config.Versao.Error.Url.Vazio')
            dispatch({ type: ACTION.CONFIG_VERSAO_ERRO, payload: { msgErro: "URL não informada." } })
            return false
        }

        const url = urlPadrao.replace('/v1', '') + "version" // http://rela.no-ip.net:8885/version // http://rela.no-ip.net:8885/version
        const params = {}

        axios({
            method: 'GET', // GET // POST
            url: url,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
        }).then((response) => {
            const dados = response.data
            const versao = dados.version ? dados.version.toString().trim() : ""
            dispatch({ type: ACTION.CONFIG_VERSAO_SUCESSO, payload: { versao: versao } })
        }).catch((error) => {
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Config.Versao.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', url)
            const msgErro = '(' + msgErroStatus + ') Falha ao verificar Versão'
            dispatch({ type: ACTION.CONFIG_VERSAO_ERRO, payload: { msgErro: msgErro } })
            registrarErro(url, params, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.CONFIG_VERSAO_ERRO, payload: { msgErro: 'Erro ao verificar Versão' } })
        console.log('@Safira:Config.Versao.Error', error)
        registrarErro(url, params, '', error, dispatch)
    }
}


const registrarErro = (url, params, statuscod, message, dispatch) => {
    try {
        // console.log(url, params, statuscod, message)
        dispatch(adicionaListaErro('config', url, params, statuscod, message))
    }
    catch (error) {
        console.log('@Safira:Auth-Error', error)
    }
}