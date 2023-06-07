
import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, FlatList, SectionList, RefreshControl, ActivityIndicator, Dimensions, } from 'react-native'
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { connect } from 'react-redux'

import * as CONSTANTE from '../util/Constante'
import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { modificaMsgProventos, buscaListaProventosAReceber, } from '../store/ducks/proventos'

const imgDefault = require('../assets/SEMLOGO.gif') 
const screenWidth = Dimensions.get("window").width

function ProventosReceber (props) {
  
  const [index, setIndex] = useState(0)

  useEffect(() => {
    _CarregarDados()
  }, [])
  
  useEffect(() => {
    if (props.txtFiltroMsgErro != '') { 
      HelperToast.displayMsgError(props.txtFiltroMsgErro)
      props.modificaMsgProventos('')
    }
  }, [props.txtFiltroMsgErro])
  
  const _CarregarDados = async () => {
    props.buscaListaProventosAReceber() 
  }
  
  const _HandleOnPressItem = async (tipo, codigo, dtEx, dtPagto, qtd, vlrPreco, vlrPagto, corretora) => {
    props.navigation.navigate('ProventosDetalhe', {tipo: tipo, codigo: codigo, dtEx: dtEx, dtPagto: dtPagto, qtd: qtd, vlrPreco: vlrPreco, vlrPagto: vlrPagto, corretora: corretora})
  }

  const vlrSaldoTotal = HelperNumero.GetMascaraValorDecimal(props.vlrTotalProv || 0.00)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
      
      <View style={{ marginLeft: 15, marginTop: 15, paddingBottom: 10, }}>
        <Text style={{ fontSize: 12, color:"#fff", }}>Total a Receber</Text>
        <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold", }}>R$ {vlrSaldoTotal}</Text>
      </View>
      
      <TabView
        style={{ flex: 1, }}
        navigationState={{
          index: index,
          routes: [
            { key: 'mensal', title: 'MENSAL', },
            { key: 'acoes',  title: 'AÇÕES', },
            { key: 'fiis',   title: 'FIIs', },
            { key: 'bdrs',   title: 'BDRs', },
          ],
        }}
        renderScene={SceneMap({
          mensal: () => <ProventosReceberDetalheMensal _tipo={'MENSAL'} _total={0.0}                     _lista={props.lstProventosMes}   _isloading={props.isLoadingProventos} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem}/>, 
          acoes:  () => <ProventosReceberDetalhe       _tipo={'AÇÕES'}  _total={props.vlrTotalProvAcoes} _lista={props.lstProventosAcoes} _isloading={props.isLoadingProventos} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
          fiis:   () => <ProventosReceberDetalhe       _tipo={'FIIs'}   _total={props.vlrTotalProvFiis}  _lista={props.lstProventosFiis}  _isloading={props.isLoadingProventos} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
          bdrs:   () => <ProventosReceberDetalhe       _tipo={'BDRs'}   _total={props.vlrTotalProvBdrs}  _lista={props.lstProventosBdrs}  _isloading={props.isLoadingProventos} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
        })}
        onIndexChange={(index) => setIndex(index)}
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

function ProventosReceberDetalheMensal (props) {
  return(
    <View style={{ flex: 1, backgroundColor: '#ECF0F1', }}>
        
      {
        props._isloading
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color='#152d44' />
        </View>
        :
        <SectionList
          style={{ marginTop: 0, marginBottom: 20, paddingHorizontal: 5, }}
          sections={props._lista}
          keyExtractor={(item, index) => item + index} 
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Nenhum provento a receber...' : null}</Text>}
          renderSectionHeader={ ({section: {title}}) => <ProventosReceberDetalheTitulo title={title} />  }
          renderItem={({ item, index, section }) => <ProventosReceberDetalheItem index={index} item={item} _HandleOnPressItem={props._HandleOnPressItem} />} 
          renderSectionFooter={() => <View style={{ marginBottom: 20, }} />}
        />
      }

    </View>
  )
}

function ProventosReceberDetalheTitulo (props) {
  return (
    <View style={{ flex: 1, marginTop: 10, marginLeft: 10, }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#000', }}>{props.title}</Text>
    </View>
  )
}

function ProventosReceberDetalhe (props) {
  
  const total = HelperNumero.GetMascaraValorDecimal(props._total || 0.00)
  const tipo = props._tipo
  
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#ECF0F1', }} contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}>

      <View style={{ alignItems: 'center', justifyContent: 'center',  backgroundColor: '#152d44', borderBottomStartRadius: 30, borderBottomEndRadius: 30, marginHorizontal: 1, paddingTop: 10, paddingBottom: 5, marginBottom: 10, }}>
        <Text style={{ fontSize: 12, color: "#fff", }}>Total a Receber em {tipo}</Text>
        <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold", }}>R$ {total}</Text>
      </View>
      
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
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Nenhum provento a receber...' : null}</Text>}
          renderItem={({ item, index }) => <ProventosReceberDetalheItem index={index} item={item} _HandleOnPressItem={props._HandleOnPressItem} />}   
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

function ProventosReceberDetalheItem (props) {

  const dtPagto = moment(props.item[0]).format("DD/MM/YYYY")
  //const tipo = props.item[1]
  const codigo = props.item[2]
  const qtd = HelperNumero.colcarFormacataoInteiro(props.item[3])
  const vlrPreco = props.item[4]
  const vlrPagto = props.item[5]
  // const situacao = props.item[6]
  const id = props.item[7]
  const dtEx = moment(props.item[8]).format("DD/MM/YYYY")
  const tipo = props.item[9]
  const corretora = props.item[10] || ''
  // const tipoInvest = props.item[11]
  
  // console.log('Key: ', props.item.Key)

  return(
    <View key={id} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 10, elevation: 1,height: 60, marginTop: 7, marginLeft: 7, marginRight: 7, }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: "row", }} onPress={() => { props._HandleOnPressItem(tipo, codigo, dtEx, dtPagto, qtd, vlrPreco, vlrPagto, corretora) }} >
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
            <ImagemCustom src={{ uri: CONSTANTE.URL_IMG_ATIVO + codigo.substring(0,4) + '.gif', headers: {Pragma: 'force-cache'}, }}/>
          </View>
          <View style={{ flex: 2, justifyContent: 'center', }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, }}>( {tipo.substring(0,1)} ) {codigo}</Text>
            <Text style={{ fontSize: 12, color: 'gray', }}>{dtPagto}</Text>
          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold',  color: 'green' }}>R$ {vlrPagto}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Icon name="chevron-right" size={12} color="gray" />
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
    return <Image source={this.state.src} style={{ width: 40, height: 40, }} onError={ () => this.loadFallback() }/> 
  }
}

const mapStateToProps = state => ({

  txtFiltroMsgErro: state.proventos.txtFiltroMsgErro,
  isLoadingProventos: state.proventos.isLoadingProventos,

  lstProventosMes: state.proventos.lstProventosMes,
  lstProventosAcoes: state.proventos.lstProventosAcoes,
  lstProventosFiis: state.proventos.lstProventosFiis,
  lstProventosBdrs: state.proventos.lstProventosBdrs,
  
  vlrTotalProv: state.proventos.vlrTotalProv,
  vlrTotalProvAcoes: state.proventos.vlrTotalProvAcoes,
  vlrTotalProvFiis: state.proventos.vlrTotalProvFiis,
  vlrTotalProvBdrs: state.proventos.vlrTotalProvBdrs,

})

const mapDispatchToProps = { modificaMsgProventos, buscaListaProventosAReceber, }

export default connect(mapStateToProps, mapDispatchToProps)(ProventosReceber)
