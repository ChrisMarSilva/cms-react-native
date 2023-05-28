import axios from 'axios'
import * as CONSTANTE from '../../util/Constante'
import { adicionaListaErro, } from './erro'

// Action Types

const ACTION = {

    // GERAL
    MODIFICA_CARTAO: 'sfr/pdd/modifica/cartao',
    MODIFICA_LISTA_CARTAO: 'sfr/pdd/modifica/lst/cartao',
    MODIFICA_MOCA: 'sfr/pdd/modifica/add/moca',
    MODIFICA_PRODUTO_CODIGO: 'sfr/pdd/modifica/add/produto/codigo',
    MODIFICA_PRODUTO_DESCRICAO: 'sfr/pdd/modifica/add/produto/descricao',
    MODIFICA_LISTA_PRODUTO: 'sfr/pdd/modifica/lst/produto',
    MODIFICA_MSG_PEDIDO: 'sfr/pdd/modifica/msg_erro',
    MODIFICA_PEDIDO_OK_ERRO: 'sfr/pdd/modifica/ok_erro',
    MODIFICA_HIDE_VERIFICA_ACESSO: 'sfr/pdd/modifica/hide/vrfc/acss',
    MODIFICA_SHOW_VERIFICA_ACESSO: 'sfr/pdd/modifica/show/vrfc/acss',

    // PEDIDO
    PEDIDO_EM_ANDAMENTO: 'sfr/pdd/em_andamento',
    PEDIDO_SUCESSO: 'sfr/pdd/sucesso',
    PEDIDO_ERRO: 'sfr/pdd/erro',
    PEDIDO_LIMPAR: 'sfr/pdd/limpar',

}

// Reducer

const INITIAL_STATE = {

    // PEDIDO
    txtPedidoCartao: '...',
    listaPedidoCartao: [],
    txtPedidoMoca: '...',
    txtPedidoProduto: '',
    txtPedidoProdutoDescricao: '...',
    listaPedidoProduto: [],

    isPedidoOK: false,
    isLoadingPedido: false,
    txtErroPedido: '',

    isPedidoVerificaAcessoShow: false,
    txtPedidoVerificaAcessoMessage: '',
    txtPedidoVerificaAcessoCartao: 0,
    txtPedidoVerificaAcessoSaldo: 0.0,
    txtPedidoVerificaAcessoForm: '',
    txtPedidoVerificaAcessoRecurso: '',

}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // GERAL
        case ACTION.MODIFICA_CARTAO:
            return { ...state, isPedidoOK: false, txtPedidoCartao: action.payload.cartao, }
        case ACTION.MODIFICA_LISTA_CARTAO:
            return { ...state, isPedidoOK: false, listaPedidoCartao: action.payload.lista, txtPedidoCartao: action.payload.cartao }
        case ACTION.MODIFICA_MOCA:
            return { ...state, isPedidoOK: false, txtPedidoMoca: action.payload.value }
        case ACTION.MODIFICA_PRODUTO_CODIGO:
            return { ...state, isPedidoOK: false, txtPedidoProduto: action.payload.produto, }
        case ACTION.MODIFICA_PRODUTO_DESCRICAO:
            return { ...state, isPedidoOK: false, txtPedidoProdutoDescricao: action.payload.produto, }
        case ACTION.MODIFICA_LISTA_PRODUTO:
            return { ...state, listaPedidoProduto: action.payload.novaListaProduto, }
        case ACTION.MODIFICA_PEDIDO_OK_ERRO:
            return { ...state, isPedidoOK: false, }
        case ACTION.MODIFICA_MSG_PEDIDO:
            return { ...state, txtErroPedido: action.payload.value }
        case ACTION.MODIFICA_HIDE_VERIFICA_ACESSO:
            return { ...state, isPedidoVerificaAcessoShow: false, }
        case ACTION.MODIFICA_SHOW_VERIFICA_ACESSO:
            return { ...state, isLoadingPedido: false, isPedidoOK: false, isPedidoVerificaAcessoShow: true, txtPedidoVerificaAcessoMessage: action.payload.mensagem, txtPedidoVerificaAcessoCartao: action.payload.cartao, txtPedidoVerificaAcessoSaldo: action.payload.saldo, txtPedidoVerificaAcessoForm: action.payload.form, txtPedidoVerificaAcessoRecurso: action.payload.recurso, }

        // PEDIDO
        case ACTION.PEDIDO_EM_ANDAMENTO:
            return { ...state, isLoadingPedido: true, isPedidoOK: false, isPedidoVerificaAcessoShow: false, txtErroPedido: '', }
        case ACTION.PEDIDO_SUCESSO:
            return { ...state, isLoadingPedido: false, isPedidoOK: true, isPedidoVerificaAcessoShow: false, txtPedidoMessageLiberaLimite: '', txtPedidoVerificaAcessoCartao: 0, txtPedidoVerificaAcessoSaldo: 0.0, txtPedidoVerificaAcessoForm: '', txtPedidoVerificaAcessoRecurso: '', txtErroPedido: '', txtPedidoCartao: '...', listaPedidoCartao: [], txtPedidoMoca: '...', txtPedidoProduto: '', txtPedidoProdutoDescricao: '...', listaPedidoProduto: [], }
        case ACTION.PEDIDO_ERRO:
            return { ...state, isLoadingPedido: false, isPedidoOK: false, isPedidoVerificaAcessoShow: false, txtErroPedido: action.payload.msgErro, }
        case ACTION.PEDIDO_LIMPAR:
            return { ...state, isLoadingPedido: false, isPedidoOK: false, isPedidoVerificaAcessoShow: false, txtPedidoMessageLiberaLimite: '', txtPedidoVerificaAcessoCartao: 0, txtPedidoVerificaAcessoSaldo: 0.0, txtPedidoVerificaAcessoForm: '', txtPedidoVerificaAcessoRecurso: '', txtErroPedido: '', txtPedidoCartao: '...', listaPedidoCartao: [], txtPedidoMoca: '...', txtPedidoProduto: '', txtPedidoProdutoDescricao: '...', listaPedidoProduto: [], }

        // default
        default:
            return state;
    }
}

