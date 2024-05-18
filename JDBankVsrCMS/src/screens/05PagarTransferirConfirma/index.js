import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, Animated, Easing, } from 'react-native';
import LottieView from 'lottie-react-native';
import { TextInputMask } from 'react-native-masked-text';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesome, } from '@expo/vector-icons';
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

const ClassName = 'PagarTransferirConfirmaScreen';

class PagarTransferirConfirmaScreen extends Component { 

  // state = { };

  constructor(props){
     super(props); 
     //HelperLog.entrada(`${ClassName}.constructor`);
     try {
        
      this.state = { isLoadingDadosRecebedor: true, isLoadingPagamento: false, valor: 0, };

     }catch(err) {
        //HelperLog.erro(`${ClassName}.constructor`);
     }finally {
        //HelperLog.saida(`${ClassName}.constructor`);
     }
  }

  componentDidMount() {
     //HelperLog.entrada(`${ClassName}.componentDidMount`);
     try {

        const valorRecebedor = HelperNumero.isNumber( this.props.navigation.getParam('valorRecebedor', '0')) ?  parseFloat( this.props.navigation.getParam('valorRecebedor', '0') ) : '0';
        this.setState({ isLoadingDadosRecebedor: true, isLoadingPagamento: false, valor: valorRecebedor, });
        this._buscarDadosRecebedor();

     }catch(err) {
        //HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentDidMount`);
     }
  }
    
  _buscarDadosRecebedor = async () => {
    //HelperLog.entrada(`${ClassName}._buscarDadosRecebedor`);
    try {

      this.setState({ isLoadingDadosRecebedor: true, });
      const chaveRecebedor = this.props.navigation.getParam('chaveRecebedor', '');
      const userURL = this.props.navigation.getParam('userURL', CONSTANTE.URL_PAGADOR);

      //HelperLog.texto(`${ClassName}._buscarDadosRecebedor`,'chaveRecebedor = ' + chaveRecebedor);
      //HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.url - ' + userURL+ CONSTANTE.URL_GET_CHAVE + encodeURIComponent( escape( chaveRecebedor ) ) );

      axios({ 
        method: 'get',
        url: userURL + CONSTANTE.URL_GET_CHAVE + '?chave='+encodeURIComponent( escape( chaveRecebedor ) ),
        timeout: CONSTANTE.URL_TIMEOUT, 
        headers: { 'Content-Type': 'application/json; charset=utf-8' }, 
      })
      .then( (response) => { 
          try {

            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data '+response.data);
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data '+JSON.stringify(response.data));

            const ispbRecebedor       = response.data.ispb;
            const nomeBancoRecebedor  = response.data.nomeBanco;
            const tipoPessoaRecebedor = response.data.tipoPessoa;
            const documentoRecebedor  = response.data.documento;
            const agenciaRecebedor    = response.data.agencia;
            const contaRecebedor      = response.data.conta;
            const tipoContaRecebedor  = response.data.tipoConta;
            const nomeRecebedor       = response.data.nome;
            chaveRecebedor
            
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data.ispb; '       + ispbRecebedor);
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data.nomeBanco; '  + nomeBancoRecebedor);
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data.tipoPessoa; ' + tipoPessoaRecebedor);
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data.documento; '  + documentoRecebedor);
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data.agencia; '    + agenciaRecebedor);
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data.conta; '      + contaRecebedor);
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data.tipoConta; '  + tipoContaRecebedor);
            // HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response.data.nome; '       + nomeRecebedor);
            this.props.navigation.setParams({ 
              chaveRecebedor      : chaveRecebedor, 
              ispbRecebedor       : ispbRecebedor, 
              nomeBancoRecebedor  : nomeBancoRecebedor, 
              tipoPessoaRecebedor : tipoPessoaRecebedor, 
              documentoRecebedor  : documentoRecebedor, 
              agenciaRecebedor    : agenciaRecebedor, 
              contaRecebedor      : contaRecebedor, 
              tipoContaRecebedor  : tipoContaRecebedor, 
              nomeRecebedor       : nomeRecebedor, 
            });
            
            this.setState({ isLoadingDadosRecebedor: false, });

          } catch (err) {
              Alert.alert('Erro(Response): ' + err.message); 
              //HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.response: ' + err.message);
          }
      })
      .catch( (err) => { 
        if (err.response) {
          Alert.alert('Telefone não cadastrada - ' + chaveRecebedor ); 
          this.props.navigation.navigate('PagarTransferir');
          // HelperLog.texto(`${ClassName}._buscarDadosRecebedor.axios`, 'axios.err.response.status: '    + err.response.data.status          );
          // HelperLog.texto(`${ClassName}._buscarDadosRecebedor.axios`, 'axios.err.response.dada: '      + err.response.data                 );
          // HelperLog.texto(`${ClassName}._buscarDadosRecebedor.axios`, 'axios.err.response.dada.JSON: ' + JSON.stringify(err.response.data) );
        }
        else if (err.request) {
          Alert.alert('Erro na Requição'); 
          //HelperLog.texto(`${ClassName}._buscarDadosRecebedor.axios`, 'axios.err.request: ' + err.request );
        }else {
          Alert.alert(err.message); 
          //HelperLog.texto(`${ClassName}._buscarDadosRecebedor.axios`, 'axios.err.message: ' + err.message );
        }
        // HelperLog.texto(`${ClassName}._buscarDadosRecebedor.axios`, 'axios.err: ' + JSON.stringify(err) );
      })
      .finally(function () {
        //HelperLog.texto(`${ClassName}._buscarDadosRecebedor`, 'axios.finally');
      });

    }catch(err) {
      Alert.alert('Erro(Geral): ' + err.message);
      //HelperLog.erro(`${ClassName}._buscarDadosRecebedor`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._buscarDadosRecebedor`);
    }
  }

