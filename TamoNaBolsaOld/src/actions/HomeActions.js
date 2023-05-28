import axios from 'axios';

import * as ACTION from './TypesActions';
import * as CONSTANTE from '../util/Constante';
import * as HelperNumero from '../util/HelperNumero';

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

export const buscaListaFatos = (txtEmail, txtSenha) => {

    return dispatch => {
         
        dispatch({ type: ACTION.LISTA_FATOS_HOME_EM_ANDAMENTO });
 
        if ( txtEmail === '') {
            listaFatosErro("E-mail não informado.", dispatch);
            return false;
        }

        if ( txtSenha === '') {
            listaFatosErro("Senha não informada.", dispatch);
            return false;
        }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_LISTA_FATOS_HOME,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:HomeFatos-Response:',response); 
                     //console.log('@TamoNaBolsa:HomeFatos-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:HomeFatos-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:HomeFatos-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:HomeFatos-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:HomeFatos-JSONObj.JSONListaString:',JSONListaString ); 
                         //console.log('@TamoNaBolsa:HomeFatos-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         
                         //console.log('@TamoNaBolsa:HomeFatos-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:HomeFatos-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                         let lista = JSONObjLista;  
                         listaFatosSucesso(lista, dispatch);

                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         console.log('@TamoNaBolsa:HomeFatos-JSONObj.Mensagem:',Mensagem); 
                         listaFatosErro(Mensagem, dispatch);
                     }
                 
                 } catch (error) {
                    listaFatosErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                     console.log('@TamoNaBolsa:HomeFatos-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaFatosErro('Falha ao receber dados do Servidor.', dispatch);
             console.log('@TamoNaBolsa:HomeFatos-Error',error); 
         });
       
     }
 }

const listaFatosSucesso = (lista, dispatch) => {
    dispatch ({ type: ACTION.LISTA_FATOS_HOME_SUCESSO, payload: { lista: lista} });
}

const listaFatosErro = (erro, dispatch) => {
    dispatch ({ type: ACTION.LISTA_FATOS_HOME_ERRO, payload: { msgErro: erro } });
}


//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

export const buscaListaApuracaoC = (txtEmail, txtSenha) => {

    return dispatch => {
         
         dispatch({ type: ACTION.LISTA_APURACAO_HOME_EM_ANDAMENTO });
 
          if ( txtEmail === '') {
              listaApuracaoErro("E-mail não informado.", dispatch);
              return false;
          }
         
          if ( txtSenha === '') {
              listaApuracaoErro("Senha não informada.", dispatch);
              return false;
          }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_LISTA_APURACAO_HOME,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha, TpApuracao: 'C' }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:HomeApuracao-Response:',response); 
                     //console.log('@TamoNaBolsa:HomeApuracao-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:HomeApuracao-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:HomeApuracao-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.JSONListaString:',JSONListaString ); 
                         //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                         let lista = JSONObjLista;                         
                         listaApuracaoSucesso(lista, 'C', dispatch);
                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         console.log('@TamoNaBolsa:HomeApuracao-JSONObj.Mensagem:',Mensagem); 
                         listaApuracaoErro(Mensagem, dispatch);
                     }
                 
                 } catch (error) {
                     listaApuracaoErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                     console.log('@TamoNaBolsa:HomeApuracao-Catch',error); 
                 }
         })
         .catch( (error) => { 
             listaApuracaoErro('Falha ao receber dados do Servidor.', dispatch);
             console.log('@TamoNaBolsa:HomeApuracao-Error',error); 
         });
       
     }
 }
 
export const buscaListaApuracaoD = (txtEmail, txtSenha) => {

    return dispatch => {
         
         dispatch({ type: ACTION.LISTA_APURACAO_HOME_EM_ANDAMENTO });
 
          if ( txtEmail === '') {
              listaApuracaoErro("E-mail não informado.", dispatch);
              return false;
          }
         
          if ( txtSenha === '') {
              listaApuracaoErro("Senha não informada.", dispatch);
              return false;
          }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_LISTA_APURACAO_HOME,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha, TpApuracao: 'D' }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:HomeApuracao-Response:',response); 
                     //console.log('@TamoNaBolsa:HomeApuracao-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:HomeApuracao-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:HomeApuracao-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.JSONListaString:',JSONListaString ); 
                         //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:HomeApuracao-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                         let lista = JSONObjLista;                         
                         listaApuracaoSucesso(lista, "D", dispatch);
                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         console.log('@TamoNaBolsa:HomeApuracao-JSONObj.Mensagem:',Mensagem); 
                         listaApuracaoErro(Mensagem, dispatch);
                     }
                 
                 } catch (error) {
                     listaApuracaoErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                     console.log('@TamoNaBolsa:HomeApuracao-Catch',error); 
                 }
         })
         .catch( (error) => { 
             listaApuracaoErro('Falha ao receber dados do Servidor.', dispatch);
             console.log('@TamoNaBolsa:HomeApuracao-Error',error); 
         });
       
     }
 }

