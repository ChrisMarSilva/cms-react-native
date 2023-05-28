import axios from 'axios'
import { DataProvider, } from 'recyclerlistview'
import * as CONSTANTE from '../../util/Constante'
import { adicionaListaErro, } from './erro'

// Action Types 

const ACTION = {
    
    // pesquisa
    LISTA_MOCA_EM_ANDAMENTO: 'sfr/grt/lista/em_andamento',
    LISTA_MOCA_SUCESSO: 'sfr/grt/lista/sucesso',
    LISTA_MOCA_ERRO: 'sfr/grt/lista/erro',
    
    // GERAL
    MODIFICA_MSG_MOCA: 'sfr/grt/modifica/msg_erro',
    MODIFICA_LISTA_MOCA: 'sfr/grt/modifica/lista',
}

// Reducer

const INITIAL_STATE = {

    // pesquisa
    isLoadingMoca: true,
    txtErroMoca: '',
    listaMoca: [],
    listaMocaFull: [],
    dataProviderMoca: new DataProvider((r1, r2) => { return r1 !== r2; }),

}

export default function reducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        
        // pesquisa
        case ACTION.LISTA_MOCA_EM_ANDAMENTO:
            return { ...state, isLoadingMoca: true,  txtErroMoca: '', listaMoca: [], listaMocaFull: [], dataProviderMoca: state.dataProviderMoca.cloneWithRows([]), }
        case ACTION.LISTA_MOCA_SUCESSO: 
            return { ...state, isLoadingMoca: false, txtErroMoca: '', listaMoca: action.payload.lista, listaMocaFull: action.payload.lista, dataProviderMoca: action.payload.dataProvider, }
        case ACTION.LISTA_MOCA_ERRO:
            return { ...state, isLoadingMoca: false, txtErroMoca: action.payload.msgErro, listaMoca: [], listaMocaFull: [], dataProviderMoca: state.dataProviderMoca.cloneWithRows([]) }
        
        // GERAL
        case ACTION.MODIFICA_MSG_MOCA:
            return { ...state, txtErroMoca: action.payload.msgErro }
        case ACTION.MODIFICA_LISTA_MOCA:
            return { ...state, listaMoca: action.payload.lista, dataProviderMoca: state.dataProviderMoca.cloneWithRows(action.payload.lista), }
                
        // default
        default:
            return state
    }
}

// Action Creators
 
export const modificaMsgMoca = () => {
    return { type: ACTION.MODIFICA_MSG_MOCA, payload: { msgErro: '' } }
}
 
export const modificaListaMoca = (listaMocaFull, filtro) => {
    filtro = filtro.toString().toLowerCase()
    let lista = filtro == '' ? listaMocaFull : listaMocaFull.filter( (item) => item.codigo.toString().indexOf(filtro) > -1 || item.guerra.toString().toLowerCase().indexOf(filtro) > -1 )
    return { type: ACTION.MODIFICA_LISTA_MOCA, payload: { lista, lista, } }
}
 
export const limpaListaMoca = () => {
    return { type: ACTION.LISTA_MOCA_ERRO, payload: { msgErro: '' } }
}

export const buscaListaMoca = (urlPadrao = '') => async dispatch => {
    try {

        dispatch({ type: ACTION.LISTA_MOCA_EM_ANDAMENTO })
        
        if (urlPadrao === '') {
            console.log('@Safira:Pedido.Error.Url.Vazio')
            dispatch({ type: ACTION.LISTA_MOCA_ERRO, payload: { msgErro: "URL não informada." } }) 
            return false
        }

        const url    = urlPadrao + "mocas"
        const params = {}

        axios({
            method : 'GET', 
            url    : url,
            timeout: CONSTANTE.URL_TIMEOUT,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
        }).then((response) => {

            let lista = response.data 

            // "codigo": "000012",
            // "guerra": "BEATRIZ",
            // "situacao": "A"
            
            let dataProvider = new DataProvider((r1, r2) => { return r1 !== r2; }).cloneWithRows(lista)
            
            dispatch({ type: ACTION.LISTA_MOCA_SUCESSO, payload: { lista: lista, dataProvider, dataProvider, } })

        }).catch((error) => {
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.log('@Safira:Moca.Axios', msgErroStatus + ' - ' + msgErroMessage, 'url', url)
            const msgErro = '('+msgErroStatus+') Falha ao verificar Moças'
            dispatch({ type: ACTION.LISTA_MOCA_ERRO, payload: { msgErro: msgErro } })
            registrarErro(url, params, msgErroStatus, msgErroMessage, dispatch)
        })
        
    }
    catch (error) {
        dispatch({ type: ACTION.LISTA_MOCA_ERRO, payload: { msgErro: 'Erro ao verificar Moças' } })
        console.log('@Safira:Moca.Error', error)
        registrarErro(url, params, '', error, dispatch)
    }
}

const registrarErro = (url, params, statuscod, message, dispatch) => {
    try {
        // console.log(url, params, statuscod, message)
        dispatch(adicionaListaErro('mocas', url, params, statuscod, message))
    }
    catch (error) {
        console.log('@Safira:Auth-Error', error)
    }
}
