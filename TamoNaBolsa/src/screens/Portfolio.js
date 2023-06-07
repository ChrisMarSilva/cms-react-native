import React from 'react'
import { Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Dimensions, } from 'react-native'
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie, } from "victory-native"
import { connect } from 'react-redux'

import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { modificaShowValue, modificaMsgPortfolio, buscaPortfolio, modificaVlrPatrimonio, modificaVlrPatrimonioAcoes, modificaVlrPatrimonioFiis, modificaVlrPatrimonioEtfs, modificaVlrPatrimonioBdrs, modificaVlrPatrimonioCriptos, } from '../store/ducks/portfolio'

const imgDefault = require('../assets/SEMLOGO.gif') 
const screenWidth = Dimensions.get("window").width

class Portfolio extends React.Component { 
  
  constructor(props) {
    super(props)  
    const { index } = this.props.route.params
    this.state = { index: index || 0, }
    this._CarregarDados = this._CarregarDados.bind(this)
    this._HandleOnPressItem = this._HandleOnPressItem.bind(this)
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_VISIVEL).then((value) => this.props.modificaShowValue(value != 'N')).done()
  }

  componentDidMount() {
    // const { index } = this.props.route.params
    // this.setState({ index: index || 0 })
    // console.log('Portfolio.componentDidMount')   
    // console.log('Portfolio.componentDidMount.Route.index:', index)
    // console.log('Portfolio.componentDidMount.State.index:', this.state.index) 
    this._CarregarDados()
  }

  componentWillUnmount() {
    // this.setState({ index: 0 })
    // this.props.navigation.setParams({ index: 0, })
    // const { index } = this.props.route.params
    // console.log('Portfolio.componentWillUnmount')
    // console.log('Portfolio.componentWillUnmount.Route.index:', index)
    // console.log('Portfolio.componentWillUnmount.Route.params:', this.props.route.params)
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.txtErroPortfolio != '') { 
      HelperToast.displayMsgError(text = this.props.txtErroPortfolio)
      this.props.modificaMsgPortfolio('')
    }
  }

  _CarregarDados = async () => { 
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_PATRIMONIO).then((value)  => this.props.modificaVlrPatrimonio(        parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_ACOES_VLR).then((value)   => this.props.modificaVlrPatrimonioAcoes(   parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_FIIS_VLR).then((value)    => this.props.modificaVlrPatrimonioFiis(    parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_ETFS_VLR).then((value)    => this.props.modificaVlrPatrimonioEtfs(    parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_BDRS_VLR).then((value)    => this.props.modificaVlrPatrimonioBdrs(    parseFloat(value) || 0.00) ).done()
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_CRIPTOS_VLR).then((value) => this.props.modificaVlrPatrimonioCriptos( parseFloat(value) || 0.00) ).done()
    this.props.buscaPortfolio() 
  }
  
  _HandleOnPressItem = (codigo, total, valoriz, percent, proventos) => { 
    this.props.navigation.navigate('PortfolioAtivo', { codigo: codigo, total: total, valoriz: valoriz, percent: percent, proventos: proventos, })
  }
  
  _HandleOnPressVisivel = () => { 
    this.props.modificaShowValue(!this.props.isShowValue) 
  }

  render() {

    const index          = this.state.index // this.props.route.params.index || this.state.index
    const isShowValue    = true // this.props.isShowValue
    const vlrPatrimonio  = HelperNumero.GetMascaraValorDecimal(this.props.vlrPatrimonio  || 0.00)
    const vlrValorizacao = HelperNumero.GetMascaraValorDecimal(this.props.vlrValorizacao || 0.00)
    const prcValorizacao = HelperNumero.GetMascaraValorDecimal(this.props.prcValorizacao || 0.00)

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.default, }}>
        
        <View style={{ marginLeft: 15, marginTop: 5, paddingBottom: 5, }}>
          <Text style={{ fontSize: 10, color: colors.amarelo, }}>Seu Patrimônio Total é de</Text>
          <View style={{ flexDirection: "row", justifyContent: 'space-between',}}>
            <Text style={{ fontSize: 25, color: colors.branco, fontWeight: "bold", }}>R$ {isShowValue ? vlrPatrimonio : '---'}</Text>
          </View> 
          <Text style={{ fontSize: 10, color: colors.amarelo, marginTop: 5, }}>Valorização</Text>
          <Text style={{ fontSize: 15, color: colors.branco, fontWeight: "bold", }}>R$ {isShowValue ? vlrValorizacao : '---'} <Text style={{ fontSize: 12, }}>( {isShowValue ? prcValorizacao : '---'}% )</Text></Text>
        </View>
        
        <TabView
          style={{ flex: 1, }}
          //useNativeDriver={true}
          navigationState={{
            index: index,
            routes: [
              { key: 'acoes',   title: 'AÇÕES'   },
              { key: 'fiis',    title: 'FIIs'    },
              { key: 'etfs',    title: 'ETFs'    },
              { key: 'bdrs',    title: 'BDRs'    },
              { key: 'criptos', title: 'CRIPTOS' },
            ],
          }}
          renderScene={SceneMap({
            acoes:   () => <PortfolioDetalhe _tipo={'AÇÕES'}   _total={this.props.vlrPatrimonioAcoes}   _lista={this.props.listaPortfolioAcoes}   _isloading={this.props.isLoadingPortfolio} _visivel={isShowValue} _CarregarDados={this._CarregarDados} _HandleOnPressItem={this._HandleOnPressItem} />, 
            fiis:    () => <PortfolioDetalhe _tipo={'FIIs'}    _total={this.props.vlrPatrimonioFiis}    _lista={this.props.listaPortfolioFiis}    _isloading={this.props.isLoadingPortfolio} _visivel={isShowValue} _CarregarDados={this._CarregarDados} _HandleOnPressItem={this._HandleOnPressItem} />, 
            etfs:    () => <PortfolioDetalhe _tipo={'ETFs'}    _total={this.props.vlrPatrimonioEtfs}    _lista={this.props.listaPortfolioEtfs}    _isloading={this.props.isLoadingPortfolio} _visivel={isShowValue} _CarregarDados={this._CarregarDados} _HandleOnPressItem={this._HandleOnPressItem} />, 
            bdrs:    () => <PortfolioDetalhe _tipo={'BDRs'}    _total={this.props.vlrPatrimonioBdrs}    _lista={this.props.listaPortfolioBdrs}    _isloading={this.props.isLoadingPortfolio} _visivel={isShowValue} _CarregarDados={this._CarregarDados} _HandleOnPressItem={this._HandleOnPressItem} />, 
            criptos: () => <PortfolioDetalhe _tipo={'CRIPTOS'} _total={this.props.vlrPatrimonioCriptos} _lista={this.props.listaPortfolioCriptos} _isloading={this.props.isLoadingPortfolio} _visivel={isShowValue} _CarregarDados={this._CarregarDados} _HandleOnPressItem={this._HandleOnPressItem} />, 
          })}
          onIndexChange={(index) => this.setState({ index: index }) }
          initialLayout={{ width: screenWidth }}
          renderTabBar={(props) => 
              <TabBar
                {...props}       
                //scrollEnabled
                indicatorStyle={{ backgroundColor: colors.branco }}
                style={{ height: 50, justifyContent: 'center', backgroundColor: colors.default, }}
                tabStyle={{  }}
                labelStyle={{ fontSize: 12, fontWeight: 'bold', }}
              />
            }
        />

      </SafeAreaView>
      )
  }
}

