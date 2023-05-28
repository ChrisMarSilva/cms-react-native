import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Alert, Image, } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome, } from '@expo/vector-icons'; 
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';;
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

const ClassName = 'PagarTransferirScreen';

class PagarTransferirScreen extends Component { 

  // state = { };

  constructor(props){
     super(props); 
     //HelperLog.entrada(`${ClassName}.constructor`);
     try {
        
      this.state = { hasCameraPermission: null, scanned: false, };    

     }catch(err) {
        //HelperLog.erro(`${ClassName}.constructor`);
     }finally {
        //HelperLog.saida(`${ClassName}.constructor`);
     }
  }

  componentDidMount() {
     //HelperLog.entrada(`${ClassName}.componentDidMount`);
     try {

      this._requestCameraPermission();

     }catch(err) {
        //HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentDidMount`);
     }
  }
  
  _requestCameraPermission = async () => {
    //HelperLog.entrada(`${ClassName}._requestCameraPermission`);
    try {

      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      this.setState({ hasCameraPermission: status == 'granted' });

    }catch(err) {
      //HelperLog.erro(`${ClassName}._requestCameraPermission`, err.message);
    }finally {
      //this.setState({ hasCameraPermission: false });
      //HelperLog.saida(`${ClassName}._requestCameraPermission`);
    }
  }
  
  _PostEnviarQRCode = async ({ type, data }) => { 
    //HelperLog.entrada(`${ClassName}._PostEnviarQRCode`);
    try {

      //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'type="'+type+'"');
      //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'data="'+data+'"');      

      if ( data.trim() == '' ) {
        // Alert.alert('QRCode Vazio.'); 
        // HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'QRCode Vazio..................');
        return false;
      }

      // this.setState({ scanned: true });

      const userURL = this.props.navigation.getParam('userURL', CONSTANTE.URL_PAGADOR);

      //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.url - ' + userURL + CONSTANTE.URL_ENVIAR_QRCODE);

      axios({ 
            method: 'post',
            url: userURL + CONSTANTE.URL_ENVIAR_QRCODE,
            timeout: CONSTANTE.URL_TIMEOUT, 
            headers: { 'Content-Type': 'application/json; charset=utf-8' },           
            data: JSON.stringify({ emv: data }),
        })
      .then( (response) => { 
          try {

            //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.response.data '+response.data);
            //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.response.data '+JSON.stringify(response.data));

            const valorRecebedor = HelperNumero.isNumber( response.data.transactionAmount ) ? parseFloat( response.data.transactionAmount ): 0;
            const infoRecebedor  = response.data.additionalDataField ? response.data.additionalDataField : '123'; //response.data.additionalDataField;  
            const chaveRecebedor = response.data.merchantAccountInformation.itens[1].descricao;

            // HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.response.data.transactionAmount: '+valorRecebedor);
            // HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.response.data.additionalDataField: '+infoRecebedor);
            // HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.response.data.merchantAccountInformation.itens[1].descricao: '+chaveRecebedor);
 
            const userChave         = this.props.navigation.getParam('userChave', '');
            const userIspb          = this.props.navigation.getParam('userIspb', '');
            const userNomeBanco     = this.props.navigation.getParam('userNomeBanco', '');
            const userTipoPessoa    = this.props.navigation.getParam('userTipoPessoa', '');
            const userDocumento     = this.props.navigation.getParam('userDocumento', '');
            const userAgencia       = this.props.navigation.getParam('userAgencia', '');
            const userConta         = this.props.navigation.getParam('userConta', '');
            const userTipoConta     = this.props.navigation.getParam('userTipoConta', '');
            const userNome          = this.props.navigation.getParam('userNome', '');
            const userCidade        = this.props.navigation.getParam('userCidade', '');
            const userSaldo         = HelperNumero.isNumber(this.props.navigation.getParam('userSaldo', '0')) ?  parseFloat( this.props.navigation.getParam('userSaldo', '0') ) : 0;
            const userBGColor       = this.props.navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
  
            this.props.navigation.navigate('PagarTransferirConfirma', { 
              userURL        : userURL, 
              userChave      : userChave, 
              userIspb       : userIspb, 
              userNomeBanco  : userNomeBanco, 
              userTipoPessoa : userTipoPessoa, 
              userDocumento  : userDocumento, 
              userAgencia    : userAgencia, 
              userConta      : userConta, 
              userTipoConta  : userTipoConta, 
              userNome       : userNome, 
              userCidade     : userCidade, 
              userSaldo      : userSaldo, 
              userBGColor    : userBGColor,
              chaveRecebedor : chaveRecebedor, 
              infoRecebedor  : infoRecebedor, 
              valorRecebedor : valorRecebedor, 
            });

          } catch (err) {
            this.setState({ scanned: true });
            Alert.alert('Erro(Response): ' + err.messag);  
            // HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.response: ' + err.message);
          }
      })
      .catch( (err) => { 
        this.setState({ scanned: true });
        if (err.response) {
          Alert.alert( err.response.data.descricao ); 
          //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err.response.status: '                 + err.response.data.status            );
          //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err.response.headers: '                + err.response.data.headers           );
          //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err.response.dada: '                   + err.response.data                   );
          //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err.response.dada.JSON: '              + JSON.stringify(err.response.data)                   );
          //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err.response.dada.descricao: '        + err.response.data.descricao        );
          //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err.response.dada.message.descricao: ' + JSON.parse(err.response.data).descricao );
       }
       else if (err.request) {
          Alert.alert('Erro(Requição): ' + err.request); 
          // HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err.request: ' + err.request );
       }else {
          Alert.alert(err.message); 
          // HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err.message: ' + err.message );
       }
        // HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.err: ' + JSON.stringify(err) );
      })
      .finally(function () {
        //HelperLog.texto(`${ClassName}._PostEnviarQRCode`, 'axios.finally');
      });

    }catch(err) {
      Alert.alert('Erro(Geral): ' + err.messag);   
      //HelperLog.erro(`${ClassName}._PostEnviarQRCode`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._PostEnviarQRCode`);
    }
  };
  
