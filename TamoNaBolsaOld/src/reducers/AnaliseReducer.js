import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {

    // Analise - Operacoes
    txtFiltroAtivoAnaliseOper: '',
    lstAnaliseOper: [],
    isLoadingAnaliseOper: true,
    msgErroAnaliseOper: '',
    vlrTotalInvestAnaliseOper: 0.00,
    vlrTotalAtualAnaliseOper: 0.00,
    vlrTotalValorizAnaliseOper: 0.00,
    vlrPercValorizAnaliseOper: 0.00,

    // Analise - Proventos
    txtFiltroAtivoAnaliseProv: '',
    txtFiltroTipoAnaliseProv: '',
    txtFiltroCorretoraAnaliseProv: '',
    txtFiltroDtIniaAnaliseProv: '',
    txtFiltroDtFimaAnaliseProv: '',
    lstAnaliseProv: [],
    isLoadingAnaliseProv: true,
    msgErroAnaliseProv: '',
    vlrTotalAnaliseProv: 0.00,

}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        // Analise - Operacoes
        case ACTION.ANALISE_OPERACAO_LISTA_EM_ANDAMENTO:
            return { ...state, isLoadingAnaliseOper: true,  msgErroAnaliseOper: '', lstAnaliseOper: [] }
        case ACTION.ANALISE_OPERACAO_LISTA_SUCESSO: 
            return { ...state, isLoadingAnaliseOper: false, msgErroAnaliseOper: '', lstAnaliseOper: action.payload.lista, vlrTotalInvestAnaliseOper: action.payload.totInvest, vlrTotalAtualAnaliseOper: action.payload.totAtual, vlrTotalValorizAnaliseOper: action.payload.totValoriz, vlrPercValorizAnaliseOper: action.payload.percValoriz }
        case ACTION.ANALISE_OPERACAO_LISTA_ERRO:
            return { ...state, isLoadingAnaliseOper: false, msgErroAnaliseOper: action.payload.msgErro, lstAnaliseOper: [], vlrTotalInvestAnaliseOper: 0.00, vlrTotalAtualAnaliseOper: 0.00, vlrTotalValorizAnaliseOper: 0.00, vlrPercValorizAnaliseOper: 0.00 }
            
        // Analise - Proventos
        case ACTION.ANALISE_PROVENTO_LISTA_EM_ANDAMENTO:
            return { ...state, isLoadingAnaliseProv: true,  msgErroAnaliseProv: '', lstAnaliseProv: [] }
        case ACTION.ANALISE_PROVENTO_LISTA_SUCESSO: 
            return { ...state, isLoadingAnaliseProv: false, msgErroAnaliseProv: '', lstAnaliseProv: action.payload.lista,  vlrTotalAnaliseProv: action.payload.total, }
        case ACTION.ANALISE_PROVENTO_LISTA_ERRO:
            return { ...state, isLoadingAnaliseProv: false, msgErroAnaliseProv: action.payload.msgErro, lstAnaliseProv: [],  vlrTotalAnaliseProv: 0.00, }

        default:
            return state;
    }
}
