import axios from 'axios'
import * as CONSTANTE from '../../util/Constante'
import { adicionaListaErro, } from './erro'

// Action Types

const ACTION = { 

    //LOGIN GERAL
    MODIFICA_CARTAO_OK: 'sfr/crt/ok',
    MODIFICA_CARTAO_MSG: 'sfr/crt/modifica/msg_cartao',

    // LOGIN
    CARTAO_EM_ANDAMENTO: 'sfr/crt/busca/em_andamento',
    CARTAO_SUCESSO: 'sfr/crt/busca/sucesso',
    CARTAO_ERRO: 'sfr/crt/busca/erro',

}

// Reducer

const INITIAL_STATE = {
    isCartaoOK: false,
    isCartaoLoading: false,
    txtCartaoErro: '',
    txtCartaoCodigo: '',
}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {

        // GERAL
        case ACTION.MODIFICA_CARTAO_OK:
            return { ...state, isCartaoOK: false, }
        case ACTION.MODIFICA_CARTAO_MSG:
            return { ...state, isCartaoOK: false, txtCartaoErro: action.payload.msgErro, txtCartaoCodigo: '', }

        // LOGIN
        case ACTION.CARTAO_EM_ANDAMENTO:
            return { ...state, isCartaoLoading: true, isCartaoOK: false, txtCartaoErro: '', txtCartaoCodigo: '', }
        case ACTION.CARTAO_SUCESSO:
            return { ...state, isCartaoLoading: false, isCartaoOK: true, txtCartaoErro: '', txtCartaoCodigo: action.payload.codigo, }
        case ACTION.CARTAO_ERRO:
            return { ...state, isCartaoLoading: false, isCartaoOK: false,  txtCartaoErro: action.payload.msgErro, txtCartaoCodigo: '', } 

        // default
        default:
            return state;
    }
}

// Action Creators

export const modificaCartaoOK = () => {
    return { type: ACTION.MODIFICA_CARTAO_OK }
}

export const modificaMsgCartao = () => {
    return { type: ACTION.MODIFICA_CARTAO_MSG, payload: { msgErro: '' } }
}

export const buscarCartao = (urlPadrao = '', cartao = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.CARTAO_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Cartao.Error.Url.Vazio')
            dispatch({ type: ACTION.CARTAO_ERRO, payload: { msgErro: "URL não informada." } }) 
            return false
        }

        if (cartao === '') {
            console.log('@Safira:Cartao.Error.Cartao.Vazio')
            dispatch({ type: ACTION.CARTAO_ERRO, payload: { msgErro: "Cartão não informado." } }) 
            return false
        }

        const url    = urlPadrao + "Cartao?Cartao=" + cartao.toString().trim()
        const params = {}

        axios({
            method : 'GET',
            url    : url,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
        }).then((response) => {

            const dados    = response.data
            const codigo   = dados.codigo.toString().trim()
            // const nome  = dados.nome.toString().trim()
            const situacao = dados.situacao.toString().trim().toUpperCase()
            
            if (situacao != 'A') {
                dispatch({ type: ACTION.CARTAO_ERRO, payload: { msgErro: "Cartão não está Ativo." } }) 
                console.log('@Safira:Cartao.Error.situacao.Bloqueado')
                return false 
            }

            dispatch({ type: ACTION.CARTAO_SUCESSO, payload: { codigo: codigo, } })

        }).catch((error) => {
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Cartao.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', url)
            const msgErro = msgErroStatus == '404' ? 'Cartão não localizado' : '('+msgErroStatus+') Falha ao verificar Cartão' // 404 Not Found
            dispatch({ type: ACTION.CARTAO_ERRO, payload: { msgErro: msgErro } })
            registrarErro(url, params, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.CARTAO_ERRO, payload: { msgErro: 'Erro ao verificar Cartão' } })
        console.log('@Safira:Cartao.Error', error)
        registrarErro(url, params, '', error, dispatch)
    }
}

const registrarErro = (url, params, statuscod, message, dispatch) => {
    try {
        // console.log(url, params, statuscod, message)
        dispatch(adicionaListaErro('cartao', url, params, statuscod, message))
    }
    catch (error) {
        console.log('@Safira:Auth-Error', error)
    }
}