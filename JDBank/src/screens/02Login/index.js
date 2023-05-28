import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView, Alert, BackHandler, Platform, AsyncStorage, } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import axios from 'axios';
import * as HelperLog from '../../util/HelperLog';
import * as HelperSessao from '../../util/HelperSessao';
import * as CONSTANTE    from '../../util/Constante';
import { modificaChave, modificaMsgLogin, loginAutenticar, } from '../../actions/AuthActions';
//import styles from './styles';
import { Audio } from 'expo-av'; 

import imglogoJD from '../../imgs/logo-red.png';
import imglogoJ3 from '../../imgs/logo-blue.png';

const ClassName = 'LoginScreen'; // this.constructor.name
   
class LoginScreen extends Component { 
   
   //state = { };

   constructor(props){
      super(props); 
      // HelperLog.entrada(`${ClassName}.constructor`);
      try {
         
         this.state = { txtChave: '', isLoadingLogin: false, };
         //this._backButtonClick = this._backButtonClick.bind(this);
         this._verificarSessaoUsuario();

      }catch(err) {
         // HelperLog.erro(`${ClassName}.constructor`);
      }finally {
         // HelperLog.saida(`${ClassName}.constructor`);
      }
   }

   componentDidMount() {
      //HelperLog.entrada(`${ClassName}.componentDidMount`);
      try {

         // this.setState({ });
         //this._verificarSessaoUsuario();

         //if (Platform.OS === 'android'){
             //BackHandler.addEventListener('hardwareBackPress', this._backButtonClick);
            //BackHandler.addEventListener('hardwareBackPress', () => true ); // Cancelar BtnGoBack
        // }
  

      }catch(err) {
         // HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
      }finally {
         //HelperLog.saida(`${ClassName}.componentDidMount`);
      }
   }
   
   componentWillUnmount() {
      //HelperLog.entrada(`${ClassName}.componentWillUnmount`);
      try {

         //if (Platform.OS === 'android'){
            //BackHandler.removeEventListener('hardwareBackPress', this._backButtonClick);
            //BackHandler.remove();
         //}

      }catch(err) {
         // HelperLog.erro(`${ClassName}.componentWillUnmount`, err.message);
      }finally {
         //HelperLog.saida(`${ClassName}.componentWillUnmount`);
      }
   }
   
   _backButtonClick = () => {
      //if(this.props.navigation ){ // && this.props.navigation.goBack

      //HelperLog.texto(`${ClassName}.render`,'props = ' + JSON.stringify(this.props));
      
         //HelperLog.texto(`${ClassName}.render`,'index = ' + this.props.navigation.state.index);

         //const currentRouteKey = this.props.navigation.state.routes[this.props.navigation.state.index].key;
         //HelperLog.texto(`${ClassName}.render`,'currentRouteKey = ' + currentRouteKey);

         //Alert.alert( this.props.navigation.state.routeName );
       //  if ( this.props.navigation.state.routeName == 'Login' || this.props.navigation.state.routeName == 'Splash')
        //    return true;  
     // }
      //return false; 
   }

   _verificarSessaoUsuario = async () => {
      // HelperLog.entrada(`${ClassName}._verificarSessaoUsuario`);
      try {
         
         // const userChave = this.props.navigation.getParam('userChave', '');
         // this.setState({ txtChave: userChave, });  
                  
         AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ICON).then(    (value) => this.props.navigation.setParams({ userIcon      : value, }) );
         AsyncStorage.getItem(CONSTANTE.SESSAO_USER_BGCOLOR).then( (value) => this.props.navigation.setParams({ userBGColor   : value, }) );
         AsyncStorage.getItem(CONSTANTE.SESSAO_USER_CHAVE).then(   (value) => this.setState({                   txtChave      : value, }) );
         //AsyncStorage.getItem(CONSTANTE.SESSAO_USER_CHAVE).then(   (value) => this.props.modificaChave(         value                   ) );
         AsyncStorage.getItem(CONSTANTE.SESSAO_USER_URL).then(     (value) => this.props.navigation.setParams({ userURL       : value, }) );
         AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ISPB_IF).then( (value) => this.props.navigation.setParams({ userIspb      : value, }) );
         AsyncStorage.getItem(CONSTANTE.SESSAO_USER_NOME_IF).then( (value) => this.props.navigation.setParams({ userNomeBanco : value, }) );

