import * as ACTION from './TypesActions';
//import { NavigationActions } from 'react-navigation'; 
// import { put } from 'redux-saga/effects';

export const modificaNome = (value) => {
    return { type: ACTION.LOGIN_MODIFICA_NOME, payload: { novoNome: value } }
}

export const goToPerfil = () => {
    return dispatch => {
        dispatch ({ type: ACTION.NAV_PERFIL });
        //dispatch(NavigationActions.navigate({ routeName: 'Perfil' }) );
    } 
}

// export function* goToPerfil(action) {
//     // yield put({ type: ACTION.NAV_PERFIL });
//     yield put(NavigationActions.navigate({ routeName: 'Perfil' }));
// }

const loginSucesso = (value, dispatch) => {
    dispatch ({ type: ACTION.LOGIN_SUCESSO, payload: { novoNome: value } });
    // dispatch ({ type: ACTION.NAV_HOME });
}

const loginErro = (value, dispatch) => {
    dispatch ({ type: ACTION.LOGIN_MSG_ERRO, payload: { msgErro: value } });
}
