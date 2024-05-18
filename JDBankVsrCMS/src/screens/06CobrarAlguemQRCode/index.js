import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, Animated, Easing, } from 'react-native';
import LottieView from 'lottie-react-native';
import { FontAwesome, } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import axios from 'axios';
//import styles from './styles';
import * as HelperLog    from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import * as CONSTANTE    from '../../util/Constante';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

const ClassName = 'CobrarAlguemQRCodScreen';

class CobrarAlguemQRCodScreen extends Component {

   state = { };
 
   constructor(props){
      super(props); 
      //HelperLog.entrada(`${ClassName}.constructor`);
      try {
         
      this.state = { encodedData: null, isLoadingGerarQRCode: true, };
 
      }catch(err) {
         //HelperLog.erro(`${ClassName}.constructor`);
      }finally {
         //HelperLog.saida(`${ClassName}.constructor`);
      }
   }
 
   componentDidMount() {
      //HelperLog.entrada(`${ClassName}.componentDidMount`);
      try {
 
         this.setState({ isLoadingGerarQRCode: true, });
         this._GetGerarQRCode(); 
 
      }catch(err) {
         //HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
      }finally {
         //HelperLog.saida(`${ClassName}.componentDidMount`);
      }
   }

   _GetGerarQRCode = async () => {
      // HelperLog.entrada(`${ClassName}._GetGerarQRCode`);
      try {
       
         this.setState({ encodedData: null, isLoadingGerarQRCode: true, });

         const userURL      = this.props.navigation.getParam('userURL', CONSTANTE.URL_PAGADOR);
         const userChave    = this.props.navigation.getParam('userChave', '');
         const userNome     = this.props.navigation.getParam('userNome', '');
         const userCidade   = this.props.navigation.getParam('userCidade', '');
         const valorReceber = HelperNumero.isNumber( this.props.navigation.getParam('valorReceber', '0') ) ? parseFloat( this.props.navigation.getParam('valorReceber', '0') ) : 0;
         
         //{"chaveIdentificacao": "string","codigoCategoria": "string","transactionCurrency": 8,"valor": 0,"codigoPais": "string","nomeRecebedor": "string","cidade": "string","additionalDataField": "string"}
         const data = JSON.parse(` {"chaveIdentificacao":"${userChave}","nomeRecebedor":"${userNome}","cidade":"${userCidade}","valor":${valorReceber}}`);

         //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.url - ' + userURL + CONSTANTE.URL_GERAR_QRCODE);
         //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.userChave - ' + userChave);
         //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.userNome - ' + userNome);
         //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.userCidade - ' +userCidade);
         //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.valorReceber - ' +valorReceber);
         //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.data - ' +data);
         //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.data - ' +JSON.stringify({ data }));

         axios({ 
             method: 'post',
             url: userURL + CONSTANTE.URL_GERAR_QRCODE,
             timeout: CONSTANTE.URL_TIMEOUT, 
             responseType: 'text', 
             headers: { 'Content-Type': 'application/json; charset=utf-8' },          
             data: data, // data: JSON.stringify({ chaveIdentificacao: userChave, nomeRecebedor: userNome, cidade: userCidade, valor: valorReceber }),
         })
        .then( (response) => { 
               try {

               //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.response.data '+response.data);
               const encodedData = response.data; 
               this.setState({ encodedData: encodedData, isLoadingGerarQRCode: false, });
                  
               } catch (err) {
               Alert.alert('Erro Response: ' + err.messag); 
               // HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.response: ' + err.message);
               }
        })
        .catch( (err) => { 
            Alert.alert('Erro Chamada: ' + err.messag);   
            //HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios: ' + err.message);
        })
        .finally(function () {
             // HelperLog.texto(`${ClassName}._GetGerarQRCode`, 'axios.finally');
        });

      }catch(err) {
         Alert.alert('Erro Geral: ' + err.messag);
         // HelperLog.erro(`${ClassName}._GetGerarQRCode`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._GetGerarQRCode`);
      }
   }
  
   _goToOpenScreenCobrarAlguemAgain() {
      // HelperLog.entrada(`${ClassName}._goToOpenScreenCobrarAlguemAgain`);
      try {

         this.props.navigation.navigate('CobrarAlguem', { valorReceber: '0', });
      
      }catch(err) {
         // HelperLog.erro(`${ClassName}._goToOpenScreenCobrarAlguemAgain`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._goToOpenScreenCobrarAlguemAgain`);
      }
   }

   static navigationOptions = ({navigation}) => {
      const { params = {} }  = navigation.state;
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
                  <Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Cobrar com Código QR</Text>
                </View>
              ),
              headerRight: () => ( 
               <View style={{ flex:1, }}>
                  <TouchableOpacity style={{ flex:1, justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Home'); }}>
                   <FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold', }} name="close" />
                   {/* <Text style={{ marginRight: 5, color: '#fff', fontSize: 20, fontWeight: 'bold', }}> X </Text>  */}
                  </TouchableOpacity>
                </View>
              ),  
          };
    };
 
  render() {

   //HelperLog.texto(`${ClassName}.render`,'Call');
   //HelperLog.texto(`${ClassName}.render`,'navigation = ' + JSON.stringify(this.props.navigation));

   const { navigation }    = this.props;
   const userBGColor       = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
   const userBGColorScreen = userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE;  
   const valorReceber      = HelperNumero.isNumber( navigation.getParam('valorReceber', '0') ) ?  parseFloat( navigation.getParam('valorReceber', '0') ) : 0;
   
   //HelperLog.texto(`${ClassName}.render`,'valorReceber = ' +  navigation.getParam('valorReceber', '0'));
   //HelperLog.texto(`${ClassName}.render`,'valorReceber = ' +  valorReceber);

   return(
      <View style={{ flex: 1, backgroundColor: userBGColorScreen, }}>

           <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', }}>

               {  valorReceber > 0 && ( <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, marginBottom: 10, }}> R$ {HelperNumero.GetMascaraValorDecimal(valorReceber)} </Text> ) }

               {
                  this.state.isLoadingGerarQRCode
               ? 
                  <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10, }}>  </Text> 
               : 
                  <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10, }}> mostre o Código QR para receber </Text> 
               }

               <View style={{ width: 300, height: 300, backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue', }}>

                  {
                     this.state.isLoadingGerarQRCode
                  ? 
                     // <ActivityIndicator color={userBGColor} size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500, }} />
                     <LottieView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, }} source={require('../../lottie/201-simple-loader.json')} autoPlay loop />
                  : 
                     <Image source={{uri: `data:image/jpeg;base64,${this.state.encodedData}`}} style={{ width: '100%', height: '100%', borderWidth: 0, borderColor: "#000", }} />
                  }
                 
              </View>

           </View>
           
           <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginLeft: 15, marginRight: 15, marginBottom: 15, borderWidth: 0, borderColor: 'blue', }}>
               <TouchableOpacity style={{ borderRadius: 10, width: 300, height: 50, padding: 12, backgroundColor: '#fff', }} onPress={() => { this._goToOpenScreenCobrarAlguemAgain(); }}>
                    <Text style={{ paddingLeft: 5, textAlign:'center', color: '#555', fontSize: 18, }}> criar novo Código QR</Text> 
                </TouchableOpacity>
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

//export default CobrarAlguemQRCodScreen;
export default connect(mapStateToProps, mapDispatchToProps)(CobrarAlguemQRCodScreen);