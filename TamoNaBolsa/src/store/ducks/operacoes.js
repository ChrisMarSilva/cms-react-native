
import axios from 'axios'
import { DataProvider, } from 'recyclerlistview'
// import 'react-native-console-time-polyfill'

import * as CONSTANTE from '../../util/Constante'
import * as HelperDate from '../../util/HelperDate'
import * as HelperNumero from '../../util/HelperNumero'
// import * as HelperNet from '../util/HelperNet'

// Action Types

const ACTION = {

    // lista ativo
    LISTA_ATIVOS_EM_ANDAMENTO: 'tnb/oper/ativos/em_andamento',
    LISTA_ATIVOS_SUCESSO: 'tnb/oper/ativos/sucesso',
    LISTA_ATIVOS_ERRO: 'tnb/oper/ativos/erro',

    // pesquisa
    FILTRO_EM_ANDAMENTO: 'tnb/oper/pesquisa/em_andamento',
    FILTRO_SUCESSO: 'tnb/oper/pesquisa/sucesso',
    FILTRO_ERRO: 'tnb/oper/filtro/erro',
    
    // GERAL
    MODIFICA_MSG_OPERACOES: 'tnb/oper/modifica/msg_erro',
    LIMPAR_OPERACOES: 'tnb/oper/limpar',
}

// Reducer

const INITIAL_STATE = {
    
    // lista ativo
    lstFiltroAtivos: [],

    // GERAL
    txtFiltroMsgErro: '',
    isLoadingOperacoes: false,
    
    // pesquisa
    lstOperacoes: [],
    dataProvider: new DataProvider((r1, r2) => { return r1 !== r2; }),
    lstOperacoesAcoes: [],
    lstOperacoesFiis: [],
    lstOperacoesEtfs: [],
    lstOperacoesBdrs: [],
    lstOperacoesCriptos: [],

    // valores
    vlrTotalOperac: 0.00, 
    vlrTotalOperacAcoes: 0.00,
    vlrTotalOperacFiis: 0.00,
    vlrTotalOperacEtf: 0.00,
    vlrTotalOperacBdrs: 0.00,
    vlrTotalOperacCriptos: 0.00,

}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        
        // lista ativo
        case ACTION.LISTA_ATIVOS_EM_ANDAMENTO:
            return { ...state, txtFiltroMsgErro: '', lstFiltroAtivos: [] }
        case ACTION.LISTA_ATIVOS_SUCESSO: 
            return { ...state, txtFiltroMsgErro: '', lstFiltroAtivos: action.payload.lista }
        case ACTION.LISTA_ATIVOS_ERRO:
            return { ...state, txtFiltroMsgErro: action.payload.msgErro, lstFiltroAtivos: [] }
        
        // pesquisa
        case ACTION.FILTRO_EM_ANDAMENTO:
            return {
                ...state, isLoadingOperacoes: true, txtFiltroMsgErro: '', lstOperacoes: [], dataProvider: state.dataProvider.cloneWithRows([]),
                lstOperacoesAcoes: [], lstOperacoesFiis: [], lstOperacoesEtfs: [], lstOperacoesBdrs: [], lstOperacoesCriptos: [],
                vlrTotalOperac: 0.0, vlrTotalOperacAcoes: 0.0, vlrTotalOperacFiis: 0.0, vlrTotalOperacEtf: 0.0, vlrTotalOperacBdrs: 0.0, vlrTotalOperacCriptos: 0.0,
            }
        case ACTION.FILTRO_SUCESSO: 
            return {
                ...state,
                isLoadingOperacoes: false,
                txtFiltroMsgErro: '',
                lstOperacoes: action.payload.lista,
                dataProvider: action.payload.dataProvider,
                lstOperacoesAcoes: action.payload.lstOperacoesAcoes,
                lstOperacoesFiis: action.payload.lstOperacoesFiis,
                lstOperacoesEtfs: action.payload.lstOperacoesEtfs,
                lstOperacoesBdrs: action.payload.lstOperacoesBdrs,
                lstOperacoesCriptos: action.payload.lstOperacoesCriptos,
                vlrTotalOperac: action.payload.vlrTotalOperac,
                vlrTotalOperacAcoes: action.payload.vlrTotalOperacAcoes,
                vlrTotalOperacFiis: action.payload.vlrTotalOperacFiis,
                vlrTotalOperacEtf: action.payload.vlrTotalOperacEtf,
                vlrTotalOperacBdrs: action.payload.vlrTotalOperacBdrs,
                vlrTotalOperacCriptos: action.payload.vlrTotalOperacCriptos,
            }
        case ACTION.FILTRO_ERRO:
            return { ...state, isLoadingOperacoes: false, txtFiltroMsgErro: action.payload.msgErro, lstOperacoes: [], dataProvider: state.dataProvider.cloneWithRows([]), }
        
        // GERAL
        case ACTION.MODIFICA_MSG_OPERACOES:
            return { ...state, txtFiltroMsgErro: action.payload.msgErro }
        case ACTION.LIMPAR_OPERACOES:
            return {
                ...state, isLoadingOperacoes: false, txtFiltroMsgErro: '', lstFiltroAtivos: [],
                lstOperacoes: [], lstOperacoesAcoes: [], lstOperacoesFiis: [], lstOperacoesEtfs: [], lstOperacoesBdrs: [], lstOperacoesCriptos: [],
                vlrTotalOperac: 0.00, vlrTotalOperacAcoes: 0.00, vlrTotalOperacFiis: 0.00, vlrTotalOperacEtf: 0.00, vlrTotalOperacBdrs: 0.00, vlrTotalOperacCriptos: 0.00,
            }
        
        // default
        default:
            return state;
    }
}

