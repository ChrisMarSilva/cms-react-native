
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import 'react-native-console-time-polyfill';

import * as CONSTANTE from '../../util/Constante'
import * as HelperNumero from '../../util/HelperNumero'
// import * as HelperNet from '../util/HelperNet'

// Action Types

const ACTION = {

    //pesquisa
    PORTFOLIO_GRID_EM_ANDAMENTO: 'tnb/portf/pesquisa/em_andamento',
    PORTFOLIO_GRID_SUCESSO: 'tnb/portf/pesquisa/sucesso',
    PORTFOLIO_GRID_ERRO: 'tnb/portf/pesquisa/erro',

    //radar
    PORTFOLIO_RADAR_GRID_EM_ANDAMENTO: 'tnb/portf/radar/pesquisa/em_andamento',
    PORTFOLIO_RADAR_GRID_SUCESSO: 'tnb/portf/radar/pesquisa/sucesso',
    PORTFOLIO_RADAR_GRID_ERRO: 'tnb/portf/radar/pesquisa/erro',

    // valores
    MODIFICA_VLR_PATRIMONIO: 'tnb/portf/modifica/vlr_patrimonio',
    MODIFICA_VLR_PATRIMONIO_ACOES: 'tnb/portf/modifica/vlr_patrimonio_acoes',
    MODIFICA_PESO_PATRIMONIO_ACOES: 'tnb/portf/modifica/peso_patrimonio_acoes',
    MODIFICA_VLR_PATRIMONIO_FIIS: 'tnb/portf/modifica/vlr_patrimonio_fiis',
    MODIFICA_PESO_PATRIMONIO_FIIS: 'tnb/portf/modifica/peso_patrimonio_fiis',
    MODIFICA_VLR_PATRIMONIO_ETFS: 'tnb/portf/modifica/vlr_patrimonio_etfs',
    MODIFICA_PESO_PATRIMONIO_ETFS: 'tnb/portf/modifica/peso_patrimonio_etfs',
    MODIFICA_VLR_PATRIMONIO_BDRS: 'tnb/portf/modifica/peso_patrimonio_bdrs',
    MODIFICA_PESO_PATRIMONIO_BDRS: 'tnb/portf/modifica/peso_patrimonio_bdrs',
    MODIFICA_VLR_PATRIMONIO_CRIPTOS: 'tnb/portf/modifica/peso_patrimonio_criptos',
    MODIFICA_PESO_PATRIMONIO_CRIPTOS: 'tnb/portf/modifica/peso_patrimonio_criptos',
    
    // GERAL
    MODIFICA_MSG_ERRO: 'tnb/portf/modifica/msg_erro',
    MODIFICA_SHOW_VALUE: 'tnb/portf/modifica/visualizar/valores',
}

// Reducer

