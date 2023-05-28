import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {
    
    listPortfolio: [],
    isLoadingPortfolio: false,
    txtErroPortfolio: '',

    lstPortfolioAtivos: [],
    isLoadingPortfolioAtivos: false,
    txtErroPortfolioAtivos: '',

    lstPortfolioValorizDia: [],
    isLoadingPortfolioValorizDia: false,
    txtErroPortfolioValorizDia: '',
    vlrPortfolioValorizDiaTotal: 0.00,
    txtDthrPortfolioValorizDia: '',
    
    lstPortfolioRadar: [],
    isLoadingPortfolioRadar: false,
    txtErroPortfolioRadar: '',
    txtDthrPortfolioRadar: '',

}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        case ACTION.PORTFOLIO_GRID_EM_ANDAMENTO:
            return { ...state, isLoadingPortfolio: true, txtErroPortfolio: '', }
        case ACTION.PORTFOLIO_GRID_SUCESSO: 
            return { ...state, isLoadingPortfolio: false, txtErroPortfolio: '', listPortfolio: action.payload.lista }
        case ACTION.PORTFOLIO_GRID_ERRO:
            return { ...state, isLoadingPortfolio: false, txtErroPortfolio: action.payload.msgErro, listPortfolio: [] }
            
        case ACTION.PORTFOLIO_ATIVO_GRID_EM_ANDAMENTO:
            return { ...state, isLoadingPortfolioAtivos: true, txtErroPortfolioAtivos: '', }
        case ACTION.PORTFOLIO_ATIVO_GRID_SUCESSO: 
            return { ...state, isLoadingPortfolioAtivos: false, txtErroPortfolioAtivos: '', lstPortfolioAtivos: action.payload.lista }
        case ACTION.PORTFOLIO_ATIVO_GRID_ERRO:
            return { ...state, isLoadingPortfolioAtivos: false, txtErroPortfolioAtivos: action.payload.msgErro, lstPortfolioAtivos: [] }

            case ACTION.PORTFOLIO_VALORIZDIA_GRID_EM_ANDAMENTO:
            return { ...state, isLoadingPortfolioValorizDia: true, txtErroPortfolioValorizDia: '', }
        case ACTION.PORTFOLIO_VALORIZDIA_GRID_SUCESSO: 
            return { ...state, isLoadingPortfolioValorizDia: false, txtErroPortfolioValorizDia: '', txtDthrPortfolioValorizDia: action.payload.datahora, vlrPortfolioValorizDiaTotal: action.payload.total, lstPortfolioValorizDia: action.payload.lista }
        case ACTION.PORTFOLIO_VALORIZDIA_GRID_ERRO:
            return { ...state, isLoadingPortfolioValorizDia: false, txtErroPortfolioValorizDia: action.payload.msgErro, txtDthrPortfolioValorizDia: '', vlrPortfolioValorizDiaTotal: 0.00, lstPortfolioValorizDia: [], }

        case ACTION.PORTFOLIO_RADAR_GRID_EM_ANDAMENTO:
            return { ...state, isLoadingPortfolioRadar: true, txtErroPortfolioRadar: '', }
        case ACTION.PORTFOLIO_RADAR_GRID_SUCESSO: 
            return { ...state, isLoadingPortfolioRadar: false, txtErroPortfolioRadar: '', txtDthrPortfolioRadar: action.payload.datahora, lstPortfolioRadar: action.payload.lista }
        case ACTION.PORTFOLIO_RADAR_GRID_ERRO:
            return { ...state, isLoadingPortfolioRadar: false, txtErroPortfolioRadar: action.payload.msgErro, txtDthrPortfolioRadar: '',lstPortfolioRadar: [], }

        default:
            return state;
    }
}
