import * as ACTION from '../actions/TypesActions';

const INITIAL_STATE = {
    saldoValor     : 0.00,
    saldoIsLoading : true,
    saldoMsgErro   : '',
}

export default (state = INITIAL_STATE, action) => {
    //console.log('HomeReducer - action.type: ' + action.type, state); 
    switch(action.type) {
        case ACTION.HOME_SALDO_EM_ANDAMENTO : return { ...state, saldoIsLoading: true,  saldoValor: 0.00,                 saldoMsgErro: '',                     }
        case ACTION.HOME_SALDO_SUCESSO      : return { ...state, saldoIsLoading: false, saldoValor: action.payload.valor, saldoMsgErro: '',                     }
        case ACTION.HOME_SALDO_ERRO         : return { ...state, saldoIsLoading: false, saldoValor: 0.00,                 saldoMsgErro: action.payload.msgErro, }
        default                             : return state;
    }
    }