function PortfolioDetalhe(props) {
  
  const total = HelperNumero.GetMascaraValorDecimal(props._total || 0.00)
  const tipo = props._tipo
  const visivel = props._visivel
  
  return(
    <ScrollView style={{ flex: 1, backgroundColor: colors.cinza, }} contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}>

      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.default, borderBottomStartRadius: 30, borderBottomEndRadius: 30, marginHorizontal: 1, marginBottom: 0, paddingTop: 5, paddingBottom: 5, }}>
        <Text style={{ fontSize: 10, color: colors.amarelo, }}>Total em {tipo}</Text>
        <Text style={{ fontSize: 25, color: colors.branco, fontWeight: "bold", }}>R$ {visivel ? total : '---'}</Text>
      </View>
      
      {
        props._isloading
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color={colors.default} />
        </View>
        :
          <View style={{ flex: 1, }}>

            {
              props._lista && props._lista.length > 0
              ?
              <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <VictoryPie
                  animate={{ duration: 2000, easing: 'exp', onLoad: { duration: 2000, }  }}
                  padAngle={0.5}
                  // theme={VictoryTheme.material}
                  // colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                  // colorScale={["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]}
                  // colorScale={['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#3366cc', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac', '#b77322', '#16d620', '#b91383', '#f4359e', '#9c5935', '#a9c413', '#2a778d', '#668d1c', '#bea413', '#0c5922', '#743411']}
                  // colorScale={['#4661EE', '#EC5657', '#1BCDD1', '#8FAABB', '#B08BEB', '#3EA0DD', '#F5A52A', '#23BFAA', '#FAA586', '#EB8CC6']}
                  // colorScale={['#EC5657', '#f28f43', '#a6c96a', '#e4d354', '#7cb5ec', '#f15c80', '#A47D7C',]}
                  // colorScale={['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']}
                  // colorScale={['#388087', '#6fb3b8', '#badfe7']}
                  colorScale="qualitative"
                  width={screenWidth * 1.1}
                  height={screenWidth * 1.1}
                  // labels={({ datum }) => `${datum.y}%\n${datum.x}`} // labels={({ datum }) => `${datum.x}`}
                  // labels={({ datum }) => `${datum.x}\n  ${datum.y}%`} 
                  // labelPosition={({ index }) => index ? "centroid" : "centroid"} // startAngle
                  labelPlacement={({ index }) => index ? "parallel" : "vertical" }
                  labelRadius={110}
                  innerRadius={80} 
                  data={props._lista.map(function (item) { return { x : item.AtvCodigo, y : parseFloat(HelperNumero.GetValorDecimal(item.AtvTotAtual||0.0)), } })} 
                  style={{ labels: { fontSize: 11, fill: "#ffffff" }, data: { fillOpacity: 0.9, stroke: colors.branco, strokeWidth: 1 }, }} // "#c43a31"
                />
              </View>
              :
              null
            }
         
            <FlatList
              style={{ marginTop: 0, marginBottom: 20, paddingEnd: 10, }}
              data={props._lista}
              scrollEnabled={true} 
              keyExtractor={(item, index) => item.AtvId.toString()}
              ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Sem Ativos...' : null}</Text>}
              renderItem={({ item, index }) => <PortfolioDetalheItem index={index} item={item} _total={props._total} _visivel={visivel} _HandleOnPressItem={props._HandleOnPressItem} />}  
              initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
              maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
              windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
              removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
              updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
              showsVerticalScrollIndicator={false}
              viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
              />  
            
          </View>
        }

    </ScrollView>
  )
}

