import axios from 'axios'
import { DataProvider, } from 'recyclerlistview'
import * as CONSTANTE from '../../util/Constante'
import { adicionaListaErro, } from './erro'

// Action Types 

const ACTION = {

    // pesquisa
    LISTA_PRODUTO_EM_ANDAMENTO: 'sfr/prdt/lista/em_andamento',
    LISTA_PRODUTO_SUCESSO: 'sfr/prdt/lista/sucesso',
    LISTA_PRODUTO_ERRO: 'sfr/prdt/lista/erro',

    // opcionais
    LISTA_OPCIONAIS_EM_ANDAMENTO: 'sfr/prdt/opcionais/em_andamento',
    LISTA_OPCIONAIS_SUCESSO: 'sfr/prdt/opcionais/sucesso',
    LISTA_OPCIONAIS_ERRO: 'sfr/prdt/opcionais/erro',

    // GERAL
    MODIFICA_MSG_PRODUTO: 'sfr/prdt/modifica/msg_erro',
    MODIFICA_LISTA_PRODUTO: 'sfr/prdt/modifica/lista',
}

// Reducer

const INITIAL_STATE = {

    // pesquisa
    isLoadingProduto: true,
    txtErroProduto: '',
    listaProduto: [],
    listaProdutoFull: [],
    dataProviderProduto: new DataProvider((r1, r2) => { return r1 !== r2; }),

    // opcionais
    isLoadingOpcionais: true,
    txtErroOpcionais: '',
    listaOpcionais: [],
    idOpcionais: '',
    codigoOpcionais: '',
    descricaoOpcionais: '',

}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // pesquisa
        case ACTION.LISTA_PRODUTO_EM_ANDAMENTO:
            return { ...state, isLoadingProduto: true, txtErroProduto: '', listaProduto: [], listaProdutoFull: [], dataProviderProduto: state.dataProviderProduto.cloneWithRows([]), }
        case ACTION.LISTA_PRODUTO_SUCESSO:
            return { ...state, isLoadingProduto: false, txtErroProduto: '', listaProduto: action.payload.lista, listaProdutoFull: action.payload.lista, dataProviderProduto: action.payload.dataProvider, }
        case ACTION.LISTA_PRODUTO_ERRO:
            return { ...state, isLoadingProduto: false, txtErroProduto: action.payload.msgErro, listaProduto: [], listaProdutoFull: [], dataProviderProduto: state.dataProviderProduto.cloneWithRows([]) }

        // opcionais
        case ACTION.LISTA_OPCIONAIS_EM_ANDAMENTO:
            return { ...state, isLoadingOpcionais: true, txtErroOpcionais: '', listaOpcionais: [], idOpcionais: '', codigoOpcionais: '', descricaoOpcionais: '', }
        case ACTION.LISTA_OPCIONAIS_SUCESSO:
            return { ...state, isLoadingOpcionais: false, txtErroOpcionais: '', listaOpcionais: action.payload.lista, idOpcionais: action.payload.id, codigoOpcionais: action.payload.codigo, descricaoOpcionais: action.payload.descricao, }
        case ACTION.LISTA_OPCIONAIS_ERRO:
            return { ...state, isLoadingOpcionais: false, txtErroOpcionais: action.payload.msgErro, listaOpcionais: [], idOpcionais: '', codigoOpcionais: '', descricaoOpcionais: '', }

        // GERAL
        case ACTION.MODIFICA_MSG_PRODUTO:
            return { ...state, txtErroProduto: action.payload.msgErro }
        case ACTION.MODIFICA_LISTA_PRODUTO:
            return { ...state, listaProduto: action.payload.lista, dataProviderProduto: state.dataProviderProduto.cloneWithRows(action.payload.lista), }

        // default
        default:
            return state
    }
}

const removerAcento = (texto) => {
    if (texto != '') texto = texto.toString().trim().normalize('NFD').replace(/[^a-z0-9]/gi, '') //.replace(/[^a-z]/g, '')
    return texto
}

