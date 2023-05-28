import axios from 'axios';
import 'react-native-console-time-polyfill';

import * as ACTION from '../actions/TypesActions';
import * as CONSTANTE from '../util/Constante';
import * as HelperDate from '../util/HelperDate';
import * as HelperNet from '../util/HelperNet';

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const modificaFiltroDtIni = (value) => {
    return { type: ACTION.OPERACAO_FILTRO_MODIFICA_DATA_INI, payload: { novaDtIni: value } }
}

export const modificaFiltroDtFim = (value) => {
    return { type: ACTION.OPERACAO_FILTRO_MODIFICA_DATA_FIM, payload: { novaDtFim: value } }
}

export const modificaFiltroAtivo = (value) => {
    return { type: ACTION.OPERACAO_FILTRO_MODIFICA_ATIVO, payload: { novoAtivo: value } }
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaListaFiltroAtivos = (txtEmail, txtSenha) => {

    return dispatch => {
         
         dispatch({ type: ACTION.OPERACAO_FILTRO_LISTA_ATIVOS_EM_ANDAMENTO });

         // if ( !HelperNet.getConnection() ) {
         //     listaFiltroAnosErro("Sem internet...", dispatch);
         //     return false;
         //  }
 
         if ( txtEmail === '') {
            listaFiltroAtivosErro("E-mail não informado.", dispatch);
            return false;
         }
         
         if ( txtSenha === '') {
            listaFiltroAtivosErro("Senha não informada.", dispatch);
            return false;
         }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_LISTA,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha, TipoLista: 'comprada' }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-Response:',response); 
                     //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:Operacao-Lista-Ativo-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                         let lista = JSONObjLista; //JSONObjLista[0] 
                         listaFiltroAtivosSucesso(lista, dispatch);
                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaFiltroAtivosErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:Operacao-Lista-Ativo-JSONObj.Mensagem:',Mensagem); 
                     }
                 
                 } catch (error) {
                    listaFiltroAtivosErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:Operacao-Lista-Ativo-Catch',error); 
                 }
         })
         .catch( (error) => { 
             listaFiltroAtivosErro('Falha ao receber dados do Servidor.', dispatch);
             console.log('@TamoNaBolsa:Operacao-Lista-Ativo-Error',error); 
         });
       
     }
 }
 
 const listaFiltroAtivosSucesso = (lista, dispatch) => {
    dispatch ({ type: ACTION.OPERACAO_FILTRO_LISTA_ATIVOS_SUCESSO, payload: { lista: lista } });
}

const listaFiltroAtivosErro = (erro, dispatch) => {
    dispatch ({ type: ACTION.OPERACAO_FILTRO_LISTA_ATIVOS_ERRO, payload: { msgErro: erro } });
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaListaOperacoes = (txtEmail, txtSenha, txtCodAtivo, txtDataIni, txtDataFim) => {

    return dispatch => {
        
         dispatch({ type: ACTION.OPERACAO_FILTRO_EM_ANDAMENTO });

         //console.time('OperacoesActions.buscaListaOperacoes');

         //console.log('OperacoesActions.buscaListaOperacoes.txtCodAtivo:', txtCodAtivo); 
         //console.log('OperacoesActions.buscaListaOperacoes.txtDataIni:', txtDataIni); 
         //console.log('OperacoesActions.buscaListaOperacoes.txtDataIni.tirarFormacataoData:', HelperDate.tirarFormacataoData(txtDataIni)); 
         //console.log('OperacoesActions.buscaListaOperacoes.txtDataFim:', txtDataFim); 
         //console.log('OperacoesActions.buscaListaOperacoes.txtDataIni.tirarFormacataoData:', HelperDate.tirarFormacataoData(txtDataFim)); 

         // if ( !HelperNet.getConnection() ) {
         //     listaFiltroAnosErro("Sem internet...", dispatch);
         //     return false;
         //  }

         if ( txtEmail === '') {
            listaOperacoesErro("E-mail não informado.", dispatch);
            return false;
         }
        
         if ( txtSenha === '') {
            listaOperacoesErro("Senha não informada.", dispatch);
            return false;
         }

         axios({ method: 'post',
              url: CONSTANTE.URL_OPERACOES_GRID,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ 
                  txtEmail  : txtEmail, 
                  txtSenha  : txtSenha, 
                  CodAtivo  : txtCodAtivo, 
                  Corretora : '', 
                  DataIni   : HelperDate.tirarFormacataoData(txtDataIni), 
                  DataFim   : HelperDate.tirarFormacataoData(txtDataFim) 
                }),
          })
         .then( (response) => { 
                 try {
                    
                     //console.log('@TamoNaBolsa:Operacao-Grid-Response:',response); 
                     //console.log('@TamoNaBolsa:Operacao-Grid-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:Operacao-Grid-Response.Data-typeof:', typeof(response.data));

                     let JSONString = response.data;

                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:Operacao-Grid-JSONString:',JSONString); 

                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:Operacao-Grid-JSONObj.Resultado:',Resultado); 

                     if (Resultado === "OK") {

                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:Operacao-Grid-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:Operacao-Grid-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                        
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:Operacao-Grid-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:Operacao-Grid-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 

                         let lista = JSONObjLista; 
                         listaOperacoesSucesso(lista, dispatch);

                        // console.timeEnd('OperacoesActions.buscaListaOperacoes');

                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaOperacoesErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:Operacao-Grid-JSONObj.Mensagem:',Mensagem); 
                     }
                
                 } catch (error) {
                    listaOperacoesErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:Operacao-Grid-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaOperacoesErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:Operacao-Grid-Error',error); 
         });
      
     }
 }

 const listaOperacoesSucesso = (lista, dispatch) => {
     dispatch ({ type: ACTION.OPERACAO_FILTRO_SUCESSO, payload: { lista: lista } });
 }

 const listaOperacoesErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.OPERACAO_FILTRO_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
