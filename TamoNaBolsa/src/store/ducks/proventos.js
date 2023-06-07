
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
    LISTA_ATIVOS_EM_ANDAMENTO: 'tnb/prov/ativos/em_andamento',
    LISTA_ATIVOS_SUCESSO: 'tnb/prov/ativos/sucesso',
    LISTA_ATIVOS_ERRO: 'tnb/prov/ativos/erro',

    // pesquisa
    FILTRO_EM_ANDAMENTO: 'tnb/prov/pesquisa/em_andamento',
    FILTRO_SUCESSO: 'tnb/prov/pesquisa/sucesso', 
    FILTRO_ERRO: 'tnb/prov/pesquisa/erro',

    // pesquisa a receber
    LISTA_RECEBER_EM_ANDAMENTO: 'tnb/prov/pesquisa/receber/em_andamento',
    LISTA_RECEBER_SUCESSO: 'tnb/prov/pesquisa/receber/sucesso',
    LISTA_RECEBER_ERRO: 'tnb/prov/pesquisa/receber/erro',

    // pesquisa divulgado
    LISTA_DIVULGADO_EM_ANDAMENTO: 'tnb/prov/pesquisa/divulgado/em_andamento',
    LISTA_DIVULGADO_SUCESSO: 'tnb/prov/pesquisa/divulgado/sucesso',
    LISTA_DIVULGADO_ERRO: 'tnb/prov/pesquisa/divulgado/erro',

    // GERAL
    MODIFICA_MSG_PROVENTOS: 'tnb/prov/modifica/msg_erro',
    LIMPAR_PROVENTOS: 'tnb/prov/limpar',

}

// Reducer

const INITIAL_STATE = {

    // lista ativo
    lstFiltroAtivos: [],

    // pesquisa
    txtFiltroMsgErro: '',
    isLoadingProventos: false,
    lstProventos: [],
    dataProvider: new DataProvider((r1, r2) => { return r1 !== r2; }),

    // pesquisa a receber
    lstProventosMes: [],
    lstProventosAcoes: [],
    lstProventosFiis: [],
    lstProventosBdrs: [],
    vlrTotalProv: 0.00, 
    vlrTotalProvAcoes: 0.00,
    vlrTotalProvFiis: 0.00,
    vlrTotalProvBdrs: 0.00,

    // pesquisa divulgado
    lstProventosDivgAcoes: [],
    lstProventosDivgBdrs: [],
    lstProventosDivgFiis: [],
}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        
        // lista ativo
        case ACTION.LISTA_ATIVOS_EM_ANDAMENTO:
            return { ...state, txtFiltroMsgErro: '', lstFiltroAtivos: [{ id: 0, name: "Todos" }] }
        case ACTION.LISTA_ATIVOS_SUCESSO: 
            return { ...state, txtFiltroMsgErro: '', lstFiltroAtivos: action.payload.lista }
        case ACTION.LISTA_ATIVOS_ERRO:
            return { ...state, txtFiltroMsgErro: action.payload.msgErro, lstFiltroAtivos: [{ id: 0, name: "Todos" }] }
        
        // pesquisa
        case ACTION.FILTRO_EM_ANDAMENTO:
            return { ...state, isLoadingProventos: true,  txtFiltroMsgErro: '', lstProventos: [], dataProvider: state.dataProvider.cloneWithRows([]), }
        case ACTION.FILTRO_SUCESSO: 
            return { ...state, isLoadingProventos: false, txtFiltroMsgErro: '', lstProventos: action.payload.lista, dataProvider: action.payload.dataProvider, }
        case ACTION.FILTRO_ERRO:
            return { ...state, isLoadingProventos: false, txtFiltroMsgErro: action.payload.msgErro, lstProventos: [], dataProvider: state.dataProvider.cloneWithRows([]), }
        
        // pesquisa a receber
        case ACTION.LISTA_RECEBER_EM_ANDAMENTO:
            return { ...state, isLoadingProventos: true,  txtFiltroMsgErro: '', vlrTotalProv: 0.00, vlrTotalProvAcoes: 0.00, vlrTotalProvFiis: 0.00, vlrTotalProvBdrs: 0.00, lstProventosMes: [], lstProventosAcoes: [], lstProventosFiis: [], lstProventosBdrs: [] }
        case ACTION.LISTA_RECEBER_SUCESSO: 
            return { ...state, isLoadingProventos: false, txtFiltroMsgErro: '', vlrTotalProv: action.payload.vlrTotalProv, vlrTotalProvAcoes: action.payload.vlrTotalProvAcoes, vlrTotalProvFiis: action.payload.vlrTotalProvFiis, vlrTotalProvBdrs: action.payload.vlrTotalProvBdrs, lstProventosMes: action.payload.lstProventosMes, lstProventosAcoes: action.payload.lstProventosAcoes, lstProventosFiis: action.payload.lstProventosFiis, lstProventosBdrs: action.payload.lstProventosBdrs }
        case ACTION.LISTA_RECEBER_ERRO:
            return { ...state, isLoadingProventos: false, txtFiltroMsgErro: action.payload.msgErro, vlrTotalProv: 0.00, vlrTotalProvAcoes: 0.00, vlrTotalProvFiis: 0.00, vlrTotalProvBdrs: 0.00, lstProventosMes: [], lstProventosAcoes: [], lstProventosFiis: [], lstProventosBdrs: [] }
        
        // pesquisa divulgado
        case ACTION.LISTA_DIVULGADO_EM_ANDAMENTO:
            return { ...state, isLoadingProventos: true,  txtFiltroMsgErro: '', lstProventosDivgAcoes: [], lstProventosDivgFiis: [], lstProventosDivgBdrs: [] }
        case ACTION.LISTA_DIVULGADO_SUCESSO: 
            return { ...state, isLoadingProventos: false, txtFiltroMsgErro: '', lstProventosDivgAcoes: action.payload.lstProventosDivgAcoes, lstProventosDivgFiis: action.payload.lstProventosDivgFiis, lstProventosDivgBdrs: action.payload.lstProventosDivgBdrs }
        case ACTION.LISTA_DIVULGADO_ERRO:
            return { ...state, isLoadingProventos: false, txtFiltroMsgErro: action.payload.msgErro, lstProventosDivgAcoes: [], lstProventosDivgFiis: [], lstProventosDivgBdrs: [] }
        
        // GERAL
        case ACTION.MODIFICA_MSG_PROVENTOS:
            return { ...state, txtFiltroMsgErro: action.payload.msgErro }
        case ACTION.LIMPAR_PROVENTOS:
            return { ...state, isLoadingProventos: false,  txtFiltroMsgErro: '', vlrTotalProv: 0.00, vlrTotalProvAcoes: 0.00, vlrTotalProvFiis: 0.00, vlrTotalProvBdrs: 0.00, lstProventosMes: [], lstProventosAcoes: [], lstProventosFiis: [], lstProventosBdrs: [], lstProventos: [], lstFiltroAtivos: [], lstProventosDivgAcoes: [], lstProventosDivgFiis: [], lstProventosDivgBdrs: [] }

        // default
        default:
            return state
    }
}