// Action Creators

export const modificaMsgProduto = () => {
    return { type: ACTION.MODIFICA_MSG_PRODUTO, payload: { msgErro: '' } }
}

export const modificaListaProduto = (listaProdutoFull, filtro) => {
    filtro = removerAcento(filtro)
    let lista = filtro == '' ? listaProdutoFull : listaProdutoFull.filter((item) => item.codigo.toString().trim().indexOf(filtro) > -1 || item.descricao.toString().toUpperCase().indexOf(filtro) > -1 || removerAcento(item.descricao).toString().toUpperCase().indexOf(filtro) > -1)
    return { type: ACTION.MODIFICA_LISTA_PRODUTO, payload: { lista, lista, } }
}

export const limpaListaProduto = () => {
    return { type: ACTION.LISTA_PRODUTO_ERRO, payload: { msgErro: '' } }
}

export const buscaListaProduto = (urlPadrao = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_PRODUTO_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Produto.Error.Url.Vazio')
            dispatch({ type: ACTION.LISTA_PRODUTO_ERRO, payload: { msgErro: "URL não informada." } })
            return false
        }

        const url = urlPadrao + "produtos"
        const params = {}

        axios({
            method: 'GET',
            url: url,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
        }).then((response) => {

            let lista = response.data

            let dataProvider = new DataProvider((r1, r2) => { return r1 !== r2; }).cloneWithRows(lista)

            dispatch({ type: ACTION.LISTA_PRODUTO_SUCESSO, payload: { lista: lista, dataProvider, dataProvider, } })

        }).catch((error) => {
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Produto.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', url)
            const msgErro = '(' + msgErroStatus + ') Falha ao verificar Produtos'
            dispatch({ type: ACTION.LISTA_PRODUTO_ERRO, payload: { msgErro: msgErro } })
            registrarErro(url, params, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_PRODUTO_ERRO, payload: { msgErro: 'Erro ao verificar Produto' } })
        console.log('@Safira:Produto.Error', error)
        registrarErro(url, params, '', error, dispatch)
    }
}

export const limpaListaOpcionais = () => {
    return { type: ACTION.LISTA_OPCIONAIS_ERRO, payload: { msgErro: '' } }
}

export const buscaListaOpcionais = (urlPadrao = '', id = '', codigo = '', descricao = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_OPCIONAIS_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Opcionais.Error.Url.Vazio')
            dispatch({ type: ACTION.LISTA_OPCIONAIS_ERRO, payload: { msgErro: "URL não informada." } })
            return false
        }

        if (codigo === '') {
            console.log('@Safira:Opcionais.Error.Codigo.Vazio')
            dispatch({ type: ACTION.LISTA_OPCIONAIS_ERRO, payload: { msgErro: "Codigo não informado." } })
            return false
        }

        const url = urlPadrao + `produtos/opcionais?produto=${codigo}`
        const params = {}

        axios({
            method: 'GET',
            url: url,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
        }).then((response) => {

            let lista = response.data

            dispatch({ type: ACTION.LISTA_OPCIONAIS_SUCESSO, payload: { lista: lista, id: id, codigo: codigo, descricao: descricao, } })

        }).catch((error) => {
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Opcionais.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', url)
            const msgErro = '(' + msgErroStatus + ') Falha ao verificar Opcionais'
            dispatch({ type: ACTION.LISTA_OPCIONAIS_ERRO, payload: { msgErro: msgErro } })
            registrarErro(url, params, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_OPCIONAIS_ERRO, payload: { msgErro: 'Erro ao verificar Opcionais' } })
        console.log('@Safira:Opcionais.Error', error)
        registrarErro(url, params, '', error, dispatch)
    }
}

const registrarErro = (url, params, statuscod, message, dispatch) => {
    try {
        // console.log(url, params, statuscod, message)
        dispatch(adicionaListaErro('produtos', url, params, statuscod, message))
    }
    catch (error) {
        console.log('@Safira:Produto-Error', error)
    }
}