// Action Creators

export const LimpaPedido = () => {
    return { type: ACTION.PEDIDO_LIMPAR, }
}

export const modificaPedidoCartao = (cartao) => {
    return { type: ACTION.MODIFICA_CARTAO, payload: { cartao: cartao } }
}

export const modificaListaPedidoCartao = (lista) => {
    let cartao = '...'
    // if (lista.length == 1 ) cartao = lista[0].cartao.toString()
    // if (lista.length  > 1 ) cartao = 'DIV/' + lista.length.toString()
    if (lista && lista.length && lista.length > 0) {
        let qtde = 0
        lista.map((item) => {
            if (item.status == 'inc-ok' || item.status == 'exc-pend') {
                qtde += 1
                cartao = item.cartao.toString()
                if (qtde > 1) cartao = 'DIV/' + qtde.toString()
            }
        })
    }
    return { type: ACTION.MODIFICA_LISTA_CARTAO, payload: { lista: lista, cartao: cartao, } }
}

export const modificaPedidoMoca = (value) => {
    return { type: ACTION.MODIFICA_MOCA, payload: { value: value } }
}

export const modificaPedidoProduto = (produto) => {
    return { type: ACTION.MODIFICA_PRODUTO_CODIGO, payload: { produto: produto } }
}

export const modificaPedidoProdutoDescricao = (produto) => {
    return { type: ACTION.MODIFICA_PRODUTO_DESCRICAO, payload: { produto: produto } }
}

export const modificaListaPedidoProduto = (lista) => {
    // const total = lista == null || lista.length <= 0 ? 0.0 : lista.reduce(function (acc, item) { return acc + ( parseFloat(item.valor) * parseFloat(item.quant)) }, 0.0)
    // const total = lista == null || lista.length <= 0 ? 0.0 : lista.reduce(function (acc, item) { return acc + parseFloat(item.total) }, 0.0)
    return { type: ACTION.MODIFICA_LISTA_PRODUTO, payload: { novaListaProduto: lista, } }
}

export const modificaPedidoVerificaAcessoHide = () => {
    return { type: ACTION.MODIFICA_HIDE_VERIFICA_ACESSO }
}

export const modificaPedidoOKErro = () => {
    return { type: ACTION.MODIFICA_PEDIDO_OK_ERRO }
}

export const modificaMsgPedido = () => {
    return { type: ACTION.MODIFICA_MSG_PEDIDO, payload: { value: '' } }
}

