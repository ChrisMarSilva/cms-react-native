
import React from 'react'
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Dimensions, } from 'react-native'
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'

import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import * as HelperNumero from '../util/HelperNumero'
import { modificaShowValue, } from '../store/ducks/portfolio'

const dtAtual = moment(new Date()).format("YYYYMMDD") // .format("DD/MM/YYYY")
const screenWidth = Dimensions.get("window").width

class PortfolioAtivo extends React.Component { 
  
  constructor(props) {
    super(props)  
    this.state = { index: 0, isloadingOper: false, listaOper: [], isloadingProv: false, listaProv: [], }
    this._CarregarDados = this._CarregarDados.bind(this)
    this._HandleOnPressItemOper = this._HandleOnPressItemOper.bind(this)
    this._HandleOnPressItemProv = this._HandleOnPressItemProv.bind(this)
    AsyncStorage.getItem(CONSTANTE.SESSAO_PORTF_VISIVEL).then((value) => this.props.modificaShowValue(value != 'N') ).done()
  }

  componentDidMount() {
    this._CarregarDados()
  }
  
  _HandleOnPressItemOper = (data, tipo, codigo, qtd, vlrPreco, corretora, vlrCorregatem, vlrTaxas, vlrTotal, vlrCustos) => { 
    this.props.navigation.navigate('OperacoesDetalhe', {data: data, tipo: tipo, codigo: codigo, qtd: qtd, vlrPreco: vlrPreco, corretora: corretora, vlrCorregatem: vlrCorregatem, vlrTaxas: vlrTaxas, vlrTotal: vlrTotal, vlrCustos: vlrCustos})
  }
  
  _HandleOnPressItemProv = (tipo, codigo, dtEx, dtPagto, qtd, vlrPreco, vlrPagto, corretora) => { 
    this.props.navigation.navigate('ProventosDetalhe', {tipo: tipo, codigo: codigo, dtEx: dtEx, dtPagto: dtPagto, qtd: qtd, vlrPreco: vlrPreco, vlrPagto: vlrPagto, corretora: corretora})
  }
  
  _HandleOnPressVisivel = () => { 
    this.props.modificaShowValue(!this.props.isShowValue) 
  }

  _CarregarDados = async () => { 
    const { codigo } = this.props.route.params
    this.props.navigation.setOptions({ title: 'Portfólio: ' + codigo.toString() })
    this._CarregarDadosOper(codigo)
    this._CarregarDadosProv(codigo)
  }