  _PostEnviarQRCodeFake = async () => {
    //HelperLog.entrada(`${ClassName}._PostEnviarQRCodeFake`);
    try {

      const type = '';
      //const data = '00020101021126360014br.gov.bcb.spi0114+55119421246815204000053039865802BR5906Fulano6009São Paulo63041689'; //  0,00 ok
      //const data = "00020101021126360014br.gov.bcb.spi0114+55119421200015204000053039865406100.005802BR5913Fulano de Tal6009São Paulo63041A9B"; // 100,00 ok 
      //const data = "00020101021126360014br.gov.bcb.spi0114+55119421200055204000053039865406100.005802BR5909Anderson 6009São Paulo63040CB1"; // 100,00 ok 
      //const data = '00020101021126360014br.gov.bcb.spi0114+55119421255555204000053039865406100.005802BR5917J3 AZUL RECEBEDOR6009São Paulo630417AC';
      const data = '00020101021126360014br.gov.bcb.spi0114+551194212333352040000530398654040.005802BR5919JD VERMELHO PAGADOR6009São Paulo630416DC';
      
      //this._PostEnviarQRCode({ type, data }); return false;
      
      this.props.navigation.navigate('Home');

    }catch(err) {
      //HelperLog.erro(`${ClassName}._PostEnviarQRCodeFake`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._PostEnviarQRCodeFake`);
    }
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
                <Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Pagar com Código QR</Text>
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

    return(
      <View style={{ flex:1, backgroundColor: userBGColorScreen, }}>
     
          <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', }}>
              
              <View style={{ width: '80%', height: '70%', alignItems: 'center', backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue', }}>
            
                {
                  (this.state.hasCameraPermission == null || this.state.hasCameraPermission == false)
                ? 
                  <Text style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 200, }}>Sem acesso à Câmera</Text>
                : 
                  <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this._PostEnviarQRCode} barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} style={{ height: '100%', width: '90%' }} />
                  /*
                      null
                  */
                }
              
              </View>

              <Text style={{ marginTop: 15, color: '#fff', fontSize: 15, }}> aponte a câmera para código ou </Text>

              <Text style={{ marginTop: 2, color: '#fff', fontSize: 15, }}> pague via transferência </Text>

              { 
                this.state.scanned 
                && 
                (  
                  <TouchableOpacity style={{ marginTop: 30, borderRadius: 15, width: '70%', height: 40, padding: 10, backgroundColor: '#fff', }} onPress={() => this.setState({ scanned: false }) }>
                    <Text style={{ textAlign:'center', color: userBGColor, fontWeight: 'bold', fontSize: 16, }}> ler código novamente </Text> 
                  </TouchableOpacity> 
                )
              }
               
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 15, marginRight: 15, borderWidth: 0, borderColor: 'blue', }}>
             <TouchableOpacity style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 60, padding: 10, backgroundColor: '#fff', }} onPress={() => { this._PostEnviarQRCodeFake(); }}>
                  <Text style={{ paddingLeft: 5, textAlign:'center', color: '#555', fontWeight: 'bold', fontSize: 20, }}> pagar via transferência </Text> 
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

//export default PagarTransferirScreen;
export default connect(mapStateToProps, mapDispatchToProps)(PagarTransferirScreen);