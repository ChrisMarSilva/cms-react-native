
import axios from 'axios'
//import 'react-native-console-time-polyfill';

import * as CONSTANTE from '../../util/Constante'
// import * as HelperNet from '../util/HelperNet'

// Action Types

const ACTION = {

    // lista anos
    LISTA_ANOS_EM_ANDAMENTO: 'tnb/apurac/anos/em_andamento',
    LISTA_ANOS_SUCESSO: 'tnb/apurac/anos/sucesso',
    LISTA_ANOS_ERRO: 'tnb/apurac/anos/erro',

    // lista Operacoes
    LISTA_OPER_EM_ANDAMENTO: 'tnb/apurac/oper/em_andamento',
    LISTA_OPER_SUCESSO: 'tnb/apurac/oper/sucesso',
    LISTA_OPER_ERRO: 'tnb/apurac/oper/erro',

    //Acoes Comum
    LISTA_APURACOES_ACOES_COMUM_EM_ANDAMENTO: 'tnb/apurac/acoes/comum/em_andamento',
    LISTA_APURACOES_ACOES_COMUM_SUCESSO: 'tnb/apurac/acoes/comum/sucesso',
    LISTA_APURACOES_ACOES_COMUM_ERRO: 'tnb/apurac/acoes/comum/erro',
    
    // Acoes DayTrade
    LISTA_APURACOES_ACOES_DAYTRADE_EM_ANDAMENTO: 'tnb/apurac/acoes/daytrade/em_andamento',
    LISTA_APURACOES_ACOES_DAYTRADE_SUCESSO: 'tnb/apurac/acoes/daytrade/sucesso',
    LISTA_APURACOES_ACOES_DAYTRADE_ERRO: 'tnb/apurac/acoes/daytrade/erro',

    // Fiis
    LISTA_APURACOES_FIIS_EM_ANDAMENTO: 'tnb/apurac/fiis/em_andamento',
    LISTA_APURACOES_FIIS_SUCESSO: 'tnb/apurac/fiis/sucesso',
    LISTA_APURACOES_FIIS_ERRO: 'tnb/apurac/fiis/erro',
    
    // Etds Comum
    LISTA_APURACOES_ETFS_COMUM_EM_ANDAMENTO: 'tnb/apurac/etfs/comum/em_andamento',
    LISTA_APURACOES_ETFS_COMUM_SUCESSO: 'tnb/apurac/etfs/comum/sucesso',
    LISTA_APURACOES_ETFS_COMUM_ERRO: 'tnb/apurac/etfs/comum/erro',
    
    // Etds DayTrade
    LISTA_APURACOES_ETFS_DAYTRADE_EM_ANDAMENTO: 'tnb/apurac/etfs/daytrade/em_andamento',
    LISTA_APURACOES_ETFS_DAYTRADE_SUCESSO: 'tnb/apurac/etfs/daytrade/sucesso',
    LISTA_APURACOES_ETFS_DAYTRADE_ERRO: 'tnb/apurac/etfs/daytrade/erro',
    
    // Bdrs Comum
    LISTA_APURACOES_BDRS_COMUM_EM_ANDAMENTO: 'tnb/apurac/bdrs/comum/em_andamento',
    LISTA_APURACOES_BDRS_COMUM_SUCESSO: 'tnb/apurac/bdrs/comum/sucesso',
    LISTA_APURACOES_BDR_COMUM_ERRO: 'tnb/apurac/bdrs/comum/erro',
    
    // Bdrs DayTrade
    LISTA_APURACOES_BDRS_DAYTRADE_EM_ANDAMENTO: 'tnb/apurac/bdrs/daytrade/em_andamento',
    LISTA_APURACOES_BDRS_DAYTRADE_SUCESSO: 'tnb/apurac/bdrs/daytrade/sucesso',
    LISTA_APURACOES_BDRS_DAYTRADE_ERRO: 'tnb/apurac/bdrs/daytrade/erro',    

    // Criptos
    LISTA_APURACOES_CRIPTOS_EM_ANDAMENTO: 'tnb/apurac/criptos/em_andamento',
    LISTA_APURACOES_CRIPTOS_SUCESSO: 'tnb/apurac/criptos/sucesso',
    LISTA_APURACOES_CRIPTOS_ERRO: 'tnb/apurac/criptos/erro',

   // GERAL
    MODIFICA_MSG_ERRO_ACOES_COMUM: 'tnb/apurac/modifica/acoes/comum/msg_erro',
    MODIFICA_MSG_ERRO_ACOES_DAYTRADE: 'tnb/apurac/modifica/acoes/daytrade/msg_erro',
    MODIFICA_MSG_ERRO_FIIS: 'tnb/apurac/modifica/fiis/msg_erro',
    MODIFICA_MSG_ERRO_ETFS_COMUM: 'tnb/apurac/modifica/etfs/comum/msg_erro',
    MODIFICA_MSG_ERRO_ETFS_DAYTRADE: 'tnb/apurac/modifica/etfs/daytrade/msg_erro',
    MODIFICA_MSG_ERRO_BDRS_COMUM: 'tnb/apurac/modifica//bdrs/comum/msg_erro',
    MODIFICA_MSG_ERRO_BDRS_DAYTRADE: 'tnb/apurac/modifica//bdrs/daytrade/msg_erro',
    MODIFICA_MSG_ERRO_CRIPTOS: 'tnb/apurac/modifica/criptos/msg_erro',
    MODIFICA_MSG_ERRO_OPERACOES: 'tnb/apurac/modifica/oper/msg_erro',
    LIMPAR_APURACOES: 'tnb/apurac/limpar',

}