  _CarregarDadosOper = async (codigo) => { 

    if (this.state.isloadingOper) return   

    this.setState({ listaOper: [], isloadingOper: true, })

    axios({
      method: 'post',
      url: CONSTANTE.URL_ANALISE_OPERACOES_GRID, 
      timeout: CONSTANTE.URL_TIMEOUT,
      responseType: 'text',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ CodAtivo: codigo }),
    }).then((response) => {
      let Resultado = response.data.data.Resultado
      let Mensagem = response.data.data.Mensagem
      let Lista = response.data.data.Lista
      if (Resultado === "OK") {
        Lista.reverse()
        this.setState({ listaOper: Lista, })
      } else {
        console.log('@TamoNaBolsa:Oper-Mensagem:', Mensagem)
      }
    }).catch((error) => {
      this.setState({ isloadingOper: false,})
      console.log('@TamoNaBolsa:Oper-Error', error)
    }).finally( () => {
      this.setState({ isloadingOper: false,})
    })
  }

  _CarregarDadosProv = async (codigo) => { 

    if (this.state.isloadingProv) return   

    this.setState({ listaProv: [], isloadingProv: true, })
    
    axios({
      method: 'post',
      url: CONSTANTE.URL_PROVENTOS_GRID, 
      timeout: CONSTANTE.URL_TIMEOUT,
      responseType: 'text',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ CodAtivo: codigo }),
    }).then((response) => {
      let Resultado = response.data.data.Resultado
      let Mensagem = response.data.data.Mensagem
      let Lista = response.data.data.Lista
      if (Resultado === "OK") {
        
        Lista.sort(function (a, b) {
          const dtPagtoA = a[1]  
          const dtPagtoB = b[1]
          if(dtPagtoA == dtPagtoB) return 0
          return dtPagtoA > dtPagtoB? 1: -1
        })

        Lista.reverse()

        this.setState({ listaProv: Lista, })

      } else {
        console.log('@TamoNaBolsa:Prov-Mensagem:', Mensagem)
      }
    }).catch((error) => {
      this.setState({ isloadingProv: false,})
      console.log('@TamoNaBolsa:Prov-Error', error)
    }).finally( () => {
      this.setState({ isloadingProv: false,})
    })
  }

  render() {

    const isShowValue = true // this.props.isShowValue
    const { codigo, total, valoriz, percent, proventos, } = this.props.route.params

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
        
        <View style={{ marginLeft: 15, marginTop: 15, paddingBottom: 10, }}>

          <Text style={{ fontSize: 10, color: colors.amarelo, }}>Total Atual</Text>
          <View style={{ flexDirection: "row", justifyContent: 'space-between',}}>
            <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold", }}>R$ {isShowValue ? total : '---'}</Text>
            {/* <TouchableOpacity style={{  marginRight: 15, justifyContent: "center", }} onPress={() => this._HandleOnPressVisivel()} >
              {isShowValue ? <Feather name="eye-off" color="grey" size={25} /> : <Feather name="eye" color="grey" size={25} /> }
            </TouchableOpacity> */}
          </View> 

          <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
            <View style={{ flex: 3, }}>
              <Text style={{ fontSize: 10, color: colors.amarelo, marginTop: 5, }}>Valorização</Text>
              <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold", }}>R$ {isShowValue ? valoriz : '---'} <Text style={{ fontSize: 12, }}>( {isShowValue ? percent : '---'}% )</Text></Text>
            </View> 
            <View style={{ flex: 2, }}>
              <Text style={{ fontSize: 10, color: colors.amarelo, marginTop: 5, }}>Proventos</Text>
              <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold", }}>R$ {isShowValue ? proventos : '---'}</Text>
            </View> 
          </View> 

        </View>

        <TabView
          style={{ flex: 1, }}
          //useNativeDriver={true}
          navigationState={{
            index: this.state.index,
            routes: [
              { key: 'oper', title: 'Operações' },
              { key: 'prov', title: 'Proventos' },
            ],
          }}
          renderScene={SceneMap({
            oper: () => <PortfolioAtivoDetalheOper _tipo={'Operações'} _lista={this.state.listaOper} _isloading={this.state.isloadingOper} _visivel={isShowValue} _CarregarDados={this._CarregarDados} _HandleOnPressItemOper={this._HandleOnPressItemOper} />, 
            prov: () => <PortfolioAtivoDetalheProv _tipo={'Proventos'} _lista={this.state.listaProv} _isloading={this.state.isloadingProv} _visivel={isShowValue} _CarregarDados={this._CarregarDados} _HandleOnPressItemProv={this._HandleOnPressItemProv} />, 
          })}
          onIndexChange={(index) => this.setState({ index: index })}
          initialLayout={{ width: screenWidth }}
          renderTabBar={(props) => 
              <TabBar
                {...props}              
                indicatorStyle={{ backgroundColor: '#fff' }}
                style={{ height: 50, justifyContent: 'center', backgroundColor: '#152d44',  }}
                tabStyle={{ }}
                labelStyle={{ fontWeight: 'bold', }}
              />
            }
        />

      </SafeAreaView>
      )
  }
}

function PortfolioAtivoDetalheOper(props) {
  
  const tipo = props._tipo
  const visivel = props._visivel
  
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#ECF0F1', }} contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}>
      
      {
        props._isloading
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color='#152d44' />
        </View>
        :
        <FlatList
          style={{ marginTop: 0, marginBottom: 20, paddingHorizontal: 5, }}
          data={props._lista}
          scrollEnabled={true} 
          keyExtractor={(item, index) => item[7].toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Sem operações...' : null}</Text>}
          renderItem={({ item, index }) => <PortfolioAtivoDetalheOperItem index={index} item={item} _visivel={visivel} _HandleOnPressItemOper={props._HandleOnPressItemOper} />}   
          initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
        />  
      }

    </ScrollView>
  )
}

