
import axios from 'axios'
//import 'react-native-console-time-polyfill';

import * as CONSTANTE from '../../util/Constante'
// import * as HelperNet from '../util/HelperNet'

// Action Types

const ACTION = {

    // Portfolio e Radar
    LISTA_DRAWDOWN_EM_ANDAMENTO: 'tnb/anali/drawdown/em_andamento',
    LISTA_DRAWDOWN_SUCESSO: 'tnb/anali/drawdown/sucesso',
    LISTA_DRAWDOWN_ERRO: 'tnb/anali/drawdown/erro',

   // GERAL
    MODIFICA_CONFIG_DRAWDOWN_DIAS: 'tnb/anali/drawdown/modifica/filtro/dias',
    MODIFICA_CONFIG_DRAWDOWN_MARGEM: 'tnb/anali/drawdown/modifica/filtro/margem',
    MODIFICA_MSG_ERRO_DRAWDOWN: 'tnb/anali/drawdown/modifica/msg_erro',
    LIMPAR_DRAWDOWN: 'tnb/anali/drawdown/limpar',

}

// Reducer

const INITIAL_STATE = {
    
    // Config
    txtDrawdownFiltroDias: 0,
    txtDrawdownFiltroMargem: 0.0,
    
    // Portfolio e Radar
    isLoadingDrawdown: true,
    txtErroDrawdown: '',
    listaDrawdownPortf: [],
    listaDrawdownRadar: [],

}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {

        // Portfolio e Radar
        case ACTION.LISTA_DRAWDOWN_EM_ANDAMENTO:
            return { ...state, isLoadingDrawdown: true,  txtErroDrawdown: '', }
        case ACTION.LISTA_DRAWDOWN_SUCESSO: 
            return { ...state, isLoadingDrawdown: false, txtErroDrawdown: '', listaDrawdownPortf: action.payload.listaPortf, listaDrawdownRadar: action.payload.listaRadar }
        case ACTION.LISTA_DRAWDOWN_ERRO:
            return { ...state, isLoadingDrawdown: false, txtErroDrawdown: action.payload.msgErro, listaDrawdownPortf: [], listaDrawdownRadar: [] }

        // GERAL
        case ACTION.MODIFICA_CONFIG_DRAWDOWN_DIAS:
            return { ...state, txtDrawdownFiltroDias: action.payload.novoValor }
        case ACTION.MODIFICA_CONFIG_DRAWDOWN_MARGEM:
            return { ...state, txtDrawdownFiltroMargem: action.payload.novoValor }
        case ACTION.MODIFICA_MSG_ERRO_DRAWDOWN:
            return { ...state, txtErroDrawdown: action.payload.msgErro }
        case ACTION.LIMPAR_DRAWDOWN:
            return {...state, isLoadingDrawdown: false, txtErroDrawdown: '', listaDrawdownPortf: [], listaDrawdownRadar: [], }
        
        // default
        default:
            return state
    }
}

// Action Creators

export const modificaMsgDrawdown = () => {
    return { type: ACTION.MODIFICA_MSG_ERRO_DRAWDOWN, payload: { msgErro: '' } }
}

export const limpaDrawdown = () => {
    return { type: ACTION.LIMPAR_DRAWDOWN }
}
        
export const buscarConfigDias = () => async dispatch => {
    try {

        axios({
            method: 'post',
            url: CONSTANTE.URL_PERFIL_CONFIG,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ tipo: 'DRAWDOWN_DIAS', valor: '120' }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Dados = response.data.data.Dados
            if (Resultado === "OK") {
                var valor = Dados.Valor
                valor = parseInt(valor)
                dispatch({ type: ACTION.MODIFICA_CONFIG_DRAWDOWN_DIAS, payload: { novoValor: valor } })
            } else {
                dispatch ({ type: ACTION.MODIFICA_MSG_ERRO_DRAWDOWN, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Analise-Drawdown-ConfigDias.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.MODIFICA_MSG_ERRO_DRAWDOWN, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Analise-Drawdown-ConfigDias.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.MODIFICA_MSG_ERRO_DRAWDOWN, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Analise-Drawdown-ConfigDias.Error', error) 
    }
}
        
export const buscarConfigMargem = () => async dispatch => {
    try {

        axios({
            method: 'post',
            url: CONSTANTE.URL_PERFIL_CONFIG,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ tipo: 'DRAWDOWN_MARGEM', valor: '20' }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Dados = response.data.data.Dados
            if (Resultado === "OK") {
                var valor = Dados.Valor
                var tamanho = valor.toString().length
                if ( valor.toString().substring(tamanho-2, tamanho) == ',0' ) valor = valor.toString().replace(',0', '')
                if ( valor.toString().substring(tamanho-2, tamanho) == '.0' ) valor = valor.toString().replace('.0', '')
                valor = parseFloat(valor)
                dispatch({ type: ACTION.MODIFICA_CONFIG_DRAWDOWN_MARGEM, payload: { novoValor: valor } })
            } else {
                dispatch ({ type: ACTION.MODIFICA_MSG_ERRO_DRAWDOWN, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Analise-Drawdown-ConfigMargem.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.MODIFICA_MSG_ERRO_DRAWDOWN, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Analise-Drawdown-ConfigMargem.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.MODIFICA_MSG_ERRO_DRAWDOWN, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Analise-Drawdown-ConfigMargem.Error', error) 
    }
}

export const buscaListaDrawdown = ( txtFiltroDias = '120', txtFiltroMargem = '20' ) => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_DRAWDOWN_EM_ANDAMENTO }) 

        axios({
            method: 'post',
            url: CONSTANTE.URL_ANALISE_DRAWDOWN_GRID,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ QtdDias: txtFiltroDias, Margem: txtFiltroMargem }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                Lista.sort(function (a, b) {
                    let margemA = a[6] // 6-Margem
                    let margemB = b[6] // 6-Margem
                    if(margemA == margemB) return 0
                    return margemA > margemB? 1: -1
                })

                Lista.reverse()

                let listaPortf = []
                let listaRadar = []

                Lista.map((item) => {
                    let origem = item[0] // 0-Origem
                    if (      origem == 'PORTFÓLIO' ) listaPortf.push(item)
                    else if ( origem == 'RADAR'     ) listaRadar.push(item)

                })

                dispatch({ type: ACTION.LISTA_DRAWDOWN_SUCESSO,  payload: { listaPortf: listaPortf, listaRadar: listaRadar } })  

            } else {
                dispatch({ type: ACTION.LISTA_DRAWDOWN_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Analise-Drawdown-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch({ type: ACTION.LISTA_DRAWDOWN_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Analise-Drawdown-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_DRAWDOWN_ERRO,  payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Analise-Drawdown-Grid.Error', error)
    }
}