// Reducer

const INITIAL_STATE = {
    
    // lista anos
    lstFiltroAnos: [],
    txtErroAnos: '',
    
    // lista Operacoes
    isLoadingOperacoes: true,
    lstFiltroOperacoes: [],
    txtErroOperacoes: '',
    
    // Acoes Comum
    isLoadingAcoesComum: true,
    listaAcoesComum: [],
    txtErroAcoesComum: '',

    // Acoes DayTrade
    isLoadingAcoesDayTrade: true,
    listaAcoesDayTrade: [],
    txtErroAcoesDayTrade: '',

    // Fiis
    isLoadingFiis: true,
    listaFiis: [],
    txtErroFiis: '',

    // Etds Comum
    isLoadingEtfsComum: true,
    listaEtfsComum: [],
    txtErroEtfsComum: '',

    // Etds DayTrade
    isLoadingEtdsDayTrade: true,
    listaEtfsDayTrade: [],
    txtErroEtfsDayTrade: '',

    // Bdrs Comum
    isLoadingBdrsComum: true,
    listaBdrsComum: [],
    txtErroBdrsComum: '',

    // Bdrs DayTrade
    isLoadingBdrsDayTrade: true,
    listaBdrsDayTrade: [],
    txtErroBdrsDayTrade: '',

    // Criptos
    isLoadingCriptos: true,
    listaCriptos: [],
    txtErroCriptos: '',

}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {

        // lista anos
        case ACTION.LISTA_ANOS_EM_ANDAMENTO:
            return { ...state, txtErroAnos: '', lstFiltroAnos: [] }
        case ACTION.LISTA_ANOS_SUCESSO: 
            return { ...state, txtErroAnos: '', lstFiltroAnos: action.payload.lista }
        case ACTION.LISTA_ANOS_ERRO:
            return { ...state, txtErroAnos: action.payload.msgErro, lstFiltroAnos: [] }

        // lista Operacoes
        case ACTION.LISTA_OPER_EM_ANDAMENTO:
            return { ...state, isLoadingOperacoes: true, txtErroOperacoes: '', lstFiltroOperacoes: [] }
        case ACTION.LISTA_OPER_SUCESSO: 
            return { ...state, isLoadingOperacoes: false, txtErroOperacoes: '', lstFiltroOperacoes: action.payload.lista }
        case ACTION.LISTA_OPER_ERRO:
            return { ...state, isLoadingOperacoes: false, txtErroOperacoes: action.payload.msgErro, lstFiltroOperacoes: [] }

        // Acoes Comum
        case ACTION.LISTA_APURACOES_ACOES_COMUM_EM_ANDAMENTO:
            return { ...state, isLoadingAcoesComum: true,  txtErroAcoesComum: '', }
        case ACTION.LISTA_APURACOES_ACOES_COMUM_SUCESSO: 
            return { ...state, isLoadingAcoesComum: false, txtErroAcoesComum: '', listaAcoesComum: action.payload.lista }
        case ACTION.LISTA_APURACOES_ACOES_COMUM_ERRO:
            return { ...state, isLoadingAcoesComum: false, txtErroAcoesComum: action.payload.msgErro, listaAcoesComum: [] }

        // Acoes DayTrade
        case ACTION.LISTA_APURACOES_ACOES_DAYTRADE_EM_ANDAMENTO:
            return { ...state, isLoadingAcoesDayTrade: true,  txtErroAcoesDayTrade: '', }
        case ACTION.LISTA_APURACOES_ACOES_DAYTRADE_SUCESSO: 
            return { ...state, isLoadingAcoesDayTrade: false, txtErroAcoesDayTrade: '', listaAcoesDayTrade: action.payload.lista }
        case ACTION.LISTA_APURACOES_ACOES_DAYTRADE_ERRO:
            return { ...state, isLoadingAcoesDayTrade: false, txtErroAcoesDayTrade: action.payload.msgErro, listaAcoesDayTrade: [] }
        
        // Fiis
        case ACTION.LISTA_APURACOES_FIIS_EM_ANDAMENTO:
            return { ...state, isLoadingFiis: true,  txtErroFiis: '', }
        case ACTION.LISTA_APURACOES_FIIS_SUCESSO: 
            return { ...state, isLoadingFiis: false, txtErroFiis: '', listaFiis: action.payload.lista }
        case ACTION.LISTA_APURACOES_FIIS_ERRO:
            return { ...state, isLoadingFiis: false, txtErroFiis: action.payload.msgErro, listaFiis: [] }        
                    
        // Etds Comum
        case ACTION.LISTA_APURACOES_ETFS_COMUM_EM_ANDAMENTO:
            return { ...state, isLoadingEtfsComum: true,  txtErroEtfsComum: '', }
        case ACTION.LISTA_APURACOES_ETFS_COMUM_SUCESSO: 
            return { ...state, isLoadingEtfsComum: false, txtErroEtfsComum: '', listaEtfsComum: action.payload.lista }
        case ACTION.LISTA_APURACOES_ETFS_COMUM_ERRO:
            return { ...state, isLoadingEtfsComum: false, txtErroEtfsComum: action.payload.msgErro, listaEtfsComum: [] }
        
        // Etds DayTrade
        case ACTION.LISTA_APURACOES_ETFS_DAYTRADE_EM_ANDAMENTO:
            return { ...state, isLoadingEtdsDayTrade: true,  txtErroEtfsDayTrade: '', }
        case ACTION.LISTA_APURACOES_ETFS_DAYTRADE_SUCESSO: 
            return { ...state, isLoadingEtdsDayTrade: false, txtErroEtfsDayTrade: '', listaEtfsDayTrade: action.payload.lista }
        case ACTION.LISTA_APURACOES_ETFS_DAYTRADE_ERRO:
            return { ...state, isLoadingEtdsDayTrade: false, txtErroEtfsDayTrade: action.payload.msgErro, listaEtfsDayTrade: [] }
        
        // Bdrs Comum
        case ACTION.LISTA_APURACOES_BDRS_COMUM_EM_ANDAMENTO:
            return { ...state, isLoadingBdrsComum: true,  txtErroBdrsComum: '', }
        case ACTION.LISTA_APURACOES_BDRS_COMUM_SUCESSO: 
            return { ...state, isLoadingBdrsComum: false, txtErroBdrsComum: '', listaBdrsComum: action.payload.lista }
        case ACTION.LISTA_APURACOES_BDR_COMUM_ERRO:
            return { ...state, isLoadingBdrsComum: false, txtErroBdrsComum: action.payload.msgErro, listaBdrsComum: [] }
        
        // Bdrs DayTrade
        case ACTION.LISTA_APURACOES_BDRS_DAYTRADE_EM_ANDAMENTO:
            return { ...state, isLoadingBdrsDayTrade: true,  txtErroBdrsDayTrade: '', }
        case ACTION.LISTA_APURACOES_BDRS_DAYTRADE_SUCESSO: 
            return { ...state, isLoadingBdrsDayTrade: false, txtErroBdrsDayTrade: '', listaBdrsDayTrade: action.payload.lista }
        case ACTION.LISTA_APURACOES_BDRS_DAYTRADE_ERRO:
            return { ...state, isLoadingBdrsDayTrade: false, txtErroBdrsDayTrade: action.payload.msgErro, listaBdrsDayTrade: [] }
        
        // Criptos
        case ACTION.LISTA_APURACOES_CRIPTOS_EM_ANDAMENTO:
            return { ...state, isLoadingCriptos: true,  txtErroCriptos: '', }
        case ACTION.LISTA_APURACOES_CRIPTOS_SUCESSO: 
            return { ...state, isLoadingCriptos: false, txtErroCriptos: '', listaCriptos: action.payload.lista }
        case ACTION.LISTA_APURACOES_CRIPTOS_ERRO:
            return { ...state, isLoadingCriptos: false, txtErroCriptos: action.payload.msgErro, listaCriptos: [] }        

        // GERAL
        case ACTION.MODIFICA_MSG_ERRO_ACOES_COMUM:
            return { ...state, txtErroAcoesComum: action.payload.msgErro }
        case ACTION.MODIFICA_MSG_ERRO_ACOES_DAYTRADE:
            return { ...state, txtErroAcoesDayTrade: action.payload.msgErro }
        case ACTION.MODIFICA_MSG_ERRO_FIIS:
            return { ...state, txtErroFiis: action.payload.msgErro }
        case ACTION.MODIFICA_MSG_ERRO_ETFS_COMUM:
            return { ...state, txtErroEtfsComum: action.payload.msgErro }
        case ACTION.MODIFICA_MSG_ERRO_ETFS_DAYTRADE:
            return { ...state, txtErroEtfsDayTrade: action.payload.msgErro }
        case ACTION.MODIFICA_MSG_ERRO_BDRS_COMUM:
            return { ...state, txtErroBdrsComum: action.payload.msgErro }
        case ACTION.MODIFICA_MSG_ERRO_BDRS_DAYTRADE:
            return { ...state, txtErroBdrsDayTrade: action.payload.msgErro }
        case ACTION.MODIFICA_MSG_ERRO_CRIPTOS:
            return { ...state, txtErroCriptos: action.payload.msgErro }
        case ACTION.MODIFICA_MSG_ERRO_OPERACOES:
            return { ...state, txtErroOperacoes: action.payload.msgErro }
        
        case ACTION.LIMPAR_APURACOES:
            return {
                ...state,
                isLoadingOperacoes: false, txtErroOperacoes: '', lstFiltroOperacoes: [],
                lstFiltroAnos: [], txtErroAnos: '',
                isLoadingAcoesComum: false, listaAcoesComum: [], txtErroAcoesComum: '',
                isLoadingAcoesDayTrade: false, listaAcoesDayTrade: [], txtErroAcoesDayTrade: '',
                isLoadingFiis: false, listaFiis: [], txtErroFiis: '',
                isLoadingEtfsComum: false, listaEtfsComum: [], txtErroEtfsComum: '',
                isLoadingEtdsDayTrade: false, listaEtfsDayTrade: [], txtErroEtfsDayTrade: '',
                isLoadingBdrsComum: false, listaBdrsComum: [], txtErroBdrsComum: '',
                isLoadingBdrsDayTrade: false, listaBdrsDayTrade: [], txtErroBdrsDayTrade: '',
                isLoadingCriptos: false, listaCriptos: [], txtErroCriptos: '',
            }

        // default
        default:
            return state
    }
}

