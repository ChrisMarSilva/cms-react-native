import { AsyncStorage, } from 'react-native';
import axios from 'axios';

import * as ACTION from './TypesActions';
import * as CONSTANTE from '../util/Constante';
import * as HelperNumero from '../util/HelperNumero';

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaPortfolio = (txtEmail, txtSenha) => {

   return dispatch => {
        
        dispatch({ type: ACTION.PORTFOLIO_GRID_EM_ANDAMENTO });

        if ( txtEmail === '') {
            listaPortfolioErro("E-mail não informado.", dispatch);
            return false;
        }
        
        if ( txtSenha === '') {
            listaPortfolioErro("Senha não informada.", dispatch);
            return false;
        }

        axios({ method: 'post',
             url: CONSTANTE.URL_PORTFOLIO_GRIDCOMPLETA,
             responseType: 'text',
             headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
             timeout: CONSTANTE.URL_TIMEOUT, 
             data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
         })
        .then( (response) => { 
                try {
                    
                    //console.log('@TamoNaBolsa:Portfolio-Response:',response); 
                    //console.log('@TamoNaBolsa:Portfolio-Response.Data:',response.data); 
                    //console.log('@TamoNaBolsa:Portfolio-Response.Data-typeof:', typeof(response.data));

                    let JSONString = response.data;

                    let JSONObj = undefined;
                    if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                    if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                    //console.log('@TamoNaBolsa:Portfolio-JSONString:',JSONString); 

                    let Resultado = JSONObj.data.Resultado; 
                    //console.log('@TamoNaBolsa:Portfolio-JSONObj.Resultado:',Resultado); 

                    if (Resultado === "OK") {

                        let JSONListaString = JSONObj.data.Lista;
                        //console.log('@TamoNaBolsa:Portfolio-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                        //console.log('@TamoNaBolsa:Portfolio-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                        
                        let JSONObjLista = undefined; 
                        if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                        if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;
                        //console.log('@TamoNaBolsa:Portfolio-JSONObj.JSONObjLista:',JSONObjLista );                
                        //console.log('@TamoNaBolsa:Portfolio-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 

                        let lista = JSONObjLista; //JSONObjLista[0] 
                        listaPortfolioSucesso(lista, dispatch);

                     } else {
                        let Mensagem = JSONObj.data.Mensagem;
                        listaPortfolioErro(Mensagem, dispatch);
                        console.log('@TamoNaBolsa:Portfolio-JSONObj.Mensagem:',Mensagem); 
                    }
                
                } catch (error) {
                    listaPortfolioErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                    console.log('@TamoNaBolsa:Portfolio-Catch',error); 
                }
        })
        .catch( (error) => { 
            listaPortfolioErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:Portfolio-Error',error); 
        });
      
    }
}

const listaPortfolioSucesso = (lista, dispatch) => {
    dispatch ({ type: ACTION.PORTFOLIO_GRID_SUCESSO, payload: { lista: lista } });
}

