
import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, SafeAreaView, FlatList, RefreshControl, ActivityIndicator, Dimensions, } from 'react-native'
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view'
import { connect } from 'react-redux'

import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { modificaMsgPortfolio, buscaPortfolio, buscaPortfolioRadar, } from '../store/ducks/portfolio'

const screenWidth = Dimensions.get("window").width

function ValorizacaoDia (props) {
  
  const [index, setIndex] = useState(0)

  useEffect(() => {
    _CarregarDados()
  }, [])
  
  useEffect(() => {
    if (props.displayMsgError != '') { 
      HelperToast.displayMsgError(props.displayMsgError)
      props.modificaMsgPortfolio('')
    }
  }, [props.displayMsgError])

  const _CarregarDados = async () => {
    let isOrderByPeso = false
    let isOrderByValoriz = true
    props.buscaPortfolio(isOrderByPeso, isOrderByValoriz)
    props.buscaPortfolioRadar()
  }

  const vlrSaldoTotal = HelperNumero.GetMascaraValorDecimal(props.vlrValorizDiaPatrimonio || 0.00)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
      
      <View style={{ marginLeft: 15, marginTop: 15, paddingBottom: 10, }}>
        <Text style={{ fontSize: 12, color:"#fff", }}>Total no dia</Text>
        <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold", }}>R$ {vlrSaldoTotal}</Text>
      </View>
      
      <TabView
        style={{ flex: 1, }}
        navigationState={{
          index: index,
          routes: [
            { key: 'acoes',   title: 'AÇÕES'   },
            { key: 'fiis',    title: 'FIIs'    },
            { key: 'etfs',    title: 'ETFs'    },
            { key: 'bdrs',    title: 'BDRs'    },
            { key: 'criptos', title: 'CRIPTOS' },
            { key: 'radar',   title: 'RADAR' },
          ],
        }}
        renderScene={SceneMap({
          acoes:   () => <ValorizacaoDiaDetalhe      _tipo={'AÇÕES'}   _total={props.vlrValorizDiaAcoes}   _lista={props.listaPortfolioAcoes}   _isloading={props.isLoadingPortfolio}      _CarregarDados={_CarregarDados} />, 
          fiis:    () => <ValorizacaoDiaDetalhe      _tipo={'FIIs'}    _total={props.vlrValorizDiaFiis}    _lista={props.listaPortfolioFiis}    _isloading={props.isLoadingPortfolio}      _CarregarDados={_CarregarDados} />, 
          etfs:    () => <ValorizacaoDiaDetalhe      _tipo={'ETFs'}    _total={props.vlrValorizDiaEtfs}    _lista={props.listaPortfolioEtfs}    _isloading={props.isLoadingPortfolio}      _CarregarDados={_CarregarDados} />, 
          bdrs:    () => <ValorizacaoDiaDetalhe      _tipo={'BDRs'}    _total={props.vlrValorizDiaBdrs}    _lista={props.listaPortfolioBdrs}    _isloading={props.isLoadingPortfolio}      _CarregarDados={_CarregarDados} />, 
          criptos: () => <ValorizacaoDiaDetalhe      _tipo={'CRIPTOS'} _total={props.vlrValorizDiaCriptos} _lista={props.listaPortfolioCriptos} _isloading={props.isLoadingPortfolio}      _CarregarDados={_CarregarDados} />, 
          radar:   () => <ValorizacaoDiaDetalheRadar _tipo={'RADAR'}   _total={0.0}                        _lista={props.listaPortfolioRadar}   _isloading={props.isLoadingPortfolioRadar} _CarregarDados={_CarregarDados} />, 
        })}
        onIndexChange={(index) => setIndex(index)}
        initialLayout={{ width: screenWidth }}
        renderTabBar={(props) => 
            <TabBar
              {...props}              
              indicatorStyle={{ backgroundColor: '#fff' }}
              style={{ height: 50, justifyContent: 'center', backgroundColor: '#152d44',  }}
              tabStyle={{ }}
              labelStyle={{ fontSize: 9, fontWeight: 'bold', }}
            />
          }
      />

    </SafeAreaView>
  )
}

