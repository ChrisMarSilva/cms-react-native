import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {
    txtFiltroDtIni: '',
    txtFiltroDtFim: '',
    txtFiltroAtivo: '',
    lstFiltroAtivos: [],
    lstOperacoes: [],
    txtFiltroMsgErro: '',
    isLoadingOperacoes: false,
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        // GERAL
        case ACTION.OPERACAO_FILTRO_MODIFICA_DATA_INI:
            return { ...state, txtFiltroDtIni: action.payload.novaDtIni }
        case ACTION.OPERACAO_FILTRO_MODIFICA_DATA_FIM:
            return { ...state, txtFiltroDtFim: action.payload.novaDtFim }
        case ACTION.OPERACAO_FILTRO_MODIFICA_ATIVO:
            return { ...state, txtFiltroAtivo: action.payload.novoAtivo }

        case ACTION.OPERACAO_FILTRO_LISTA_ATIVOS_EM_ANDAMENTO:
            return { ...state, txtFiltroMsgErro: '', lstFiltroAtivos: [] }
        case ACTION.OPERACAO_FILTRO_LISTA_ATIVOS_SUCESSO: 
            return { ...state, txtFiltroMsgErro: '', lstFiltroAtivos: action.payload.lista }
        case ACTION.OPERACAO_FILTRO_LISTA_ATIVOS_ERRO:
            return { ...state, txtFiltroMsgErro: action.payload.msgErro, lstFiltroAtivos: [] }

        case ACTION.OPERACAO_FILTRO_EM_ANDAMENTO:
            return { ...state, isLoadingOperacoes: true,  txtFiltroMsgErro: '', lstOperacoes: [] }
        case ACTION.OPERACAO_FILTRO_SUCESSO: 
            return { ...state, isLoadingOperacoes: false, txtFiltroMsgErro: '', lstOperacoes: action.payload.lista }
        case ACTION.OPERACAO_FILTRO_ERRO:
            return { ...state, isLoadingOperacoes: false, txtFiltroMsgErro: action.payload.msgErro, lstOperacoes: [] }

        default:
            return state;
    }
}
