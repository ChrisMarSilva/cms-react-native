
import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Dimensions, } from 'react-native'
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { connect } from 'react-redux'

import * as CONSTANTE from '../util/Constante'
import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { modificaMsgOperacoes, buscaListaOperacoes } from '../store/ducks/operacoes'

const imgDefault = require('../assets/SEMLOGO.gif') 
const screenWidth = Dimensions.get("window").width

function OperacoesMes (props) {
  
  const [index, setIndex] = useState(0)

  useEffect(() => {
    _CarregarDados()
  }, [])
  
  useEffect(() => {
    if (props.txtFiltroMsgErro != '') { 
      HelperToast.displayMsgError(props.txtFiltroMsgErro)
      props.modificaMsgOperacoes('')
    }
  }, [props.txtFiltroMsgErro])


  
  const _CarregarDados = async () => {
    const txtCodAtivo = ''
    const txtDataIni = moment(new Date()).format("YYYYMM") + '01'
    const txtDataFim = moment(new Date()).format("YYYYMM") + '31'
    props.buscaListaOperacoes(txtCodAtivo, txtDataIni, txtDataFim) 
  }
  
  const _HandleOnPressItem = async (data, tipo, codigo, qtd, vlrPreco, corretora, vlrCorregatem, vlrTaxas, vlrTotal, vlrCustos) => {
    props.navigation.navigate('OperacoesDetalhe', {data: data, tipo: tipo, codigo: codigo, qtd: qtd, vlrPreco: vlrPreco, corretora: corretora, vlrCorregatem: vlrCorregatem, vlrTaxas: vlrTaxas, vlrTotal: vlrTotal, vlrCustos: vlrCustos})
  }

  const vlrSaldoTotal = HelperNumero.GetMascaraValorDecimal(props.vlrTotalOperac || 0.00)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
      
      <View style={{ marginLeft: 15, marginTop: 15, paddingBottom: 10, }}>
        <Text style={{ fontSize: 12, color:"#fff", }}>Saldo no Mês</Text>
        <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold", }}>R$ {vlrSaldoTotal}</Text>
      </View>
      
      <TabView
        style={{ flex: 1, }}
        navigationState={{
          index: index,
          routes: [
            { key: 'acoes', title: 'AÇÕES' },
            { key: 'fiis',  title: 'FIIs' },
            { key: 'etfs',  title: 'ETFs' },
            { key: 'bdrs',  title: 'BDRs' },
            { key: 'criptos',  title: 'CRIPTOS' },
          ],
        }}
        renderScene={SceneMap({
          acoes:   () => <OperacoesMesDetalhe _tipo={'AÇÕES'}   _total={props.vlrTotalOperacAcoes}   _lista={props.lstOperacoesAcoes}   _isloading={props.isLoadingOperacoes} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
          fiis:    () => <OperacoesMesDetalhe _tipo={'FIIs'}    _total={props.vlrTotalOperacFiis}    _lista={props.lstOperacoesFiis}    _isloading={props.isLoadingOperacoes} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
          etfs:    () => <OperacoesMesDetalhe _tipo={'ETFs'}    _total={props.vlrTotalOperacEtf}     _lista={props.lstOperacoesEtfs}    _isloading={props.isLoadingOperacoes} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
          bdrs:    () => <OperacoesMesDetalhe _tipo={'BDRs'}    _total={props.vlrTotalOperacBdrs}    _lista={props.lstOperacoesBdrs}    _isloading={props.isLoadingOperacoes} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
          criptos: () => <OperacoesMesDetalhe _tipo={'CRIPTOS'} _total={props.vlrTotalOperacCriptos} _lista={props.lstOperacoesCriptos} _isloading={props.isLoadingOperacoes} _CarregarDados={_CarregarDados} _HandleOnPressItem={_HandleOnPressItem} />, 
        })}isLoadingOperacoes
        onIndexChange={(index) => setIndex(index)}
        initialLayout={{ width: screenWidth }}
        renderTabBar={(props) => 
            <TabBar
              {...props}              
              indicatorStyle={{ backgroundColor: '#fff' }}
              style={{ height: 50, justifyContent: 'center', backgroundColor: '#152d44',  }}
              tabStyle={{ }}
              labelStyle={{ fontSize: 12, fontWeight: 'bold', }}
            />
          }
      />

    </SafeAreaView>
    )

}

