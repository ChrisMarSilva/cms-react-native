import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { FontAwesome, } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import * as HelperLog from '../../util/HelperLog';
import * as HelperSessao from '../../util/HelperSessao';
import * as HelperNumero from '../../util/HelperNumero';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

import imgBluePerson from '../../imgs/person-blue.jpg';
import imgRedPerson  from '../../imgs/person-red.jpg';

const ClassName = 'PerfilScreen'; // this.constructor.name
   
class PerfilScreen extends Component {

   state = { };

   constructor(props){
      super(props); 
      // HelperLog.entrada(`${ClassName}.constructor`);
      try {
         
         this.state = { };
         this._onPressHome = this._onPressHome.bind(this);

      }catch(err) {
         // HelperLog.erro(`${ClassName}.constructor`);
      }finally {
         // HelperLog.saida(`${ClassName}.constructor`);
      }
   }

   componentDidMount() {
      // HelperLog.entrada(`${ClassName}.componentDidMount`);
      try {

         this.props.navigation.setParams({ _onPressHome: this._onPressHome });

      }catch(err) {
         // HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}.componentDidMount`);
      }
   }

   _onPressLogout = async () => {
      // HelperLog.entrada(`${ClassName}._onPressCadastro`);
      try {
         
         await HelperSessao.ClearAllSessao();
         this.props.navigation.navigate('Login');
            
      }catch(err) {
         // HelperLog.erro(`${ClassName}._onPressCadastro`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._onPressCadastro`);
      };
   }

   _onPressCorVermelha = async () => {
      // HelperLog.entrada(`${ClassName}._onPressCorVermelha`);
      try {

         const userURL       = CONSTANTE.URL_PAGADOR;
         const userIspb      = CONSTANTE.ISPB_PAGADOR;
         const userNomeBanco = CONSTANTE.NOME_PAGADOR;
         const userBGColor   = CONSTANTE.BG_VERMELHO;

         this.props.navigation.setParams({ userURL: userURL, userIspb: userIspb, userNomeBanco: userNomeBanco, userBGColor: userBGColor, });
         
         await HelperSessao.SetUserURL(        userURL       );
         await HelperSessao.SetUserIspb(       userIspb      );
         await HelperSessao.SetUserNomeBanco(  userNomeBanco );
         await HelperSessao.SetUserBGColor(    userBGColor   );

      }catch(err) {
         // HelperLog.erro(`${ClassName}._onPressCorVermelha`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._onPressCorVermelha`);
      };
   }

   _onPressCorAzul = async () => {
      // HelperLog.entrada(`${ClassName}._onPressCorAzul`);
      try {
         
         const userURL       = CONSTANTE.URL_RECEBEDOR;
         const userIspb      = CONSTANTE.ISPB_RECEBEDOR;
         const userNomeBanco = CONSTANTE.NOME_RECEBEDOR;
         const userBGColor   = CONSTANTE.BG_AZUL;

         this.props.navigation.setParams({ userURL: userURL, userIspb: userIspb, userNomeBanco: userNomeBanco, userBGColor: userBGColor, });
         
         await HelperSessao.SetUserURL(        userURL       );
         await HelperSessao.SetUserIspb(       userIspb      );
         await HelperSessao.SetUserNomeBanco(  userNomeBanco );
         await HelperSessao.SetUserBGColor(    userBGColor   );
            
      }catch(err) {
         // HelperLog.erro(`${ClassName}._onPressCorAzul`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._onPressCorAzul`);
      };
   }