const INITIAL_STATE = {
    
    // pesquisa
    txtErroPortfolio: '',
    isLoadingPortfolio: false,
    listPortfolio: [],
    listaPortfolioAcoes: [],
    listaPortfolioFiis: [],
    listaPortfolioEtfs: [],
    listaPortfolioBdrs: [],
    listaPortfolioCriptos: [],
    
    // radar
    txtErroPortfolioRadar: '',
    isLoadingPortfolioRadar: false,
    listaPortfolioRadar: [],

    // valores
    vlrPatrimonio: 0.0,
    vlrValorizacao: 0.0,
    prcValorizacao: 0.0,    
    vlrValorizDiaPatrimonio: 0,
    vlrPatrimonioAcoes: 0,
    prcPesoAcoes: 0,
    vlrValorizDiaAcoes: 0,
    vlrPatrimonioFiis: 0,
    prcPesoFiis: 0,
    vlrValorizDiaFiis: 0,
    vlrPatrimonioEtfs: 0,
    prcPesoEtfs: 0,
    vlrValorizDiaEtfs: 0,
    vlrPatrimonioBdrs: 0,
    prcPesoBdrs: 0,
    vlrValorizDiaBdrs: 0,    
    vlrPatrimonioCriptos: 0,
    prcPesoCriptos: 0,
    vlrValorizDiaCriptos: 0,

    // geral
    isShowValue: false,
    

}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        
        // pesquisa
        case ACTION.PORTFOLIO_GRID_EM_ANDAMENTO:
            return { ...state, isLoadingPortfolio: true, txtErroPortfolio: '', }
        case ACTION.PORTFOLIO_GRID_SUCESSO: 
            return {
                ...state, isLoadingPortfolio: false, txtErroPortfolio: '',
                listPortfolio: action.payload.lista,
                listaPortfolioAcoes: action.payload.listaPortfolioAcoes,
                listaPortfolioFiis: action.payload.listaPortfolioFiis,
                listaPortfolioEtfs: action.payload.listaPortfolioEtfs,
                listaPortfolioBdrs: action.payload.listaPortfolioBdrs,
                listaPortfolioCriptos: action.payload.listaPortfolioCriptos,
                vlrPatrimonio: action.payload.vlrPatrimonio, vlrValorizacao: action.payload.vlrValorizacao, prcValorizacao: action.payload.prcValorizacao, vlrValorizDiaPatrimonio: action.payload.vlrValorizDiaPatrimonio,
                vlrPatrimonioAcoes: action.payload.vlrPatrimonioAcoes, prcPesoAcoes: action.payload.prcPesoAcoes, vlrValorizDiaAcoes: action.payload.vlrValorizDiaAcoes,
                vlrPatrimonioFiis: action.payload.vlrPatrimonioFiis, prcPesoFiis: action.payload.prcPesoFiis, vlrValorizDiaFiis: action.payload.vlrValorizDiaFiis,
                vlrPatrimonioEtfs: action.payload.vlrPatrimonioEtfs, prcPesoEtfs: action.payload.prcPesoEtfs, vlrValorizDiaEtfs: action.payload.vlrValorizDiaEtfs,
                vlrPatrimonioBdrs: action.payload.vlrPatrimonioBdrs, prcPesoBdrs: action.payload.prcPesoBdrs, vlrValorizDiaBdrs: action.payload.vlrValorizDiaBdrs,
                vlrPatrimonioCriptos: action.payload.vlrPatrimonioCriptos, prcPesoCriptos: action.payload.prcPesoCriptos, vlrValorizDiaCriptos: action.payload.vlrValorizDiaCriptos,
            }
        case ACTION.PORTFOLIO_GRID_ERRO:
            return {
                ...state, isLoadingPortfolio: false, txtErroPortfolio: action.payload.msgErro,
                listPortfolio: [], listaPortfolioAcoes: [], listaPortfolioFiis: [], listaPortfolioEtfs: [], listaPortfolioBdrs: [], listaPortfolioCriptos: [],
                vlrPatrimonio: 0.0, vlrValorizacao: 0.0, prcValorizacao: 0.0, vlrValorizDiaPatrimonio: 0.0,
                vlrPatrimonioAcoes: 0.0, prcPesoAcoes: 0.0, vlrValorizDiaAcoes: 0.0,
                vlrPatrimonioFiis: 0.0, prcPesoFiis: 0.0, vlrValorizDiaFiis: 0.0,
                vlrPatrimonioEtfs: 0.0, prcPesoEtfs: 0.0, vlrValorizDiaEtfs: 0.0,
                vlrPatrimonioBdrs: 0.0, prcPesoBdrs: 0.0, vlrValorizDiaBdrs: 0.0,
                vlrPatrimonioCriptos: 0.0, prcPesoCriptos: 0.0, vlrValorizDiaCriptos: 0.0,
            }
        
        // radar
        case ACTION.PORTFOLIO_RADAR_GRID_EM_ANDAMENTO:
            return { ...state, isLoadingPortfolioRadar: true, txtErroPortfolioRadar: '', }
        case ACTION.PORTFOLIO_RADAR_GRID_SUCESSO: 
            return { ...state, isLoadingPortfolioRadar: false, txtErroPortfolioRadar: '', listaPortfolioRadar: action.payload.lista, }
        case ACTION.PORTFOLIO_RADAR_GRID_ERRO:
            return { ...state, isLoadingPortfolioRadar: false, txtErroPortfolioRadar: action.payload.msgErro, listaPortfolioRadar: [], }

        // modifica
        case ACTION.MODIFICA_VLR_PATRIMONIO:
            return { ...state, vlrPatrimonio: action.payload.novoValor }   
        case ACTION.MODIFICA_VLR_PATRIMONIO_ACOES:
            return { ...state, vlrPatrimonioAcoes: action.payload.novoValor }   
        case ACTION.MODIFICA_PESO_PATRIMONIO_ACOES:
            return { ...state, prcPesoAcoes: action.payload.novoValor }   
        case ACTION.MODIFICA_VLR_PATRIMONIO_FIIS:
            return { ...state, vlrPatrimonioFiis: action.payload.novoValor }   
        case ACTION.MODIFICA_PESO_PATRIMONIO_FIIS:
            return { ...state, prcPesoFiis: action.payload.novoValor }   
        case ACTION.MODIFICA_VLR_PATRIMONIO_ETFS:
            return { ...state, vlrPatrimonioEtfs: action.payload.novoValor }   
        case ACTION.MODIFICA_PESO_PATRIMONIO_ETFS:
            return { ...state, prcPesoEtfs: action.payload.novoValor }   
        case ACTION.MODIFICA_VLR_PATRIMONIO_BDRS:
            return { ...state, vlrPatrimonioBdrs: action.payload.novoValor }   
        case ACTION.MODIFICA_PESO_PATRIMONIO_BDRS:
            return { ...state, prcPesoBdrs: action.payload.novoValor }
        case ACTION.MODIFICA_VLR_PATRIMONIO_CRIPTOS:
            return { ...state, vlrPatrimonioCriptos: action.payload.novoValor }   
        case ACTION.MODIFICA_PESO_PATRIMONIO_CRIPTOS:
            return { ...state, prcPesoCriptos: action.payload.novoValor }
        
        // GERAL
        case ACTION.MODIFICA_MSG_ERRO:
            return { ...state, txtErroPortfolio: action.payload.msgErro }
        case ACTION.MODIFICA_SHOW_VALUE:
            return { ...state, isShowValue: action.payload.novoValor }
        
        // default
        default:
            return state
    }
}

