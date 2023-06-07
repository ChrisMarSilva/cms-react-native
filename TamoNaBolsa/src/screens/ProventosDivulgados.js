
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Image, FlatList, RefreshControl, ActivityIndicator, Dimensions, } from 'react-native'
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view'
import moment from 'moment'
import { connect } from 'react-redux'

import * as CONSTANTE from '../util/Constante'
import * as HelperToast from '../util/HelperToast'
import { modificaMsgProventos, buscaListaProventosDivulgados, } from '../store/ducks/proventos'

const imgDefault = require('../assets/SEMLOGO.gif') 
const screenWidth = Dimensions.get("window").width

function ProventosDivulgados (props) {
  
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
    props.buscaListaProventosDivulgados()
  }
  
  const _HandleOnPressItem = async () => {
    // props.navigation.navigate('ProventosDetalhe', {tipo: tipo, codigo: codigo, dtEx: dtEx, dtPagto: dtPagto, qtd: qtd, vlrPreco: vlrPreco, vlrPagto: vlrPagto, corretora: corretora})
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
      
      <TabView
        style={{ flex: 1, }}
        navigationState={{
          index: index,
          routes: [
            { key: 'acoes', title: 'AÇÕES', tabStyle: { backgroundColor: 'red' } },
            { key: 'fiis', title: 'FIIs', tabStyle: { backgroundColor: 'green' } },
            { key: 'bdrs', title: 'BDRs', tabStyle: { backgroundColor: 'gray' } },
          ],
        }}
        renderScene={SceneMap({
          acoes: () => <ProventosDivulgadosDetalhe _tipo={'AÇÕES'} _lista={props.lstProventosDivgAcoes} _isloading={props.isLoadingProventos} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
          fiis:  () => <ProventosDivulgadosDetalhe _tipo={'FIIs'}  _lista={props.lstProventosDivgFiis}  _isloading={props.isLoadingProventos} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
          bdrs:  () => <ProventosDivulgadosDetalhe _tipo={'BDRs'}  _lista={props.lstProventosDivgBdrs}  _isloading={props.isLoadingProventos} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
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
 
function ProventosDivulgadosDetalhe (props) {
  
  return(
    <View style={{ flex: 1, backgroundColor: '#ECF0F1', }}>

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
          keyExtractor={(item, index) => item[0].toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Sem proventos divulgados...' : null}</Text>}
          renderItem={({ item, index }) => <ProventosDivulgadosDetalheItem index={index} item={item} _HandleOnPressItem={props._HandleOnPressItem} />}   
          initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}
        />  
        }

    </View>
  )
}

function ProventosDivulgadosDetalheItem (props) {

  const id = props.item[0]
  const codigo = props.item[1]
  const tipo = props.item[2]
  const dtEx = moment(props.item[3]).format("DD/MM/YYYY")
  const dtPagto = moment(props.item[4]).format("DD/MM/YYYY")
  const vlrPreco = props.item[5]
  // const tipoInvest = props.item[6]
  
  // console.log('Key: ', props.item.Key)

  return(
    <View key={id} style={{ flex: 1, flexDirection: "row", backgroundColor: '#fff', borderRadius: 10, elevation: 1, height: 80, marginTop: 7, marginLeft: 7, marginRight: 7, }}>
      {/* <TouchableOpacity style={{ flex: 1, flexDirection: "row", }} onPress={() => { props._HandleOnPressItem() }} > */}
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
            <ImagemCustom src={{ uri: CONSTANTE.URL_IMG_ATIVO + codigo.substring(0,4) + '.gif', headers: {Pragma: 'force-cache'}, }}/>
          </View>
          <View style={{ flex: 3, justifyContent: 'center', }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10, }}>( {tipo.substring(0,1)} ) {codigo}</Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'green', }}>R$ {vlrPreco}</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'flex-end', padding: 10, paddingRight: 20, }}>
            <Text style={{ fontSize: 9, color: 'gray', }}>Data Ex </Text>
            <Text style={{ fontSize: 13, color: 'gray', fontWeight: 'bold', marginBottom: 5, }}>{dtEx}</Text>
            <Text style={{ fontSize: 9, color: 'gray', }}>Data Pagto </Text>
            <Text style={{ fontSize: 13, color: 'gray', fontWeight: 'bold', }}>{dtPagto}</Text>
          </View>  
      {/* </TouchableOpacity> */} 
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
  lstProventosDivgAcoes: state.proventos.lstProventosDivgAcoes,
  lstProventosDivgFiis: state.proventos.lstProventosDivgFiis,
  lstProventosDivgBdrs: state.proventos.lstProventosDivgBdrs,
})

const mapDispatchToProps = { modificaMsgProventos, buscaListaProventosDivulgados, }

export default connect(mapStateToProps, mapDispatchToProps)(ProventosDivulgados)