// Action Creators 
 
export const modificaMsgOperacoes = () => { 
    return { type: ACTION.MODIFICA_MSG_OPERACOES, payload: { msgErro: '' } }
}

export const limpaOperacoes = () => {
    return { type: ACTION.LIMPAR_OPERACOES }
}

export const buscaListaAtivosOperacoes = () => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_ATIVOS_EM_ANDAMENTO })

        axios({
            method: 'post',
            url: CONSTANTE.URL_OPERACOES_LISTA,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {
                            
                let lstFiltroAtivos = []
                lstFiltroAtivos.push({ id: 0, name: "Todos" })

                let index = 0
                Lista.map((item) => { 
                    index += 1
                    lstFiltroAtivos.push({ id: index, name: item[0] })
                })

                dispatch({ type: ACTION.LISTA_ATIVOS_SUCESSO, payload: { lista: lstFiltroAtivos } })
                
            } else {
                dispatch ({ type: ACTION.LISTA_ATIVOS_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Provento-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.LISTA_ATIVOS_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Provento-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_ATIVOS_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Provento-Grid.Error', error)
    }
} 

export const buscaListaOperacoes = (txtCodAtivo = '', txtDataIni = '', txtDataFim = '') => async dispatch => {
    try { 

        dispatch({ type: ACTION.FILTRO_EM_ANDAMENTO })
        
        txtCodAtivo = txtCodAtivo == 'Todos' ? '' : txtCodAtivo
        txtDataIni = HelperDate.tirarFormacataoData(txtDataIni) 
        txtDataFim = HelperDate.tirarFormacataoData(txtDataFim) 
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_OPERACOES_GRID,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ CodAtivo: txtCodAtivo, DataIni: txtDataIni, DataFim: txtDataFim }),
        }).then((response) => {
            
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista

            if (Resultado === "OK") {

                Lista.sort(function (a, b) {
                    const dataA = a[0]  
                    const dataB = b[0]
                    if(dataA == dataB) return 0
                    return dataA > dataB? 1: -1
                })

                Lista.reverse()

                let vlrTotalOperac = 0.00
                let vlrTotalOperacAcoes  = 0.00
                let vlrTotalOperacFiis  = 0.00
                let vlrTotalOperacEtf  = 0.00
                let vlrTotalOperacBdrs = 0.00
                let vlrTotalOperacCriptos = 0.00
                
                let lstOperacoesAcoes = []
                let lstOperacoesFiis = []
                let lstOperacoesEtfs = []
                let lstOperacoesBdrs = []
                let lstOperacoesCriptos = []

                Lista.map((item) => { 
                let tipo = item[1].substring(0,1)
                    let valor = parseFloat(HelperNumero.GetValorDecimal(item[8] || 0.0))   
                    let tipoInvest = item[11]
                    if (tipoInvest == 'ACAO') {
                        if (tipo == 'C') vlrTotalOperacAcoes += valor
                        if (tipo == 'V') vlrTotalOperacAcoes -= valor
                        lstOperacoesAcoes.push(item)
                    } else if (tipoInvest == 'FII' ) {
                        if (tipo == 'C') vlrTotalOperacFiis += valor
                        if (tipo == 'V') vlrTotalOperacFiis -= valor
                        lstOperacoesFiis.push(item)
                    } else if (tipoInvest == 'ETF' ) {
                        if (tipo == 'C') vlrTotalOperacEtf += valor
                        if (tipo == 'V') vlrTotalOperacEtf -= valor
                        lstOperacoesEtfs.push(item)
                    } else if (tipoInvest == 'BDR') {
                        if (tipo == 'C') vlrTotalOperacBdrs += valor
                        if (tipo == 'V') vlrTotalOperacBdrs -= valor
                        lstOperacoesBdrs.push(item)
                    } else if (tipoInvest == 'CRIPTO') {
                        if (tipo == 'C') vlrTotalOperacCriptos += valor
                        if (tipo == 'V') vlrTotalOperacCriptos -= valor
                        lstOperacoesCriptos.push(item)
                    }
                })

                vlrTotalOperac = parseFloat(vlrTotalOperacAcoes) + parseFloat(vlrTotalOperacFiis) + parseFloat(vlrTotalOperacEtf) + parseFloat(vlrTotalOperacBdrs) + parseFloat(vlrTotalOperacCriptos)

                let dataProvider = new DataProvider((r1, r2) => { return r1 !== r2; }).cloneWithRows(Lista)

                dispatch({
                    type: ACTION.FILTRO_SUCESSO, payload: {
                        lista: Lista,
                        dataProvider, dataProvider,
                        lstOperacoesAcoes: lstOperacoesAcoes,
                        lstOperacoesFiis: lstOperacoesFiis,
                        lstOperacoesEtfs: lstOperacoesEtfs,
                        lstOperacoesBdrs: lstOperacoesBdrs,
                        lstOperacoesCriptos: lstOperacoesCriptos,
                        vlrTotalOperac: vlrTotalOperac,
                        vlrTotalOperacAcoes: vlrTotalOperacAcoes,
                        vlrTotalOperacFiis: vlrTotalOperacFiis,
                        vlrTotalOperacEtf: vlrTotalOperacEtf,
                        vlrTotalOperacBdrs: vlrTotalOperacBdrs,
                        vlrTotalOperacCriptos: vlrTotalOperacCriptos,
                    }
                })

            } else {
                dispatch ({ type: ACTION.FILTRO_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Operacao-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.FILTRO_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Operacao-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.FILTRO_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Operacao-Grid.Error', error)
    }
}