// Action Creators
 
export const modificaMsgProventos = () => {
    return { type: ACTION.MODIFICA_MSG_PROVENTOS, payload: { msgErro: '' } }
}
export const limpaProventos = () => {
    return { type: ACTION.LIMPAR_PROVENTOS }
} 

export const buscaListaAtivosProventos = () => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_ATIVOS_EM_ANDAMENTO }) 

        axios({
            method: 'post',
            url: CONSTANTE.URL_PROVENTOS_LISTA,
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

                dispatch({ type: ACTION.LISTA_ATIVOS_SUCESSO, payload: { lista: lstFiltroAtivos, } })
                
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

export const buscaListaProventos = (txtCodAtivo = '', txtTipoRend = '', txtDataIni = '', txtDataFim = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.FILTRO_EM_ANDAMENTO })

        txtCodAtivo = txtCodAtivo == 'Todos' ? '' : txtCodAtivo
        txtTipoRend = txtTipoRend == 'Todos' ? '' : txtTipoRend
        txtTipoRend = txtTipoRend == 'T' ? '' : txtTipoRend
        txtDataIni = HelperDate.tirarFormacataoData(txtDataIni) 
        txtDataFim = HelperDate.tirarFormacataoData(txtDataFim) 
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_PROVENTOS_GRID,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ CodAtivo: txtCodAtivo, TipoRend: txtTipoRend, DataIni: txtDataIni, DataFim: txtDataFim }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                Lista.sort(function (a, b) {
                    const dtPagtoA = a[1]  
                    const dtPagtoB = b[1]
                    if(dtPagtoA == dtPagtoB) return 0
                    return dtPagtoA > dtPagtoB? 1: -1
                })

                Lista.reverse()

                let dataProvider = new DataProvider((r1, r2) => { return r1 !== r2; }).cloneWithRows(Lista)
                    
                dispatch({ type: ACTION.FILTRO_SUCESSO, payload: { lista: Lista, dataProvider, dataProvider, } })
                
            } else {
                dispatch ({ type: ACTION.FILTRO_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Provento-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.FILTRO_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Provento-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.FILTRO_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Provento-Grid.Error', error)
    }
}

export const buscaListaProventosAReceber = () => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_RECEBER_EM_ANDAMENTO })
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_LISTA_PROVENTO_HOME,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                Lista.sort(function (a, b) {
                    const dataPagtoA = a[0]  
                    const dataPagtoB = b[0]
                    if(dataPagtoA == dataPagtoB) return 0
                    return dataPagtoA > dataPagtoB? 1: -1
                })

                Lista.reverse()
                        
                let vlrTotalProv = 0.00
                let vlrTotalProvMes = 0.00
                let vlrTotalProvAcoes  = 0.00
                let vlrTotalProvFiis  = 0.00
                let vlrTotalProvBdrs = 0.00

                let UltimoMesAno = ""
                let MesAnoAtual = ""
                
                let lstProventosMes = []
                let lstProventosMesItem = []
                let lstProventosAcoes = []
                let lstProventosFiis = []
                let lstProventosBdrs = [] 
                

                Lista.map((item) => {
                    
                    let tipoProv = item[1]
                    let valor = parseFloat(HelperNumero.GetValorDecimal(item[5] || 0.0))   
                    let tipoInvest = item[11]  

                    MesAnoAtual = item[0].substring(0, 6)
                    if ( UltimoMesAno == "" )  UltimoMesAno = MesAnoAtual

                    if (tipoInvest == 'ACAO') {
                        vlrTotalProvAcoes += valor
                        lstProventosAcoes.push(item)
                    }
                    else if (tipoInvest == 'FII' ) {
                        vlrTotalProvFiis += valor
                        lstProventosFiis.push(item)
                    }
                    else if (tipoInvest == 'BDR') {
                        vlrTotalProvBdrs += valor
                        lstProventosBdrs.push(item)
                    }

                    if ( UltimoMesAno != MesAnoAtual ){
                        lstProventosMes.push( { title: 'MÊS ' + UltimoMesAno.substring(4,6) + "/" + UltimoMesAno.substring(0,4) + ' - TOTAL R$ ' + HelperNumero.GetMascaraValorDecimal(vlrTotalProvMes), data: lstProventosMesItem } ); 
                        UltimoMesAno = MesAnoAtual
                        vlrTotalProvMes = 0.00
                        lstProventosMesItem = []
                    }

                    vlrTotalProvMes += valor
                    
                         if ( tipoProv == 'D' ) lstProventosMesItem.push(item)
                    else if ( tipoProv == 'J' ) lstProventosMesItem.push(item)
                    else if ( tipoProv == 'R' ) lstProventosMesItem.push(item)

                })

                lstProventosMes.push({ title: 'MÊS ' + UltimoMesAno.substring(4, 6) + "/" + UltimoMesAno.substring(0, 4) + ' - TOTAL R$ ' + HelperNumero.GetMascaraValorDecimal(vlrTotalProvMes), data: lstProventosMesItem });
                
                console.log(lstProventosMes)

                vlrTotalProv = parseFloat(vlrTotalProvAcoes) + parseFloat(vlrTotalProvFiis) + parseFloat(vlrTotalProvBdrs)

                dispatch({ type: ACTION.LISTA_RECEBER_SUCESSO, payload: { lstProventosMes: lstProventosMes, lstProventosAcoes: lstProventosAcoes, lstProventosFiis: lstProventosFiis, lstProventosBdrs: lstProventosBdrs, vlrTotalProv: vlrTotalProv, vlrTotalProvAcoes: vlrTotalProvAcoes, vlrTotalProvFiis: vlrTotalProvFiis, vlrTotalProvBdrs: vlrTotalProvBdrs, } })
                
            } else {
                dispatch ({ type: ACTION.LISTA_RECEBER_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Provento-Receber-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.LISTA_RECEBER_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Provento-Receber-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_RECEBER_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Provento-Receber-Grid.Error', error)
    }
}

export const buscaListaProventosDivulgados = () => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_DIVULGADO_EM_ANDAMENTO })
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_LISTA_CALENDARIO_HOME,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                Lista.sort(function (a, b) {
                    const dataExA = a[3]  
                    const dataExB = b[3]
                    if(dataExA == dataExB) return 0
                    return dataExA > dataExB? 1: -1
                })

                // Lista.reverse()
                
                let lstProventosDivgAcoes = []
                let lstProventosDivgFiis = []
                let lstProventosDivgBdrs = [] 

                Lista.map((item) => { 
                    let tipoInvest = item[6]
                         if (tipoInvest == 'ACAO') { lstProventosDivgAcoes.push(item) }
                    else if (tipoInvest == 'FII' ) { lstProventosDivgFiis.push(item)  }
                    else if (tipoInvest == 'BDR' ) { lstProventosDivgBdrs.push(item)  }
                })

                dispatch({ type: ACTION.LISTA_DIVULGADO_SUCESSO, payload: { lstProventosDivgAcoes: lstProventosDivgAcoes, lstProventosDivgFiis: lstProventosDivgFiis, lstProventosDivgBdrs: lstProventosDivgBdrs, } })
                
            } else {
                dispatch ({ type: ACTION.LISTA_DIVULGADO_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Provento-Divulgado-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.LISTA_DIVULGADO_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Provento-Divulgado-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_DIVULGADO_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Provento-Divulgado-Grid.Error', error)
    }
}
