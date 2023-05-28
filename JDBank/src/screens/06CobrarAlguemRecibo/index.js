import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Animated, Easing, } from 'react-native';
import { FontAwesome, } from '@expo/vector-icons';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

const ClassName = 'CobrarAlguemReciboScreen';

class CobrarAlguemReciboScreen extends Component {
 
  state = { };

  constructor(props){
     super(props); 
     //HelperLog.entrada(`${ClassName}.constructor`);
     try {
        
      this.state = { isLoadingRecebimento: true, };

     }catch(err) {
        //HelperLog.erro(`${ClassName}.constructor`);
     }finally {
        //HelperLog.saida(`${ClassName}.constructor`);
     }
  }

  componentDidMount() {
     //HelperLog.entrada(`${ClassName}.componentDidMount`);
     try {

      this.setState({ isLoadingRecebimento: false, });
      // setTimeout(()=>{ this.setState({ isLoadingRecebimento: false, }); }, 1000); //1500

      this.animation.play(30, 120);

     }catch(err) {
        //HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentDidMount`);
     }
  }

  _OnPressVerComprovante = async () => {
     //HelperLog.entrada(`${ClassName}._OnPressVerComprovante`);
     try {
        
        this.props.navigation.navigate('Home', { 
          visiblePagRec: false, 
          tipoPessoaPagRec: '', 
          documentoPagRec: '', 
          agenciaPagRec: '', 
          contaPagRec: '', 
          nomePagRec: '', 
          valorPagRec: '',
        });
           
     }catch(err) {
        //HelperLog.erro(`${ClassName}._OnPressVerComprovante`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}._OnPressVerComprovante`);
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
                <Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Pagamento Recebido!</Text>
              </View>
            ),
            headerRight: () => ( 
              <View style={{ flex:1, }}>
                <TouchableOpacity style={{ flex:1, justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Home', { visiblePagRec: false, tipoPessoaPagRec: '', documentoPagRec: '', agenciaPagRec: '', contaPagRec: '', nomePagRec: '', valorPagRec: '', }); }}>
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

    const { navigation }     = this.props;
    const nomePagRec         = navigation.getParam('nomePagRec', '');
    const documentoPagRec    = navigation.getParam('documentoPagRec', '');
    const agenciaPagRec      = navigation.getParam('agenciaPagRec', '');
    const contaPagRec        = navigation.getParam('contaPagRec', '');
    const valorPagRec        = HelperNumero.isNumber(navigation.getParam('valorPagRec', '0,00')) ?  parseFloat( navigation.getParam('valorPagRec', '0,00') ) : 0;
    const userBGColor        = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
    const userBGColorScreen  = userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE; 
     
    // Não há notificações!
    // Nenhuma notificação no momento!

    return(
      <View style={{ flex: 1, backgroundColor: userBGColorScreen, }}>

        <View style={{ flex: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginLeft: 25, marginRight: 25, marginTop: 80, marginBottom: 80, borderRadius: 25, }}>

            {
              this.state.isLoadingRecebimento
            ? 
                <ActivityIndicator color='#000' size='large' style={{ }} />            
            : 
              <View style={{ alignItems: 'center', borderWidth: 0, borderColor: 'blue', }}>

                {/* <FontAwesome style={{ color: '#61db5c', fontSize: 120, marginBottom: 20, }} name="dollar" /> */}
                
                <LottieView ref={animation => { this.animation = animation; }} style={{ height: 180, marginBottom: 20, borderWidth: 0, borderColor: 'blue', }} source={require('../../lottie/1309-smiley-stack-02.json')} autoPlay loop />

                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 25, marginBottom: 10, }}> R$ {HelperNumero.GetMascaraValorDecimal(valorPagRec)} </Text>

                {/* <Text style={{ color: '#000', fontSize: 15, marginBottom: 10, }}> de <Text style={{ fontWeight: 'bold', fontSize: 20, }}>{nomePagRec}</Text> </Text> */}

                <Text style={{ color: '#555', fontSize: 16, }}>Agência: <Text style={{ color: '#000', fontWeight: 'bold', }}>{agenciaPagRec}</Text>  ||  Conta: <Text style={{ color: '#000', fontWeight: 'bold', }}>{contaPagRec}</Text> </Text>

              </View>
            }

        </View>

        {
            this.state.isLoadingRecebimento
        ? 
            null
        : 
          <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 25, marginRight: 25, marginBottom: 30, borderWidth: 0, borderColor: 'blue', }}>

            <TouchableOpacity style={{ borderRadius: 10, height: 50, padding: 12, backgroundColor: '#fff', }} onPress={() => { this._OnPressVerComprovante(); }}>
              <Text style={{ paddingLeft: 5, textAlign:'center', color: '#555', fontWeight: 'bold', fontSize: 20, }}> ver comprovante </Text>
            </TouchableOpacity>

          </View>
        }

      </View>
    );
  }

}

const mapStateToProps = state => ({
  // txtEmail           : state.AuthReducer.txtEmail,
  // txtSenha           : state.AuthReducer.txtSenha, 
});

const mapDispatchToProps = { };

//export default CobrarAlguemReciboScreen;
export default connect(mapStateToProps, mapDispatchToProps)(CobrarAlguemReciboScreen);