// Action Creators

export const modificaMsgAcoesComum = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_ACOES_COMUM, payload: { msgErro: '' } }
}

export const modificaMsgAcoesDayTrade = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_ACOES_DAYTRADE, payload: { msgErro: '' } }
}

export const modificaMsgFiis = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_FIIS, payload: { msgErro: '' } }
}

export const modificaMsgEtfsComum = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_ETFS_COMUM, payload: { msgErro: '' } }
}

export const modificaMsgEtfsDayTrade = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_ETFS_DAYTRADE, payload: { msgErro: '' } }
}

export const modificaMsgBdrsComum = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_BDRS_COMUM, payload: { msgErro: '' } }
}

export const modificaMsgBdrsDayTrade = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_BDRS_DAYTRADE, payload: { msgErro: '' } }
}

export const modificaMsgCriptos = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_CRIPTOS, payload: { msgErro: '' } }
}

export const modificaMsgOperacoes = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_OPERACOES, payload: { msgErro: '' } }
}

export const limpaApuracoes = () => {
    return { type: ACTION.LIMPAR_APURACOES }
}

export const buscaListaAnosApuracoes = () => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_ANOS_EM_ANDAMENTO })

        axios({
            method: 'post',
            url: CONSTANTE.URL_APURACAO_ANO,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                Lista.reverse()
                            
                let lstFiltroAnos = []
                lstFiltroAnos.push({ id: 0, name: "Todos" })

                let index = 0
                Lista.map((item) => { 
                    index += 1
                    lstFiltroAnos.push({ id: index, name: item })
                })

                dispatch({ type: ACTION.LISTA_ANOS_SUCESSO, payload: { lista: lstFiltroAnos } })
                
            } else {
                dispatch ({ type: ACTION.LISTA_ANOS_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Apurac-Anos.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.LISTA_ANOS_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Apurac-Anos.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_ANOS_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Apurac-Anos.Error', error)
    }
}

export const buscaListaApuracoes = ( txtTpApuracao = '', txtAno = '' ) => async dispatch => {
    try {

        txtAno = txtAno == 'Todos' ? '' : txtAno
        txtTpApuracao = txtTpApuracao != '' ? txtTpApuracao : 'C'; // C - Acoes Comum

             if (txtTpApuracao == 'C') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_COMUM_EM_ANDAMENTO    }) // C - Acoes Comum
        else if (txtTpApuracao == 'D') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_DAYTRADE_EM_ANDAMENTO }) // D - Acoes DayTrade 
        else if (txtTpApuracao == 'F') dispatch({ type: ACTION.LISTA_APURACOES_FIIS_EM_ANDAMENTO           }) // F - Fiss
        else if (txtTpApuracao == 'E') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_COMUM_EM_ANDAMENTO     }) // E - Etfs Comum
        else if (txtTpApuracao == 'G') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_DAYTRADE_EM_ANDAMENTO  }) // G - Etfs DayTrade
        else if (txtTpApuracao == 'I') dispatch({ type: ACTION.LISTA_APURACOES_BDRS_COMUM_EM_ANDAMENTO     }) // I - Bdrs Comum
        else if (txtTpApuracao == 'J') dispatch({ type: ACTION.LISTA_APURACOES_BDRS_DAYTRADE_EM_ANDAMENTO  }) // J - Bdrs DayTrade 
        else if (txtTpApuracao == 'K') dispatch({ type: ACTION.LISTA_APURACOES_CRIPTOS_EM_ANDAMENTO        }) // K - Criptos

        axios({
            method: 'post',
            url: CONSTANTE.URL_APURACAO_GRID,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ TpApuracao: txtTpApuracao, AnoApuracao: txtAno, CalcVlrSuperior: '' }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                Lista.sort(function (a, b) {
                    let dataA = a[0]  
                    let dataB = b[0]
                    dataA = dataA.substring(3, 7) + dataA.substring(0, 2)
                    dataB = dataB.substring(3, 7) + dataB.substring(0, 2)
                    if(dataA == dataB) return 0
                    return dataA > dataB? 1: -1
                })

                Lista.reverse()

                     if (txtTpApuracao == 'C') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_COMUM_SUCESSO,    payload: { lista: Lista } }) // C - Acoes Comum
                else if (txtTpApuracao == 'D') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_DAYTRADE_SUCESSO, payload: { lista: Lista } }) // D - Acoes DayTrade 
                else if (txtTpApuracao == 'F') dispatch({ type: ACTION.LISTA_APURACOES_FIIS_SUCESSO,           payload: { lista: Lista } }) // F - Fiss
                else if (txtTpApuracao == 'E') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_COMUM_SUCESSO,     payload: { lista: Lista } }) // E - Etfs Comum
                else if (txtTpApuracao == 'G') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_DAYTRADE_SUCESSO,  payload: { lista: Lista } }) // G - Etfs DayTrade
                else if (txtTpApuracao == 'I') dispatch({ type: ACTION.LISTA_APURACOES_BDRS_COMUM_SUCESSO,     payload: { lista: Lista } }) // I - Bdrs Comum
                else if (txtTpApuracao == 'J') dispatch({ type: ACTION.LISTA_APURACOES_BDRS_DAYTRADE_SUCESSO,  payload: { lista: Lista } }) // J - Bdrs DayTrade   
                else if (txtTpApuracao == 'K') dispatch({ type: ACTION.LISTA_APURACOES_CRIPTOS_SUCESSO,        payload: { lista: Lista } }) // K - Criptos

            } else {
                     if (txtTpApuracao == 'C') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_COMUM_ERRO,    payload: { msgErro: Mensagem } }) // C - Acoes Comum
                else if (txtTpApuracao == 'D') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_DAYTRADE_ERRO, payload: { msgErro: Mensagem } }) // D - Acoes DayTrade 
                else if (txtTpApuracao == 'F') dispatch({ type: ACTION.LISTA_APURACOES_FIIS_ERRO,           payload: { msgErro: Mensagem } }) // F - Fiss
                else if (txtTpApuracao == 'E') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_COMUM_ERRO,     payload: { msgErro: Mensagem } }) // E - Etfs Comum
                else if (txtTpApuracao == 'G') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_DAYTRADE_ERRO,  payload: { msgErro: Mensagem } }) // G - Etfs DayTrade
                else if (txtTpApuracao == 'I') dispatch({ type: ACTION.LISTA_APURACOES_BDR_COMUM_ERRO,      payload: { msgErro: Mensagem } }) // I - Bdrs Comum
                else if (txtTpApuracao == 'J') dispatch({ type: ACTION.LISTA_APURACOES_BDRS_DAYTRADE_ERRO,  payload: { msgErro: Mensagem } }) // J - Bdrs DayTrade 
                else if (txtTpApuracao == 'K') dispatch({ type: ACTION.LISTA_APURACOES_CRIPTOS_ERRO,        payload: { msgErro: Mensagem } }) // K - Criptos
                console.log('@TamoNaBolsa:Apurac-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
                 if (txtTpApuracao == 'C') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_COMUM_ERRO,    payload: { msgErro: error } }) // C - Acoes Comum
            else if (txtTpApuracao == 'D') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_DAYTRADE_ERRO, payload: { msgErro: error } }) // D - Acoes DayTrade 
            else if (txtTpApuracao == 'F') dispatch({ type: ACTION.LISTA_APURACOES_FIIS_ERRO,           payload: { msgErro: error } }) // F - Fiss
            else if (txtTpApuracao == 'E') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_COMUM_ERRO,     payload: { msgErro: error } }) // E - Etfs Comum
            else if (txtTpApuracao == 'G') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_DAYTRADE_ERRO,  payload: { msgErro: error } }) // G - Etfs DayTrade
            else if (txtTpApuracao == 'I') dispatch({ type: ACTION.LISTA_APURACOES_BDR_COMUM_ERRO,      payload: { msgErro: error } }) // I - Bdrs Comum
            else if (txtTpApuracao == 'J') dispatch({ type: ACTION.LISTA_APURACOES_BDRS_DAYTRADE_ERRO,  payload: { msgErro: error } }) // J - Bdrs DayTrade 
            else if (txtTpApuracao == 'K') dispatch({ type: ACTION.LISTA_APURACOES_CRIPTOS_ERRO,        payload: { msgErro: error } }) // K - Criptos
            console.log('@TamoNaBolsa:Apurac-Grid.axios', error)
        })
        
    }
    catch (error) {
             if (txtTpApuracao == 'C') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_COMUM_ERRO,    payload: { msgErro: error } }) // C - Acoes Comum
        else if (txtTpApuracao == 'D') dispatch({ type: ACTION.LISTA_APURACOES_ACOES_DAYTRADE_ERRO, payload: { msgErro: error } }) // D - Acoes DayTrade 
        else if (txtTpApuracao == 'F') dispatch({ type: ACTION.LISTA_APURACOES_FIIS_ERRO,           payload: { msgErro: error } }) // F - Fiss
        else if (txtTpApuracao == 'E') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_COMUM_ERRO,     payload: { msgErro: error } }) // E - Etfs Comum
        else if (txtTpApuracao == 'G') dispatch({ type: ACTION.LISTA_APURACOES_ETFS_DAYTRADE_ERRO,  payload: { msgErro: error } }) // G - Etfs DayTrade
        else if (txtTpApuracao == 'I') dispatch({ type: ACTION.LISTA_APURACOES_BDR_COMUM_ERRO,      payload: { msgErro: error } }) // I - Bdrs Comum
        else if (txtTpApuracao == 'J') dispatch({ type: ACTION.LISTA_APURACOES_BDRS_DAYTRADE_ERRO,  payload: { msgErro: error } }) // J - Bdrs DayTrade 
        else if (txtTpApuracao == 'K') dispatch({ type: ACTION.LISTA_APURACOES_CRIPTOS_ERRO,        payload: { msgErro: error } }) // K - Criptos
        console.log('@TamoNaBolsa:Apurac-Grid.Error', error)
    }
}

export const buscaListaOperApuracoes = (TpApuracao, AnoMesApuracao) => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_OPER_EM_ANDAMENTO })

        axios({
            method: 'post',
            url: CONSTANTE.URL_APURACAO_OPER,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ TpApuracao: TpApuracao, AnoMesApuracao: AnoMesApuracao }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {
                dispatch({ type: ACTION.LISTA_OPER_SUCESSO, payload: { lista: Lista } })
            } else {
                dispatch ({ type: ACTION.LISTA_OPER_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Apurac-Oper.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.LISTA_OPER_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Apurac-Oper.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_OPER_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Apurac-Oper.Error', error)
    }
}
