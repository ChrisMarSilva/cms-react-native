import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome, } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import { LinearGradient } from 'expo-linear-gradient';
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import * as HelperDate from '../../util/HelperDate';
import * as CONSTANTE    from '../../util/Constante';
//import styles from './styles';

import imglogoJD from '../../imgs/icon-red.png';
import imglogoJ3 from '../../imgs/icon-blue.png';

const ClassName = 'MovimentacaoScreen'; // this.constructor.name

class MovimentacaoScreen extends Component { 

  // state = { };

  constructor(props){ 
     super(props); 
     //HelperLog.entrada(`${ClassName}.constructor`);
     try {
        
        this.state = { 
          isBtnTodosSelected : true,
          isBtnRectoSelected : false,
          isBtnPagtoSelected : false,
          dataPrinc          : null, 
          data               : null, 
        };

        this._renderEvent    = this._renderEvent.bind(this);
        this._onRefresh      = this._onRefresh.bind(this);
        this._onEndReached   = this._onEndReached.bind(this);
        this._renderFooter   = this._renderFooter.bind(this);
        this._onEventPress   = this._onEventPress.bind(this);
        this._renderDetail   = this._renderDetail.bind(this);

     }catch(err) {
        //HelperLog.erro(`${ClassName}.constructor`);
     }finally {
        //HelperLog.saida(`${ClassName}.constructor`);
     }
  }

  componentDidMount() {
     //HelperLog.entrada(`${ClassName}.componentDidMount`);
     try {

      this._onButtonTodas();

     }catch(err) {
        //HelperLog.erro(`${ClassName}.componentDidMount`, err.message);
     }finally {
        //HelperLog.saida(`${ClassName}.componentDidMount`);
     }
  }
  
  _renderEvent(){
    //HelperLog.entrada(`${ClassName}._renderEvent`);
    try {
    }catch(err) {
       //HelperLog.erro(`${ClassName}._renderEvent`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._renderEvent`);
    }
  }

  _onRefresh(){
    //HelperLog.entrada(`${ClassName}._onRefresh`);
    try {
      //set initial data
    }catch(err) {
       //HelperLog.erro(`${ClassName}._onRefresh`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._onRefresh`);
    }
  }

  _onEndReached(){
    //HelperLog.entrada(`${ClassName}._onEndReached`);
    try {
      //fetch next data
    }catch(err) {
       //HelperLog.erro(`${ClassName}._onEndReached`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._onEndReached`);
    }
  }

  _renderFooter(){
    //HelperLog.entrada(`${ClassName}._renderFooter`);
    try {
      //show loading indicator
      if (this.state.waiting) {
          return <ActivityIndicator />;
      } else {
          return <Text>~</Text>;
      }
    }catch(err) {
       //HelperLog.erro(`${ClassName}._renderFooter`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._renderFooter`);
    }
  }

  _onEventPress(data) {
    //HelperLog.entrada(`${ClassName}._onEventPress`);
    try {
      this.setState({ data: data });
    }catch(err) {
       //HelperLog.erro(`${ClassName}._onEventPress`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._onEventPress`);
    }
  }

  _renderDetail(rowData, sectionID, rowID) {
    return (
      <View style={{ flex:1, borderWidth: 0, borderColor: "#fff", }}>
        <Text style={{ fontSize: 13, fontWeight: 'bold',  color: '#fff', }}>{rowData.title}</Text>
        <Text style={{ fontSize: 15, color: '#fff', }}>{rowData.description}</Text>
        <Text style={{ fontSize: 17, color: '#fff', }}>R$ {HelperNumero.isNumber(rowData.value) ? HelperNumero.GetMascaraValorDecimal(parseFloat(rowData.value)) : HelperNumero.GetMascaraValorDecimal(0)}</Text>
      </View>
    )
  }

  _onButtonTodas() {
    //HelperLog.entrada(`${ClassName}._onButtonTodas`);
    try {

      //const userBGColor = this.props.navigation.getParam('userBGColor', CONSTANTE.BG_VERMELHO);

      //const dataAtual  = HelperDate.colcarFormacataoData(new Date());
      //const dataAtual = new Date().toLocaleDateString('pt-br'); //  toLocaleString
      //const dataAtual = new Date().toLocaleDateString('pt-br', { day: 'numeric', month: 'numeric', year: 'numeric', });
      //const dataAtual = new Date().toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: '4-digit', });

      const dt        = new Date();
      const dd        = ("0" + dt.getDate()).substr(-2);
      const mm        = ("0" + (dt.getMonth() + 1)).substr(-2) ;
      const yyyy      = dt.getFullYear();
      const dataAtual = dd + '/' + mm + '/' + yyyy;

      const dataPrinc  = [
        {time: dataAtual, title: 'Transferência recebida', description: 'Fulano de Tal #1', lineColor: 'transparent', type: 'R', value: 100,  }, 
        {time: dataAtual, title: 'Transferência enviada',  description: 'Fulano de Tal #2', lineColor: 'transparent', type: 'R', value: 200,  },
        {time: dataAtual, title: 'Cobrança em aberta',     description: 'Fulano de Tal #3', lineColor: 'transparent', type: 'R', value: 500,  }, 
        {time: dataAtual, title: 'Transferência recebida', description: 'Fulano de Tal #1', lineColor: 'transparent', type: 'R', value: 1000, }, 
        {time: dataAtual, title: 'Transferência enviada',  description: 'Fulano de Tal #2', lineColor: 'transparent', type: 'R', value: 1500, },
        {time: dataAtual, title: 'Cobrança em aberta',     description: 'Fulano de Tal #3', lineColor: 'transparent', type: 'R', value: 2000, }, 
        {time: dataAtual, title: 'Cobrança recebida',      description: 'Fulano de Tal #4', lineColor: 'transparent', type: 'P', value: 3000, }, 
        {time: dataAtual, title: 'Pagamento feito',        description: 'Fulano de Tal #5', lineColor: 'transparent', type: 'P', value: 4000, }, 
        {time: dataAtual, title: 'Cobrança recebida',      description: 'Fulano de Tal #4', lineColor: 'transparent', type: 'P', value: 5000, }, 
        {time: dataAtual, title: 'Pagamento feito',        description: 'Fulano de Tal #5', lineColor: 'transparent', type: 'P', value: 6000, }, 
      ];

      const data = dataPrinc;
    
      this.setState({ dataPrinc: dataPrinc, data: data, isBtnTodosSelected: true, isBtnRectoSelected: false, isBtnPagtoSelected: false, });

    }catch(err) {
       //HelperLog.erro(`${ClassName}._onButtonTodas`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._onButtonTodas`);
    }
  }