function OperacoesMesDetalhe (props) {
  
  const total = HelperNumero.GetMascaraValorDecimal(props._total || 0.00)
  const tipo = props._tipo
  
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#ECF0F1', }} contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}>

      <View style={{ alignItems: 'center', justifyContent: 'center',  backgroundColor: '#152d44', borderBottomStartRadius: 30, borderBottomEndRadius: 30, marginHorizontal: 1, paddingTop: 10, paddingBottom: 5, marginBottom: 10, }}>
        <Text style={{ fontSize: 12, color: "#fff", }}>Saldo no Mês em {tipo}</Text>
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
          keyExtractor={(item, index) => item[10].toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Sem operações no mês...' : null}</Text>}
          renderItem={({ item, index }) => <OperacoesMesDetalheItem index={index} item={item} _HandleOnPressItem={props._HandleOnPressItem} />}   
          initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          //refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}
        />  
      }

    </ScrollView>
  )
}

function OperacoesMesDetalheItem (props) {

  const data = moment(props.item[0]).format("DD/MM/YYYY")
  const tipo = props.item[1]
  const codigo = props.item[2]
  const vlrPreco = props.item[4]
  const corretora = props.item[5] || ''
  const vlrCorregatem = props.item[6] 
  const vlrTaxas = props.item[7]
  const vlrTotal = props.item[8]
  const vlrCustos = props.item[9]
  // const id = props.item[10]
  const tipoInvest = props.item[11]
  const qtd = tipoInvest == 'CRIPTO' ? HelperNumero.MascaraValorSemLimite(props.item[3]) : HelperNumero.colcarFormacataoInteiro(props.item[3])
  const uri = tipoInvest == 'CRIPTO' ? CONSTANTE.URL_IMG_ATIVO + codigo.replace('/','-') + '.png' : CONSTANTE.URL_IMG_ATIVO + codigo.substring(0,4) + '.gif'


  // console.log('Key: ', props.item.Key)

  return(
    <View key={props.item[10]} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 10, elevation: 1,height: 60, marginTop: 7, marginLeft: 7, marginRight: 7, }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: "row", }} onPress={() => { props._HandleOnPressItem(data, tipo, codigo, qtd, vlrPreco, corretora, vlrCorregatem, vlrTaxas, vlrTotal, vlrCustos) }} >
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
            <ImagemCustom src={{ uri: uri, headers: {Pragma: 'force-cache'}, }}/>
          </View>
          <View style={{ flex: 2, justifyContent: 'center', }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 5, }}>( {tipo.substring(0,1)} ) {codigo}</Text>
            <Text style={{ fontSize: 12, color: 'gray', }}>{data}</Text>
          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={[{ fontSize: 15, fontWeight: 'bold',  color: 'gray' }, ( tipo.substring(0,1) == 'C') && {color:'green'}, ( tipo.substring(0,1) == 'V') && {color:'red'}]}>R$ {vlrTotal}</Text>
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

  txtFiltroMsgErro: state.operacoes.txtFiltroMsgErro,
  isLoadingOperacoes: state.operacoes.isLoadingOperacoes,
  
  lstOperacoesAcoes: state.operacoes.lstOperacoesAcoes,
  lstOperacoesFiis: state.operacoes.lstOperacoesFiis,
  lstOperacoesEtfs: state.operacoes.lstOperacoesEtfs,
  lstOperacoesBdrs: state.operacoes.lstOperacoesBdrs,
  lstOperacoesCriptos: state.operacoes.lstOperacoesCriptos,
  
  vlrTotalOperac: state.operacoes.vlrTotalOperac,
  vlrTotalOperacAcoes: state.operacoes.vlrTotalOperacAcoes,
  vlrTotalOperacFiis: state.operacoes.vlrTotalOperacFiis,
  vlrTotalOperacEtf: state.operacoes.vlrTotalOperacEtf,
  vlrTotalOperacBdrs: state.operacoes.vlrTotalOperacBdrs,
  vlrTotalOperacCriptos: state.operacoes.vlrTotalOperacCriptos,
})

const mapDispatchToProps = { modificaMsgOperacoes, buscaListaOperacoes, }

export default connect(mapStateToProps, mapDispatchToProps)(OperacoesMes)