   _onPressHome = async () => {
      // HelperLog.entrada(`${ClassName}._onPressHome`);
      try {
         
         const userURL       = this.props.navigation.getParam('userURL',       CONSTANTE.URL_PAGADOR  );
         const userIspb      = this.props.navigation.getParam('userIspb',      CONSTANTE.ISPB_PAGADOR );
         const userNomeBanco = this.props.navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR );
         const userBGColor   = this.props.navigation.getParam('userBGColor',   CONSTANTE.BG_VERMELHO  );

         this.props.navigation.navigate('Home', { 
            userURL       : userURL, 
            userIspb      : userIspb, 
            userNomeBanco : userNomeBanco, 
            userBGColor   : userBGColor, 
         });
            
      }catch(err) {
         // HelperLog.erro(`${ClassName}._onPressHome`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._onPressHome`);
      };
   }

   static navigationOptions = ({navigation}) => {
      const { params = {} } = navigation.state;
      const userBGColorFim   = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO); 
      const userBGColorMeio  = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL;  
      const userBGColorIni   = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO  : CONSTANTE.BG_HEADER_INI_AZUL;  
      const userlogo         = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3;  
      return { 
              headerBackground: ( <LinearGradient colors={[userBGColorIni, userBGColorMeio, userBGColorFim]} style={{ flex: 1, }} /> ),
              //headerTitleStyle: { textAlign: 'center', alignSelf:'center', color: '#fff', },
              //headerStyle: { height: 68, backgroundColor: "transparent", color: '#fff', },
               headerLeft: () => ( 
                <View style={{ }}>
                  <Image style={{ resizeMode: 'cover', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: "#fff", marginLeft: 10, }} source={userlogo} />
                </View>
               ),
              headerTitle: () => ( 
               <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Perfil</Text>
                </View>
              ),
              headerRight: () => ( 
               <View style={{ flex:1, }}>
                  <TouchableOpacity style={{ flex:1, justifyContent: 'center', alignItems: 'center', }} onPress={navigation.getParam('_onPressHome')}>
                   <FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold', }} name="close" />
                   {/* <Text style={{ marginRight: 5, color: '#fff', fontSize: 20, fontWeight: 'bold', }}> X </Text>  */}
                  </TouchableOpacity>
                </View>
              ),  
          };
    };

   // fff8f8 // A52A2A
   render() {

      // HelperLog.texto(`${ClassName}.render`,'Call');
      // HelperLog.texto(`${ClassName}.render`,'navigation = ' + JSON.stringify(this.props.navigation));

      const { navigation }    = this.props;
      // const userURL        = navigation.getParam('userURL', CONSTANTE.URL_PAGADOR);
      const userChave         = navigation.getParam('userChave', '');
     // const userIspb          = navigation.getParam('userIspb', '');
      const userNomeBanco     = navigation.getParam('userNomeBanco', '');
      //const userTipoPessoa    = navigation.getParam('userTipoPessoa', '');
      const userDocumento     = navigation.getParam('userDocumento', '');
      const userAgencia       = navigation.getParam('userAgencia', '');
      const userConta         = navigation.getParam('userConta', '');
      //const userTipoConta     = navigation.getParam('userTipoConta', '');
      const userNome          = navigation.getParam('userNome', '');
      //const userCidade        = navigation.getParam('userCidade', '');
      //const userSaldo         = HelperNumero.isNumber(navigation.getParam('userSaldo', '0,00')) ?  parseFloat( navigation.getParam('userSaldo', '0,00') ) : 0;
      const userBGColor       = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
      //const userBGColorScreen = userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FRACO : CONSTANTE.BG_AZUL_FRACO;
      const userBGColorScreen = userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE;
      const userIcon          = userBGColor == CONSTANTE.BG_VERMELHO ? imgRedPerson : imgBluePerson;    
    
      return(
         <View style={{ flex:1, backgroundColor: userBGColorScreen, }}> 
   
             <View style={{ flex: 1, justifyContent: 'center', borderWidth: 0, borderColor: 'blue', alignItems: 'center', }}>
   
                 <Image style={{ opacity: 0.7, width: 100, height: 100, borderRadius: 63, borderWidth: 1, borderColor: '#fff', marginTop: 0, marginBottom: 20, }} source={userIcon} />
   
                 <Text style={{ color: '#fff', fontSize: 18,  fontWeight: 'bold', }}>{userNome}</Text> 
                 
                 <Text style={{ color: '#fff', fontSize: 14, }}>CPF: <Text style={{ fontWeight: 'bold', }}>{HelperNumero.GetMascaraCPF(userDocumento)}</Text> </Text>
                 
                 <Text style={{ color: '#fff', fontSize: 14, marginBottom: 20, }}>Celular: <Text style={{ fontWeight: 'bold', }}>{HelperNumero.GetMascaraTelefone(userChave)}</Text> </Text>
                 
                 <Text style={{ color: '#fff', fontSize: 18, }}> <Text style={{ fontWeight: 'bold', }}>{userNomeBanco}</Text> </Text>
                 
                 <Text style={{ color: '#fff', fontSize: 14, }}>Agência: <Text style={{ fontWeight: 'bold', }}>{userAgencia}</Text>  ||  Conta: <Text style={{ fontWeight: 'bold', }}>{userConta}</Text> </Text>

                 
                 {/* 
                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  marginTop: 30, paddingHorizontal: 10, borderWidth: 0, borderColor: 'blue', }}>
                     
                     <TouchableOpacity style={{ marginRight:10, paddingTop:10, paddingBottom:10, borderRadius:10, textAlign: "left", width: '45%', backgroundColor: CONSTANTE.BG_VERMELHO, }} activeOpacity={0.7} onPress={ ()=>{ this._onPressCorVermelha(); }} >
                        <Text style={{ color:'#fff', fontWeight: 'bold', fontSize: 15, textAlign:'center', }}>Layout Vermelho</Text>
                     </TouchableOpacity>
                     
                     <TouchableOpacity style={{ marginLeft:10, paddingTop:10, paddingBottom:10, borderRadius:10, textAlign: "right", width: '45%', backgroundColor: CONSTANTE.BG_AZUL, }} activeOpacity={0.7} onPress={ ()=>{ this._onPressCorAzul(); }} >
                        <Text style={{ color:'#fff', fontWeight: 'bold', fontSize: 15, textAlign:'center', }}>Layout Azul</Text>
                     </TouchableOpacity>

                 </View> 
                 */}
               
             </View>
   
             <View style={{ justifyContent: 'flex-end', marginLeft: 15, marginRight: 15, marginBottom: 15, borderWidth: 0, borderColor: 'blue',  }}>
                  
               <TouchableOpacity style={{  height: 50,  justifyContent: 'center', alignItems: 'center', paddingTop:10, paddingBottom: 5, borderRadius: 10, marginBottom: 10, width: '100%', backgroundColor: '#fff', }} activeOpacity={0.7} onPress={ ()=>{ this._onPressLogout(); }} >
                  <Text style={{ color: userBGColorScreen, fontWeight: 'bold', fontSize: 18, textAlign:'center', }}> TROCA DE CONTA</Text>
               </TouchableOpacity>
               
               <View style={{ alignItems: 'center', borderWidth: 0, borderColor: 'red',  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#fff', }}>Versão: {Constants.manifest.version}</Text>
               </View> 
               
            </View>
   
         </View>
      );
   }

}

const mapStateToProps = state => ({
  // txtEmail           : state.AuthReducer.txtEmail,
  // txtSenha           : state.AuthReducer.txtSenha, 
});

const mapDispatchToProps = { };

export default PerfilScreen;
//export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen);