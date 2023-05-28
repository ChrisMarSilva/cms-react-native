import AsyncStorage from '@react-native-async-storage/async-storage'
import * as CONSTANTE from '../../util/Constante'

// Action Types

const ACTION = {
    ERRO_ADD: 'sfr/err/add',
    ERRO_EXC: 'sfr/err/exc',
    ERRO_MODIFICA: 'sfr/err/modifica',
}

// Reducer

const INITIAL_STATE = {
    listaErro: [],
}

export default function reducer(state = INITIAL_STATE, action) { 
    

    switch (action.type) {

        // GERAL
        case ACTION.ERRO_ADD:
            //console.log("REDUCER-->"+ACTION.ERRO_ADD)
            //console.log(state.listaErro)
            return { ...state, 
                // listaErro: [...state.listaErro, action.payload.item]
                // listaErro: [...state.listaErro, ...action.payload.item],
                // listaErro: state.listaErro.push(action.payload.item), 
                // listaErro: state.listaErro.concat(action.payload.item)
            }
        case ACTION.ERRO_EXC:
            return { ...state, listaErro: [], }

        case ACTION.ERRO_MODIFICA:
            return { ...state, listaErro: action.payload.lista, }

        // default
        default:
            return state;
    }
}

// Action Creators

export const limpaListaErro = () => {
    return { type: ACTION.ERRO_EXC }
}

export const modificaListaErro = (lista) => {
    return { type: ACTION.ERRO_MODIFICA, payload: { lista: lista } }
}

export const adicionaListaErro = async (tela = '', url = '', params = {}, statuscod = '', message = '') => {
    try {

        const existingErrors = await AsyncStorage.getItem(CONSTANTE.SESSAO_ERROR)

        let lista = existingErrors != null ? JSON.parse(existingErrors) : []

        if (lista.length >= 100) // verifica se a lista eh mairo que o limite de registros
            lista.shift() // removendo o primeiro item da lista

        const today    = new Date()
        const datetime = ("0" + today.getDate()).substr(-2) + "/" + ("0" + (today.getMonth() + 1)).substr(-2) + "/" + today.getFullYear() + " " + ("0" + today.getHours()).substr(-2) + ":" + ("0" + today.getMinutes()).substr(-2) + ":" + ("0" + today.getSeconds()).substr(-2)
        const item     = {'datahora': datetime, 'tela': tela, 'url': url, 'params': JSON.stringify(params), 'statuscod': statuscod, 'message': JSON.stringify(message)}
        
        lista.push(item) // push-ultimo // unshift-primeiro

        await AsyncStorage.setItem(CONSTANTE.SESSAO_ERROR, JSON.stringify(lista))
        
        return { type: ACTION.ERRO_ADD }
        
    } catch (error) {
        console.log('@Safira:Erro.adiciona', error)
    }
}