function PortfolioDetalheItem(props) {

  const total = props._total
  // const portfId = props.item.AtvId
  const portfCodigo = props.item.AtvCodigo
  const AtvTipoInvest = props.item.AtvTipoInvest
  // const portfSetorNome = props.item.SetorNome
  // const portfSubSetorNome = props.item.SubSetorNome
  // const portfSegmentoNome = props.item.SegmentoNome
  const portfQtde = props.item.AtvQtde
  // const portfPrecoMedio = props.item.AtvPrecoMedio
  const portfPrecoAtual = props.item.AtvPrecoAtual
  // const portfTotInvest = props.item.AtvTotInvest
  const portfTotAtual = props.item.AtvTotAtual
  const portfTotValoriz = props.item.AtvTotValoriz
  const portfPercValoriz = props.item.AtvPercValoriz
  const portfTotProv = props.item.AtvTotProv
  // const portfTotAlug= props.item.AtvTotAlug
  // const portfVlrValorizDia = props.item.AtvVlrValorizDia
  // const portfPercValorizDia = props.item.AtvPercValorizDia
  const portfPeso = HelperNumero.GetMascaraValorDecimal((parseFloat(HelperNumero.GetValorDecimal(portfTotAtual||0.0)) / parseFloat(props._total)) * 100)
  const uri = AtvTipoInvest == 'CRIPTO' ? CONSTANTE.URL_IMG_ATIVO + portfCodigo.replace('/','-') + '.png' : CONSTANTE.URL_IMG_ATIVO + portfCodigo.substring(0,4) + '.gif'
  
 //  const qtd = tipo == 'CRIPTO' ? parseFloat(HelperNumero.GetValorDecimalMaior(item.AtvQtde || 0.0)) : parseFloat(HelperNumero.GetValorInteiro(item.AtvQtde || 0.0))

  const visivel = props._visivel

  // console.log('Key: ', props.item.Key)

  return(
    <View key={props.item.AtvId} style={{ backgroundColor: colors.branco, height: 80, padding: 5, marginBottom: 5, borderTopRightRadius: 20, borderBottomRightRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.25, shadowRadius: 0.25, elevation: 5, }}>
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} style={{ flexDirection: "row", justifyContent: 'space-between', }} onPress={() => { props._HandleOnPressItem(portfCodigo, portfTotAtual, portfTotValoriz, portfPercValoriz, portfTotProv) }} >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', borderWidth: 0, borderColor: 'red', }}>
          <ImagemCustom src={{ uri: uri, headers: {Pragma: 'force-cache'}, }}/>
        </View>
        <View style={{ flex: 3,  }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 16, color: "#3d5875", fontWeight: "bold", marginBottom: 5, }}>{portfCodigo}</Text>
            <Text style={{ fontSize: 16, color:"#3d5875", fontWeight: "bold", marginRight: 10, }}>R$ {visivel ? portfTotAtual : '---'}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginRight: 10, }}>
            <View style={{  }}>
              <Text style={{ fontSize: 10, color: "gray", }}>Cotação</Text>
              <Text style={{ fontSize: 14, color: "gray", fontWeight: "bold", }}>R$ {portfPrecoAtual}</Text>
            </View>
            <View style={{  }}>
              <Text style={{ fontSize: 10, color:"gray", }}>Quant.</Text>
              <Text style={{ fontSize: 14, color:"gray", fontWeight: "bold", }}>{visivel ? portfQtde : '---'}</Text>
            </View>
            <View style={{  }}>
              <Text style={{ fontSize: 10, color: "gray",  }}>Peso</Text>
              <Text style={{ fontSize: 14, color: "gray", fontWeight: "bold", }}>{portfPeso}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )

}

