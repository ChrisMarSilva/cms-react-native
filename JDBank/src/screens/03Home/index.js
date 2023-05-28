import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Alert, Image, BackHandler, Platform, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, } from '@expo/vector-icons'; // Ionicons,MaterialCommunityIcons
import { Audio } from 'expo-av'; 
import axios from 'axios';
import { connect } from 'react-redux';
import * as signalR from '@aspnet/signalr';
import * as HelperLog from '../../util/HelperLog';
//import * as HelperSessao from '../../util/HelperSessao';
import * as HelperNumero from '../../util/HelperNumero';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

import imgBluePerson from '../../imgs/person-blue.jpg';
import imgRedPerson  from '../../imgs/person-red.jpg';

const ClassName = 'HomeScreen';// this.constructor.name

class HomeScreen extends Component { 

  // state = { };

  constructor(props){
     super(props); 
     //HelperLog.entrada(`${ClassName}.constructor`);
     try {
        
        this.state = { };
        this._onPressNotificacao = this._onPressNotificacao.bind(this);
        this.props.navigation.setParams({ userSaldo: 0.00});
        this._getDadosSessao(); 

     }catch(err) {
        //HelperLog.erro(`${ClassName}.constructor`);
     }finally {
        //HelperLog.saida(`${ClassName}.constructor`);
     }
  }

  componentDidMount() {
     //HelperLog.entrada(`${ClassName}.componentDidMount`);
     try {   

        //this.setState({ });

        //if (Platform.OS === 'android'){
        //BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        //BackHandler.addEventListener('hardwareBackPress', () => true ); // Cancelar BtnGoBack
        //}

        this.props.navigation.setParams({ visiblePagRec: false, _onPressNotificacao: this._onPressNotificacao });
        //this.props.navigation.setParams({ visiblePagRec: true, });
        this._getDadosSaldo(); 
        this._getDadosRecebimentoSignalR(); 

     }catch(err) {
        //HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentDidMount`);
     }
  }
   
  componentWillUnmount() {
     //HelperLog.entrada(`${ClassName}.componentWillUnmount`);
     try {

        //if (Platform.OS === 'android'){
        //BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        //BackHandler.remove();
        //}

     }catch(err) {
        // HelperLog.erro(`${ClassName}.componentWillUnmount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentWillUnmount`);
     }
  }

  onBackPress = () => {
     return true; 
  }
  
  _getDadosSessao = async () => {
      //HelperLog.entrada(`${ClassName}._getDadosSessao`);
    try {

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

      // this.props.navigation.setParams({ 
      //   userURL        : userURL, 
      //   userChave      : userChave, 
      //   userIspb       : userIspb, 
      //   userNomeBanco  : userNomeBanco, 
      //   userTipoPessoa : userTipoPessoa, 
      //   userDocumento  : userDocumento, 
      //   userAgencia    : userAgencia, 
      //   userConta      : userConta, 
      //   userTipoConta  : userTipoConta, 
      //   userNome       : userNome, 
      //   userCidade     : userCidade, 
      //   userIcon       : userIcon, 
      //   userBGColor    : userBGColor, 
      // });

    }catch(err) {
      //HelperLog.erro(`${ClassName}._getDadosSessao`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._getDadosSessao`);
    }
  }

