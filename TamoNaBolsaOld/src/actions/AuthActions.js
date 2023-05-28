import { AsyncStorage, } from 'react-native';
import axios from 'axios';
import 'react-native-console-time-polyfill';

import * as ACTION from './TypesActions';
import * as CONSTANTE from '../util/Constante';

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const modificaNome = (value) => {
    return { type: ACTION.USER_MODIFICA_NOME, payload: { novoNome: value } }
}

export const modificaEmail = (value) => {
    return { type: ACTION.USER_MODIFICA_EMAIL, payload: { novoEmail: value } }
}

export const modificaSenha = (value) => {
    return { type: ACTION.USER_MODIFICA_SENHA, payload: { novaSenha: value } }
}

export const modificaLembrar = (value) => {
    return { type: ACTION.USER_MODIFICA_LEMBRAR, payload: { novoValor: value } }
}

export const modificaSenhaConf = (value) => {
    return { type: ACTION.USER_MODIFICA_SENHA_CONF, payload: { novaSenhaConf: value } }
}

export const modificaMsgLogin = () => {
    return { type: ACTION.USER_MODIFICA_MSG_LOGIN, payload: { msgErro: '' } }
}

export const modificaMsgCadastro = () => {
    return { type: ACTION.USER_MODIFICA_MSG_RESET_SENHA, payload: { msgErro: '', msgSucesso: '' } }
}

export const modificaMsgResetSenha = () => {
    return { type: ACTION.USER_MODIFICA_MSG_CADASTRO, payload: { msgErro: '', msgSucesso: '' } }
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const getUserId = async ( Chave ) => {
    try {
        return await AsyncStorage.getItem(Chave) || '';   
    } catch (error) {
        return '';  //console.log(error.message);
    }
}

export const autenticarUsuario = (txtEmail, txtSenha, txtLembrar) => {

   return dispatch => {
        
        //console.time('AuthActions.autenticarUsuario');

        dispatch({ type: ACTION.USER_LOGIN_EM_ANDAMENTO });

        if ( txtEmail === '') {
            loginUsuarioErro("E-mail não informado.", dispatch);
            return false;
        }
        
        if ( txtSenha === '') {
            loginUsuarioErro("Senha não informada.", dispatch);
            return false;
        }
        
        axios({ 
             method: 'post',
             url: CONSTANTE.URL_LOGIN,
             timeout: CONSTANTE.URL_TIMEOUT, 
             responseType: 'text',
             headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },             
             data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
         })
        .then( (response) => { 
                try {

                    //console.log('@TamoNaBolsa:Login-Response:',response); 
                    //console.log('@TamoNaBolsa:Login-Response.Data:',response.data); 
                    //console.log('@TamoNaBolsa:Login-Response.Data-typeof:', typeof(response.data));

                    let JSONString = response.data;

                    let JSONObj = undefined;
                    if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                    if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                    //console.log('@TamoNaBolsa:Login-JSONString:',JSONString); 

                    let Resultado = JSONObj.data.Resultado; 
                    //console.log('@TamoNaBolsa:Login-JSONObj.Resultado:',Resultado); 
                    //console.log('@TamoNaBolsa:Login-JSONObj.Dados:',Dados, JSON.stringify(Dados) ); 
                    //console.log('@TamoNaBolsa:Login-JSONObj.Lista:',Lista,JSON.stringify(Lista) ); 

                    if (Resultado === "OK") {

                        let Dados = JSONObj.data.Dados;

                        AsyncStorage.setItem(CONSTANTE.SESSAO_USER_ID,    Dados.Id   );
                        AsyncStorage.setItem(CONSTANTE.SESSAO_USER_NOME,  Dados.Nome );
                        AsyncStorage.setItem(CONSTANTE.SESSAO_USER_TIPO,  Dados.Tipo );
                        AsyncStorage.setItem(CONSTANTE.SESSAO_USER_EMAIL, txtEmail   );
                        AsyncStorage.setItem(CONSTANTE.SESSAO_USER_SENHA, txtSenha   );

                        if ( txtLembrar ) {
                            AsyncStorage.setItem(CONSTANTE.SESSAO_USER_LEMBRAR, 'S' );
                        }else{
                            AsyncStorage.setItem(CONSTANTE.SESSAO_USER_LEMBRAR, 'N' );
                        }

                        loginUsuarioSucesso(Dados.Id, Dados.Nome, Dados.Tipo, dispatch);
                        //console.timeEnd('AuthActions.autenticarUsuario');

                    } else {
                        let Mensagem = JSONObj.data.Mensagem;
                        console.log('@TamoNaBolsa:Login-JSONObj.Mensagem:',Mensagem); 
                        loginUsuarioErro(Mensagem, dispatch);
                    }
                
                } catch (error) {
                    loginUsuarioErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:Login-Catch',error); 
                }
        })
        .catch( (error) => { 
            loginUsuarioErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:Login-Error',error); 
        });
      
    }
}

const loginUsuarioSucesso = (Id, Nome, Tipo, dispatch) => {
    dispatch ({ type: ACTION.USER_LOGIN_USUARIO_SUCESSO, payload: { Id: Id, Nome: Nome, Tipo: Tipo } });
    dispatch ({ type: ACTION.NAV_HOME });
}