const listaApuracaoSucesso = (lista, TpApuracao, dispatch) => {
    if ( TpApuracao === 'C' )
        dispatch ({ type: ACTION.LISTA_APURACAO_C_HOME_SUCESSO, payload: { lista: lista} })
    else
        dispatch ({ type: ACTION.LISTA_APURACAO_D_HOME_SUCESSO, payload: { lista: lista} });
}

const listaApuracaoErro = (erro, dispatch) => {
    dispatch ({ type: ACTION.LISTA_APURACAO_HOME_ERRO, payload: { msgErro: erro } });
}

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

export const buscaListaOperacao = (txtEmail, txtSenha) => {

    return dispatch => {
         
         dispatch({ type: ACTION.LISTA_OPEERACAO_HOME_EM_ANDAMENTO });
 
         if ( txtEmail === '') {
             listaOperacaoErro("E-mail não informado.", dispatch);
             return false;
         }
         
         if ( txtSenha === '') {
             listaOperacaoErro("Senha não informada.", dispatch);
             return false;
         }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_LISTA_OPERACAO_HOME,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:HomeOperacao-Response:',response); 
                     //console.log('@TamoNaBolsa:HomeOperacao-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:HomeOperacao-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:HomeOperacao-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:HomeOperacao-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                        let JSONListaString = JSONObj.data.Lista;
                        //console.log('@TamoNaBolsa:HomeOperacao-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                        //console.log('@TamoNaBolsa:HomeOperacao-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                        let JSONObjLista = undefined;
                        if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                        if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                        //console.log('@TamoNaBolsa:HomeOperacao-JSONObj.JSONObjLista:',JSONObjLista );                
                        //console.log('@TamoNaBolsa:HomeOperacao-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                        let lista = JSONObjLista;
                         
                        let listaC = [];
                        let listaV = [];
                        let listaB = [];
                         
                        let totalC  = 0.00;
                        let totalV  = 0.00;
                        let totalB  = 0.00;

                         lista.map((item) => {  

                            let tipo = item[1];   
                            let tot  = parseFloat( HelperNumero.GetValorDecimal(item[5]) );        

                                 if ( tipo === 'C') listaC.push(item)
                            else if ( tipo === 'V') listaV.push(item)
                            else if ( tipo === 'B') listaB.push(item);
                                  
                                 if ( tipo === 'C') totalC += tot
                            else if ( tipo === 'V') totalV += tot
                            else if ( tipo === 'B') totalB += tot;

                        });

                         listaOperacaoSucesso(listaC, listaV, listaB, totalC, totalV, totalB, dispatch);
                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaOperacaoErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:HomeOperacao-JSONObj.Mensagem:',Mensagem); 
                     }
                 
                 } catch (error) {
                    listaOperacaoErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:HomeOperacao-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaOperacaoErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:HomeOperacao-Error',error); 
         });
       
     }
 }

 const listaOperacaoSucesso = (listaC, listaV, listaB, totalC, totalV, totalB, dispatch) => {
     dispatch ({ type: ACTION.LISTA_OPEERACAO_HOME_SUCESSO, payload: { listaC: listaC, listaV: listaV, listaB: listaB, totalC: totalC, totalV: totalV, totalB: totalB, } });
 }
 
 const listaOperacaoErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.LISTA_OPEERACAO_HOME_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

