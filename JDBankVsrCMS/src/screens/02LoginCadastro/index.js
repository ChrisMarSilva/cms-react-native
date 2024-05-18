import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView, Alert, } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';
import { connect } from 'react-redux';
import * as HelperLog from '../../util/HelperLog';
import * as HelperSessao from '../../util/HelperSessao';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/logo-red.png';
import imglogoJ3 from '../../imgs/logo-blue.png';
    
const ClassName = 'LoginCadastroScreen'; // this.constructor.name

class LoginCadastroScreen extends Component { 

   // state = { };

   constructor(props){
      super(props); 
       // HelperLog.entrada(`${ClassName}.constructor`);
      try {
         
         this.state = {
            txtIspb: CONSTANTE.ISPB_RECEBEDOR, 
            txtIspbNm: CONSTANTE.NOME_RECEBEDOR, 
            txtTipoPessoa: '0',
            txtDocumento: null,
            txtAgencia: null,
            txtConta: null,
            txtTipoConta: '0',
            txtNome: null,
            txtTipoChave: '0',
            txtChave: null,
            isLoadingCadastro: false,
          };

      }catch(err) {
         // HelperLog.erro(`${ClassName}.constructor`);
      }finally {
          // HelperLog.saida(`${ClassName}.constructor`);
      }
   }

   componentDidMount() {
      // HelperLog.entrada(`${ClassName}.componentDidMount`);
      try {

         // Somente para Teste
         //this.setState({ txtDocumento: '11111111111',txtAgencia: '0001',txtConta: '123456-7',txtNome: 'Fulano Teste Cadastro 01',txtChave: '+5511942120001',});

      }catch(err) {
         // HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}.componentDidMount`);
      }
   }

   _onPressLogin = async () => {
      // HelperLog.entrada(`${ClassName}._onPressLogin`);
      try {

         this.props.navigation.navigate('Login');

      }catch(err) {
         // HelperLog.erro(`${ClassName}._onPressLogin`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._onPressLogin`);
      }
   }

   _onPressCriaConta = async () => {
      // HelperLog.entrada(`${ClassName}._onPressCriaConta`);
      try {
         
         const txtIspb       = this.state.txtIspb;
         const txtIspbNm     = this.state.txtIspbNm;
         const txtTipoPessoa = this.state.txtTipoPessoa;
         const txtDocumento  = this.state.txtDocumento;
         const txtAgencia    = this.state.txtAgencia;
         const txtConta      = this.state.txtConta;
         const txtTipoConta  = this.state.txtTipoConta;
         const txtNome       = this.state.txtNome;
         const txtTipoChave  = this.state.txtTipoChave;
         const txtChave      = this.state.txtChave;

         if ( txtNome == null || txtNome == '' ) {
            Alert.alert('Informe o Nome...');
            return;
         }
         
         if ( txtDocumento == null || txtDocumento == '' ) {
            Alert.alert('Informe o CPF...');
            return;
         }
         
         if ( txtChave == null || txtChave == '' ) {
            Alert.alert('Informe o Telefone...');
            return;
         }
         
         if ( txtAgencia == null || txtAgencia == '' ) {
            Alert.alert('Informe a Agência...');
            return;
         }
         
         if ( txtConta == null || txtConta == '' ) {
            Alert.alert('Informe a Conta...');
            return;
         }
         
         this.setState({ isLoadingCadastro: true, });
         this._cadastrarChaveUsuario( txtIspb, txtIspbNm, txtTipoPessoa, txtDocumento, txtAgencia, txtConta, txtTipoConta, txtNome, txtTipoChave, txtChave );

      }catch(err) {
         Alert.alert('Erro(Geral): ' + err.messag);
         // HelperLog.erro(`${ClassName}._onPressCriaConta`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._onPressCriaConta`);
      }
   }
   