const loginUsuarioErro = (texto, dispatch) => {
    dispatch ({ type: ACTION.USER_LOGIN_USUARIO_ERRO, payload: { msgErro: texto } });
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const cadastrarUsuario = (txtNome, txtEmail, txtSenha, txtSenhaConf) => {

    return dispatch => {

        dispatch({ type: ACTION.USER_CADASTRO_EM_ANDAMENTO });

        if ( txtNome.trim() === '') {
            cadastroUsuarioErro("Nome não informado.", dispatch);
            return false;
        }
        
        if ( txtEmail.trim() === '') {
            cadastroUsuarioErro("E-mail não informado.", dispatch);
            return false;
        }
        
        if ( txtSenha.trim() === '') {
            cadastroUsuarioErro("Senha não informada.", dispatch);
            return false;
        }
        
        if ( txtSenhaConf.trim() === '') {
            cadastroUsuarioErro("Confirmação de Senha não informada.", dispatch);
            return false;
        }
        
        if ( txtSenha.trim() != txtSenhaConf.trim()) {
            cadastroUsuarioErro("As senhas informadas não são iguais.", dispatch);
            return false;
        }
       
        axios({ method: 'post',
             url: CONSTANTE.URL_CADASTRO_USUARIO,
             responseType: 'text',
             headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
             timeout: CONSTANTE.URL_TIMEOUT, 
             data: JSON.stringify({ txtUserNome: txtNome, txtUserEmail: txtEmail, txtUserSenha: txtSenha }),
         })
        .then( (response) => { 
                try {

                    //console.log('@TamoNaBolsa:CadastroUser-Response:',response); 
                    //console.log('@TamoNaBolsa:CadastroUser-Response.Data:',response.data); 
                    //console.log('@TamoNaBolsa:CadastroUser-Response.Data-typeof:', typeof(response.data));

                    let JSONString = response.data;

                    let JSONObj = undefined;
                    if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                    if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                    //console.log('@TamoNaBolsa:CadastroUser-JSONString:',JSONString); 

                    let Resultado = JSONObj.data.Resultado; 
                    //console.log('@TamoNaBolsa:CadastroUser-JSONObj.Resultado:',Resultado); 
                    
                    let Mensagem = JSONObj.data.Mensagem;

                    if (Resultado === "OK") {
                        cadastroUsuarioSucesso(Mensagem, dispatch);
                    } else {
                        console.log('@TamoNaBolsa:CadastroUser-JSONObj.Mensagem:',Mensagem); 
                        cadastroUsuarioErro(Mensagem, dispatch);
                    }
                
                } catch (error) {
                    cadastroUsuarioErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:CadastroUser-Catch',error); 
                }
        })
        .catch( (error) => { 
            cadastroUsuarioErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:CadastroUser-Error',error); 
        });
        
    }
    
}

const cadastroUsuarioSucesso = (texto, dispatch) => {
    dispatch ({ type: ACTION.USER_CADASTRO_SUCESSO, payload: { msgSucesso: texto } });
    //dispatch ({ type: ACTION.NAV_LOGIN });
}

const cadastroUsuarioErro = (texto, dispatch) => {
    dispatch ({ type: ACTION.USER_CADASTRO_ERRO, payload: { msgErro: texto } });
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const resetarSenhaUsuario = (txtEmail) => {

    return dispatch => {

        dispatch({ type: ACTION.USER_RESET_SENHA_EM_ANDAMENTO });

         if ( txtEmail === '') {
            resetarSenhaUsuarioErro("E-mail não informado.", dispatch);
            return false;
        }
        
        console.log('@TamoNaBolsa:ResetarSenha-URL:',CONSTANTE.URL_RESETAR_SENHA); 

        axios({ method: 'post',
             url: CONSTANTE.URL_RESETAR_SENHA,
             responseType: 'text',
             headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
             timeout: CONSTANTE.URL_TIMEOUT, 
             data: JSON.stringify({ txtUserEmail: txtEmail }),
         })
        .then( (response) => { 
                try {

                    //console.log('@TamoNaBolsa:ResetarSenha-Response:',response); 
                    //console.log('@TamoNaBolsa:ResetarSenha-Response.Data:',response.data); 
                    //console.log('@TamoNaBolsa:ResetarSenha-Response.Data-typeof:', typeof(response.data));

                    let JSONString = response.data;

                    let JSONObj = undefined;
                    if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                    if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                    //console.log('@TamoNaBolsa:ResetarSenha-JSONString:',JSONString); 

                    let Resultado = JSONObj.data.Resultado; 
                    //console.log('@TamoNaBolsa:ResetarSenha-JSONObj.Resultado:',Resultado); 

                    let Mensagem = JSONObj.data.Mensagem;

                    if (Resultado === "OK") {
                        resetarSenhaUsuarioSucesso(Mensagem, dispatch);
                    } else {
                        console.log('@TamoNaBolsa:ResetarSenha-JSONObj.Mensagem:',Mensagem); 
                        resetarSenhaUsuarioErro(Mensagem, dispatch);
                    }
                
                } catch (error) {
                    resetarSenhaUsuarioErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:ResetarSenha-Catch',error); 
                }
        })
        .catch( (error) => { 
            resetarSenhaUsuarioErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:ResetarSenha-Error',error); 
        });

    }
    
}

const resetarSenhaUsuarioSucesso = (texto, dispatch) => {
    dispatch ({ type: ACTION.USER_RESET_SENHA_SUCESSO, payload: { msgSucesso: texto } }); 
    //dispatch ({ type: ACTION.NAV_LOGIN });
}

const resetarSenhaUsuarioErro = (texto, dispatch) => {
    dispatch ({ type: ACTION.USER_RESET_SENHA_ERRO, payload: { msgErro: texto } });
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