export const buscaListaProvento = (txtEmail, txtSenha) => {

    return dispatch => {

         dispatch({ type: ACTION.LISTA_PROVENTO_HOME_EM_ANDAMENTO });
 
         if ( txtEmail === '') {
             listaProventoErro("E-mail não informado.", dispatch);
             return false;
         }
         
         if ( txtSenha === '') {
             listaProventoErro("Senha não informada.", dispatch);
             return false;
         }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_LISTA_PROVENTO_HOME,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:HomeProvento-Response:',response); 
                     //console.log('@TamoNaBolsa:HomeProvento-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:HomeProvento-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:HomeProvento-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:HomeProvento-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:HomeProvento-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:HomeProvento-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:HomeProvento-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:HomeProvento-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 

                         let listaLocal = JSONObjLista; 
                         let lista      = [];
                         let listaItem  = [];

                         let TotalRec     = 0.00;
                         let Total        = 0.00;
                         let UltimoMesAno = "";
                         let MesAnoAtual  = "";

                         listaLocal.map((item) => { 

                            MesAnoAtual = item[0].substring(0, 6);
                                                
                            if ( UltimoMesAno == "" ) 
                                UltimoMesAno = MesAnoAtual;
                                                    
                            if ( UltimoMesAno != MesAnoAtual ){
                                lista.push( { title: 'MÊS '+UltimoMesAno.substring(4,6)+ "/" + UltimoMesAno.substring(0,4)+' - TOTAL R$ ' + HelperNumero.GetMascaraValorDecimal(Total), data: listaItem } ); 
                                UltimoMesAno = MesAnoAtual;
                                Total        = 0.00;
                                listaItem    = [];
                            }
                            TotalRec += parseFloat( HelperNumero.GetValorDecimal(item[5]) );
                            Total    += parseFloat( HelperNumero.GetValorDecimal(item[5]) );

                            if ( item[1] === 'D' )
                                listaItem.push( [ item[0], 'DIVIDENDOS', item[2], item[3], item[4], item[5] ] )
                            else if ( item[1] === 'J' )
                                listaItem.push( [ item[0], 'JRS CAP PRÓPRIO',       item[2], item[3], item[4], item[5] ] )
                            else if ( item[1] === 'R' )
                                listaItem.push( [ item[0], 'REST CAP DIN', item[2], item[3], item[4], item[5] ] );

                        });

                        lista.push( { title: 'MÊS '+UltimoMesAno.substring(4,6)+ "/" + UltimoMesAno.substring(0,4)+' - TOTAL R$ ' + HelperNumero.GetMascaraValorDecimal(Total), data: listaItem } ); 
                        listaProventoSucesso(lista, TotalRec, dispatch);

                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         console.log('@TamoNaBolsa:HomeProvento-JSONObj.Mensagem:',Mensagem); 
                         listaProventoErro(Mensagem, dispatch);
                     }
                 
                 } catch (error) {
                    listaProventoErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                     console.log('@TamoNaBolsa:HomeProvento-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaProventoErro('Falha ao receber dados do Servidor.', dispatch);
             console.log('@TamoNaBolsa:HomeProvento-Error',error); 
         });
       
     }
 }
 
 const listaProventoSucesso = (lista, total, dispatch) => {
     dispatch ({ type: ACTION.LISTA_PROVENTO_HOME_SUCESSO, payload: { lista: lista, total: total } });
 }
 
 const listaProventoErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.LISTA_PROVENTO_HOME_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

export const buscaListaCalendario = (txtEmail, txtSenha) => {

    return dispatch => {

         dispatch({ type: ACTION.LISTA_CALENDARIO_HOME_EM_ANDAMENTO });
 
         if ( txtEmail === '') {
            listaCalendarioErro("E-mail não informado.", dispatch);
             return false;
         }
         
         if ( txtSenha === '') {
            listaCalendarioErro("Senha não informada.", dispatch);
             return false;
         }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_LISTA_CALENDARIO_HOME,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:HomeCalendario-Response:',response); 
                     //console.log('@TamoNaBolsa:HomeCalendario-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:HomeCalendario-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:HomeCalendario-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:HomeCalendario-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:HomeCalendario-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:HomeCalendario-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined;
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;                         
                         //console.log('@TamoNaBolsa:HomeCalendario-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:HomeCalendario-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 

                         let lista = JSONObjLista;  
                         listaCalendarioSucesso(lista, dispatch);

                     } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         console.log('@TamoNaBolsa:HomeCalendario-JSONObj.Mensagem:',Mensagem); 
                         listaCalendarioErro(Mensagem, dispatch);
                     }
                 
                 } catch (error) {
                    listaCalendarioErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                     console.log('@TamoNaBolsa:HomeCalendario-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaCalendarioErro('Falha ao receber dados do Servidor.', dispatch);
             console.log('@TamoNaBolsa:HomeCalendario-Error',error); 
         });
       
     }
 }
 
 const listaCalendarioSucesso = (lista, dispatch) => {
     dispatch ({ type: ACTION.LISTA_CALENDARIO_HOME_SUCESSO, payload: { lista: lista} });
 }
 
 const listaCalendarioErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.LISTA_CALENDARIO_HOME_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------