import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {

    // FATOS
    isLoadingFatos: true,
    txtErroFatos: '',
    listFatos: [],

    // APURACAO
    isLoadingApuracao: true,
    txtErroApuracao: '',
    listApuracaoC: [],
    listApuracaoD: [],
    
    // OPEERACAO
    isLoadingOperacoes: true,
    txtErroOperacoes: '',
    listOperacoesC: [],
    listOperacoesV: [],
    listOperacoesB: [],
    totalOperacoesC: 0.00,
    totalOperacoesV: 0.00,
    totalOperacoesB: 0.00,
    
    // PROVENTOS
    isLoadingProventos: true,
    txtErroProventos: '',
    listProventos: [],
    totalProventosRec: 0.00,
    
    // CALENDARIO
    isLoadingCalendario: true,
    txtErroCalendario: '',
    listCalendario: [],
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        // FATOS
        case ACTION.LISTA_FATOS_HOME_EM_ANDAMENTO:
            return { ...state, isLoadingFatos: true,  txtErroFatos: '', }
        case ACTION.LISTA_FATOS_HOME_SUCESSO: 
            return { ...state, isLoadingFatos: false, txtErroFatos: '', listFatos: action.payload.lista }
        case ACTION.LISTA_FATOS_HOME_ERRO:
            return { ...state, isLoadingFatos: false, txtErroFatos: action.payload.msgErro, listFatos: [] }

        // APURACAO
        case ACTION.LISTA_APURACAO_HOME_EM_ANDAMENTO:
            return { ...state, isLoadingApuracao: true,  txtErroApuracao: '', }
        case ACTION.LISTA_APURACAO_C_HOME_SUCESSO: 
            return { ...state, isLoadingApuracao: false, txtErroApuracao: '', listApuracaoC: action.payload.lista }
        case ACTION.LISTA_APURACAO_D_HOME_SUCESSO: 
            return { ...state, isLoadingApuracao: false, txtErroApuracao: '', listApuracaoD: action.payload.lista }
        case ACTION.LISTA_APURACAO_HOME_ERRO:
            return { ...state, isLoadingApuracao: false, txtErroApuracao: action.payload.msgErro, listApuracaoC: [], listApuracaoD: [] }

        // OPEERACAO
        case ACTION.LISTA_OPEERACAO_HOME_EM_ANDAMENTO:
            return { ...state, isLoadingOperacoes: true,  txtErroOperacoes: '', }
        case ACTION.LISTA_OPEERACAO_HOME_SUCESSO: 
            return { ...state, isLoadingOperacoes: false, txtErroOperacoes: '', listOperacoesC: action.payload.listaC, listOperacoesV: action.payload.listaV, listOperacoesB: action.payload.listaB, totalOperacoesC: action.payload.totalC, totalOperacoesV: action.payload.totalV, totalOperacoesB: action.payload.totalB, }
        case ACTION.LISTA_OPEERACAO_HOME_ERRO:
            return { ...state, isLoadingOperacoes: false,  txtErroOperacoes: action.payload.msgErro, listOperacoesC: [], listOperacoesV: [], listOperacoesB: [], totalOperacoesC: 0.00, totalOperacoesV: 0.00, totalOperacoesB: 0.00, }
        
        // PROVENTOS
        case ACTION.LISTA_PROVENTO_HOME_EM_ANDAMENTO:
            return { ...state, isLoadingProventos: true, txtErroProventos: '', }
        case ACTION.LISTA_PROVENTO_HOME_SUCESSO: 
            return { ...state, isLoadingProventos: false, txtErroProventos: '', listProventos: action.payload.lista, totalProventosRec: action.payload.total }
        case ACTION.LISTA_PROVENTO_HOME_ERRO:
            return { ...state, isLoadingProventos: false, txtErroProventos: action.payload.msgErro, listProventos: [], totalProventosRec: 0.00 }

        // CALENDARIO
        case ACTION.LISTA_CALENDARIO_HOME_EM_ANDAMENTO:
            return { ...state, isLoadingCalendario: true, txtErroCalendario: '', }
        case ACTION.LISTA_CALENDARIO_HOME_SUCESSO: 
            return { ...state, isLoadingCalendario: false, txtErroCalendario: '', listCalendario: action.payload.lista }
        case ACTION.LISTA_CALENDARIO_HOME_ERRO:
            return { ...state, isLoadingCalendario: false, txtErroCalendario: action.payload.msgErro, listCalendario: [] }

        default:
            return state;
    }
}
