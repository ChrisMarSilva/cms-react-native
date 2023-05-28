import axios from 'axios';
import 'react-native-console-time-polyfill';

import * as ACTION from './TypesActions';
import * as CONSTANTE from '../util/Constante';
import * as HelperNet from '../util/HelperNet';

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const modificaFiltroAno = (value) => {
    return { type: ACTION.APURACAO_FILTRO_MODIFICA_ANO, payload: { novoAno: value } }
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaListaFiltroAnos = (txtEmail, txtSenha) => {

    return dispatch => {
        
         dispatch({ type: ACTION.APURACAO_LISTA_ANOS_EM_ANDAMENTO });

        // if ( !HelperNet.getConnection() ) {
        //     listaFiltroAnosErro("Sem internet...", dispatch);
        //     return false;
        //  }
 
         if ( txtEmail === '') {
            listaFiltroAnosErro("E-mail não informado.", dispatch);
            return false;
         }
         
         if ( txtSenha === '') {
            listaFiltroAnosErro("Senha não informada.", dispatch);
            return false;
         }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_APURACAO_ANO,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:Apuracao-Lista-Response:',response); 
                     //console.log('@TamoNaBolsa:Apuracao-Lista-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:Apuracao-Lista-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:Apuracao-Lista-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:Apuracao-Lista-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:Apuracao-Lista-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:Apuracao-Lista-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:Apuracao-Lista-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:Apuracao-Lista-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                         let lista = JSONObjLista; //JSONObjLista[0] 
                         listaFiltroAnosSucesso(lista, dispatch);
                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaFiltroAnosErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:Apuracao-Lista-JSONObj.Mensagem:',Mensagem); 
                     }

                 } catch (error) {
                    listaFiltroAnosErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:Apuracao-Lista-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaFiltroAnosErro('Falha ao receber dados do Servidor.', dispatch);
             console.log('@TamoNaBolsa:Apuracao-Lista-Error',error); 
         });
       
     }
 }
 
 const listaFiltroAnosSucesso = (lista, dispatch) => {
    dispatch ({ type: ACTION.APURACAO_LISTA_ANOS_SUCESSO, payload: { lista: lista } });
}

const listaFiltroAnosErro = (erro, dispatch) => {
    dispatch ({ type: ACTION.APURACAO_LISTA_ANOS_ERRO, payload: { msgErro: erro } });
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaListaApuracao = (txtEmail, txtSenha, txtTipo, txtAno) => {

    return dispatch => {
        
        txtTipo  = txtTipo != '' ? txtTipo : 'C';
        //console.time('ApuracaoActions.buscaListaApuracao.'+txtTipo);

        // if ( !HelperNet.getConnection() ) {
        //    listaFiltroAnosErro("Sem internet...", dispatch);
        //    return false;
        // }

        if ( txtTipo == 'C' ) 
            dispatch({ type: ACTION.APURACAO_FILTRO_C_EM_ANDAMENTO });

        if ( txtTipo == 'D' ) 
            dispatch({ type: ACTION.APURACAO_FILTRO_D_EM_ANDAMENTO });

        //  console.log('@TamoNaBolsa:Apuracao-Grid-txtEmail:',txtEmail); 
        //  console.log('@TamoNaBolsa:Apuracao-Grid-txtSenha:',txtSenha); 
        //  console.log('@TamoNaBolsa:Apuracao-Grid-txtTipo:',txtTipo); 
        //  console.log('@TamoNaBolsa:Apuracao-Grid-txtAno:',txtAno); 

         if ( txtEmail === '') {
            listaApuracaoErro("E-mail não informado.", txtTipo, dispatch);
            return false;
         }
        
         if ( txtSenha === '') {
            listaApuracaoErro("Senha não informada.", txtTipo, dispatch);
            return false;
         }        

         axios({ method: 'post',
              url: CONSTANTE.URL_APURACAO_GRID,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ 
                  txtEmail       : txtEmail, 
                  txtSenha       : txtSenha, 
                  TpApuracao     : txtTipo, 
                  AnoApuracao    : txtAno, 
                  CalcVlrSuperior: 'N'
                }),
          })
         .then( (response) => { 
                 try {

                     //console.log('@TamoNaBolsa:Apuracao-Grid-Response:',response); 
                     //console.log('@TamoNaBolsa:Apuracao-Grid-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:Apuracao-Grid-Response.Data-typeof:', typeof(response.data));

                     let JSONString = response.data;

                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:Apuracao-Grid-JSONString:',JSONString); 

                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:Apuracao-Grid-JSONObj.Resultado:',Resultado); 

                     if (Resultado === "OK") {

                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:Apuracao-Grid-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:Apuracao-Grid-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                        
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:Apuracao-Grid-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:Apuracao-Grid-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 

                         let lista = JSONObjLista; 
						 lista.reverse();

                         listaApuracaoSucesso(lista, txtTipo, dispatch);

                        // console.timeEnd('ApuracaoActions.buscaListaApuracao.'+txtTipo);

                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaApuracaoErro(Mensagem, txtTipo, dispatch);
                         console.log('@TamoNaBolsa:Apuracao-Grid-JSONObj.Mensagem:',Mensagem); 
                     }
                
                 } catch (error) {
                    listaApuracaoErro('Houve um erro inesperado, por favor, tente novamente.', txtTipo, dispatch);
                    console.log('@TamoNaBolsa:Apuracao-Grid-Catch',error); 
                 }
        
         })
         .catch( (error) => { 
            listaApuracaoErro('Falha ao receber dados do Servidor.', txtTipo, dispatch);
            console.log('@TamoNaBolsa:Apuracao-Grid-Error',error); 
         });
      
     }
 }

 const listaApuracaoSucesso = (lista, tipo, dispatch) => {
    if ( tipo == 'C' ) 
        dispatch ({ type: ACTION.APURACAO_FILTRO_C_SUCESSO, payload: { lista: lista } });
    if ( tipo == 'D' ) 
        dispatch ({ type: ACTION.APURACAO_FILTRO_D_SUCESSO, payload: { lista: lista } });
 }

 const listaApuracaoErro = (erro, tipo, dispatch) => {
    if ( tipo == 'C' ) 
        dispatch ({ type: ACTION.APURACAO_FILTRO_C_ERRO, payload: { msgErro: erro } });
    if ( tipo == 'D' ) 
        dispatch ({ type: ACTION.APURACAO_FILTRO_D_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------