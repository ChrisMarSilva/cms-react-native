import axios             from 'axios';
import * as ACTION       from './TypesActions';
//import * as CONSTANTE    from '../util/Constante';
//import * as HelperNumero from '../util/HelperNumero';

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

export const saldoBuscar = (txtChave) => {

    return dispatch => {
         
        dispatch({ type: ACTION.HOME_SALDO_EM_ANDAMENTO });
 
        if ( txtChave === '') {
            saldoErro("Chave não informada.", dispatch);
            return false;
        }
        
        const data = JSON.stringify({ chave: txtChave });
 
         axios({ 
             method : 'get',
             url    : '', //CONSTANTE.URL_LISTA_FATOS_HOME
             data   : data,
          })
         .then( (response) => { 
                 try {
                    
                    saldoSucesso('', dispatch);
                 
                 } catch (error) {
                    saldoErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                 }
         })
         .catch( (error) => { 
            saldoErro('Falha ao receber dados do Servidor.', dispatch);
         });
       
     }
 }

const saldoSucesso = (saldo, dispatch) => {
    dispatch ({ type: ACTION.HOME_SALDO_SUCESSO, payload: { saldo: saldo} });
}

const saldoErro = (erro, dispatch) => {
    dispatch ({ type: ACTION.HOME_SALDO_ERRO, payload: { msgErro: erro } });
}