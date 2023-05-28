import axios from 'axios';
import 'react-native-console-time-polyfill';

import * as ACTION from '../actions/TypesActions';
import * as CONSTANTE from '../util/Constante';
import * as HelperDate from '../util/HelperDate';
import * as HelperNet from '../util/HelperNet';

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const modificaFiltroDtIni = (value) => {
    return { type: ACTION.PROVENTO_FILTRO_MODIFICA_DATA_INI, payload: { novaDtIni: value } }
}

export const modificaFiltroDtFim = (value) => {
    return { type: ACTION.PROVENTO_FILTRO_MODIFICA_DATA_FIM, payload: { novaDtFim: value } }
}

export const modificaFiltroTipo = (value) => {
    return { type: ACTION.PROVENTO_FILTRO_MODIFICA_TIPO, payload: { novoTipo: value } }
}

export const modificaFiltroAtivo = (value) => { 
    return { type: ACTION.PROVENTO_FILTRO_MODIFICA_ATIVO, payload: { novoAtivo: value } }
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaListaFiltroAtivos = (txtEmail, txtSenha) => {

    return dispatch => {
        
         dispatch({ type: ACTION.PROVENTO_LISTA_ATIVOS_EM_ANDAMENTO });

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
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha, TipoLista: 'provento' }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:Provento-Lista-Response:',response); 
                     //console.log('@TamoNaBolsa:Provento-Lista-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:Provento-Lista-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:Provento-Lista-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:Provento-Lista-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:Provento-Lista-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:Provento-Lista-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:Provento-Lista-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:Provento-Lista-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                         let lista = JSONObjLista; //JSONObjLista[0] 
                         listaFiltroAtivosSucesso(lista, dispatch);
                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaFiltroAtivosErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:Provento-Lista-JSONObj.Mensagem:',Mensagem); 
                     }
                 
                 } catch (error) {
                    listaFiltroAtivosErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:Provento-Lista-Catch',error); 
                 }
         })
         .catch( (error) => { 
             listaFiltroAtivosErro('Falha ao receber dados do Servidor.', dispatch);
             console.log('@TamoNaBolsa:Provento-Lista-Error',error); 
         });
       
     }
 }
 
 const listaFiltroAtivosSucesso = (lista, dispatch) => {
    dispatch ({ type: ACTION.PROVENTO_LISTA_ATIVOS_SUCESSO, payload: { lista: lista } });
}

const listaFiltroAtivosErro = (erro, dispatch) => {
    dispatch ({ type: ACTION.PROVENTO_LISTA_ATIVOS_ERRO, payload: { msgErro: erro } });
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaListaProventos = (txtEmail, txtSenha, txtCodAtivo, txtTipoRend, txtDataIni, txtDataFim) => {

    return dispatch => {
        
        //console.time('ProventosActions.buscaListaProventos');

         //console.log('ProventosActions.buscaListaProventos.txtCodAtivo:', txtCodAtivo); 
        // console.log('ProventosActions.buscaListaProventos.txtTipoRend:', txtTipoRend); 
        // console.log('ProventosActions.buscaListaProventos.txtDataIni:', txtDataIni); 
        // console.log('ProventosActions.buscaListaProventos.txtDataIni.tirarFormacataoData:', HelperDate.tirarFormacataoData(txtDataIni)); 
        // console.log('ProventosActions.buscaListaProventos.txtDataFim:', txtDataFim); 
        // console.log('ProventosActions.buscaListaProventos.txtDataIni.tirarFormacataoData:', HelperDate.tirarFormacataoData(txtDataFim)); 

        // if ( !HelperNet.getConnection() ) {
        //    listaFiltroAnosErro("Sem internet...", dispatch);
        //    return false;
        // }
        
         dispatch({ type: ACTION.PROVENTO_FILTRO_EM_ANDAMENTO });

         if ( txtEmail === '') {
            listaProventosErro("E-mail não informado.", dispatch);
            return false;
         }
        
         if ( txtSenha === '') {
            listaProventosErro("Senha não informada.", dispatch);
            return false;
         }

         axios({ method: 'post',
              url: CONSTANTE.URL_PROVENTOS_GRID,
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
                    
                     //console.log('@TamoNaBolsa:Provento-Grid-Response:',response); 
                     //console.log('@TamoNaBolsa:Provento-Grid-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:Provento-Grid-Response.Data-typeof:', typeof(response.data));

                     let JSONString = response.data;

                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:Provento-Grid-JSONString:',JSONString); 

                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:Provento-Grid-JSONObj.Resultado:',Resultado); 

                     if (Resultado === "OK") {

                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:Provento-Grid-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:Provento-Grid-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                        
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:Provento-Grid-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:Provento-Grid-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 

                         let lista = JSONObjLista; 
                         listaProventosSucesso(lista, dispatch);
                         
                         //console.timeEnd('ProventosActions.buscaListaProventos');

                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaProventosErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:Provento-Grid-JSONObj.Mensagem:',Mensagem); 
                     }
                
                 } catch (error) {
                    listaProventosErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:Provento-Grid-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaProventosErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:Provento-Grid-Error',error); 
         });
      
     }
 }

 const listaProventosSucesso = (lista, dispatch) => {
     dispatch ({ type: ACTION.PROVENTO_FILTRO_SUCESSO, payload: { lista: lista } });
 }

 const listaProventosErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.PROVENTO_FILTRO_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------