function ValorizacaoDiaDetalhe (props) {
  
  const total = HelperNumero.GetMascaraValorDecimal(props._total || 0.00)
  const tipo = props._tipo
  
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', }} contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}>

      <View style={{ alignItems: 'center', justifyContent: 'center',  backgroundColor: '#152d44', borderBottomStartRadius: 30, borderBottomEndRadius: 30, marginHorizontal: 1, paddingTop: 10, paddingBottom: 5, marginBottom: 10, }}>
        <Text style={{ fontSize: 12, color: "#fff", }}>Total em {tipo}</Text>
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
          style={{ marginTop: 0, marginBottom: 5, paddingHorizontal: 5, }}
          data={props._lista}
          scrollEnabled={true} 
          keyExtractor={(item, index) => item.AtvId.toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Sem ativos...' : null}</Text>}
          renderItem={({ item, index }) => <ValorizacaoDiaDetalheItem index={index} item={item} />}   
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

function ValorizacaoDiaDetalheItem (props) {

  const id = props.item.AtvId
  const codigo = props.item.AtvCodigo
  const tipoInvest = props.item.AtvTipoInvest
  const qtd = tipoInvest == 'CRIPTO' ? parseFloat(HelperNumero.GetValorDecimalMaior(props.item.AtvQtde)) : parseFloat(HelperNumero.GetValorInteiro(props.item.AtvQtde))
  const vlrPreco = props.item.AtvPrecoAtual
  const vlrValoriz = parseFloat(HelperNumero.GetValorDecimal(props.item.AtvVlrValorizDia||0.0))
  const perctValoriz = props.item.AtvPercValorizDia
  let totValoriz = 0.00  
  if( vlrValoriz != 0.00 ) totValoriz = qtd * vlrValoriz
  // const tipoInvest = props.item.AtvTipoInvest

  // console.log('Key: ', props.item.Key)

  return(
    <View key={id} style={{ flex: 1, backgroundColor: '#fff', flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 2, }}>
      <Text style={[{ fontSize: 14, color: '#5facdb', fontWeight: 'bold', }, ( vlrValoriz > 0.0) && {color:'green'}, (vlrValoriz < 0.0) && {color:'red'}]}>{codigo}</Text>
      <Text style={[{ fontSize: 12, color: '#5facdb', }, ( vlrValoriz > 0.0) && {color:'green'}, (vlrValoriz < 0.0) && {color:'red'}]}>R$ {vlrPreco}</Text>
      <Text style={{ fontSize: 12, color: 'gray', }}>{vlrValoriz < 0.0 ? '-' + perctValoriz : perctValoriz}%</Text>
      <Text style={[{ fontSize: 13, color: 'white', fontWeight: 'bold', backgroundColor: '#5facdb', paddingVertical: 5, paddingHorizontal: 8, borderRadius: 25, }, ( vlrValoriz > 0.0) && {backgroundColor:'green'}, (vlrValoriz < 0.0) && {backgroundColor:'red'}]}>R$ {HelperNumero.GetMascaraValorDecimal(totValoriz)}</Text>
    </View>
  )

}

function ValorizacaoDiaDetalheRadar (props) {
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', }} contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._CarregarDados() }}  title="Carregando..."  />}>

      {
        props._isloading
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color='#152d44' />
        </View>
        :
        <FlatList
          style={{ marginTop: 0, marginBottom: 5, paddingHorizontal: 5, }}
          data={props._lista}
          scrollEnabled={true} 
          keyExtractor={(item, index) => item[0]} 
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isloading ? 'Sem ativos...' : null}</Text>}
          renderItem={({ item, index }) => <ValorizacaoDiaDetalheRadarItem index={index} item={item} />}   
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

function ValorizacaoDiaDetalheRadarItem (props) {

  const id            = props.index
  const codigo        = props.item[0]   
  const vlrPreco      = props.item[1] 
  const vlrValoriz    = parseFloat(HelperNumero.GetValorDecimal(props.item[2]||0.0))
  const perctValoriz  = props.item[3]
  const vlrPrecoDescr = (codigo == 'IBOV' || codigo == 'IBXX' || codigo == 'IDIV' || codigo == 'SMLL') ? vlrPreco + " Pts" : "R$ " + vlrPreco

  // console.log('Key: ', props.item.Key)

  return(
    <View key={id} style={{ flex: 1, backgroundColor: '#fff', flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 2, marginBottom: 2, }}>
      <Text style={[{ fontSize: 14, color: '#5facdb', fontWeight: 'bold', }, ( vlrValoriz > 0.0) && {color:'green'}, (vlrValoriz < 0.0) && {color:'red'}]}>{codigo}</Text>
      <Text style={[{ fontSize: 14, color: '#5facdb', }, ( vlrValoriz > 0.0) && {color:'green'}, (vlrValoriz < 0.0) && {color:'red'}]}>{vlrPrecoDescr}</Text>
      <Text style={{ fontSize: 14, color: 'gray', }}>{vlrValoriz < 0.0 ? '-' + perctValoriz : perctValoriz}%</Text>
    </View>
  )

}

const mapStateToProps = state => ({
  // valores
  vlrValorizDiaPatrimonio: state.portfolio.vlrValorizDiaPatrimonio,
  vlrValorizDiaAcoes: state.portfolio.vlrValorizDiaAcoes,
  vlrValorizDiaFiis: state.portfolio.vlrValorizDiaFiis,
  vlrValorizDiaEtfs: state.portfolio.vlrValorizDiaEtfs,
  vlrValorizDiaBdrs: state.portfolio.vlrValorizDiaBdrs,
  vlrValorizDiaCriptos: state.portfolio.vlrValorizDiaCriptos,
  // pesquisa
  isLoadingPortfolio: state.portfolio.isLoadingPortfolio,
  txtErroPortfolio: state.portfolio.txtErroPortfolio,
  listaPortfolioAcoes: state.portfolio.listaPortfolioAcoes,
  listaPortfolioFiis: state.portfolio.listaPortfolioFiis,
  listaPortfolioEtfs: state.portfolio.listaPortfolioEtfs,
  listaPortfolioBdrs: state.portfolio.listaPortfolioBdrs,
  listaPortfolioCriptos: state.portfolio.listaPortfolioCriptos,
  listaPortfolioRadar: state.portfolio.listaPortfolioRadar,
})

const mapDispatchToProps = { modificaMsgPortfolio, buscaPortfolio, buscaPortfolioRadar, }

export default connect(mapStateToProps, mapDispatchToProps)(ValorizacaoDia)
