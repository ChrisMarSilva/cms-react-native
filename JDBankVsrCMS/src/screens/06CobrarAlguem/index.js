import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import { FontAwesome, } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

const ClassName = 'CobrarAlguemScreen';

class CobrarAlguemScreen extends Component {

  //state = { };

  constructor(props){
     super(props); 
     //HelperLog.entrada(`${ClassName}.constructor`);
     try {
        
      this.state = { valorReceber: 0, };     

     }catch(err) {
        //HelperLog.erro(`${ClassName}.constructor`);
     }finally {
        //HelperLog.saida(`${ClassName}.constructor`);
     }
  }

  componentDidMount() {
     //HelperLog.entrada(`${ClassName}.componentDidMount`);
     try {

      const valorReceber = 0;
      this.setState({ valorReceber: valorReceber, });
      this.props.navigation.setParams({ valorReceber: valorReceber, });

     }catch(err) {
        //HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentDidMount`);
     }
  }

  _goToOpenScreenCobrarAlguemQrCode() {
    // HelperLog.entrada(`${ClassName}._goToOpenScreenCobrarAlguemQrCode`);
    try {

      const userURL           = this.props.navigation.getParam('userURL', CONSTANTE.URL_PAGADOR);
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
      const userBGColor       = this.props.navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
      const valorReceber      = parseFloat( HelperNumero.GetValorDecimal(this.state.valorReceber) ); // HelperNumero.isNumber(this.state.valorReceber) ? parseFloat( this.state.valorReceber ) : 0;

      // HelperLog.texto(`${ClassName}._goToOpenScreenCobrarAlguemQrCode`,'valorReceber = ' +  valorReceber);

      this.props.navigation.navigate('CobrarAlguemQRCode', { 
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
        userBGColor    : userBGColor,
        valorReceber   : valorReceber, 
      });

    }catch(err) {
      // HelperLog.erro(`${ClassName}._goToOpenScreenCobrarAlguemQrCode`, err.message);
    }finally {
      // HelperLog.saida(`${ClassName}._goToOpenScreenCobrarAlguemQrCode`);
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

    return(
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: userBGColorScreen, }}>

          <Text style={{color: '#fff', fontSize: 18, fontWeight: "bold", marginBottom: 10, }}>digite o valor</Text>

          <TextInputMask 
            type={'money'} 
            options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }} 
            value={this.state.valorReceber} 
            onChangeText={ (value) => { this.setState({valorReceber: value})}} 
            onSubmitEditing={Keyboard.dismiss}
            style={{textAlign: "center", fontSize: 25, fontWeight: "bold", width: '90%', height: 40, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#fff', color: '#fff', backgroundColor: userBGColorScreen, marginHorizontal: 10, marginBottom: 10, }} 
          />  

          <TouchableOpacity style={{ borderRadius: 10,  marginLeft: 15, marginRight: 15, marginTop: 20, marginBottom: 15, width: '90%', height: 50, padding: 10, backgroundColor: '#fff', }} onPress={() => {  Keyboard.dismiss(); this._goToOpenScreenCobrarAlguemQrCode(); }}>
            <Text style={{ paddingLeft: 5, textAlign:'center', color: '#555', fontWeight: 'bold', fontSize: 20, }}> continuar </Text>
          </TouchableOpacity>

      </KeyboardAvoidingView> 
    );
  }

}

const mapStateToProps = state => ({
  // txtEmail           : state.AuthReducer.txtEmail,
  // txtSenha           : state.AuthReducer.txtSenha, 
});

const mapDispatchToProps = { };

//export default CobrarAlguemScreen;
export default connect(mapStateToProps, mapDispatchToProps)(CobrarAlguemScreen);