const listaPortfolioErro = (erro, dispatch) => {
    dispatch ({ type: ACTION.PORTFOLIO_GRID_ERRO, payload: { msgErro: erro } });
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaPortfolioAtivos = (txtEmail, txtSenha, txtIdPortf) => {

    return dispatch => {
         
         dispatch({ type: ACTION.PORTFOLIO_ATIVO_GRID_EM_ANDAMENTO });

        //  console.log('@TamoNaBolsa:PortfolioAtivo-txtEmail:',txtEmail); 
        //  console.log('@TamoNaBolsa:PortfolioAtivo-txtSenha:',txtSenha); 
        //  console.log('@TamoNaBolsa:PortfolioAtivo-txtIdPortf:',txtIdPortf); 
 
         if ( txtEmail === '') {
             listaPortfolioAtivosErro("E-mail não informado.", dispatch);
             return false;
         }
         
         if ( txtSenha === '') {
            listaPortfolioAtivosErro("Senha não informada.", dispatch);
             return false;
         }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_PORTFOLIO_GRID,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha, IdPortfolio: txtIdPortf }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:PortfolioAtivo-Response:',response); 
                     //console.log('@TamoNaBolsa:PortfolioAtivo-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:PortfolioAtivo-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:PortfolioAtivo-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:PortfolioAtivo-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                         let JSONListaString = JSONObj.data.Lista;
                         //console.log('@TamoNaBolsa:PortfolioAtivo-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                         //console.log('@TamoNaBolsa:PortfolioAtivo-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                         let JSONObjLista = undefined; 
                         if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                         if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;
                         //console.log('@TamoNaBolsa:PortfolioAtivo-JSONObj.JSONObjLista:',JSONObjLista );                
                         //console.log('@TamoNaBolsa:PortfolioAtivo-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                         let lista = JSONObjLista; //JSONObjLista[0] 
                         listaPortfolioAtivosSucesso(lista, dispatch);
                         
                      } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaPortfolioAtivosErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:PortfolioAtivo-JSONObj.Mensagem:',Mensagem); 
                     }
                 
                 } catch (error) {
                    listaPortfolioAtivosErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                     console.log('@TamoNaBolsa:PortfolioAtivo-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaPortfolioAtivosErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:PortfolioAtivo-Error',error); 
         });
       
     }
 }
 
 const listaPortfolioAtivosSucesso = (lista, dispatch) => {
     dispatch ({ type: ACTION.PORTFOLIO_ATIVO_GRID_SUCESSO, payload: { lista: lista } });
 }
 
 const listaPortfolioAtivosErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.PORTFOLIO_ATIVO_GRID_ERRO, payload: { msgErro: erro } });
 }
 
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaPortfolioValorizDia = (txtEmail, txtSenha, txtIdPortf) => {

    return dispatch => {
         
         dispatch({ type: ACTION.PORTFOLIO_VALORIZDIA_GRID_EM_ANDAMENTO });

        //  console.log('@TamoNaBolsa:PortfolioValorizDia-txtEmail:',txtEmail); 
        //  console.log('@TamoNaBolsa:PortfolioValorizDia-txtSenha:',txtSenha); 
        //  console.log('@TamoNaBolsa:PortfolioValorizDia-txtIdPortf:',txtIdPortf); 

         if ( txtEmail === '') {
            listaPortfolioValorizDiaErro("E-mail não informado.", dispatch);
             return false;
         }
         
         if ( txtSenha === '') {
            listaPortfolioValorizDiaErro("Senha não informada.", dispatch);
             return false;
         }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_VALORIZDIA_GRID,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha, IdPortfolio: txtIdPortf }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:PortfolioValorizDia-Response:',response); 
                     //console.log('@TamoNaBolsa:PortfolioValorizDia-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:PortfolioValorizDia-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:PortfolioValorizDia-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:PortfolioValorizDia-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                        let JSONListaString = JSONObj.data.Lista;
                        //console.log('@TamoNaBolsa:PortfolioValorizDia-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                        //console.log('@TamoNaBolsa:PortfolioValorizDia-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                        let JSONObjLista = undefined; 
                        if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                        if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;
                        //console.log('@TamoNaBolsa:PortfolioValorizDia-JSONObj.JSONObjLista:',JSONObjLista );                
                        //console.log('@TamoNaBolsa:PortfolioValorizDia-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                        let lista    = JSONObjLista; //JSONObjLista[0] 
                        let total    = 0.00;
                        let datahora = '';
                         
                        lista.map((item) => { 
                            let quant   = parseInt(   HelperNumero.GetValorInteiro(item[1]) );
                            let valoriz = parseFloat( HelperNumero.GetValorDecimal(item[3]) );
                            total += parseFloat( quant * valoriz );
                        });

						lista.sort(function(a, b){
							
							//var ValorA       = 0.00; 
							//var QtdeA        = parseFloat( HelperNumero.GetValorInteiro( a[1] ) ); // 1-Quant
							var ValValorizA  = parseFloat( HelperNumero.GetValorDecimal( a[3] ) ); // 3-Valorização(R$)
							var PercValorizA = parseFloat( HelperNumero.GetValorDecimal( a[4] ) ); // 4-Valorização(%)
							
							//var ValorA       = 0.00; 
							//var QtdeB        = parseFloat( HelperNumero.GetValorInteiro( b[1] ) ); // 1-Quant
							var ValValorizB  = parseFloat( HelperNumero.GetValorDecimal( b[3] ) ); // 3-Valorização(R$)
							var PercValorizB = parseFloat( HelperNumero.GetValorDecimal( b[4] ) ); // 4-Valorização(%)
							
							if ( ValValorizA < 0.00 && PercValorizA > 0.00 ) PercValorizA = PercValorizA * -1;
							if ( ValValorizB < 0.00 && PercValorizB > 0.00 ) PercValorizB = PercValorizB * -1;
							
							if(PercValorizA== PercValorizB) return 0;
							return PercValorizA> PercValorizB? 1: -1;
						});
						
						lista.reverse();

                        let data    = new Date();
                        let dia     = ("0" + data.getDate()).substr(-2);
                        let mes     = ("0" + (data.getMonth() + 1)).substr(-2) ;
                        let ano     = data.getFullYear();
                        let hora    = ("0" + data.getHours()).substr(-2);
                        let minuto  = ("0" + data.getMinutes()).substr(-2);
                        let segundo = ("0" + data.getSeconds()).substr(-2);
                        datahora = dia+'/'+mes+'/'+ano+' as '+hora+':'+minuto+':'+segundo;

                         listaPortfolioValorizDiaSucesso(lista, total, datahora, dispatch);

                      } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaPortfolioValorizDiaErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:PortfolioValorizDia-JSONObj.Mensagem:',Mensagem); 
                     }
                 
                 } catch (error) {
                    listaPortfolioValorizDiaErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                     console.log('@TamoNaBolsa:PortfolioValorizDia-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaPortfolioValorizDiaErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:PortfolioValorizDia-Error',error); 
         });
       
     }
 }
 
 const listaPortfolioValorizDiaSucesso = (lista, total, datahora, dispatch) => {
     dispatch ({ type: ACTION.PORTFOLIO_VALORIZDIA_GRID_SUCESSO, payload: { lista: lista, total: total, datahora: datahora } });
 }
 
 const listaPortfolioValorizDiaErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.PORTFOLIO_VALORIZDIA_GRID_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

