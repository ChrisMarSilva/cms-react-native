
import axios from 'axios'
// import 'react-native-console-time-polyfill';

import * as CONSTANTE from '../../util/Constante'
// import * as HelperNet from '../util/HelperNet'

// Action Types 

const ACTION = {
    
    // pesquisa
    LISTA_NOTICIAS_EM_ANDAMENTO: 'tnb/notic/dia/em_andamento',
    LISTA_NOTICIAS_SUCESSO: 'tnb/notic/dia/sucesso',
    LISTA_NOTICIAS_ERRO: 'tnb/notic/dia/erro',
    
    // GERAL
    MODIFICA_MSG_NOTICIAS: 'tnb/notic/modifica/msg_erro',
    MODIFICA_LISTA_NOTICIAS: 'tnb/notic/modifica/lista',
}

// Reducer

const INITIAL_STATE = {

    // pesquisa
    isLoadingNoticias: true,
    txtErroNoticias: '',
    listNoticias: [],

}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        
        // pesquisa
        case ACTION.LISTA_NOTICIAS_EM_ANDAMENTO:
            return { ...state, isLoadingNoticias: true,  txtErroNoticias: '', }
        case ACTION.LISTA_NOTICIAS_SUCESSO: 
            return { ...state, isLoadingNoticias: false, txtErroNoticias: '', listNoticias: action.payload.lista }
        case ACTION.LISTA_NOTICIAS_ERRO:
            return { ...state, isLoadingNoticias: false, txtErroNoticias: action.payload.msgErro, listNoticias: [] }
        
        // GERAL
        case ACTION.MODIFICA_MSG_NOTICIAS:
            return { ...state, txtErroNoticias: action.payload.msgErro }
        case ACTION.MODIFICA_LISTA_NOTICIAS:
            return { ...state, listNoticias: action.payload.lista }
        
        // default
        default:
            return state
    }
}

// Action Creators
 
export const modificaMsgNoticias = () => {
    return { type: ACTION.MODIFICA_MSG_NOTICIAS, payload: { msgErro: '' } }
}
 
export const modificaListaNoticias = ( lista ) => {
    return { type: ACTION.MODIFICA_LISTA_NOTICIAS, payload: { lista: lista } }
}

export const buscaListaNoticiasDia = () => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_NOTICIAS_EM_ANDAMENTO })
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_LISTA_NOTIFICAS_HOME,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({  }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {

                // Lista.sort(function (a, b) {
                //   const dataA = a[0]  
                //   const dataB = b[0]
                //   if(dataA == dataB) return 0
                //   return dataA > dataB? 1: -1
                // })
                // Lista.reverse()

                dispatch({ type: ACTION.LISTA_NOTICIAS_SUCESSO, payload: { lista: Lista } })
                
            } else {
                dispatch ({ type: ACTION.LISTA_NOTICIAS_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Noticias-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.LISTA_NOTICIAS_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Noticias-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_NOTICIAS_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Noticias-Grid.Error', error)
    }
}
