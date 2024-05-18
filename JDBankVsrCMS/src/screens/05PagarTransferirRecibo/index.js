import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Easing, } from 'react-native';
import { FontAwesome, } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { Audio } from 'expo-av'; 
import { LinearGradient } from 'expo-linear-gradient';
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

const ClassName = 'PagarTransferirReciboScreen';

class PagarTransferirReciboScreen extends Component {
 
  //state = { };

  constructor(props){
     super(props); 
     //HelperLog.entrada(`${ClassName}.constructor`);
     try {
        
      this.state = { };
      this._onPressHome = this._onPressHome.bind(this);

     }catch(err) {
        //HelperLog.erro(`${ClassName}.constructor`);
     }finally {
        //HelperLog.saida(`${ClassName}.constructor`);
     }
  }

  componentDidMount() {
     //HelperLog.entrada(`${ClassName}.componentDidMount`);
     try {

      this.setState({ });
      this._getTocarSom();
      this.props.navigation.setParams({ _onPressHome: this._onPressHome });

     }catch(err) {
        //HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentDidMount`);
     }
  }
  
  _getTocarSom = async () => {
    //HelperLog.entrada(`${ClassName}._getTocarSom`);
    try {

      //const source = require('../../sounds/01.mp3');
      const source = require('../../sounds/02.mp3');
      // const source = 'http://freesoundeffect.net/sites/default/files/coins-drop-pirate-gold-doubloon-ring-01-sound-effect-52944947.mp3';

      await Audio.setAudioModeAsync({ 
         allowsRecordingIOS: false, 
         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX, 
         playsInSilentModeIOS: true,
         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS, 
         shouldDuckAndroid: true, 
         // staysActiveInBackground: true, 
         playThroughEarpieceAndroid: false ,
      });

      const initialStatus = {
         shouldPlay         : true,  //        Play by default
         rate               : 1.0,   //        Control the speed
         shouldCorrectPitch : true,  //        Correct the pitch
         volume             : 1.0,   //        Control the Volume
         isMuted            : false, //        mute the Audio
      };

      // const playbackInstance = new Audio.Sound()
      const { sound, status } = await Audio.Sound.createAsync(source, initialStatus );
      sound.playAsync(); //  Play the Music

      // let soundObject = new Audio.Sound();
      // await soundObject.playbackInstance.unloadAsync();
      // soundObject.setOnPlaybackStatusUpdate(null);
      // await soundObject.loadAsync(source);   
      //await soundObject.loadAsync(source, status, false);
      // soundObject.setPositionAsync(0);
      // soundObject.setVolumeAsync(1.0);
      // await soundObject.playAsync();
      //await soundObject.replayAsync();

    }catch(err) {
      //HelperLog.erro(`${ClassName}._getTocarSom`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._getTocarSom`);
    }
  }

  _OnPressVerComprovante = async () => {
     //HelperLog.entrada(`${ClassName}._OnPressVerComprovante`);
     try {
        
        this._onPressHome();
           
     }catch(err) {
        //HelperLog.erro(`${ClassName}._OnPressVerComprovante`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}._OnPressVerComprovante`);
     }
  }

  _onPressHome = async () => {
     // HelperLog.entrada(`${ClassName}._onPressHome`);
     try {
        
        const valorRecebedor = HelperNumero.isNumber(this.props.navigation.getParam('valorRecebedor', '0,00')) ?  parseFloat( this.props.navigation.getParam('valorRecebedor', '0,00') ) : 0;
        const userSaldo      = HelperNumero.isNumber(this.props.navigation.getParam('userSaldo', '0,00'))      ?  parseFloat( this.props.navigation.getParam('userSaldo', '0,00') )      : 0;
        this.props.navigation.navigate('Home', { userSaldo : userSaldo - valorRecebedor, });
           
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
                <Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Pagamento Feito!</Text>
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

  render() {

    //HelperLog.texto(`${ClassName}.render`,'Call');
    //HelperLog.texto(`${ClassName}.render`,'navigation = ' + JSON.stringify(this.props.navigation));

    const { navigation }      = this.props;
    const userBGColor         = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
    const userBGColorScreen   = userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE; 
    
    const chaveRecebedor      = navigation.getParam('chaveRecebedor', '');   
    const nomeBancoRecebedor  = navigation.getParam('nomeBancoRecebedor', ''); 
    const agenciaRecebedor    = navigation.getParam('agenciaRecebedor', ''); 
    const contaRecebedor      = navigation.getParam('contaRecebedor', '');  
    const nomeRecebedor       = navigation.getParam('nomeRecebedor', '');
    const valorRecebedor      = HelperNumero.isNumber(navigation.getParam('valorRecebedor', '0,00')) ?  parseFloat( navigation.getParam('valorRecebedor', '0,00') ) : 0;
    
    return(
      <View style={{ flex: 1, backgroundColor: userBGColorScreen, }}>

        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', height: '80%', borderRadius: 25, backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue', }}>

              {/* <FontAwesome style={{ color: '#61db5c', fontSize: 100, marginBottom: 5, }} name="check" /> */}

              <LottieView style={{ height: 150, marginBottom: 5, borderWidth: 0, borderColor: 'blue', }} source={require('../../lottie/1127-success.json')} autoPlay loop />

              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30, marginBottom: 10, }}> R$ {HelperNumero.GetMascaraValorDecimal(valorRecebedor)} </Text>

              <Text style={{ color: '#555', fontSize: 18, marginBottom: 5, }}> para <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, }}>{nomeRecebedor}</Text> </Text>

              <Text style={{ color: '#555', fontSize: 15, marginBottom: 10, }}> Celular: <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{HelperNumero.GetMascaraTelefone(chaveRecebedor)}</Text> </Text>

              <Text style={{ color: '#000', fontSize: 18, marginBottom: 5, }}> <Text style={{ fontWeight: 'bold', }}>{nomeBancoRecebedor}</Text> </Text>

              <Text style={{ color: '#555', fontSize: 15, }}>Agência: <Text style={{ fontWeight: 'bold', }}>{agenciaRecebedor}</Text>  ||  Conta: <Text style={{ fontWeight: 'bold', }}>{contaRecebedor}</Text> </Text>

            </View>

        </View>

        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 25, marginRight: 25, marginBottom: 30, borderWidth: 0, borderColor: 'blue', }}>

            <TouchableOpacity style={{ borderRadius: 10, height: 50, padding: 12, backgroundColor: '#fff', }} onPress={() => { this._OnPressVerComprovante(); }}>
              <Text style={{ paddingLeft: 5, textAlign:'center', color: '#555', fontWeight: 'bold', fontSize: 20, }}> ver comprovante </Text>
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

//export default PagarTransferirReciboScreen;
export default connect(mapStateToProps, mapDispatchToProps)(PagarTransferirReciboScreen);