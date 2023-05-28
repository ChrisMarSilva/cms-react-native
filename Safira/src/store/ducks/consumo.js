import axios from 'axios'
import * as CONSTANTE from '../../util/Constante'
import { adicionaListaErro, } from './erro'

// Action Types 

const ACTION = {

    // pesquisa
    LISTA_CONSUMO_EM_ANDAMENTO: 'sfr/cnsm/lista/em_andamento',
    LISTA_CONSUMO_SUCESSO: 'sfr/cnsm/lista/sucesso',
    LISTA_CONSUMO_ERRO: 'sfr/cnsm/lista/erro',

    // GERAL
    MODIFICA_FILTRO_CARTAO: 'sfr/cnsm/modifica/cartao',
    MODIFICA_MSG_CONSUMO: 'sfr/cnsm/modifica/msg_erro',
    MODIFICA_LISTA_CONSUMO: 'sfr/cnsm/modifica/lista',

}

// Reducer

const INITIAL_STATE = {

    // pesquisa
    txtFiltroCartao: '',
    txtErroConsumo: '',
    isShowLista: false,
    isLoadingConsumo: false,
    listaConsumo: [],
    totalConsumo: 0.0,
    pagamentoConsumo: 0.0,
    saldoConsumo: 0.0,
    cartaoConsumo: '',
    nomeConsumo: '',

}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {

        // pesquisa
        case ACTION.LISTA_CONSUMO_EM_ANDAMENTO:
            return { ...state, isLoadingConsumo: true,  isShowLista: false, txtErroConsumo: '', listaConsumo: [], totalConsumo: 0.0, pagamentoConsumo: 0.0, saldoConsumo: 0.0, cartaoConsumo: '', nomeConsumo: '', }
        case ACTION.LISTA_CONSUMO_SUCESSO: 
            return { ...state, isLoadingConsumo: false, isShowLista: true, txtErroConsumo: '', listaConsumo: action.payload.lista, totalConsumo: action.payload.total, pagamentoConsumo: action.payload.pagamento, saldoConsumo: action.payload.saldo, cartaoConsumo: action.payload.cartao, nomeConsumo: action.payload.nome, }
        
        case ACTION.LISTA_CONSUMO_ERRO:
            return { ...state, isLoadingConsumo: false, isShowLista: false, txtErroConsumo: action.payload.msgErro, listaConsumo: [], totalConsumo: 0.0, pagamentoConsumo: 0.0, saldoConsumo: 0.0, cartaoConsumo: '', nomeConsumo: '', }

        // GERAL
        case ACTION.MODIFICA_FILTRO_CARTAO:
            return { ...state, txtFiltroCartao: action.payload.novoCartao, }
        case ACTION.MODIFICA_MSG_CONSUMO:
            return { ...state, txtErroConsumo: action.payload.msgErro }
        case ACTION.MODIFICA_LISTA_CONSUMO:
            return { ...state, isLoadingConsumo: false, isShowLista: false, txtErroConsumo: '', listaConsumo: [], totalConsumo: 0.0, pagamentoConsumo: 0.0, saldoConsumo: 0.0, txtFiltroCartao: '', cartaoConsumo: '', nomeConsumo: '', }

        // default
        default:
            return state
    }
}

// Action Creators

export const modificaFiltroCartao = (value) => {
    return { type: ACTION.MODIFICA_FILTRO_CARTAO, payload: { novoCartao: value } }
}

export const modificaMsgConsumo = () => {
    return { type: ACTION.MODIFICA_MSG_CONSUMO, payload: { msgErro: '' } }
}

export const limpaListaConsumo = () => {
    return { type: ACTION.MODIFICA_LISTA_CONSUMO }
}

export const buscaListaConsumo = ( urlPadrao = '', cartao = '' ) => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_CONSUMO_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Consumo.Error.Url.Vazio')
            dispatch({ type: ACTION.LISTA_CONSUMO_ERRO, payload: { msgErro: "URL não informada." } }) 
            return false
        }

        if (cartao === '') {
            console.log('@Safira:Consumo.Error.Cartao.Vazio')
            dispatch({ type: ACTION.LISTA_CONSUMO_ERRO, payload: { msgErro: "Cartão não informado." } }) 
            return false
        }

        const urlCartao    = urlPadrao + "Cartao?Cartao=" + cartao.toString().trim()
        const paramsCartao = {}

        axios({
            method : 'GET',
            url    : urlCartao,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
        }).then((response) => {

            const dados    = response.data
            const codigo   = dados.codigo.toString().trim()
            // const nome  = dados.nome.toString().trim()
            const situacao = dados.situacao.toString().trim().toUpperCase()
            
            if (codigo == '') {
                dispatch({ type: ACTION.LISTA_CONSUMO_ERRO, payload: { msgErro: "Cartão não está Ativo." } }) 
                console.log('@Safira:Consumo.Cartao.Error.situacao.Bloqueado')
                return false 
            }
            
            if (situacao != 'A') {
                dispatch({ type: ACTION.LISTA_CONSUMO_ERRO, payload: { msgErro: "Cartão não está Ativo." } }) 
                console.log('@Safira:Consumo.Cartao.Error.situacao.Bloqueado')
                return false 
            }

            const urlConsumo    = urlPadrao + "ConsumoCartao?CodigoCartao=" + codigo
            const paramsConsumo = {}

            axios({
                method : 'GET', 
                url    : urlConsumo,
                timeout: CONSTANTE.URL_TIMEOUT,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
            }).then((response) => {
    
                const dados     = response.data
                const nome      = dados.nome
                const total     = dados.total
                const pagamento = dados.pagamento
                const saldo     = dados.saldo
                const lista     = dados.consumo.filter((item) => item.descricao != 'SUBTOTAL')  // removendo o item 'SUBTOTAL'

                // let lista = []
                // lista.push.apply(lista, dados.consumo)
                
                dispatch({ type: ACTION.LISTA_CONSUMO_SUCESSO, payload: { lista: lista, total: total, pagamento: pagamento, saldo: saldo, cartao: cartao, nome: nome, } })
    
            }).catch((error) => {
                const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
                const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
                console.log('@Safira:Consumo.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', urlConsumo)
                const msgErro = '('+msgErroStatus+') Falha ao verificar Consumo'
                dispatch({ type: ACTION.LISTA_CONSUMO_ERRO, payload: { msgErro: msgErro } })
                registrarErro(urlConsumo, paramsConsumo, msgErroStatus, msgErroMessage, dispatch)
            })

        }).catch((error) => {
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Consumo.Cartao.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', urlCartao)
            const msgErro = msgErroStatus == '404' ? 'Cartão não localizado' : '('+msgErroStatus+') Falha ao verificar Cartão' // 404 Not Found
            dispatch({ type: ACTION.LISTA_CONSUMO_ERRO, payload: { msgErro: msgErro } })
            registrarErro(urlCartao, paramsCartao, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_CONSUMO_ERRO, payload: { msgErro: 'Erro ao verificar Consumo' } })
        console.log('@Safira:Config.Error', error)
        registrarErro(urlCartao, paramsCartao, '', error, dispatch)
    }
}


const registrarErro = (url, params, statuscod, message, dispatch) => {
    try {
        // console.log(url, params, statuscod, message)
        dispatch(adicionaListaErro('consumo', url, params, statuscod, message))
    }
    catch (error) {
        console.log('@Safira:Auth-Error', error)
    }
}