  _getDadosSaldo = async () => {
      // HelperLog.entrada(`${ClassName}._getDadosSaldo`);
      try {

          const userAgencia = this.props.navigation.getParam('userAgencia', '');
          const userConta   = this.props.navigation.getParam('userConta', '');
          const userURL     = this.props.navigation.getParam('userURL', CONSTANTE.URL_PAGADOR) + CONSTANTE.URL_GET_SALDO + '/' + userAgencia +'/'+ userConta; 

          // HelperLog.texto(`${ClassName}._getDadosSaldo`, 'URL: "' + userURL +'"');
          // HelperLog.entrada(`${ClassName}._getDadosSaldo.axios`);

         axios({ 
            method: 'get',
            url: userURL ,
            timeout: CONSTANTE.URL_TIMEOUT, 
            headers: { 'Content-Type': 'application/json; charset=utf-8' }, 
            })
         .then( (response) => {  
            try {

                //HelperLog.texto(`${ClassName}._getDadosSaldo.axios, 'response`);
                //HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.response.data '+response.data);
                //HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.response.data-typeof '+typeof(response.data));
                                
                // let JSONString = response.data;
                // let JSONObj = undefined;
                // if( typeof(JSONString) === 'string') JSONObj = JSON.parse( JSONString.trim() );
                // if( typeof(JSONString) === 'object') JSONObj = JSONString; 
                // let Resultado = JSONObj.data.Resultado; 

                const userSaldo = HelperNumero.isNumber( response.data ) ? parseFloat( response.data ) : 0;
                // HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'userSaldo '+userSaldo);

                this.props.navigation.setParams({ userSaldo: userSaldo, });
               
            } catch (err) {
               Alert.alert('Erro(Response): ' + err.message); 
            }
         })
         .catch( (err) => {  
            Alert.alert('Erro(Requição): ' + err.message);
            // if (err.response) {
            //    Alert.alert( JSON.parse(err.response.data.message).descricao ); 
            //    HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err.response.status: '                 + err.response.data.status            );
            //    HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err.response.headers: '                + err.response.data.headers           );
            //    HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err.response.dada: '                   + err.response.data                   );
            //    HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err.response.dada.statusCode: '        + err.response.data.statusCode        );
            //    HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err.response.dada.message: '           + err.response.data.message           );
            //    HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err.response.dada.message.descricao: ' + JSON.parse(err.response.data.message).descricao );
            // }
            // else if (err.request) {
            //    Alert.alert('Erro na Requição'); 
            //    HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err.request: ' + err.request );
            // }else {
            //    Alert.alert(err.message); 
            //    HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err.message: ' + err.message );
            // }
            // HelperLog.texto(`${ClassName}._getDadosSaldo.axios`, 'axios.err: ' + JSON.stringify(err) );
         })
         .finally(function () {
            // HelperLog.saida(`${ClassName}._getDadosSaldo.axios`);
         });

      }catch(err) {
         Alert.alert('Erro(Geral): ' + err.message);
         // HelperLog.erro(`${ClassName}._getDadosSaldo`, err.message);
      }finally {
         // HelperLog.saida(`${ClassName}._getDadosSaldo`);
      }
   }

