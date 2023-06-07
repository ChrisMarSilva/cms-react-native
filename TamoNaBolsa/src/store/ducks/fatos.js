
import axios from 'axios'
// import 'react-native-console-time-polyfill';

import * as CONSTANTE from '../../util/Constante'
// import * as HelperNet from '../util/HelperNet'

// Action Types

const ACTION = {
    
    // pesquisa
    LISTA_FATOS_EM_ANDAMENTO: 'tnb/fatos/mes/em_andamento',
    LISTA_FATOS_SUCESSO: 'tnb/fatos/mes/sucesso',
    LISTA_FATOS_ERRO: 'tnb/fatos/mes/erro',
    
    // GERAL
    MODIFICA_MSG_FATOS: 'tnb/fatos/modifica/msg_erro',
}

// Reducer

const INITIAL_STATE = {
    isLoadingFatos: true,
    txtErroFatos: '',
    listFatos: [],
}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        
        // pesquisa
        case ACTION.LISTA_FATOS_EM_ANDAMENTO:
            return { ...state, isLoadingFatos: true,  txtErroFatos: '', }
        case ACTION.LISTA_FATOS_SUCESSO: 
            return { ...state, isLoadingFatos: false, txtErroFatos: '', listFatos: action.payload.lista }
        case ACTION.LISTA_FATOS_ERRO:
            return { ...state, isLoadingFatos: false, txtErroFatos: action.payload.msgErro, listFatos: [] }
        
        // GERAL
        case ACTION.MODIFICA_MSG_FATOS:
            return { ...state, txtErroFatos: action.payload.msgErro }
        
        // default
        default:
            return state
    }
}

// Action Creators
 
export const modificaMsgFatos = () => {
    return { type: ACTION.MODIFICA_MSG_FATOS, payload: { msgErro: '' } }
}

export const buscaListaFatosMes = () => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_FATOS_EM_ANDAMENTO })
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_LISTA_FATOS_HOME,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ TipoInvest: '' }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                Lista.sort(function (a, b) {
                    const dataA = a[2]  
                    const dataB = b[2]
                    if(dataA == dataB) return 0
                    return dataA > dataB? 1: -1
                })

                Lista.reverse()

                dispatch({ type: ACTION.LISTA_FATOS_SUCESSO, payload: { lista: Lista } })
                
            } else {
                dispatch ({ type: ACTION.LISTA_FATOS_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Fatos-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.LISTA_FATOS_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Fatos-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_FATOS_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Fatos-Grid.Error', error)
    }
}