export const fecharVenda = (urlPadrao = '', garcom = '', moca = '', autorizador = '', celular = '', cartoes = [], produtos = []) => async dispatch => {
    try {


        dispatch({ type: ACTION.PEDIDO_EM_ANDAMENTO })

        if (urlPadrao === '') {
            console.log('@Safira:Pedido.Error.urlPadrao.Vazio')
            dispatch({ type: ACTION.PEDIDO_ERRO, payload: { msgErro: "URL não informada." } })
            return false
        }

        if (garcom === '') {
            console.log('@Safira:Pedido.Error.Garçom.Vazio')
            dispatch({ type: ACTION.PEDIDO_ERRO, payload: { msgErro: "Garçom não informado." } })
            return false
        }

        if (cartoes === null || cartoes.length == 0) {
            console.log('@Safira:Pedido.Error.Cartão.Vazio')
            dispatch({ type: ACTION.PEDIDO_ERRO, payload: { msgErro: "Cartão não informado." } })
            return false
        }

        if (produtos === null || produtos.length == 0) {
            console.log('@Safira:Pedido.Error.Produto.Vazio')
            dispatch({ type: ACTION.PEDIDO_ERRO, payload: { msgErro: "Produto não informado." } })
            return false
        }

        const url = urlPadrao + "FechaVenda"

        const params = {
            "garcom": garcom.toString(),
            "cup": moca.toString(),
            "autorizador": autorizador.toString(),
            "netName": celular.toString(),
            "cartoes": cartoes,
            "items": produtos,
            "tipoPagtos": []
        }

        // console.log("----")
        // console.log('@Safira:Pedido.Params', JSON.stringify(params))

        axios({
            method: 'POST',
            url: url,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
            data: JSON.stringify(params),
        }).then((response) => {

            const RET_SUCESSO = 1
            const RET_VENDA_ESPECIAL = -2
            const RET_LIBERACAO_LIMITE = -3
            const RET_ABORTA = -8

            const dados = response.data
            const status = dados.status ? parseInt(dados.status.toString().trim()) : 0
            const mensagem = dados.mensagem ? dados.mensagem.toString().trim() : ""
            const cartao = dados.cartao ? parseInt(dados.cartao.toString().trim()) : 0
            const saldo = dados.saldo ? parseFloat(dados.saldo.toString().trim()) : 0.0
            const form = dados.form ? dados.form.toString().trim() : ""
            const recurso = dados.formRecurso ? dados.formRecurso.toString().trim() : ""

            if (status == RET_SUCESSO) {
                dispatch({ type: ACTION.PEDIDO_SUCESSO })
            } else if (status == RET_LIBERACAO_LIMITE || status == RET_VENDA_ESPECIAL) {
                dispatch({ type: ACTION.MODIFICA_SHOW_VERIFICA_ACESSO, payload: { mensagem: mensagem.replace("\n", ''), cartao: cartao, saldo: saldo, form: form, recurso: recurso, } })
            } else if (status == RET_ABORTA) {
                dispatch({ type: ACTION.PEDIDO_ERRO, payload: { msgErro: mensagem } })
            } else {
                const msgErro = mensagem ? mensagem : 'Falha ao Fechar Pedido - Status' + status
                dispatch({ type: ACTION.PEDIDO_ERRO, payload: { msgErro: msgErro, }, })
                registrarErro(url, params, '200', msgErro, dispatch)
            }

        }).catch((error) => {
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Pedido.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', url)
            const msgErro = '(' + msgErroStatus + ') Falha ao Fechar Pedido'
            dispatch({ type: ACTION.PEDIDO_ERRO, payload: { msgErro: msgErro } })
            registrarErro(url, params, msgErroStatus, msgErroMessage, dispatch)
        })

    }
    catch (error) {
        dispatch({ type: ACTION.PEDIDO_ERRO, payload: { msgErro: 'Erro ao fazer Pedido' } })
        console.log('@Safira:Pedido.Error', error)
        registrarErro(url, params, '', error, dispatch)
    }
}

const registrarErro = (url, params, statuscod, message, dispatch) => {
    try {
        // console.log(url, params, statuscod, message)
        dispatch(adicionaListaErro('pedido', url, params, statuscod, message))
    }
    catch (error) {
        console.log('@Safira:Pedido-Error', error)
    }
}
