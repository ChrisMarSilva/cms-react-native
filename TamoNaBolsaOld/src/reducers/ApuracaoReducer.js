import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {
    
    lstFiltroAnos     : [],
    txtFiltroAno      : '',
    txtFiltroMsgErro  : '',
    
    lstApuracaoC      : [],
    isLoadingApuracaoC: true,
    
    lstApuracaoD      : [],
    isLoadingApuracaoD: true,

}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        
        case ACTION.APURACAO_FILTRO_MODIFICA_ANO:
            return { ...state, txtFiltroAno: action.payload.novoAno }

        case ACTION.APURACAO_LISTA_ANOS_EM_ANDAMENTO:
            return { ...state, txtFiltroMsgErro: '', lstFiltroAnos: [] }
        case ACTION.APURACAO_LISTA_ANOS_SUCESSO: 
            return { ...state, txtFiltroMsgErro: '', lstFiltroAnos: action.payload.lista }
        case ACTION.APURACAO_LISTA_ANOS_ERRO:
            return { ...state, txtFiltroMsgErro: action.payload.msgErro, lstFiltroAnos: [] }

        case ACTION.APURACAO_FILTRO_C_EM_ANDAMENTO:
            return { ...state, isLoadingApuracaoC: true,  txtFiltroMsgErro: '', lstApuracaoC: [] }
        case ACTION.APURACAO_FILTRO_C_SUCESSO: 
            return { ...state, isLoadingApuracaoC: false, txtFiltroMsgErro: '', lstApuracaoC: action.payload.lista }
        case ACTION.APURACAO_FILTRO_C_ERRO:
            return { ...state, isLoadingApuracaoC: false, txtFiltroMsgErro: action.payload.msgErro, lstApuracaoC: [] }

        case ACTION.APURACAO_FILTRO_D_EM_ANDAMENTO:
            return { ...state, isLoadingApuracaoD: true,  txtFiltroMsgErro: '', lstApuracaoD: [] }
        case ACTION.APURACAO_FILTRO_D_SUCESSO: 
            return { ...state, isLoadingApuracaoD: false, txtFiltroMsgErro: '', lstApuracaoD: action.payload.lista }
        case ACTION.APURACAO_FILTRO_D_ERRO:
            return { ...state, isLoadingApuracaoD: false, txtFiltroMsgErro: action.payload.msgErro, lstApuracaoD: [] }

        default:
            return state;
    }
}