export const buscaPortfolioRadar = (txtEmail, txtSenha) => {

    return dispatch => {
         
         dispatch({ type: ACTION.PORTFOLIO_RADAR_GRID_EM_ANDAMENTO });

        //  console.log('@TamoNaBolsa:PortfolioRadar-txtEmail:',txtEmail); 
        //  console.log('@TamoNaBolsa:PortfolioRadar-txtSenha:',txtSenha); 

         if ( txtEmail === '') {
            listaPortfolioRadarErro("E-mail não informado.", dispatch);
             return false;
         }
         
         if ( txtSenha === '') {
            listaPortfolioRadarErro("Senha não informada.", dispatch);
             return false;
         }
 
         axios({ method: 'post',
              url: CONSTANTE.URL_RADAR_GRID,
              responseType: 'text',
              headers: { 'Content-Type': 'application/json' }, 
             //headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/text charset=utf-8' },
              timeout: CONSTANTE.URL_TIMEOUT, 
              data: JSON.stringify({ txtEmail: txtEmail, txtSenha: txtSenha }),
          })
         .then( (response) => { 
                 try {
                     
                     //console.log('@TamoNaBolsa:PortfolioRadar-Response:',response); 
                     //console.log('@TamoNaBolsa:PortfolioRadar-Response.Data:',response.data); 
                     //console.log('@TamoNaBolsa:PortfolioRadar-Response.Data-typeof:', typeof(response.data));
 
                     let JSONString = response.data;
 
                     let JSONObj = undefined;
                     if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                     if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                     //console.log('@TamoNaBolsa:PortfolioRadar-JSONString:',JSONString); 
 
                     let Resultado = JSONObj.data.Resultado; 
                     //console.log('@TamoNaBolsa:PortfolioRadar-JSONObj.Resultado:',Resultado); 
 
                     if (Resultado === "OK") {
 
                        let JSONListaString = JSONObj.data.Lista;
                        //console.log('@TamoNaBolsa:PortfolioRadar-JSONObj.JSONListaString:',JSONListaString ); //,JSON.stringify(Lista)
                        //console.log('@TamoNaBolsa:PortfolioRadar-JSONObj.JSONListaString-typeof:', typeof(JSONListaString));
                         
                        let JSONObjLista = undefined; 
                        if( typeof(JSONListaString) === 'string') JSONObjLista = JSON.parse( JSONListaString.trim() );
                        if( typeof(JSONListaString) === 'object') JSONObjLista = JSONListaString;
                        //console.log('@TamoNaBolsa:PortfolioRadar-JSONObj.JSONObjLista:',JSONObjLista );                
                        //console.log('@TamoNaBolsa:PortfolioRadar-JSONObj.JSONObjLista.data:',JSONObjLista[0] ); 
 
                        let lista = JSONObjLista; //JSONObjLista[0] 

                        lista.sort(function(a, b){
							
							let CodAtivoA    = a[0]; // 0-CODIGO  
							let ValValorizA  = parseFloat( HelperNumero.GetValorDecimal( a[2] ) ); // 2-Valorização(R$)
							let PercValorizA = parseFloat( HelperNumero.GetValorDecimal( a[3] ) ); // 3-Valorização(%)
							
							let CodAtivoB    = b[0];   // 0-CODIGO
							let ValValorizB  = parseFloat( HelperNumero.GetValorDecimal( b[2] ) ); // 2-Valorização(R$)
							let PercValorizB = parseFloat( HelperNumero.GetValorDecimal( b[3] ) ); // 3-Valorização(%)
							
							if ( ValValorizA < 0.00 && PercValorizA > 0.00 ) PercValorizA = PercValorizA * -1;
							if ( ValValorizB < 0.00 && PercValorizB > 0.00 ) PercValorizB = PercValorizB * -1;

							//if(CodAtivoA    == 'IBOV') return 1;
							//if(CodAtivoB    == 'IBOV') return 1;
							if(PercValorizA == PercValorizB) return 0;
							return PercValorizA > PercValorizB? 1: -1;
						});
						
						lista.reverse();
                        
                        let datahora = '';
                        let data    = new Date();
                        let dia     = ("0" + data.getDate()).substr(-2);
                        let mes     = ("0" + (data.getMonth() + 1)).substr(-2) ;
                        let ano     = data.getFullYear();
                        let hora    = ("0" + data.getHours()).substr(-2);
                        let minuto  = ("0" + data.getMinutes()).substr(-2);
                        let segundo = ("0" + data.getSeconds()).substr(-2);
                        datahora = dia+'/'+mes+'/'+ano+' as '+hora+':'+minuto+':'+segundo;

                        listaPortfolioRadarSucesso(lista, datahora, dispatch);

                      } else {
                         let Mensagem = JSONObj.data.Mensagem;
                         listaPortfolioRadarErro(Mensagem, dispatch);
                         console.log('@TamoNaBolsa:PortfolioRadar-JSONObj.Mensagem:',Mensagem); 
                     }
                 
                 } catch (error) {
                    listaPortfolioRadarErro('Houve um erro inesperado, por favor, tente novamente.', dispatch);
                     console.log('@TamoNaBolsa:PortfolioRadar-Catch',error); 
                 }
         })
         .catch( (error) => { 
            listaPortfolioRadarErro('Falha ao receber dados do Servidor.', dispatch);
            console.log('@TamoNaBolsa:PortfolioRadar-Error',error); 
         });
       
     }
 }
 
 const listaPortfolioRadarSucesso = (lista, datahora, dispatch) => {
     dispatch ({ type: ACTION.PORTFOLIO_RADAR_GRID_SUCESSO, payload: { lista: lista, datahora: datahora } });
 }
 
 const listaPortfolioRadarErro = (erro, dispatch) => {
     dispatch ({ type: ACTION.PORTFOLIO_RADAR_GRID_ERRO, payload: { msgErro: erro } });
 }

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------