// Action Creators

export const modificaVlrPatrimonio = (value) => {
    return { type: ACTION.MODIFICA_VLR_PATRIMONIO, payload: { novoValor: value } }
}

export const modificaVlrPatrimonioAcoes = (value) => {
    return { type: ACTION.MODIFICA_VLR_PATRIMONIO_ACOES, payload: { novoValor: value } }
}

export const modificaPesoPatrimonioAcoes = (value) => {
    return { type: ACTION.MODIFICA_PESO_PATRIMONIO_ACOES, payload: { novoValor: value } }
}

export const modificaVlrPatrimonioFiis = (value) => {
    return { type: ACTION.MODIFICA_PESO_PATRIMONIO_FIIS, payload: { novoValor: value } }
}

export const modificaPesoPatrimonioFiis = (value) => {
    return { type: ACTION.MODIFICA_PESO_PATRIMONIO_FIIS, payload: { novoValor: value } }
}

export const modificaVlrPatrimonioEtfs = (value) => {
    return { type: ACTION.MODIFICA_VLR_PATRIMONIO_ETFS, payload: { novoValor: value } }
}
export const modificaPesoPatrimonioEtfs = (value) => {
    return { type: ACTION.MODIFICA_PESO_PATRIMONIO_ETFS, payload: { novoValor: value } }
}

export const modificaVlrPatrimonioBdrs = (value) => {
    return { type: ACTION.MODIFICA_VLR_PATRIMONIO_BDRS, payload: { novoValor: value } }
}

export const modificaPesoPatrimonioBdrs = (value) => {
    return { type: ACTION.MODIFICA_PESO_PATRIMONIO_BDRS, payload: { novoValor: value } }
}

export const modificaVlrPatrimonioCriptos = (value) => {
    return { type: ACTION.MODIFICA_VLR_PATRIMONIO_CRIPTOS, payload: { novoValor: value } }
}

export const modificaPesoPatrimonioCriptos = (value) => {
    return { type: ACTION.MODIFICA_PESO_PATRIMONIO_CRIPTOS, payload: { novoValor: value } }
}

export const modificaMsgPortfolio = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO, payload: { msgErro: '' } }
}