  _onPressAgendarPagtoQRCode = async () => { 
    //HelperLog.entrada(`${ClassName}._onPressAgendarPagtoQRCode`);
    try {

      Alert.alert('Pagto Agendado!'); 
      this.props.navigation.navigate('Home');

    }catch(err) {
      //HelperLog.erro(`${ClassName}._onPressAgendarPagtoQRCode`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._onPressAgendarPagtoQRCode`);
    }
  }
  
  _onPressEfetuarPagtoQRCode = async () => { 
    //HelperLog.entrada(`${ClassName}._onPressEfetuarPagtoQRCode`);
    try {

      const pagChave       = this.props.navigation.getParam('userChave', '');
      const pagIspb        = this.props.navigation.getParam('userIspb', '');
      const aphNomeBanco   = this.props.navigation.getParam('userNomeBanco', '');
      const pagTipoPessoa  = this.props.navigation.getParam('userTipoPessoa', '');
      const pagDocumento   = this.props.navigation.getParam('userDocumento', '');
      const pagAgencia     = this.props.navigation.getParam('userAgencia', '');
      const pagConta       = this.props.navigation.getParam('userConta', '');
      const pagTipoConta   = this.props.navigation.getParam('userTipoConta', '');
      const pagNome        = this.props.navigation.getParam('userNome', '');
      const userSaldo      = HelperNumero.isNumber(this.props.navigation.getParam('userSaldo', '0')) ?  parseFloat( this.props.navigation.getParam('userSaldo', '0') ) : 0;
      const userBGColor    = this.props.navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
      
      const recChave       = this.props.navigation.getParam('chaveRecebedor', '');
      const recIspb        = this.props.navigation.getParam('ispbRecebedor', '');
      const recNomeBanco   = this.props.navigation.getParam('nomeBancoRecebedor', '');
      const recTipoPessoa  = this.props.navigation.getParam('tipoPessoaRecebedor', '');
      const recDocumento   = this.props.navigation.getParam('documentoRecebedor', '');
      const recAgencia     = this.props.navigation.getParam('agenciaRecebedor', '');
      const recConta       = this.props.navigation.getParam('contaRecebedor', '');
      const recTipoConta   = this.props.navigation.getParam('tipoContaRecebedor', '');
      const recNome        = this.props.navigation.getParam('nomeRecebedor', '');
      const infoRecebedor  = this.props.navigation.getParam('infoRecebedor', '123');

      let valorRecebedor = 0;
      valorRecebedor = HelperNumero.isNumber(this.props.navigation.getParam('valorRecebedor', '0')) ? parseFloat( this.props.navigation.getParam('valorRecebedor', '0') ) : 0;
      if ( valorRecebedor <= 0 ) {
        valorRecebedor = parseFloat( HelperNumero.GetValorDecimal(this.state.valor) ); // HelperNumero.isNumber(this.state.valor) ?  parseFloat(this.state.valor) : 0;
      }

      if ( pagChave.trim() == '' ) {
        Alert.alert('Dados do Pagador Vazio.'); 
       // HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'Dados do Pagador Vazio..................');
       return false;
     }
     
      if ( recChave.trim() == '' ) {
         Alert.alert('Dados do Recebedor Vazio.'); 
        // HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'Dados do Recebedor Vazio..................');
        return false;
      }
      
      if ( valorRecebedor <= 0 ) {
        Alert.alert('Valor do Pagamento não Informado.'); 
        // HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'Valor do Pagamento não Informado..................');
        return false;
      }

      this.setState({ isLoadingPagamento: true, });      

      //const data = {"pag-ador": {"ispb": 4358798, "tipoPessoa": 1,"tipoConta": 1,"agencia": "1","conta": "1234657-9","documento": 22222222222,"nome": "Fulano Pagador"},"recebedor": {  "ispb": 84701762,"tipoPessoa": 1,"documento": 11111111111,"agencia": "1","conta": "1234657-7","tipoConta": 1,"nome": "Fulano de Recebedor"},"valor": 55.99,"customInformation":"123"};
      const data = JSON.parse(`{"pagador":{"ispb":${pagIspb}, "tipoPessoa":${pagTipoPessoa},"tipoConta":${pagTipoConta},"agencia":"${pagAgencia}","conta":"${pagConta}","documento":${pagDocumento},"nome":"${pagNome}"},"recebedor":{  "ispb":${recIspb},"tipoPessoa":${recTipoPessoa},"documento":${recDocumento},"agencia":"${recAgencia}","conta":"${recConta}","tipoConta":${recTipoConta},"nome":"${recNome}"},"valor":${valorRecebedor},"customInformation":"${infoRecebedor}"}`);

      const userURL = this.props.navigation.getParam('userURL', CONSTANTE.URL_PAGADOR);

      //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.url - ' + userURL + CONSTANTE.URL_PAGAR_QRCODE);
      //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.data - ' +data);
      //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.data - ' +JSON.stringify({ data }));

      axios({ 
        method: 'post',
        url: userURL + CONSTANTE.URL_PAGAR_QRCODE,
        timeout: CONSTANTE.URL_TIMEOUT, 
        headers: { 'Content-Type': 'application/json; charset=utf-8' },          
        data: data,
        })
      .then( (response) => { 
        try {

            this.setState({ isLoadingPagamento: false, });

            //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.response.data: '            + response.data                 );
            //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.response.data.JSON: '       + JSON.stringify(response.data) );
            //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.response.data.headerId: '   + response.data.headerId        ); // dados do recebido
            //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.response.data.mensagemId: ' + response.data.mensagemId      );

            this.props.navigation.navigate('PagarTransferirRecibo', { 
              userURL             : userURL, 
              userSaldo           : userSaldo, 
              userBGColor         : userBGColor, 
              chaveRecebedor      : recChave, 
              ispbRecebedor       : recIspb, 
              nomeBancoRecebedor  : recNomeBanco, 
              tipoPessoaRecebedor : recTipoPessoa, 
              documentoRecebedor  : recDocumento, 
              agenciaRecebedor    : recAgencia, 
              contaRecebedor      : recConta, 
              tipoContaRecebedor  : recTipoConta, 
              nomeRecebedor       : recNome, 
              valorRecebedor      : valorRecebedor, 
            });

          } catch (err) {
            Alert.alert('Erro(Response): ' + err.message); 
            //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.response.catch: ' + err.message);
          }
      })
      .catch( (err) => {    
        this.setState({ isLoadingPagamento: false, });
        if (err.response) {
          Alert.alert('Falha ao Realizar o Pagamento.'); 
          //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode.axios`, 'axios.err.response.status: '    + err.response.data.status          );
          //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode.axios`, 'axios.err.response.dada: '      + err.response.data                 );
          //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode.axios`, 'axios.err.response.dada.JSON: ' + JSON.stringify(err.response.data) );
        }
        else if (err.request) {
          Alert.alert('Erro na Requição'); 
          //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode.axios`, 'axios.err.request: ' + err.request );
        }else {
          Alert.alert(err.message); 
          //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode.axios`, 'axios.err.message: ' + err.message );
        }
        //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode.axios`, 'axios.err: ' + JSON.stringify(err) );
      })
      .finally(function () {
        //HelperLog.texto(`${ClassName}._onPressEfetuarPagtoQRCode`, 'axios.finally');
      });  

    }catch(err) {
      this.setState({ isLoadingPagamento: false, });
      Alert.alert('Erro(Geral): ' + err.message);   
      //HelperLog.erro(`${ClassName}._onPressEfetuarPagtoQRCode`, err.message);
    }finally {
      //HelperLog.saida(`${ClassName}._onPressEfetuarPagtoQRCode`);
    }
  };
    
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
                <Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Confirmação de Pagamento</Text>
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

