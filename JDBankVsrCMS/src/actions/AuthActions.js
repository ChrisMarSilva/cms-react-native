import { AsyncStorage, } from 'react-native';
import axios from 'axios';
import * as ACTION from './TypesActions';
import * as CONSTANTE from '../util/Constante';

export const modificaChave = (value) => {
    return { type: ACTION.LOGIN_MODIFICA_CHAVE, payload: { novachave: value } }
}

export const modificaMsgLogin = () => {
    return { type: ACTION.LOGIN_MODIFICA_MSG_ERRO, payload: { msgErro: '' } }
}

export const loginAutenticar = (txtChave) => {
   return dispatch => {

        dispatch({ type: ACTION.LOGIN_EM_ANDAMENTO });

        if ( txtChave.trim() === '') {
            loginErro("Chave não informada.", dispatch);
            return false;
        }

        const data = JSON.stringify({ chave: txtChave });
        
        axios({ 
             method : 'get',
             url    : CONSTANTE.URL_LOGIN
             data   : data,
         })
        .then( (response) => { 
            try {

                loginSucesso('', dispatch);
            
            } catch (error) {
                loginErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
            }
        })
        .catch( (error) => { 
            loginErro('Falha ao receber dados do Servidor.', dispatch);
        });
      
    }
}

const loginSucesso = (chave, dispatch) => {
    dispatch ({ type: ACTION.LOGIN_SUCESSO, payload: { chave: chave } });
    dispatch ({ type: ACTION.NAV_HOME });
}

const loginErro = (texto, dispatch) => {
    dispatch ({ type: ACTION.LOGIN_ERRO, payload: { msgErro: texto } });
}