   _cadastrarChaveUsuario = async ( ispb, IspbNm, tipoPessoa, documento, agencia, conta, tipoConta, nome, tipoChave, chave ) => {
      // HelperLog.entrada(`${ClassName}._cadastrarChaveUsuario`);
      try {
           
         // const userURL       = await HelperSessao.GetUserURL()       || CONSTANTE.URL_PAGADOR;
         // const userIspb      = await HelperSessao.GetUserNomeBanco() || CONSTANTE.ISPB_PAGADOR;
         // const userNomeBanco = await HelperSessao.GetUserURL()       || CONSTANTE.NOME_PAGADOR;
         
         let userURL       = this.props.navigation.getParam('userURL',       CONSTANTE.URL_PAGADOR  );
         let userIspb      = this.props.navigation.getParam('userIspb',      CONSTANTE.ISPB_PAGADOR );
         let userNomeBanco = this.props.navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR );

         documento = documento.replace('.', '');
         documento = documento.replace('.', '');
         documento = documento.replace('-', ''); 
         documento = documento.replace(' ', '');

         chave = chave.replace('(', '');
         chave = chave.replace(')', '');
         chave = chave.replace('-', '');
         chave = chave.replace(' ', '');
         chave = chave.replace(' ', '');

         const data = JSON.parse(`{"recebedor":{"ispb":${ispb},"tipoPessoa":${tipoPessoa},"documento":${documento},"agencia":"${agencia}","conta":"${conta}","tipoConta":${tipoConta},"nome":"${nome}"},"tipoChave":${tipoChave},"chave":"${chave}"}`);
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'recebedor.ispb: '       + ispb                     );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'recebedor.IspbNm: '     + IspbNm                   );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'recebedor.tipoPessoa: ' + tipoPessoa               );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'recebedor.documento: '  + documento                );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'recebedor.agencia: '    + agencia                  );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'recebedor.conta: '      + conta                    );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'recebedor.tipoConta: '  + tipoConta                );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'recebedor.nome: '       + nome                     );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'tipoChave: '            + tipoChave                );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'chave: '                + chave                    );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'URL: '                  + userURL+ CONSTANTE.URL_POST_CHAVE );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'data: '                 + data                     );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'data: '                 + JSON.parse(data)         );
         // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'data: '                 + JSON.stringify({ data }) );

         axios({ 
            method: 'post',
            url: userURL + CONSTANTE.URL_POST_CHAVE,
            timeout: CONSTANTE.URL_TIMEOUT, 
            headers: { 'Content-Type': 'application/json; charset=utf-8' }, 
            data: data,
            })
         .then( (response) => { 
            this.setState({ isLoadingCadastro: false, });
            try {
               
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.response.data: '                   + response.data                   );
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.response.data.statusCode: '        + response.data.statusCode        );
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.response.data.message: '           + response.data.message           );
               /// HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.response.data.message.descricao: ' + response.data.message.descricao );

               if ( response.data.statusCode == '200'){
                  Alert.alert('Cadastro ralizado com Sucesso');
                  this._realizarLogin( chave, ispb, IspbNm, tipoPessoa, documento, agencia, conta, tipoConta, nome ); 
               }else{
                  Alert.alert('Erro(Cadastro): ' + response.data.statusCode+  ' - ' + response.data.message.descricao);
               }

            } catch (err) {
               Alert.alert('Erro(Response): ' + err.message); 
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.response: ' + err.message);
            }
         })
         .catch( (err) => { 
            this.setState({ isLoadingCadastro: false, });
            if (err.response) {
               Alert.alert( JSON.parse(err.response.data.message).descricao ); 
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err.response.status: '                 + err.response.data.status            );
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err.response.headers: '                + err.response.data.headers           );
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err.response.dada: '                   + err.response.data                   );
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err.response.dada.statusCode: '        + err.response.data.statusCode        );
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err.response.dada.message: '           + err.response.data.message           );
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err.response.dada.message.descricao: ' + JSON.parse(err.response.data.message).descricao );
            }
            else if (err.request) {
               Alert.alert('Erro na Requição'); 
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err.request: ' + err.request );
            }else {
               Alert.alert(err.message); 
               // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err.message: ' + err.message );
            }
            // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.err: ' + JSON.stringify(err) );
         })
         .finally(function () {
            // HelperLog.texto(`${ClassName}._onPressCriaConta`, 'axios.finally');
         });

      }catch(err) {
         this.setState({ isLoadingCadastro: false, });
         Alert.alert('Erro(Geral): ' + err.messag);
         // HelperLog.erro(`${ClassName}._cadastrarChaveUsuario`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._cadastrarChaveUsuario`);
      }
   }
   
   _realizarLogin = async ( chave, ispb, nomeBanco, tipoPessoa, documento, agencia, conta, tipoConta, nome ) => {
      // HelperLog.entrada(`${ClassName}._realizarLogin`);
      try {
            
         const userURL       = this.props.navigation.getParam('userURL',       CONSTANTE.URL_PAGADOR  );
         const userIspb      = this.props.navigation.getParam('userIspb',      CONSTANTE.ISPB_PAGADOR );
         const userNomeBanco = this.props.navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR );
         const userBGColor   = this.props.navigation.getParam('userBGColor',   CONSTANTE.BG_VERMELHO  );
         const userIcon      = this.props.navigation.getParam('userIcon',      CONSTANTE.ICON_PAGADOR );
         const cidade        = 'São Paulo';

         await HelperSessao.ClearAllSessao();

         await HelperSessao.SetUserURL(        userURL.toString()       );
         await HelperSessao.SetUserChave(      chave.toString()         );
         await HelperSessao.SetUserIspb(       userIspb.toString()      );
         await HelperSessao.SetUserNomeBanco(  userNomeBanco.toString() );
         await HelperSessao.SetUserTipoPessoa( tipoPessoa.toString()    );
         await HelperSessao.SetUserDocumento(  documento.toString()     );
         await HelperSessao.SetUserAgencia(    agencia.toString()       );
         await HelperSessao.SetUserConta(      conta.toString()         );
         await HelperSessao.SetUserTipoConta(  tipoConta.toString()     );
         await HelperSessao.SetUserNome(       nome.toString()          );
         await HelperSessao.SetUserCidade(     cidade.toString()        );
         await HelperSessao.SetUserBGColor(    userBGColor              );
         await HelperSessao.SetUserIcon(       userIcon                 );

         // const userURL        = await HelperSessao.GetUserURL();
         // const userChave      = await HelperSessao.GetUserChave();
         // const userIspb       = await HelperSessao.GetUserIspb();
         // const userNomeBanco  = await HelperSessao.GetUserNomeBanco();
         // const userTipoPessoa = await HelperSessao.GetUserTipoPessoa();
         // const userDocumento  = await HelperSessao.GetUserDocumento();
         // const userAgencia    = await HelperSessao.GetUserAgencia();
         // const userConta      = await HelperSessao.GetUserConta();
         // const userTipoConta  = await HelperSessao.GetUserTipoConta();
         // const userNome       = await HelperSessao.GetUserNome();
         // const userCidade     = await HelperSessao.GetUserCidade();
         // const userBGColor    = await HelperSessao.GetUserBGColor();
         // const userIcon       = await HelperSessao.GetUserIcon();

         this.setState({ isLoadingCadastro: false, });

         this.props.navigation.navigate('Home', {
            userURL        : userURL,
            userChave      : chave, 
            userIspb       : userIspb, 
            userNomeBanco  : userNomeBanco, 
            userTipoPessoa : tipoPessoa, 
            userDocumento  : documento, 
            userAgencia    : agencia, 
            userConta      : conta, 
            userTipoConta  : tipoConta, 
            userNome       : nome, 
            userCidade     : cidade, 
            userBGColor    : userBGColor,
            userIcon       : userIcon,
            userSaldo      : '0',
         });

      }catch(err) {
         // HelperLog.erro(`${ClassName}._realizarLogin`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._realizarLogin`);
      }
   }

   // fff8f8 // A52A2A
   render() {

      // HelperLog.texto(`${ClassName}.render`,'Call');
      // HelperLog.texto(`${ClassName}.render`,'navigation = ' + JSON.stringify(this.props.navigation));

      const { navigation }    = this.props;
      //const userNomeBanco     = navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR);
      const userBGColor       = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
      const userBGColorScreen = '#fff'; //userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FRACO : CONSTANTE.BG_AZUL_FRACO;
      const userlogo           = userBGColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3; 
    

      return(
         <View style={{ flex:1, backgroundColor: userBGColorScreen, }}>  
      
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'blue', }}>
               <Image source={userlogo} style={{ width: 190, height: 90, borderWidth: 0, borderColor: 'red',  }} />
               {/* <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 18, fontStyle: 'italic', marginTop: 10, marginBottom: 20, }}>{userNomeBanco}</Text> */}
            </View>   

            <KeyboardAvoidingView style={{ flex: 4, width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 0, borderColor: 'red', }} scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }} behavior="padding" enabled>

               <Text style={{ width: '95%', paddingTop: 5, fontSize: 18, color: userBGColor, textAlign: "center", fontWeight: 'bold', }}>Cadastro</Text>

               <TextInput 
                     ref='TextInputNome'
                     editable={true}
                    // autoFocus = {true}
                     placeholder="Nome" 
                     autoCapitalize={'none'} 
                     maxLength={100}
                     underlineColorAndroid='transparent'
                     returnKeyType = {"next"}
                     value={this.state.txtNome}
                     onChangeText={ (texto) => { this.setState({ txtNome: texto }); } }
                     onEndEditing={ () => { Keyboard.dismiss; }}
                     style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 5, width: '88%', height: 30, }} 
               />
               
               <TextInputMask 
                     ref='TextInputDocumento'
                     type={'cpf'} 
                     editable={true}
                     autoFocus = {false}
                     placeholder="CPF" 
                     maxLength={11}
                     autoCapitalize={'none'} 
                     underlineColorAndroid='transparent'
                     returnKeyType = {"next"}
                     value={this.state.txtDocumento}
                     onChangeText={ (texto) => { this.setState({ txtDocumento: texto }); } }
                     onEndEditing={ () => { Keyboard.dismiss; }}
                     style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 5, width: '88%', height: 30, }} 
               />
               
               <TextInputMask 
                     ref='TextInputChave'
                     type={'cel-phone'} 
                     autoFocus = {false}
                     editable={true}
                     placeholder="Telefone" 
                     autoCorrect={false} 
                     autoCapitalize={'none'} 
                     returnKeyType={'next'} 
                     underlineColorAndroid='transparent'
                     value={this.state.txtChave}
                     onChangeText={ (texto) => { this.setState({ txtChave: texto }); } }
                     onEndEditing={ () => { Keyboard.dismiss; }}
                     style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 5, width: '88%', height: 30, }} 
               />

               <View style={{ flexDirection: 'row', width: '88%', marginBottom: 10,  }}>

                  <TextInput 
                        ref='TextInputAgencia'
                        autoFocus = {false}
                        editable={true}
                        placeholder="Agência" 
                        maxLength={4}
                        autoCorrect={false} 
                        autoCapitalize={'none'} 
                        returnKeyType={'next'} 
                        keyboardType={'numeric'} 
                        underlineColorAndroid='transparent'
                        value={this.state.txtAgencia}
                        onChangeText={ (texto) => { this.setState({ txtAgencia: texto }); } }
                        onEndEditing={ () => { Keyboard.dismiss; }}
                        style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginRight: 20, marginTop: 5, marginBottom: 5, width: '35%', height: 30, }} 
                  />

                  <TextInput 
                        ref='TextInputConta'
                        autoFocus = {false}
                        editable={true}
                        placeholder="Conta" 
                        maxLength={20}
                        autoCorrect={false} 
                        autoCapitalize={'none'} 
                        returnKeyType={'done'} 
                        keyboardType={'number-pad'} 
                        underlineColorAndroid='transparent'
                        value={this.state.txtConta}
                        onChangeText={ (texto) => { this.setState({ txtConta: texto }); } }
                        onEndEditing={ () => { Keyboard.dismiss; }}
                        style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 6, width: '60%', height: 30, }} 
                  />
               </View>
               
               {
                  this.state.isLoadingCadastro
                  ? 
                     <ActivityIndicator color='#009688' size='large' tyle={{ color:'#fff', fontSize: 18, textAlign:'center', }} /> 
                  : 
                     <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 10, marginTop: 10, marginBottom:7, width: '95%',backgroundColor: userBGColor }} activeOpacity={0.7} onPress={ ()=>{ Keyboard.dismiss; this._onPressCriaConta(); }} >
                        <Text style={{ color:'#fff', fontSize: 18, textAlign:'center', }}>CADASTRAR</Text>
                     </TouchableOpacity>
               }

               <Text style={{ marginTop: 10, textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 16, color:'#6E7B8B', textAlign: "right", }} onPress={ ()=>{ this._onPressLogin(); }} >Voltar para Login</Text>

            </KeyboardAvoidingView>  

         </View>
      );
   }

}

const mapStateToProps = state => ({
  // txtEmail           : state.AuthReducer.txtEmail,
  // txtSenha           : state.AuthReducer.txtSenha, 
});

const mapDispatchToProps = { };

//export default LoginCadastroScreen;
export default connect(mapStateToProps, mapDispatchToProps)(LoginCadastroScreen);