  _getDadosRecebimentoSignalR = async () => {
    //HelperLog.entrada(`${ClassName}._getDadosRecebimentoSignalR`);
    try {

      const userChave     = this.props.navigation.getParam('userChave', '');
      const userNomeBanco = this.props.navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR);
      const userURL       = this.props.navigation.getParam('userURL',       CONSTANTE.URL_PAGADOR);
      // HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `url: ${userURL + CONSTANTE.URL_RECEBE_PAGTO}`);

      //var transport = TransportType.WebSockets;
      //let logger = new ConsoleLogger(LogLevel.Information);

      let connection = new signalR.HubConnectionBuilder()  
        .withUrl( userURL + CONSTANTE.URL_RECEBE_PAGTO, {
          transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
          'content-type': 'application/json',
          //logging: logger,
          // accessTokenFactory: () => authToken   //for authorization
        })
        //.WithTransport(transportType)
        //.WithMessageHandler(handler)
        //.WithConsoleLogger()
        //.configureLogging(signalR.LogLevel.Trace) // Trace = 0	Log level for very low severity diagnostic messages.
        //.configureLogging(signalR.LogLevel.Debug) // Debug = 1	Log level for low severity diagnostic messages.
        //.configureLogging(signalR.LogLevel.Information) // Information = 2	Log level for informational diagnostic messages.
        //.configureLogging(signalR.LogLevel.Warning) // Warning = 3	Log level for diagnostic messages that indicate a non-fatal problem.
        //.configureLogging(signalR.LogLevel.Error) // Error = 4	Log level for diagnostic messages that indicate a failure in the current operation.
        //.configureLogging(signalR.LogLevel.Critical) // Critical = 5	Log level for diagnostic messages that indicate a failure that will terminate the entire application.
        .configureLogging(signalR.LogLevel.None) // None = 6	The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted.
        .build();

    connection.on('AtualizarSaldo', (agencia, conta, valor) => {
        try {
 
           // HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `AtualizarSaldo`); 
         
          //  HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR.axios`, 'agencia: '+agencia);
          //  HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR.axios`, 'conta: '+conta);
          //  HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR.axios`, 'valor: '+valor);

          const userAgencia = this.props.navigation.getParam('userAgencia', '');
          const userConta   = this.props.navigation.getParam('userConta', '');

          //  HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR.axios`, 'userAgencia: '+userAgencia);
          //  HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR.axios`, 'userAgencia: '+userConta);

          if ( (userAgencia == agencia) && (userConta == conta) )
            this.props.navigation.setParams({ userSaldo: HelperNumero.isNumber( valor ) ? parseFloat( valor ) : 0, });

        }catch(err) {
          //HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `02 - Erro ao Receber Dados para a Chave ${HelperNumero.GetMascaraTelefone(userChave)}: ${err.message}`);
        }finally {
          //HelperLog.saida(`${ClassName}._getDadosRecebimentoSignalR`);
        };
      });

      connection.on('ReceivePayment', (agencia, conta, documento, tipoPessoa, nome, valor) => {
        try {

           // HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `ReceivePayment`); 

           this._getTocarSom();
         
          //HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `01 - mensagem do servidor: agencia="${agencia}" conta="${conta}" documento="${documento}" tipoPessoa="${tipoPessoa}" nome="${nome}" valor="${valor}"`); 
          //const valorFormatado = HelperNumero.isNumber(valor) ? parseFloat( valor ) : 0;
          //Alert.alert(`Pagto Recebido de ${nome} no valor de R$ ${HelperNumero.GetMascaraValorDecimal(valorFormatado)}`);
          //Alert.alert(`Pagto Recebido ${"\n"} ${nome} ${"\n"} R$ ${HelperNumero.GetMascaraValorDecimal(valorFormatado)}`);
          //Alert.alert(`Pagto Recebido de ${nome} no valor de R$ ${valor}`);

          this.props.navigation.setParams({ 
            visiblePagRec    : true,
            tipoPessoaPagRec : tipoPessoa, 
            documentoPagRec  : documento, 
            agenciaPagRec    : agencia, 
            contaPagRec      : conta, 
            nomePagRec       : nome, 
            valorPagRec      : HelperNumero.isNumber(valor) ? parseFloat(valor) : 0, 
            userBGColor      : this.props.navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO),
          });
          
          this._getDadosSaldo(); 

        }catch(err) {
          // HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `02 - Erro ao Receber Dados para a Chave ${HelperNumero.GetMascaraTelefone(userChave)}: ${err.message}`);
        }finally {
          //HelperLog.saida(`${ClassName}._getDadosRecebimentoSignalR`);
        };
      });

      connection
        .start()
        .then(  ()    => { 
              
            //HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `03 - Chave ${HelperNumero.GetMascaraTelefone(userChave)} - Conexão iniciada (id: ${connection.id}) com sucesso!`);
           // HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `03 - Chave ${HelperNumero.GetMascaraTelefone(userChave)} - URL: ${userURL + CONSTANTE.URL_RECEBE_PAGTO}`);
            
            this.initalAttemptForChat = true;

             //connection.invoke("ReceivePayment", {});
            //  proxy.invoke('helloServer', 'Hello Server, how are you?')
            //   .done((directResponse) => {
            //     console.log('direct-response-from-server', directResponse);
            //   }).fail(() => {
            //     console.warn('Something went wrong when calling server, it might not be up and running?')
            //   });

          })
        .catch( (err) => { 
           this.initalAttemptForChat = false;
          // console.error(err, 'red');
           //HelperLog.texto(`${ClassName}._getDadosRecebimentoSignalR`, `04 - Erro de Conexão para a Chave ${HelperNumero.GetMascaraTelefone(userChave)}: ${err}`);
         });
         
      // connection.stop();

