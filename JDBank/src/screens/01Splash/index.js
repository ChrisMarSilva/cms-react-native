import React, {Component} from 'react';
import { Text, View, Image, } from 'react-native';
import { connect } from 'react-redux';
import * as HelperLog from '../../util/HelperLog';
import * as HelperSessao from '../../util/HelperSessao';

//import styles from './styles';
    
//import imglogoJD from '../../imgs/JDConsultores.png';
import imglogoJD from '../../imgs/splash.png';

const ClassName = 'SplashScreen'; // this.constructor.name
    
class SplashScreen extends Component {

  //state = { };

  constructor(props){
     super(props); 
     // HelperLog.entrada(`${ClassName}.constructor`);
     try {
        
        this.state = { };
        //this._verificarSessaoUsuario();

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
        // setTimeout(()=>{ this._verificarSessaoUsuario(); }, 1); //1500
        // this._verificarSessaoUsuario();

     }catch(err) {
        // HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentDidMount`);
     }
  }

  _verificarSessaoUsuario = async () => {
     // HelperLog.entrada(`${ClassName}._verificarSessaoUsuario`);
     try {

        const userURL       = await HelperSessao.GetUserURL()       || CONSTANTE.URL_PAGADOR;
        const userChave     = await HelperSessao.GetUserChave()     || '';
        const userIspb      = await HelperSessao.GetUserIspb()      || CONSTANTE.ISPB_PAGADOR;
        const userNomeBanco = await HelperSessao.GetUserNomeBanco() || CONSTANTE.NOME_PAGADOR;
        const userBGColor   = await HelperSessao.GetUserBGColor()   || CONSTANTE.BG_VERMELHO;
        const userIcon      = await HelperSessao.GetUserIcon()      || CONSTANTE.ICON_PAGADOR;

      // const stringJSON = "{name:'Chris',age:30}";
      // JSON.stringify(stringJSON)
      // const UID234_object = { name: 'Chris', age: 30 };
      // JSON.parse(UID234_object)

      this.props.navigation.navigate('Login', {
         userURL        : userURL,
         userChave      : userChave, 
         userIspb       : userIspb, 
         userNomeBanco  : userNomeBanco, 
         userBGColor    : userBGColor,
         userIcon       : userIcon,
      });

     }catch(err) {
        // HelperLog.erro(`${ClassName}._verificarSessaoUsuario`, err.message);
     }finally {
        // HelperLog.saida(`${ClassName}._verificarSessaoUsuario`);
     }
  }

  render() {

    // HelperLog.texto(`${ClassName}.render`,'Call');
    // HelperLog.texto(`${ClassName}.render`,'navigation = ' + JSON.stringify(this.props.navigation));

    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', }}>
         {/* <Image source={imglogoJD} style={ { width: 190, height: 80, borderWidth: 0, borderColor: 'red', }} /> */}
         <Image source={imglogoJD} style={{ width: '100%', height: '100%', borderWidth: 0, borderColor: 'red', }} />
      </View>
       );
   
  }

}

const mapStateToProps = state => ({
  // txtEmail           : state.AuthReducer.txtEmail,
  // txtSenha           : state.AuthReducer.txtSenha, 
});

const mapDispatchToProps = { };

//export default SplashScreen;
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);