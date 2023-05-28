import axios from 'axios';
import 'react-native-console-time-polyfill';

import * as ACTION from '../actions/TypesActions';
import * as CONSTANTE from '../util/Constante';
import * as HelperDate from '../util/HelperDate';
import * as HelperNumero from '../util/HelperNumero';
import * as HelperNet from '../util/HelperNet';

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaListaAnaliseOperacoes = ( txtEmail, txtSenha, txtCodAtivo ) => {

    return dispatch => {
        
        //console.time('AnaliseActions.buscaListaAnaliseOperacoes');

        // if ( !HelperNet.getConnection() ) {
        //    listaAnaliseOperErro("Sem internet...", dispatch);
        //    return false;
        // }
        
         dispatch({ type: ACTION.ANALISE_OPERACAO_LISTA_EM_ANDAMENTO });

         if ( txtEmail === '') {
            listaAnaliseOperErro("E-mail não informado.", dispatch);
            return false;
         }
        
         if ( txtSenha === '') {
            listaAnaliseOperErro("Senha não informada.", dispatch);
            return false;
         }

         axios({ method: 'post',
              url: CONSTANTE.URL_ANALISE_OPERACOES_GRID,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail : txtEmail,  txtSenha : txtSenha,  CodAtivo : txtCodAtivo }),
          })
         .then( (response) => { 
                 try {
                    
                     //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-Response:',response); 
                     //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-Response.Data-typeof:', typeof(response.data));

                     let JSONString = response.data;

                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-JSONString:',JSONString); 

                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-JSONObj.Resultado:',Resultado); 

                     if (Resultado === "OK") {

                        let JSONListaString = JSONObj.data.Lista;
                        //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                        //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                    
                        let JSONObjLista = undefined;
                        if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                        if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                        //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-JSONObj.JSONObjLista:',JSONObjLista );                
                        //console.log('@TamoNaBolsa:AnaliseOperacao-Grid-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 

                        let lista       = JSONObjLista; 
                        let totInvest   = 0.00;
                        let totAtual    = 0.00;
                        let totValoriz  = 0.00;
                        let percValoriz = 0.00;

                        lista.map((item) => { 
                            let operTipo   = item[0];
                            let opervTotal = parseFloat( HelperNumero.GetValorDecimal(item[7]) );
                            if ( operTipo == 'Compra'                            ) totInvest += parseFloat(opervTotal);
                            if ( operTipo == "Venda" ||  operTipo == "Projetado" ) totAtual  += parseFloat(opervTotal);
                        });

                        if ( totInvest != 0 && totAtual != 0 ){
                            totValoriz  = parseFloat(totAtual) - parseFloat(totInvest);
                            percValoriz = ( totValoriz / totInvest ) * 100;
                        }

                        lista.reverse();
                        listaAnaliseOperSucesso(lista, totInvest, totAtual, totValoriz, percValoriz, dispatch);
                        
                        //console.timeEnd('AnaliseActions.buscaListaAnaliseOperacoes');

                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaAnaliseOperErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:AnaliseOperacao-Grid-JSONObj.Mensagem:',Mensagem); 
                     }
                
                 } catch (error) {
                    listaAnaliseOperErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:AnaliseOperacao-Grid-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaAnaliseOperErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:AnaliseOperacao-Grid-Error',error); 
         });
      
     }
 }

 const listaAnaliseOperSucesso = (lista, totInvest, totAtual, totValoriz, percValoriz, dispatch) => {
     dispatch ({ type: ACTION.ANALISE_OPERACAO_LISTA_SUCESSO, payload: { lista: lista, totInvest: totInvest, totAtual: totAtual, totValoriz: totValoriz, percValoriz: percValoriz } });
 }

 const listaAnaliseOperErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.ANALISE_OPERACAO_LISTA_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaListaAnaliseProventos = ( txtEmail, txtSenha, txtCodAtivo, txtTipoRend, txtDataIni, txtDataFim ) => {

    return dispatch => {
        
        //console.time('AnaliseActions.buscaListaAnaliseProventos');

        // if ( !HelperNet.getConnection() ) {
        //    listaAnaliseProvErro("Sem internet...", dispatch);
        //    return false;
        // }
        
         dispatch({ type: ACTION.ANALISE_PROVENTO_LISTA_EM_ANDAMENTO });

         if ( txtEmail === '') {
            listaAnaliseProvErro("E-mail não informado.", dispatch);
            return false;
         }
        
         if ( txtSenha === '') {
            listaAnaliseProvErro("Senha não informada.", dispatch);
            return false;
         }

         axios({ method: 'post',
              url: CONSTANTE.URL_ANALISE_PROVENTOS_GRID,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ 
                  txtEmail : txtEmail, 
                  txtSenha : txtSenha, 
                  CodAtivo : txtCodAtivo, 
                  TipoRend : txtTipoRend, 
                  Corretora: '', 
                  DataIni  : HelperDate.tirarFormacataoData(txtDataIni), 
                  DataFim  : HelperDate.tirarFormacataoData(txtDataFim) 
                }),
          })
         .then( (response) => { 
                 try {
                    
                     //console.log('@TamoNaBolsa:AnaliseProvento-Grid-Response:',response); 
                     //console.log('@TamoNaBolsa:AnaliseProvento-Grid-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:AnaliseProvento-Grid-Response.Data-typeof:', typeof(response.data));

                     let JSONString = response.data;

                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:AnaliseProvento-Grid-JSONString:',JSONString); 

                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:AnaliseProvento-Grid-JSONObj.Resultado:',Resultado); 

                     if (Resultado === "OK") {

                        let JSONListaString = JSONObj.data.Lista;
                        //console.log('@TamoNaBolsa:AnaliseProvento-Grid-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                        //console.log('@TamoNaBolsa:AnaliseProvento-Grid-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                    
                        let JSONObjLista = undefined;
                        if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                        if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                        //console.log('@TamoNaBolsa:AnaliseProvento-Grid-JSONObj.JSONObjLista:',JSONObjLista );                
                        //console.log('@TamoNaBolsa:AnaliseProvento-Grid-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 

                        let lista = JSONObjLista; 
                        let total = 0.00;

                        lista.map((item) => { 
                            let provTotal = parseFloat( HelperNumero.GetValorDecimal(item[6]) );
                            total += parseFloat( provTotal );
                        });

                        lista.reverse();
                         
                        listaAnaliseProvSucesso(lista, total, dispatch);
                         
                        //console.timeEnd('AnaliseActions.buscaListaAnaliseProventos');

                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaAnaliseProvErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:AnaliseProvento-Grid-JSONObj.Mensagem:',Mensagem); 
                     }
                
                 } catch (error) {
                    listaAnaliseProvErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:AnaliseProvento-Grid-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaAnaliseProvErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:AnaliseProvento-Grid-Error',error); 
         });
      
     }
 }

 const listaAnaliseProvSucesso = (lista, total, dispatch) => {
     dispatch ({ type: ACTION.ANALISE_PROVENTO_LISTA_SUCESSO, payload: { lista: lista, total: total } });
 }

 const listaAnaliseProvErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.ANALISE_PROVENTO_LISTA_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------