    const { navigation }      = this.props;
    //const userChave           = navigation.getParam('userChave', '');
    //const userNome            = navigation.getParam('userNome', '');
    const userBGColor         = navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);
    const userBGColorScreen   = userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE; 
    
    const chaveRecebedor      = navigation.getParam('chaveRecebedor', '');   
    const nomeBancoRecebedor  = navigation.getParam('nomeBancoRecebedor', ''); 
    const agenciaRecebedor    = navigation.getParam('agenciaRecebedor', ''); 
    const contaRecebedor      = navigation.getParam('contaRecebedor', '');  
    const nomeRecebedor       = navigation.getParam('nomeRecebedor', '');
    const valorRecebedor      = HelperNumero.isNumber(navigation.getParam('valorRecebedor', '0,00')) ? parseFloat( navigation.getParam('valorRecebedor', '0,00') ) : 0;
    
    //HelperLog.texto(`${ClassName}.render`,'navigation.valorRecebedor = ' + valorRecebedor);
    //HelperLog.texto(`${ClassName}.render`,'state.valor = ' + this.state.valor);

    return(
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, backgroundColor: userBGColorScreen, }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue',}}>

          <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', height: '70%', borderRadius: 25, backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue', }}>

                {/* <ActivityIndicator color='#000' size='large' style={{ }} /> */}

              {
                 this.state.isLoadingDadosRecebedor
                ? 
                  <LottieView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, }} source={require('../../lottie/201-simple-loader.json')} autoPlay loop />
                : 
                <View style={{ flex: 1,  width: '100%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', }}>

                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16, marginBottom: 5, }}>{ valorRecebedor <= 0 && 'Informe o'} Valor do Pagamento</Text>

                    {
                        valorRecebedor > 0 
                      ? 
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30, marginBottom: 20, }}> R$ {HelperNumero.GetMascaraValorDecimal(valorRecebedor)} </Text>
                      : 
                        <TextInputMask 
                          type={'money'} 
                          options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }} 
                          value={this.state.valor} 
                          onChangeText={ (value) => { this.setState({valor: value})}} 
                          onSubmitEditing={Keyboard.dismiss}
                          style={{  textAlign: "center", fontSize: 25, fontWeight: "bold",  height: 40, borderBottomWidth: 1, borderBottomColor: '#555', color: '#000', backgroundColor: '#fff', marginBottom: 30, width: '80%', }} 
                        />  
                    }

                    <Text style={{ color: '#555', fontSize: 18, marginBottom: 10, }}> para <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, }}>{nomeRecebedor}</Text> </Text>

                    <Text style={{ color: '#555', fontSize: 15, marginBottom: 10, }}> Celular: <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{HelperNumero.GetMascaraTelefone(chaveRecebedor)}</Text> </Text>

                    <Text style={{ color: '#000', fontSize: 18, marginBottom: 5, }}> <Text style={{ fontWeight: 'bold', }}>{nomeBancoRecebedor}</Text> </Text>

                    <Text style={{ color: '#555', fontSize: 15, }}>Agência: <Text style={{ fontWeight: 'bold', }}>{agenciaRecebedor}</Text>  ||  Conta: <Text style={{ fontWeight: 'bold', }}>{contaRecebedor}</Text> </Text>

                </View>
              }

          </View>

        </View>

        <View style={{ marginLeft: 25, marginRight: 25, marginBottom: 10, borderWidth: 0, borderColor: 'red', }}>

            {
                this.state.isLoadingDadosRecebedor
              ? 
                null 
              : 
              <View style={{ }}>

                <TouchableOpacity style={{ borderRadius: 10, marginBottom: 10, height: 50, padding: 12, backgroundColor: '#fff', }} onPress={() => { Keyboard.dismiss();  this._onPressEfetuarPagtoQRCode(); }}>
                    {
                        this.state.isLoadingPagamento
                    ? 
                        <ActivityIndicator color='#000' size='small' style={{ }} /> 
                    : 
                        <Text style={{ paddingLeft: 5, textAlign:'center', color: '#555', fontWeight: 'bold', fontSize: 20, }}> 
                          <FontAwesome style={{ color: '#555', fontSize: 20, }} name="dollar" />
                          <Text style={{ }}>  Pagar</Text> 
                        </Text> 
                    }
                </TouchableOpacity>
                
                <TouchableOpacity style={{ borderRadius: 10, height: 50, padding: 12, backgroundColor: '#fff', }} onPress={() => { Keyboard.dismiss();  this._onPressAgendarPagtoQRCode(); }}>
                    <Text style={{ paddingLeft: 5, textAlign:'center', color: '#555', fontWeight: 'bold', fontSize: 20, }}> 
                      <FontAwesome style={{ color: '#555', fontSize: 20, }} name="calendar" />
                      <Text style={{ }}>   Agendar </Text> 
                    </Text> 
                </TouchableOpacity>

              </View>
            }

        </View>

      </KeyboardAvoidingView>
    );
  }

}

const mapStateToProps = state => ({
  // txtEmail           : state.AuthReducer.txtEmail,
  // txtSenha           : state.AuthReducer.txtSenha, 
});

const mapDispatchToProps = { };

//export default PagarTransferirConfirmaScreen;
export default connect(mapStateToProps, mapDispatchToProps)(PagarTransferirConfirmaScreen);