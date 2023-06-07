
import React from 'react';
import { Text, View, ScrollView, SafeAreaView, RefreshControl, TouchableOpacity, DatePickerAndroid, } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'

import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { modificaShowValue, modificaMsgPortfolio, buscaPortfolio, modificaVlrPatrimonio, modificaVlrPatrimonioAcoes, modificaPesoPatrimonioAcoes, modificaVlrPatrimonioFiis, modificaPesoPatrimonioFiis, modificaVlrPatrimonioEtfs, modificaPesoPatrimonioEtfs, modificaVlrPatrimonioBdrs, modificaPesoPatrimonioBdrs, modificaVlrPatrimonioCriptos, modificaPesoPatrimonioCriptos, } from '../store/ducks/portfolio'

// Icon.loadFont();

class Home extends React.Component {

  constructor(props) {
    super(props)
    this._HandleOnPressPortfolio = this._HandleOnPressPortfolio.bind(this)
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_VISIVEL).then((value) => this.props.modificaShowValue(value != 'N') ).done()
  }

  componentDidMount() {
    this._CarregarDados()
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.txtErroPortfolio != '') { 
      HelperToast.displayMsgError(text = this.props.txtErroPortfolio)
      this.props.modificaMsgPortfolio('')
    }
  }

  _CarregarDados = async () => {
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_PATRIMONIO).then((value)  => this.props.modificaVlrPatrimonio(         parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_ACOES_VLR).then((value)   => this.props.modificaVlrPatrimonioAcoes(    parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_ACOES_PRC).then((value)   => this.props.modificaPesoPatrimonioAcoes(   parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_FIIS_VLR).then((value)    => this.props.modificaVlrPatrimonioFiis(     parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_FIIS_PRC).then((value)    => this.props.modificaPesoPatrimonioFiis(    parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_ETFS_VLR).then((value)    => this.props.modificaVlrPatrimonioEtfs(     parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_ETFS_PRC).then((value)    => this.props.modificaPesoPatrimonioEtfs(    parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_BDRS_VLR).then((value)    => this.props.modificaVlrPatrimonioBdrs(     parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_BDRS_PRC).then((value)    => this.props.modificaPesoPatrimonioBdrs(    parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_CRIPTOS_VLR).then((value) => this.props.modificaVlrPatrimonioCriptos(  parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_CRIPTOS_PRC).then((value) => this.props.modificaPesoPatrimonioCriptos( parseFloat(value) || 0.00) ).done()


    this.props.buscaPortfolio() 
  }
  
  _HandleOnPressPortfolio = (index) => { 
    // this.props.navigation.setParams({ index: index, })    
    // this.props.navigation.navigate('Portfolio', { index: index })
    // this.props.navigation.push('Portfolio', { index: index })
    // this.props.navigation.navigate('PortfolioStack', { index: index })
    // this.props.navigation.dispatch({ ...CommonActions.setParams({ index: index }), source: route.key, });
    // this.props.navigation.dispatch( CommonActions.setParams({ index: index, }));
    // this.props.navigation.dispatch( CommonActions.navigate({ name: 'Portfolio', params: { index: index, }, }) )
    this.props.navigation.navigate('Portfolio', {screen: 'PortfolioStack', params: { index: index },})
  }
  
  _HandleOnPressVisivel = () => {
    this.props.modificaShowValue(!this.props.isShowValue) 
  }

  render() { 

    const txtNome              = this.props.txtNome
    const vlrPatrimonio        = HelperNumero.GetMascaraValorDecimal(this.props.vlrPatrimonio || 0.00)
    const vlrValorizacao       = HelperNumero.GetMascaraValorDecimal(this.props.vlrValorizacao || 0.00)
    const prcValorizacao       = HelperNumero.GetMascaraValorDecimal(this.props.prcValorizacao || 0.00)
    const vlrPatrimonioAcoes   = this.props.vlrPatrimonioAcoes || 0.00
    const prcPesoAcoes         = this.props.prcPesoAcoes || 0.00
    const vlrPatrimonioFiis    = this.props.vlrPatrimonioFiis || 0.00
    const prcPesoFiis          = this.props.prcPesoFiis || 0.00
    const vlrPatrimonioEtfs    = this.props.vlrPatrimonioEtfs || 0.00
    const prcPesoEtfs          = this.props.prcPesoEtfs || 0.00
    const vlrPatrimonioBdrs    = this.props.vlrPatrimonioBdrs || 0.00
    const prcPesoBdrs          = this.props.prcPesoBdrs || 0.00
    const vlrPatrimonioCriptos = this.props.vlrPatrimonioCriptos || 0.00
    const prcPesoCriptos       = this.props.prcPesoCriptos || 0.00
    const isShowValue          = this.props.isShowValue

    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.branco, }} contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={false} onRefresh={() => { this._CarregarDados() }}  title="Carregando..."  />} >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.default, }}>

          <View style={{ justifyContent: 'flex-end', marginLeft: 15, marginTop: 5, paddingBottom: 20, }}>
            <Text style={{ fontSize: 20, color: colors.branco, marginBottom: 5, }}>Olá, <Text style={{ fontWeight: "bold", }}>{txtNome}!</Text></Text>
            <Text style={{ fontSize: 10, color: colors.amarelo, }}>Seu Patrimônio Total é de</Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-between',}}>
              <Text style={{ fontSize: 25, color: colors.branco, fontWeight: "bold", }}>R$ {isShowValue ? vlrPatrimonio : '---'}</Text>
              <TouchableOpacity style={{ marginRight: 15, justifyContent: "center", }} onPress={() => this._HandleOnPressVisivel()} >
                {isShowValue ? <Feather name="eye-off" color="grey" size={25} /> : <Feather name="eye" color="grey" size={25} /> }
              </TouchableOpacity>
            </View> 
            <Text style={{ fontSize: 10, color: colors.amarelo, marginTop: 5, }}>Valorização</Text>
            <Text style={{ fontSize: 15, color: colors.branco, fontWeight: "bold", }}>R$ {isShowValue ? vlrValorizacao : '---'} <Text style={{ fontSize: 12, }}>( {isShowValue ? prcValorizacao : '---'}% )</Text></Text>
          </View>

          <View style={{ backgroundColor: colors.branco, padding: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 10, }}>

            <HomeMenu navigation={this.props.navigation} />

            <View style={{}}>
              { prcPesoAcoes   > 0.0 && <HomePortfolio _index={0} _nome={'AÇÕES'}   _total={vlrPatrimonioAcoes}   _percentual={prcPesoAcoes}   _visivel={isShowValue} _HandleOnPressPortfolio={this._HandleOnPressPortfolio} /> }
              { prcPesoFiis    > 0.0 && <HomePortfolio _index={1} _nome={'FIIs'}    _total={vlrPatrimonioFiis}    _percentual={prcPesoFiis}    _visivel={isShowValue} _HandleOnPressPortfolio={this._HandleOnPressPortfolio} /> }
              { prcPesoEtfs    > 0.0 && <HomePortfolio _index={2} _nome={'ETFs'}    _total={vlrPatrimonioEtfs}    _percentual={prcPesoEtfs}    _visivel={isShowValue} _HandleOnPressPortfolio={this._HandleOnPressPortfolio} /> }
              { prcPesoBdrs    > 0.0 && <HomePortfolio _index={3} _nome={'BDRs'}    _total={vlrPatrimonioBdrs}    _percentual={prcPesoBdrs}    _visivel={isShowValue} _HandleOnPressPortfolio={this._HandleOnPressPortfolio} /> }
              { prcPesoCriptos > 0.0 && <HomePortfolio _index={4} _nome={'CRIPTOS'} _total={vlrPatrimonioCriptos} _percentual={prcPesoCriptos} _visivel={isShowValue} _HandleOnPressPortfolio={this._HandleOnPressPortfolio} /> }
            </View>

          </View>     
          
        </SafeAreaView>
      </ScrollView>
    )
  }

}

function HomeMenu({ props, navigation }) {
  return(
    <View style={{ marginBottom: 5, }} >

      <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 10,  }} >
       
        {/* 
        <TouchableOpacity style={{}} onPress={() => navigation.navigate('ValorizacaoDia')}>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#5facdb", }}>
            <Icon name="line-chart" color={colors.branco} size={32} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>Valoriz. Dia</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('FatosRelevantesMes') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#7F3D66", }}>
            <Icon name="bullhorn" color={colors.branco} size={32} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>Fatos Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('NoticiasDia') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#7F783D", }}>
            <Ionicons name="ios-newspaper" color={colors.branco} size={32} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>Notícias Dia</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('OperacoesMes') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#ff7f50", }}>
            <Icon name="book" color={colors.branco} size={32} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>Oper. Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('ProventosReceber') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#3D7F57", }}>
            <Icon name="dollar" color={colors.branco} size={32} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>P. Receber</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('ProventosDivulgados') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#3D457F", }}>
            <Icon name="calendar" color={colors.branco} size={32} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>P. Divulgados</Text>
        </TouchableOpacity>
        
        */}
        
        <TouchableOpacity style={{}} onPress={() => navigation.navigate('ValorizacaoDia')}>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
            <Icon name="line-chart" color={"#316395"} size={30} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>Valoriz. Dia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('FatosRelevantesMes') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
            <Icon name="bullhorn" color={"#316395"} size={30} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>Fatos Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('NoticiasDia') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
            <Ionicons name="ios-newspaper" color={"#316395"} size={30} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>Notícias Dia</Text>
        </TouchableOpacity>
      </View> 
      
      <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 10, }} >
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('OperacoesMes') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
            <Icon name="book" color={"#316395"} size={30} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>Oper. Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('ProventosReceber') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
            <Icon name="dollar" color={"#316395"} size={30} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>P. Receber</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('ProventosDivulgados') }>
          <View style={{ alignItems: "center", justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
            <Icon name="calendar" color={"#316395"} size={30} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 5, color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>P. Divulgados</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

function HomePortfolio(props) {

  const index = props._index
  const nome = props._nome
  const total = props._total || 0.00
  const percentual = props._percentual || 0.00
  const visivel = props._visivel
  
  return(
    <View style={{ backgroundColor: colors.branco, height: 90, marginTop: 10, padding: 10, borderRadius: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: "row", }} onPress={() => { props._HandleOnPressPortfolio(index) }} >
        <View style={{ flex: 1, }}>
          <AnimatedCircularProgress size={80} width={10} fill={percentual} tintColor="#00e0ff" backgroundWidth={5} backgroundColor="#3d5875" arcSweepAngle={240} rotation={240} lineCap="round" >
            {(fill) => <Text style={{ alignItems: "center", fontWeight: "bold", fontSize: 12, color:"#3d5875", }}>{HelperNumero.GetMascaraValorDecimal(percentual)}%</Text>}
          </AnimatedCircularProgress>
        </View>
        <View style={{ flex: 2, justifyContent: 'center', }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 5, color: colors.cinza_escuro, }}>{nome}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: colors.default, }}>R$ {visivel ? HelperNumero.GetMascaraValorDecimal(total) : '---'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = state => ({
  // auth
  txtNome: state.login.txtNome,

  // portifolio - geral
  txtErroPortfolio: state.portfolio.txtErroPortfolio,
  isShowValue: state.portfolio.isShowValue,

  // portifolio - valores
  vlrPatrimonio: state.portfolio.vlrPatrimonio,
  vlrValorizacao: state.portfolio.vlrValorizacao,
  prcValorizacao: state.portfolio.prcValorizacao,
 
  vlrPatrimonioAcoes: state.portfolio.vlrPatrimonioAcoes,
  prcPesoAcoes: state.portfolio.prcPesoAcoes,
 
  vlrPatrimonioFiis: state.portfolio.vlrPatrimonioFiis,
  prcPesoFiis: state.portfolio.prcPesoFiis,
  
  vlrPatrimonioEtfs: state.portfolio.vlrPatrimonioEtfs,
  prcPesoEtfs: state.portfolio.prcPesoEtfs,

  vlrPatrimonioBdrs: state.portfolio.vlrPatrimonioBdrs,
  prcPesoBdrs: state.portfolio.prcPesoBdrs,

  vlrPatrimonioCriptos: state.portfolio.vlrPatrimonioCriptos,
  prcPesoCriptos: state.portfolio.prcPesoCriptos,

})

const mapDispatchToProps = { modificaShowValue, modificaMsgPortfolio, buscaPortfolio, modificaVlrPatrimonio, modificaVlrPatrimonioAcoes, modificaPesoPatrimonioAcoes, modificaVlrPatrimonioFiis, modificaPesoPatrimonioFiis, modificaVlrPatrimonioEtfs, modificaPesoPatrimonioEtfs, modificaVlrPatrimonioBdrs, modificaPesoPatrimonioBdrs, modificaVlrPatrimonioCriptos, modificaPesoPatrimonioCriptos, }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