export const modificaShowValue = (visivel) => {
    AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_VISIVEL, visivel ? 'S' : 'N' )
    return { type: ACTION.MODIFICA_SHOW_VALUE, payload: { novoValor: visivel } }
}

export const buscaPortfolio = ( isOrderByPeso = true, isOrderByValoriz = false, ) => async dispatch => {
    try {

        dispatch({ type: ACTION.PORTFOLIO_GRID_EM_ANDAMENTO })
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_PORTFOLIO_DATASET,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                // portfolio - Ordenação por Peso do Ativo
                if (isOrderByPeso) { 
                    Lista.sort(function (a, b) {
                        const vlrTotAtualA = parseFloat(HelperNumero.GetValorDecimal(a.AtvTotAtual || 0.0)) 
                        const vlrTotAtualB = parseFloat(HelperNumero.GetValorDecimal(b.AtvTotAtual || 0.0)) 
                        if(vlrTotAtualA == vlrTotAtualB) return 0
                        return vlrTotAtualA > vlrTotAtualB? 1: -1
                    })
                    Lista.reverse()
                }
                
                // Ordenação por Varizacao do Dia
                if (isOrderByValoriz) { 
                    Lista.sort(function (a, b) {
                        let ValValorizA  = parseFloat(HelperNumero.GetValorDecimal(a.AtvVlrValorizDia|| 0.0) ); 
                        let PercValorizA = parseFloat(HelperNumero.GetValorDecimal(a.AtvPercValorizDia|| 0.0)); 
                        let ValValorizB  = parseFloat(HelperNumero.GetValorDecimal(b.AtvVlrValorizDia|| 0.0) ); 
                        let PercValorizB = parseFloat(HelperNumero.GetValorDecimal(b.AtvPercValorizDia|| 0.0)); 
                        if ( ValValorizA < 0.00 && PercValorizA > 0.00 ) PercValorizA = PercValorizA * -1;
                        if ( ValValorizB < 0.00 && PercValorizB > 0.00 ) PercValorizB = PercValorizB * -1;
                        if(PercValorizA== PercValorizB) return 0;
                        return PercValorizA> PercValorizB? 1: -1;
                    })
                    Lista.reverse()
                }
                
                let vlrInvestimento = 0.00
                let vlrPatrimonio = 0.00
                let vlrValorizacao = 0.00
                let prcValorizacao = 0.00
                let vlrValorizDiaPatrimonio = 0.00
                
                let listaPortfolioAcoes = []
                let vlrPatrimonioAcoes  = 0.00
                let prcPesoAcoes = 0.00
                let vlrValorizDiaAcoes = 0.00

                let listaPortfolioFiis = []
                let vlrPatrimonioFiis  = 0.00
                let prcPesoFiis = 0.00
                let vlrValorizDiaFiis = 0.00

                let listaPortfolioEtfs = []
                let vlrPatrimonioEtfs  = 0.00
                let prcPesoEtfs = 0.00
                let vlrValorizDiaEtfs = 0.00

                let listaPortfolioBdrs = []
                let vlrPatrimonioBdrs  = 0.00
                let prcPesoBdrs = 0.00
                let vlrValorizDiaBdrs = 0.00

                let listaPortfolioCriptos = []
                let vlrPatrimonioCriptos  = 0.00
                let prcPesoCriptos = 0.00
                let vlrValorizDiaCriptos = 0.00
                
                Lista.map((item) => {  
                    let tipo  = item.AtvTipoInvest
                    const qtd = tipo == 'CRIPTO' ? parseFloat(HelperNumero.GetValorDecimalMaior(item.AtvQtde || 0.0)) : parseFloat(HelperNumero.GetValorInteiro(item.AtvQtde || 0.0))
                    vlrInvestimento += parseFloat(HelperNumero.GetValorDecimal(item.AtvTotInvest || 0.0)) 
                    let valor = parseFloat(HelperNumero.GetValorDecimal(item.AtvTotAtual || 0.0)) 
                    vlrValorizacao += parseFloat(HelperNumero.GetValorDecimal(item.AtvTotValoriz || 0.0)) 
                    let vlrValoriz = parseFloat(HelperNumero.GetValorDecimal(item.AtvVlrValorizDia || 0.0) )
                    let totValoriz = 0.00 
                    if( vlrValoriz != 0.00 ) totValoriz = qtd * vlrValoriz
                    if (tipo == 'ACAO') { 
                        vlrPatrimonioAcoes += valor
                        vlrValorizDiaAcoes += totValoriz
                        listaPortfolioAcoes.push(item) 
                    } else if (tipo == 'FII') { 
                        vlrPatrimonioFiis += valor
                        vlrValorizDiaFiis += totValoriz
                        listaPortfolioFiis.push(item)
                    } else if (tipo == 'ETF') {
                        vlrPatrimonioEtfs += valor
                        vlrValorizDiaEtfs += totValoriz
                        listaPortfolioEtfs.push(item)
                    } else if (tipo == 'BDR') {
                        vlrPatrimonioBdrs += valor
                        vlrValorizDiaBdrs += totValoriz
                        listaPortfolioBdrs.push(item)
                    } else if (tipo == 'CRIPTO') {
                        vlrPatrimonioCriptos += valor
                        vlrValorizDiaCriptos += totValoriz
                        listaPortfolioCriptos.push(item)
                    }
                })

                vlrPatrimonio = parseFloat(vlrPatrimonioAcoes) + parseFloat(vlrPatrimonioFiis) + parseFloat(vlrPatrimonioEtfs) + parseFloat(vlrPatrimonioBdrs) + parseFloat(vlrPatrimonioCriptos)
                vlrValorizDiaPatrimonio = parseFloat(vlrValorizDiaAcoes) + parseFloat(vlrValorizDiaFiis) + parseFloat(vlrValorizDiaEtfs) + parseFloat(vlrValorizDiaBdrs) + parseFloat(vlrValorizDiaCriptos)
                if ( vlrValorizacao != 0 && vlrInvestimento > 0 ) prcValorizacao = ( vlrValorizacao / vlrInvestimento ) * 100;

                if (vlrPatrimonio > 0 && vlrPatrimonioAcoes   > 0) prcPesoAcoes   = (vlrPatrimonioAcoes   / vlrPatrimonio) * 100
                if (vlrPatrimonio > 0 && vlrPatrimonioFiis    > 0) prcPesoFiis    = (vlrPatrimonioFiis    / vlrPatrimonio) * 100
                if (vlrPatrimonio > 0 && vlrPatrimonioEtfs    > 0) prcPesoEtfs    = (vlrPatrimonioEtfs    / vlrPatrimonio) * 100
                if (vlrPatrimonio > 0 && vlrPatrimonioBdrs    > 0) prcPesoBdrs    = (vlrPatrimonioBdrs    / vlrPatrimonio) * 100
                if (vlrPatrimonio > 0 && vlrPatrimonioCriptos > 0) prcPesoCriptos = (vlrPatrimonioCriptos / vlrPatrimonio) * 100

                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_PATRIMONIO, vlrPatrimonio.toString() )
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_ACOES_VLR, vlrPatrimonioAcoes.toString() ) 
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_ACOES_PRC, prcPesoAcoes.toString() ) 
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_FIIS_VLR, vlrPatrimonioFiis.toString() )
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_FIIS_PRC, prcPesoFiis.toString() )
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_ETFS_VLR, vlrPatrimonioEtfs.toString() )
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_ETFS_PRC, prcPesoEtfs.toString() )
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_BDRS_VLR, vlrPatrimonioBdrs.toString() )
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_BDRS_PRC, prcPesoBdrs.toString())
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_CRIPTOS_VLR, vlrPatrimonioCriptos.toString() )
                AsyncStorage.setItem(CONSTANTE.SESSAO_PORTF_CRIPTOS_PRC, prcPesoCriptos.toString()) 

                dispatch({
                    type: ACTION.PORTFOLIO_GRID_SUCESSO, payload: {
                        lista: Lista,
                        listaPortfolioAcoes: listaPortfolioAcoes,
                        listaPortfolioFiis: listaPortfolioFiis,
                        listaPortfolioEtfs: listaPortfolioEtfs,
                        listaPortfolioBdrs: listaPortfolioBdrs,
                        listaPortfolioCriptos: listaPortfolioCriptos,
                        vlrPatrimonio: vlrPatrimonio,
                        vlrValorizacao: vlrValorizacao,
                        prcValorizacao: prcValorizacao,
                        vlrValorizDiaPatrimonio: vlrValorizDiaPatrimonio,
                        vlrPatrimonioAcoes: vlrPatrimonioAcoes, prcPesoAcoes: prcPesoAcoes, vlrValorizDiaAcoes: vlrValorizDiaAcoes,
                        vlrPatrimonioFiis: vlrPatrimonioFiis, prcPesoFiis: prcPesoFiis, vlrValorizDiaFiis: vlrValorizDiaFiis,
                        vlrPatrimonioEtfs: vlrPatrimonioEtfs, prcPesoEtfs: prcPesoEtfs, vlrValorizDiaEtfs: vlrValorizDiaEtfs,
                        vlrPatrimonioBdrs: vlrPatrimonioBdrs, prcPesoBdrs: prcPesoBdrs, vlrValorizDiaBdrs: vlrValorizDiaBdrs,
                        vlrPatrimonioCriptos: vlrPatrimonioCriptos, prcPesoCriptos: prcPesoCriptos, vlrValorizDiaCriptos: vlrValorizDiaCriptos,
                    }
                })
                
            } else {
                dispatch ({ type: ACTION.PORTFOLIO_GRID_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Portfolio-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.PORTFOLIO_GRID_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Portfolio-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.PORTFOLIO_GRID_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Portfolio-Grid.Error', error)
    }
}

export const buscaPortfolioRadar = (  ) => async dispatch => {
    try {


        dispatch({ type: ACTION.PORTFOLIO_RADAR_GRID_EM_ANDAMENTO })
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_RADAR_GRID,
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
                    let ValValorizA  = parseFloat( HelperNumero.GetValorDecimal( a[2] || 0.0 ) ); // 2-Valorização(R$)
                    let PercValorizA = parseFloat( HelperNumero.GetValorDecimal( a[3] || 0.0 ) ); // 3-Valorização(%)
                    
                    let ValValorizB  = parseFloat( HelperNumero.GetValorDecimal( b[2] || 0.0 ) ); // 2-Valorização(R$)
                    let PercValorizB = parseFloat( HelperNumero.GetValorDecimal( b[3] || 0.0 ) ); // 3-Valorização(%)
                    
                    if ( ValValorizA < 0.00 && PercValorizA > 0.00 ) PercValorizA = PercValorizA * -1;
                    if ( ValValorizB < 0.00 && PercValorizB > 0.00 ) PercValorizB = PercValorizB * -1;

                    if(PercValorizA == PercValorizB) return 0;
                    return PercValorizA > PercValorizB ? 1: -1;
                })

                Lista.reverse()

                let listaPortfolioRadar = []
                
                let ibov = Lista.filter(item => item[0] == "IBOV")
                if (ibov != null && ibov.length == 1) listaPortfolioRadar.push(ibov[0])
                
                let ibxx = Lista.filter(item => item[0] == "IBXX")
                if (ibxx != null && ibxx.length == 1) listaPortfolioRadar.push(ibxx[0])
                
                let idiv = Lista.filter(item => item[0] == "IDIV")
                if (idiv != null && idiv.length == 1) listaPortfolioRadar.push(idiv[0])
                
                let smll = Lista.filter(item => item[0] == "SMLL")
                if (smll != null && smll.length == 1) listaPortfolioRadar.push(smll[0])
                    
                Lista.map((item) => {
                    let codigo = item[0]
                    if (codigo != 'IBOV' && codigo != 'IBXX' && codigo != 'IDIV' && codigo != 'SMLL')
                        listaPortfolioRadar.push(item)
                })

                dispatch({ type: ACTION.PORTFOLIO_RADAR_GRID_SUCESSO, payload: { lista: listaPortfolioRadar, } })

            } else {
                dispatch ({ type: ACTION.PORTFOLIO_RADAR_GRID_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Portfolio-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.PORTFOLIO_RADAR_GRID_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Portfolio-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.PORTFOLIO_RADAR_GRID_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Portfolio-Grid.Error', error)
    }
}