class ImagemCustom extends React.PureComponent {
  constructor(props) {
    super(props)  
    this.state = { src: imgDefault, }
  }
  componentDidMount() {
    this.setState({ src: this.props.src, })
  }
  loadFallback(){ 
    this.setState({ src: imgDefault, })
  }
  render() {
    return <Image source={this.state.src} style={{ width: 60, height: 50, }} onError={ () => this.loadFallback() }/> 
  }
}

const mapStateToProps = state => ({
  // valores
  isShowValue: state.portfolio.isShowValue,
  vlrPatrimonio: state.portfolio.vlrPatrimonio,
  vlrValorizacao: state.portfolio.vlrValorizacao,
  prcValorizacao: state.portfolio.prcValorizacao,
  vlrPatrimonioAcoes: state.portfolio.vlrPatrimonioAcoes,
  vlrPatrimonioFiis: state.portfolio.vlrPatrimonioFiis,
  vlrPatrimonioEtfs: state.portfolio.vlrPatrimonioEtfs,
  vlrPatrimonioBdrs: state.portfolio.vlrPatrimonioBdrs,
  vlrPatrimonioCriptos: state.portfolio.vlrPatrimonioCriptos,
  // pesquisa
  isLoadingPortfolio: state.portfolio.isLoadingPortfolio,
  txtErroPortfolio: state.portfolio.txtErroPortfolio,
  listaPortfolioAcoes: state.portfolio.listaPortfolioAcoes,
  listaPortfolioFiis: state.portfolio.listaPortfolioFiis,
  listaPortfolioEtfs: state.portfolio.listaPortfolioEtfs,
  listaPortfolioBdrs: state.portfolio.listaPortfolioBdrs,
  listaPortfolioCriptos: state.portfolio.listaPortfolioCriptos,
})
 
const mapDispatchToProps = { modificaShowValue, modificaMsgPortfolio, buscaPortfolio, modificaVlrPatrimonio, modificaVlrPatrimonioAcoes, modificaVlrPatrimonioFiis, modificaVlrPatrimonioEtfs, modificaVlrPatrimonioBdrs, modificaVlrPatrimonioCriptos, }

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
