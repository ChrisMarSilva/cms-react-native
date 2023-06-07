
import axios from 'axios'
// import 'react-native-console-time-polyfill';

import * as CONSTANTE from '../../util/Constante'
// import * as HelperNet from '../util/HelperNet'

// Action Types 

const ACTION = {

    // pesquisa
    LISTA_COMENTARIOS_EM_ANDAMENTO: 'tnb/coment/dia/em_andamento',
    LISTA_COMENTARIOS_SUCESSO: 'tnb/coment/dia/sucesso',
    LISTA_COMENTARIOS_ERRO: 'tnb/coment/dia/erro',

    // GERAL
    MODIFICA_MSG_COMENTARIOS: 'tnb/coment/modifica/msg_erro',
}

// Reducer

const INITIAL_STATE = {
     // pesquisa
    isLoadingComentarios: true,
    txtErroComentarios: '',
    listComentarios: [],
}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        
        // pesquisa
        case ACTION.LISTA_COMENTARIOS_EM_ANDAMENTO:
            return { ...state, isLoadingComentarios: true,  txtErroComentarios: '', listComentarios: [], }
        case ACTION.LISTA_COMENTARIOS_SUCESSO: 
            return { ...state, isLoadingComentarios: false, txtErroComentarios: '', listComentarios: action.payload.lista }
        case ACTION.LISTA_COMENTARIOS_ERRO:
            return { ...state, isLoadingComentarios: false, txtErroComentarios: action.payload.msgErro, listComentarios: [] }
        
        // GERAL
        case ACTION.MODIFICA_MSG_COMENTARIOS:
            return { ...state, txtErroComentarios: action.payload.msgErro }
        
        // default
        default:
            return state
    }
}

// Action Creators
 
export const modificaMsgComentarios = () => {
    return { type: ACTION.MODIFICA_MSG_COMENTARIOS, payload: { msgErro: '' } }
}

export const buscaListaComentarios = ( pagAtual = 1 ) => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_COMENTARIOS_EM_ANDAMENTO })
        
        axios({
            method: 'post',
            url: CONSTANTE.URL_COMENTARIOS_GRID,
            timeout: CONSTANTE.URL_TIMEOUT,
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ PagAtual: pagAtual }),
        }).then((response) => {
            let Resultado = response.data.data.Resultado
            let Mensagem = response.data.data.Mensagem
            let Lista = response.data.data.Lista
            if (Resultado === "OK") {
                dispatch({ type: ACTION.LISTA_COMENTARIOS_SUCESSO, payload: { lista: Lista } })
            } else {
                dispatch ({ type: ACTION.LISTA_COMENTARIOS_ERRO, payload: { msgErro: Mensagem } })
                console.log('@TamoNaBolsa:Comentarios-Grid.Mensagem:', Mensagem)
            }
        }).catch((error) => {
            dispatch ({ type: ACTION.LISTA_COMENTARIOS_ERRO, payload: { msgErro: error } })
            console.log('@TamoNaBolsa:Comentarios-Grid.axios', error)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_COMENTARIOS_ERRO, payload: { msgErro: error } })
        console.log('@TamoNaBolsa:Comentarios-Grid.Error', error)
    }
}