        connection.onclose(() => {
          // console.info(this.connection)
          //console.info('CMS connection has been closed!')
           connection.start(); // trying to reconnect
         });


    }catch(err) {
      //HelperLog.erro(`${ClassName}._getDadosRecebimentoSignalR`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._getDadosRecebimentoSignalR`);
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
      // await soundObject.loadAsync(source);   await soundObject.loadAsync(source, status, false);
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

  _onPressGenerico = async ( nameScreen ) => {
    //HelperLog.entrada(`${ClassName}._onPressGenerico`);
    try {
      
       const userURL        = this.props.navigation.getParam('userURL', CONSTANTE.URL_PAGADOR);
       const userChave      = this.props.navigation.getParam('userChave', '');
       const userIspb       = this.props.navigation.getParam('userIspb', CONSTANTE.ISPB_PAGADOR);
       const userNomeBanco  = this.props.navigation.getParam('userNomeBanco', CONSTANTE.NOME_PAGADOR);
       const userTipoPessoa = this.props.navigation.getParam('userTipoPessoa', '');
       const userDocumento  = this.props.navigation.getParam('userDocumento', '');
       const userAgencia    = this.props.navigation.getParam('userAgencia', '');
       const userConta      = this.props.navigation.getParam('userConta', '');
       const userTipoConta  = this.props.navigation.getParam('userTipoConta', '');
       const userNome       = this.props.navigation.getParam('userNome', '');
       const userCidade     = this.props.navigation.getParam('userCidade', '');
       const userSaldo      = HelperNumero.isNumber(this.props.navigation.getParam('userSaldo', '0')) ?  parseFloat( this.props.navigation.getParam('userSaldo', '0') ) : 0;
       const userBGColor    = this.props.navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);       
       const userIcon       = this.props.navigation.getParam('userIcon', CONSTANTE.ICON_PAGADOR);   

       // this.props.navigation.push('Details')
       // this.props.navigation.navigate('Details')

       this.props.navigation.push(nameScreen, { 
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
         userIcon       : userIcon,
         valorReceber   : 0,
     });
          
    }catch(err) {
       //HelperLog.erro(`${ClassName}._onPressGenerico`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._onPressGenerico`);
    };
 }

  _onPressPagarTransferir = async () => {
     //HelperLog.entrada(`${ClassName}._onPressPagarTransferir`);
     try {
        
        this._onPressGenerico('PagarTransferir'); 
           
     }catch(err) {
        //HelperLog.erro(`${ClassName}._onPressPagarTransferir`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}._onPressPagarTransferir`);
     };
  }

  _onPressCobrarAlguem = async () => {
     //HelperLog.entrada(`${ClassName}._onPressPagarTransferir`);
     try {
        
        this._onPressGenerico('CobrarAlguem'); 
           
     }catch(err) {
        //HelperLog.erro(`${ClassName}._onPressCobrarAlguem`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}._onPressCobrarAlguem`);
     };
  }

  _onPressColocarDinheiro = async () => {
     //HelperLog.entrada(`${ClassName}._onPressColocarDinheiro`);
     try {
        
        // this._onPressGenerico('ColocarDinheiro'); 
           
     }catch(err) {
        //HelperLog.erro(`${ClassName}._onPressColocarDinheiro`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}._onPressColocarDinheiro`);
     };
  }

  _onPressMovimentacao = async () => {
    //HelperLog.entrada(`${ClassName}._onPressMovimentacao`);
    try {
        
      this._onPressGenerico('Movimentacao'); 

    }catch(err) {
      //HelperLog.erro(`${ClassName}._onPressMovimentacao`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._onPressMovimentacao`);
    };
  }

  _onPressPerfil = async () => {
    //HelperLog.entrada(`${ClassName}._onPressPerfil`);
    try {
        
      this._onPressGenerico('Perfil'); 

    }catch(err) {
      //HelperLog.erro(`${ClassName}._onPressPerfil`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._onPressPerfil`);
    };
  }

  _onPressNotificacao = async () => {
    //HelperLog.entrada(`${ClassName}._onPressNotificacao`);
    try {
        
      const tipoPessoaPagRec = this.props.navigation.getParam('tipoPessoaPagRec', '' );
      const documentoPagRec  = this.props.navigation.getParam('documentoPagRec',  '' );
      const agenciaPagRec    = this.props.navigation.getParam('agenciaPagRec',    '' );
      const contaPagRec      = this.props.navigation.getParam('contaPagRec',      '' );
      const nomePagRec       = this.props.navigation.getParam('nomePagRec',       '' );
      const valorPagRec      = HelperNumero.isNumber(this.props.navigation.getParam('valorPagRec', '0')) ?  parseFloat( this.props.navigation.getParam('valorPagRec', '0') ) : 0;
      const userBGColor      = this.props.navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO); 
      const userIcon         = this.props.navigation.getParam('userIcon', CONSTANTE.ICON_PAGADOR); 

      this.props.navigation.navigate('CobrarAlguemRecibo', { 
          tipoPessoaPagRec : tipoPessoaPagRec, 
          documentoPagRec  : documentoPagRec, 
          agenciaPagRec    : agenciaPagRec, 
          contaPagRec      : contaPagRec, 
          nomePagRec       : nomePagRec, 
          valorPagRec      : valorPagRec,
          userBGColor      : userBGColor,
          userIcon         : userIcon,
      });

    }catch(err) {
      //HelperLog.erro(`${ClassName}._onPressNotificacao`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._onPressNotificacao`);
    };
  }
    
  static navigationOptions = ({navigation}) => { 
    const { params = {} }  = navigation.state;
    const visiblePagRec    = navigation.getParam('visiblePagRec', true);
    const userBGColorFim   = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO); 
    const userBGColorMeio  = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL;  
    const userBGColorIni   = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO  : CONSTANTE.BG_HEADER_INI_AZUL;  
    const userlogo         = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3; 
    return { 
            headerBackground: ( <LinearGradient colors={[userBGColorIni, userBGColorMeio, userBGColorFim]} style={{ flex: 1, }} /> ), 
            // de cima pra baixo    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
            // de baixo pra cima    start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
            // direita pra esquerda start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            // esquerda pra direita start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
            // transversal          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            headerLeft: () => ( 
              <View style={{ }}>
                <Image style={{ resizeMode: 'cover', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: "#fff", marginLeft: 10, }} source={userlogo} />
              </View>
            ),
            headerTitle: () => ( 
              <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ marginLeft: 5, color: '#fff', fontSize: 20, fontWeight: 'bold', }}>{params.userNomeBanco}</Text>
              </View>
            ),
            headerRight: () => (
              <View style={{ flex:1, }}>
                  {
                    visiblePagRec
                    ?    
                    <TouchableOpacity style={{ flex:1, justifyContent: 'center', alignItems: 'center', }} onPress={navigation.getParam('_onPressNotificacao')}>
                        <FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold', }} name="bell-o" />
                    </TouchableOpacity>
                    : 
                    null
                  } 
              </View>
            ),  
        };
  };
  
  render() {

    //HelperLog.texto(`${ClassName}.render`,'Call');
    // HelperLog.texto(`${ClassName}.render`,'navigation = ' + JSON.stringify(this.props.navigation));

    const { navigation }    = this.props;
    //const userChave         = navigation.getParam('userChave', '');
    //const userIspb          = navigation.getParam('userIspb', '');
    //const userNomeBanco     = navigation.getParam('userNomeBanco', '');
    //const userTipoPessoa    = navigation.getParam('userTipoPessoa', '');
    //const userDocumento     = navigation.getParam('userDocumento', '');
    //const userAgencia       = navigation.getParam('userAgencia', '');
    //const userConta         = navigation.getParam('userConta', '');
    //const userTipoConta     = navigation.getParam('userTipoConta', '');
    const userNome          = navigation.getParam('userNome', '');
    //const userCidade        = navigation.getParam('userCidade', '');
    const userSaldo         = HelperNumero.isNumber(navigation.getParam('userSaldo', '0,00')) ?  parseFloat( navigation.getParam('userSaldo', '0,00') ) : 0;
    const userBGColor       = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
    //const userBGColorScreen = userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FRACO : CONSTANTE.BG_AZUL_FRACO;
    const userBGColorScreen = userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE; 
    const userIcon          = userBGColor == CONSTANTE.BG_VERMELHO ? imgRedPerson : imgBluePerson; 

    return(
      <View style={{ flex:1, backgroundColor: userBGColorScreen, }}> 

          <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', }}>

              <TouchableOpacity onPress={()=>this._onPressPerfil()}>
                <Image style={{ width: 80, height: 80, borderRadius: 60, borderWidth: 2, borderColor: '#fff', marginTop: 20, marginBottom: 10, }} source={userIcon} />
              </TouchableOpacity>

              <Text style={{ color: '#fff', fontSize: 15, marginBottom: 10, }}>Olá, <Text style={{ fontWeight: 'bold', }}>{userNome}</Text>!</Text>   
                            
              <Text style={{ color: '#fff', fontSize: 12, }}>Saldo Atual:</Text>  
              <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', }}>  R$ {HelperNumero.GetMascaraValorDecimal(userSaldo)}</Text>
              
          </View>

          <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: 'red', }}>
                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginTop: 2, marginLeft: 10, marginRight: 5, }}>
                    <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: userBGColor, backgroundColor: '#fff', shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15, }} activeOpacity={0.7} onPress={() => { this._onPressPagarTransferir(); }}>
                        <View style={{ alignItems: 'flex-end',  borderWidth: 0, borderColor: 'red',  }}>
                          <FontAwesome style={{ color: '#dcdcdc', fontSize: 50, }} name="credit-card" />
                        </View>
                        <Text style={{ paddingLeft: 5, textAlign:'left', color: '#555', fontWeight: 'bold', fontSize: 18, }}>pagar{"\n"}<Text style={{ fontSize: 14, }}>transferir</Text></Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 5, marginRight: 10, }}>
                    <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: userBGColor, backgroundColor: '#fff', shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15, }} activeOpacity={0.7} onPress={() => { this._onPressCobrarAlguem(); }}>
                        <View style={{ alignItems: 'flex-end',  borderWidth: 0, borderColor: 'red',  }}>
                          <FontAwesome style={{ color: '#dcdcdc', fontSize: 50, }} name="user-o" />
                        </View>
                        <Text style={{ paddingLeft: 5, textAlign:'left', color: '#555', fontWeight: 'bold', fontSize: 18, }}>cobrar{"\n"}<Text style={{ fontSize: 14, }}>alguém</Text></Text>
                    </TouchableOpacity>
                </View> 

          </View> 

          <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: 'red',  }}>
              
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 10, marginRight: 5, }}>
                  <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: userBGColor, backgroundColor: '#fff', shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15, }} activeOpacity={0.7} onPress={() => { this._onPressColocarDinheiro(); }}>
                      <View style={{ alignItems: 'flex-end',  borderWidth: 0, borderColor: 'red',  }}>
                        <FontAwesome style={{ color: '#dcdcdc', fontSize: 50, }} name="dollar" />
                      </View>
                      <Text style={{ paddingLeft: 5, textAlign:'left', color: '#555', fontWeight: 'bold', fontSize: 18, }}>colocar{"\n"}<Text style={{ fontSize: 14, }}>dinheiro</Text></Text>
                  </TouchableOpacity>
              </View>
              
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 5, marginRight: 10, }}>
                  <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: userBGColor, backgroundColor: '#fff', shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15, }} activeOpacity={0.7} onPress={() => { this._onPressMovimentacao(); }}>
                      <View style={{ alignItems: 'flex-end',  borderWidth: 0, borderColor: 'red',  }}>
                        <FontAwesome style={{ color: '#dcdcdc', fontSize: 50, }} name="book" />
                      </View>
                      <Text style={{ paddingLeft: 5, textAlign:'left', color: '#555', fontWeight: 'bold', fontSize: 18, }}>movimentação</Text>
                  </TouchableOpacity>
              </View>

          </View>

      </View>
    );
  }

}

const mapStateToProps = state => ({
  txtLoginChave : state.AuthReducer.loginchave,
});

const mapDispatchToProps = { };

//export default HomeScreen;
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);