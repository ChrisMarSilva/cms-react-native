import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {

    lstFiltroAtivos: [],
    txtFiltroDtIni: '',
    txtFiltroDtFim: '',
    txtFiltroTipo: '',
    txtFiltroAtivo: '',
    txtFiltroMsgErro: '',

    lstProventos: [],
    isLoadingProventos: true,
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        // GERAL
        case ACTION.PROVENTO_FILTRO_MODIFICA_DATA_INI:
            return { ...state, txtFiltroDtIni: action.payload.novaDtIni }
        case ACTION.PROVENTO_FILTRO_MODIFICA_DATA_FIM:
            return { ...state, txtFiltroDtFim: action.payload.novaDtFim }
        case ACTION.PROVENTO_FILTRO_MODIFICA_TIPO:
            return { ...state, txtFiltroTipo: action.payload.novoTipo }
        case ACTION.PROVENTO_FILTRO_MODIFICA_ATIVO:
            return { ...state, txtFiltroAtivo: action.payload.novoAtivo }

        case ACTION.PROVENTO_LISTA_ATIVOS_EM_ANDAMENTO:
            return { ...state, txtFiltroMsgErro: '', lstFiltroAtivos: [] }
        case ACTION.PROVENTO_LISTA_ATIVOS_SUCESSO: 
            return { ...state, txtFiltroMsgErro: '', lstFiltroAtivos: action.payload.lista }
        case ACTION.PROVENTO_LISTA_ATIVOS_ERRO:
            return { ...state, txtFiltroMsgErro: action.payload.msgErro, lstFiltroAtivos: [] }

        case ACTION.PROVENTO_FILTRO_EM_ANDAMENTO:
            return { ...state, isLoadingProventos: true,  txtFiltroMsgErro: '', lstProventos: [] }
        case ACTION.PROVENTO_FILTRO_SUCESSO: 
            return { ...state, isLoadingProventos: false, txtFiltroMsgErro: '', lstProventos: action.payload.lista }
        case ACTION.PROVENTO_FILTRO_ERRO:
            return { ...state, isLoadingProventos: false, txtFiltroMsgErro: action.payload.msgErro, lstProventos: [] }

        default:
            return state;
    }
}