function PortfolioAtivoDetalheOperItem(props) {

  const visivel = props._visivel
  const tipo = props.item[0]
  // const categoria = props.item[1]
  //const corretora = props.item[2]
  const data = props.item[3]
  const qtd = props.item[4] // HelperNumero.colcarFormacataoInteiro(props.item[4])
  const vlrCusto = props.item[5]
  const vlrPrecoMedio = props.item[6]
  const vlrTotal = props.item[7]
  const vlrValorizacao = props.item[8]

  // console.log('Key: ', props.item.Key)

  return(
    <View style={{  flex: 1, flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 10, elevation: 1,height: 60, marginTop: 7, marginLeft: 7, marginRight: 7, paddingHorizontal: 10,}}>
      {/* <TouchableOpacity style={{ flex: 1, flexDirection: "row", }} onPress={() => { props._HandleOnPressItemOper() }} > */}
          <View style={{ flex: 1, justifyContent: 'center', }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, }}>{tipo}</Text>
            <Text style={{ fontSize: 12, color: 'gray', }}>{data}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, }}>{qtd}</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>R$ {vlrCusto}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={[{ fontSize: 16, fontWeight: 'bold',  color: 'gray' }, ( tipo.substring(0,1) == 'C' || tipo.substring(0,1) == 'B') && {color:'green'}, ( tipo.substring(0,1) == 'V' || tipo.substring(0,1) == 'P' ) && {color:'red'}]}>R$ {visivel ? vlrTotal : '---'}</Text>
          </View>
      {/* </TouchableOpacity> */}
    </View>
  )

}

function PortfolioAtivoDetalheProv(props) {
  
  const tipo = props._tipo
  const visivel = props._visivel
  
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#ECF0F1', }} contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}>
      
      {
        props._isloading
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color='#152d44' />
        </View>
        :
        <FlatList
          style={{ marginTop: 0, marginBottom: 20, paddingHorizontal: 5, }}
          data={props._lista}
          scrollEnabled={true} 
          keyExtractor={(item, index) => item[8].toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Sem proventos...' : null}</Text>}
          renderItem={({ item, index }) => <PortfolioAtivoDetalheProvItem index={index} item={item} _visivel={visivel} _HandleOnPressItemProv={props._HandleOnPressItemProv} />}   
          initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
        />  
        }

    </ScrollView>
  )
}

function PortfolioAtivoDetalheProvItem(props) {

  const visivel = props._visivel
  const dtEx =  moment(props.item[0]).format("DD/MM/YYYY")
  const dtPagto = moment(props.item[1]).format("DD/MM/YYYY")
  const codigo = props.item[2]
  const tipo = props.item[3]
  const corretora = props.item[4] || ''
  const qtd = HelperNumero.colcarFormacataoInteiro(props.item[5])
  const vlrPreco = props.item[6]
  const vlrPagto = props.item[7]
  const id = props.item[8]
  // const situacao = props.item[9]

  // console.log('Key: ', props.item.Key)

  return(
    <View key={id} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 10, elevation: 1,height: 60, marginTop: 7, marginLeft: 7, marginRight: 7,  }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10, }} onPress={() => { props._HandleOnPressItemProv(tipo, codigo, dtEx, dtPagto, qtd, vlrPreco, vlrPagto, corretora) }} >
          <View style={{ flex: 3, justifyContent: 'center', }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, }}>{tipo}</Text>
            <Text style={{ fontSize: 12, color: 'gray', }}>{dtPagto}</Text>
          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={[{ fontSize: 16, fontWeight: 'bold',  color: 'green' }, ( props.item[1] >= dtAtual) && {color:'gray'}]}>R$ {visivel ? vlrPagto : '---'}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Icon name="chevron-right" size={12} color="gray" />
          </View>
      </TouchableOpacity>
    </View>
  )

}


const mapStateToProps = state => ({
  isShowValue: state.portfolio.isShowValue,
})
 
const mapDispatchToProps = { modificaShowValue }

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioAtivo)