  _onButtonRecebimentos() {
    //HelperLog.entrada(`${ClassName}._onButtonRecebimentos`);
    try {

      const data = this.state.dataPrinc.filter( item => item.type == 'R' );
      this.setState({ data: data, isBtnTodosSelected: false, isBtnRectoSelected: true, isBtnPagtoSelected: false, });

    }catch(err) {
       //HelperLog.erro(`${ClassName}._onButtonRecebimentos`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._onButtonRecebimentos`);
    }
  }

  _onButtonPagamentos() {
    //HelperLog.entrada(`${ClassName}._onButtonPagamentos`);
    try {
      
     const data = this.state.dataPrinc.filter( item => item.type == 'P' );
     this.setState({ data: data, isBtnTodosSelected: false, isBtnRectoSelected: false, isBtnPagtoSelected: true, });

    }catch(err) {
       //HelperLog.erro(`${ClassName}._onButtonPagamentos`, err.message);
    }finally {
       //HelperLog.saida(`${ClassName}._onButtonPagamentos`);
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
                <Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Movimentações</Text>
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
  
    // Nenhum resultado encontrado com esse filtro!

    return(
     <View style={{ flex: 1, backgroundColor: userBGColorScreen, }}>

         <View style={{ flex: 1, backgroundColor: userBGColor, flexDirection: 'row', justifyContent: 'center', paddingTop: 20, borderWidth: 0, borderColor: 'blue', }}>
          
            <TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: this.state.isBtnTodosSelected ? '#fff' : userBGColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15, }} activeOpacity={0.7} onPress={() => { this._onButtonTodas(); } }>
                <Text style={{ fontSize: 16, paddingLeft: 5, textAlign:'left', color: this.state.isBtnTodosSelected ? userBGColor : '#fff', fontWeight: 'bold', }}> todas </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: this.state.isBtnRectoSelected ? '#fff' : userBGColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15, }} onPress={() => { this._onButtonRecebimentos(); } }>
                <Text style={{ fontSize: 16, paddingLeft: 5, textAlign:'left', color: this.state.isBtnRectoSelected ? userBGColor : '#fff', fontWeight: 'bold', }}> recebimentos </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ marginRight: 0, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: this.state.isBtnPagtoSelected ? '#fff' : userBGColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15, }} onPress={() => { this._onButtonPagamentos(); } }>
                <Text style={{ fontSize: 16, paddingLeft: 5, textAlign:'left', color: this.state.isBtnPagtoSelected ? userBGColor : '#fff', fontWeight: 'bold', }}> pagamentos </Text>
            </TouchableOpacity>
            
        </View>
        
        <View style={{ flex: 12, borderWidth: 0, borderColor: 'blue', }}>
            <Timeline
              data={this.state.data}
              //circleSize={20}
              circleColor={'transparent'} // '#dcdcdc'
              //innerCircle={'icon'} // timeline mode : 'none', 'dot', 'icon'
              // iconStyle={null}
              // lineColor='rgb(45,156,219)' // {userBGColor}
              // timeContainerStyle={{ minWidth:72, }}
              columnFormat={'single-column-right'}  // can be 'single-column-left', 'single-column-right', 'two-column'
              showTime={true}
              timeStyle={{ backgroundColor: 'transparent', color: '#fff', fontSize: 12, paddingRight: 10, paddingTop: 10, borderWidth: 0, borderColor: 'blue', }}
              //descriptionStyle={{ color: '#fff', borderWidth: 1, borderColor: 'blue', }}
              //titleStyle={{color: '#fff'}}
              //separator={false}
              //separatorStyle={{ backgroundColor: '#fff', marginRight: 20, borderWidth: 1, borderColor: 'blue', }}
              //rowContainerStyle={{ borderWidth: 0, borderColor: 'blue', }}
              ///timeContainerStyle={{ height: 0, width: 0, margin: 0, padding: 0, }}
              //detailContainerStyle={{ borderWidth: 0, borderColor: 'blue', }}
              options={{
                style:{ paddingTop: 10, paddingLeft: 10, borderWidth: 0, borderColor: 'blue', },
                //refreshControl: ( <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} /> ),
                //renderFooter: this._renderFooter,
                //onEndReached: this._onEndReached
              }}
              //onEventPress={this._onEventPress}
              //renderTime={null}
              renderDetail={this._renderDetail}
              //renderFullLine={this._renderDetail}
              //renderCircle={this.renderCircle}
              //renderEvent={this._renderEvent}
            />
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

//export default MovimentacaoScreen;
export default connect(mapStateToProps, mapDispatchToProps)(MovimentacaoScreen);