         //if ( txtUserChave !== null && txtUserChave !== '' ) {
            // this.setState({ isLoadingLogin: true, });
            // this._validarChaveUsuario(txtUserChave);
         //}

      }catch(err) {
         // HelperLog.erro(`${ClassName}._verificarSessaoUsuario`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._verificarSessaoUsuario`);
      }
   }

   _validarChaveUsuario = async ( userChave ) => {
      // HelperLog.entrada(`${ClassName}._validarChaveUsuario`);
      try {

         userChave = userChave.replace('( ', '');
         userChave = userChave.replace(') ', '');
         userChave = userChave.replace('(', '');
         userChave = userChave.replace(')', '');
         userChave = userChave.replace('-', '');
         userChave = userChave.replace(' ', '');
         userChave = userChave.replace(' ', '');

         const userURL = this.props.navigation.getParam('userURL', CONSTANTE.URL_PAGADOR);
         const URL     = userURL + CONSTANTE.URL_GET_CHAVE + '?chave='+encodeURIComponent( escape( userChave ) );

         //HelperLog.texto(`${ClassName}._validarChaveUsuario`, 'userChave: "' + userChave +'"');
         //HelperLog.texto(`${ClassName}._validarChaveUsuario`, 'URL: "' + userURL +'"');
         
         // HelperLog.entrada(`${ClassName}._validarChaveUsuario.axios`);

         axios({ 
            method: 'get',
            url: URL,
            timeout: CONSTANTE.URL_TIMEOUT, 
            headers: { 'Content-Type': 'application/json; charset=utf-8' }, 
            })
         .then( (response) => { 
            // this.setState({ isLoadingLogin: false, });
            try {

               //HelperLog.texto(`${ClassName}._validarChaveUsuario.axios, 'response`);
               //HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.response '+ JSON.stringify(response));
               //HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.response.data '+ JSON.stringify(response.data));
               
               const ispb       = response.data.ispb;
               const nomeBanco  = response.data.nomeBanco;
               const tipoPessoa = response.data.tipoPessoa;
               const documento  = response.data.documento;
               const agencia    = response.data.agencia;
               const conta      = response.data.conta;
               const tipoConta  = response.data.tipoConta;
               const nome       = response.data.nome;

               const userIspb = this.props.navigation.getParam('userIspb', CONSTANTE.ISPB_PAGADOR );
         	   //HelperLog.texto(`${ClassName}._validarChaveUsuario`, 'userIspb: "' + userIspb +'"');
         	   //HelperLog.texto(`${ClassName}._validarChaveUsuario`, 'ispb: "' + ispb +'"');

               if ( ispb != userIspb ) { // Chave Encontrada - Validar se a Chave pertence ao mesmo Banco do Link JD ou J3
                  this.setState({ isLoadingLogin: false, });
                  Alert.alert( 'Telefone não pertence ao Banco - ' + userChave );
                  return false;
               }

               this._realizarLogin( userChave, ispb, nomeBanco, tipoPessoa, documento, agencia, conta, tipoConta, nome );               

            } catch (err) {
               this.setState({ isLoadingLogin: false, });
               Alert.alert('Erro(Response): ' + err.message); 
            }
         })
         .catch( (err) => {  
            this.setState({ isLoadingLogin: false, });
            Alert.alert( 'Telefone não cadastrado - ' + userChave ); 
            // this.setState({ isLoadingCadastro: false, });
            // if (err.response) {
            //    Alert.alert( JSON.parse(err.response.data.message).descricao ); 
            //    HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err.response.status: '                 + err.response.data.status            );
            //    HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err.response.headers: '                + err.response.data.headers           );
            //    HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err.response.dada: '                   + err.response.data                   );
            //    HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err.response.dada.statusCode: '        + err.response.data.statusCode        );
            //    HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err.response.dada.message: '           + err.response.data.message           );
            //    HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err.response.dada.message.descricao: ' + JSON.parse(err.response.data.message).descricao );
            // }
            // else if (err.request) {
            //    Alert.alert('Erro na Requição'); 
            //    HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err.request: ' + err.request );
            // }else {
            //    Alert.alert(err.message); 
            //    HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err.message: ' + err.message );
            // }
            // HelperLog.texto(`${ClassName}._validarChaveUsuario.axios`, 'axios.err: ' + JSON.stringify(err) );
         })
         .finally(function () {
            // this.setState({ isLoadingLogin: false, });
            // HelperLog.saida(`${ClassName}._validarChaveUsuario.axios`);
         });

      }catch(err) {
         this.setState({ isLoadingLogin: false, });
         Alert.alert('Erro(Geral): ' + err.message);
         // HelperLog.erro(`${ClassName}._validarChaveUsuario`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._validarChaveUsuario`);
      }
   }

   _realizarLogin = async ( chave, ispb, nomeBanco, tipoPessoa, documento, agencia, conta, tipoConta, nome ) => {
      //HelperLog.entrada(`${ClassName}._realizarLogin`);
      try {            
         
         const userURL        = this.props.navigation.getParam('userURL',       CONSTANTE.URL_PAGADOR  );
         const userIspb       = this.props.navigation.getParam('userIspb',      CONSTANTE.ISPB_PAGADOR );
         const userNomeBanco  = this.props.navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR );
         const userBGColor    = this.props.navigation.getParam('userBGColor',   CONSTANTE.BG_VERMELHO  );
         const userIcon       = this.props.navigation.getParam('userIcon',      CONSTANTE.ICON_PAGADOR );
         const cidade         = 'São Paulo';         
       
         // await HelperSessao.ClearAllSessao();
         await HelperSessao.SetUserURL(        userURL.toString()       );
         await HelperSessao.SetUserChave(      chave.toString()         );
         await HelperSessao.SetUserIspb(       userIspb.toString()      );
         await HelperSessao.SetUserNomeBanco(  userNomeBanco.toString() );
         // await HelperSessao.SetUserTipoPessoa( tipoPessoa.toString()    );
         // await HelperSessao.SetUserDocumento(  documento.toString()     );
         // await HelperSessao.SetUserAgencia(    agencia.toString()       );
         // await HelperSessao.SetUserConta(      conta.toString()         );
         // await HelperSessao.SetUserTipoConta(  tipoConta.toString()     );
         // await HelperSessao.SetUserNome(       nome.toString()          );
         // await HelperSessao.SetUserCidade(     cidade.toString()        );
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
         // const userIcon       = await HelperSessao.GetUserBGColor();

         this.setState({ isLoadingLogin: false, });

        // this.props.modificaChave(chave);

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
         //HelperLog.erro(`${ClassName}._realizarLogin`, err.message);
      }finally {
         //HelperLog.saida(`${ClassName}._realizarLogin`);
      }
   }

   _onPressLogin = async () => {
      //HelperLog.entrada(`${ClassName}._onPressLogin`);
      try {

         const txtUserChave = this.state.txtChave; 
         // // HelperLog.texto(`${ClassName}._onPressLogin`,'txtUserChave: ' + txtUserChave);

         if ( txtUserChave !== null && txtUserChave !== '' ) {
            this.setState({ isLoadingLogin: true, });
            this._validarChaveUsuario(txtUserChave);
         }else{
            Alert.alert('Informe o Telefone...');
         }
            
      }catch(err) {
         //HelperLog.erro(`${ClassName}._onPressLogin`, err.message);
      }finally {
         //HelperLog.saida(`${ClassName}._onPressLogin`);
      }
   }

   _onPressCadastro = async () => {
      //HelperLog.entrada(`${ClassName}._onPressCadastro`);
      try {
         
         this.setState({ txtChave: '', isLoadingLogin: false, });

         let userURL       = this.props.navigation.getParam('userURL',       CONSTANTE.URL_PAGADOR  );
         let userIspb      = this.props.navigation.getParam('userIspb',      CONSTANTE.ISPB_PAGADOR );
         let userNomeBanco = this.props.navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR );
         let userBGColor   = this.props.navigation.getParam('userBGColor',   CONSTANTE.BG_VERMELHO  );
         let userIcon      = this.props.navigation.getParam('userIcon',      CONSTANTE.ICON_PAGADOR );

         this.props.navigation.navigate('Cadastro', { 
            userURL        : userURL, 
            userIspb       : userIspb, 
            userNomeBanco  : userNomeBanco, 
            userBGColor    : userBGColor, 
            userIcon       : userIcon, 
         });
            
      }catch(err) {
         //HelperLog.erro(`${ClassName}._onPressCadastro`, err.message);
      }finally {
         //HelperLog.saida(`${ClassName}._onPressCadastro`);
      };
   }
   
   _onPressAlterarCorApp = async () => {
      // HelperLog.entrada(`${ClassName}._onPressAlterarCorApp`);
      try {
               
         //let userBGColor  = await HelperSessao.GetUserBGColor() || CONSTANTE.BG_VERMELHO;
         
         let userURL       = this.props.navigation.getParam('userURL',       CONSTANTE.URL_PAGADOR  );
         let userIspb      = this.props.navigation.getParam('userIspb',      CONSTANTE.ISPB_PAGADOR );
         let userNomeBanco = this.props.navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR );
         let userBGColor   = this.props.navigation.getParam('userBGColor',   CONSTANTE.BG_VERMELHO  );
         let userIcon      = this.props.navigation.getParam('userIcon',      CONSTANTE.ICON_PAGADOR );

         if ( userBGColor == CONSTANTE.BG_VERMELHO ) {
            userURL       =  CONSTANTE.URL_RECEBEDOR;
            userIspb      =  CONSTANTE.ISPB_RECEBEDOR;
            userNomeBanco =  CONSTANTE.NOME_RECEBEDOR;
            userBGColor   =  CONSTANTE.BG_AZUL;
            userIcon      =  CONSTANTE.ICON_RECEBEDOR;
         }else{
            userURL       =  CONSTANTE.URL_PAGADOR;
            userIspb      =  CONSTANTE.ISPB_PAGADOR;
            userNomeBanco =  CONSTANTE.NOME_PAGADOR;
            userBGColor   =  CONSTANTE.BG_VERMELHO;
            userIcon      =  CONSTANTE.ICON_PAGADOR;
         }

         this.props.navigation.setParams({
            userURL       : userURL, 
            userIspb      : userIspb, 
            userNomeBanco : userNomeBanco, 
            userBGColor   : userBGColor, 
            userIcon      : userIcon, 
         });

         await HelperSessao.SetUserURL(       userURL       );
         await HelperSessao.SetUserIspb(      userIspb      );
         await HelperSessao.SetUserNomeBanco( userNomeBanco );
         await HelperSessao.SetUserBGColor(   userBGColor   );
         await HelperSessao.SetUserIcon(      userIcon      );

      }catch(err) {
         // HelperLog.erro(`${ClassName}._onPressAlterarCorApp`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._onPressAlterarCorApp`);
      };
   }
   
   render() {

      // HelperLog.texto(`${ClassName}.render`,'Call');
      //HelperLog.texto(`${ClassName}.render`,'navigation = ' + JSON.stringify(this.props.navigation));

      const { navigation }    = this.props;
      //const userURL           = navigation.getParam('userURL',       CONSTANTE.URL_PAGADOR  );
      //const userIspb          = navigation.getParam('userIspb',      CONSTANTE.ISPB_PAGADOR );
      //const userNomeBanco     = navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR );
      const userBGColor       = navigation.getParam('userBGColor',   CONSTANTE.BG_VERMELHO  );
      //const userIcon          = navigation.getParam('userIcon',      CONSTANTE.ICON_PAGADOR );
      const userBGColorScreen = '#fff'; //userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FRACO : CONSTANTE.BG_AZUL_FRACO;
      const userlogo           = userBGColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3; 

      return(
         <View style={{ flex: 1, backgroundColor: userBGColorScreen, }}>

            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 30, borderWidth: 0, borderColor: 'blue', }}>

               <TouchableOpacity style={{ borderWidth: 0, borderColor: 'red',}} onPress={()=>this._onPressAlterarCorApp()}>
                  <Image source={userlogo} style={{ resizeMode: 'contain', width: 200, height: 100, borderWidth: 0, borderColor: 'red',  }} />
               </TouchableOpacity>
               
               {/* <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 25, fontStyle: 'italic', marginTop: 10, marginBottom: 20, }}>{CONSTANTE.NOME_RECEBEDOR}</Text> */}
            </View>  

            <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 3, width: '100%', alignItems: 'center', borderWidth: 0, borderColor: 'red', }}>

               <TextInputMask 
                  type={'cel-phone'} 
                  options={{ maskType: 'BRL', withDDD: true, dddMask: '+55 (99) ' }} 
                  editable={true}
                  autoFocus={false}
                  autoCorrect={true} 
                  placeholder="Telefone" 
                  autoCapitalize={'none'} 
                  underlineColorAndroid='transparent'
                  returnKeyType = {"done"}
                  enablesReturnKeyAutomatically={true}
                  value={this.state.txtChave} 
                  onChangeText={ (value) => { this.setState({ txtChave: value }); }} //  this.props.modificaChave(value);
                  onSubmitEditing={Keyboard.dismiss}
                  style={{ fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 10, marginBottom: 10, width: '88%', height: 40, textAlign: 'center', }} 
               />
               
               <TouchableOpacity style={{ height: 45, paddingTop:10, paddingBottom:10, borderRadius:10, marginTop: 20, marginBottom: 20, width: '90%', backgroundColor: userBGColor }} activeOpacity={0.7} onPress={ ()=>{ Keyboard.dismiss(); this._onPressLogin(); }} >
                  {
                     this.state.isLoadingLogin
                     ? 
                     <ActivityIndicator color='#fff' size='small' style={{ }} /> 
                     : 
                     <Text style={{ color:'#fff', fontSize: 20, textAlign:'center', }}>LOGIN</Text>
                  }
               </TouchableOpacity>
               
               <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', }}>
                  <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 16, color:'#6C7B8B', textAlign: "left", }} onPress={ ()=>{ this._onPressCadastro(); }} >Criar Conta</Text>
                  {/* <Text style={{ fontWeight: 'bold', fontSize: 15, color:'#6E7B8B', textAlign: "right", }} onPress={ ()=>{ this._onPressEsqueceuSenha(); }}>Esqueceu a Senha?</Text> */}
               </View>

            </KeyboardAvoidingView> 
            
            <View style={{ justifyContent: 'flex-end', alignItems: 'center', borderWidth: 0, borderColor: 'red',  }}>
               <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#555', }}>Versão: {Constants.manifest.version}</Text>
            </View>

         </View>
      );
   }

}

const mapStateToProps = state => ({
   txtLoginChave     : state.AuthReducer.loginchave,
   txtLoginMsgErro   : state.AuthReducer.loginMsgErro,
   txtLoginIsLoading : state.AuthReducer.loginIsLoading,
});

const mapDispatchToProps = { modificaChave, modificaMsgLogin, loginAutenticar, };

//export default LoginScreen;
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);