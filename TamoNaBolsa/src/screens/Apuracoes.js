
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, RefreshControl, ActivityIndicator, Dimensions, TouchableOpacity, } from 'react-native'
import { TabView,TabBar, SceneMap, } from 'react-native-tab-view'
import RNPicker from "rn-modal-picker"
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { connect } from 'react-redux'

import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { limpaApuracoes, modificaMsgAcoesComum, modificaMsgAcoesDayTrade, modificaMsgFiis, modificaMsgEtfsComum, modificaMsgEtfsDayTrade, modificaMsgBdrsComum, modificaMsgBdrsDayTrade, modificaMsgCriptos, buscaListaAnosApuracoes, buscaListaApuracoes, } from '../store/ducks/apuracoes'
  
const screenWidth = Dimensions.get("window").width

function Apuracoes (props) {
  
  const [index, setIndex] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [txtFiltroAno, setTxtFiltroAno] = useState('')

  useEffect(() => {
    // console.log('Apueracoes.Entrar')
    const txtAno = moment(new Date()).format("YYYY")
    _CarregarDados(txtAno) 
    _CarregarListas()
    setTxtFiltroAno(txtAno)
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 50, borderColor: 'red', borderWidth: 0, }} onPress={() => setIsModalVisible(true) } >
          <Icon name="sliders" size={25} color="#fff" />
        </TouchableOpacity>
      ),
    })
    return () => {
      //console.log('Apueracoes.Sair')
      props.limpaApuracoes()
    }
  }, [])
  
  useEffect(() => {
    if (props.txtErroAcoesComum != '') { 
      HelperToast.displayMsgError(props.txtErroAcoesComum)
      props.modificaMsgAcoesComum('')
    }
  }, [props.txtErroAcoesComum])
  
  useEffect(() => {
    if (props.txtErroAcoesDayTrade != '') { 
      HelperToast.displayMsgError(props.txtErroAcoesDayTrade)
      props.modificaMsgAcoesDayTrade('')
    }
  }, [props.txtErroAcoesDayTrade])
  
  useEffect(() => {
    if (props.txtErroFiis != '') { 
      HelperToast.displayMsgError(props.txtErroFiis)
      props.modificaMsgFiis('')
    }
  }, [props.txtErroFiis])
  
  useEffect(() => {
    if (props.txtErroEtfsComum != '') { 
      HelperToast.displayMsgError(props.txtErroEtfsComum)
      props.modificaMsgEtfsComum('')
    }
  }, [props.txtErroEtfsComum])
  
  useEffect(() => {
    if (props.txtErroEtfsDayTrade != '') { 
      HelperToast.displayMsgError(props.txtErroEtfsDayTrade)
      props.modificaMsgEtfsDayTrade('')
    }
  }, [props.txtErroEtfsDayTrade])
  
  useEffect(() => {
    if (props.txtErroBdrsComum != '') { 
      HelperToast.displayMsgError(props.txtErroBdrsComum)
      props.modificaMsgBdrsComum('')
    }
  }, [props.txtErroBdrsComum])
  
  useEffect(() => {
    if (props.txtErroBdrsDayTrade != '') { 
      HelperToast.displayMsgError(props.txtErroBdrsDayTrade)
      props.modificaMsgBdrsDayTrade('')
    }
  }, [props.txtErroBdrsDayTrade])
  
  useEffect(() => {
    if (props.txtErroCriptos != '') { 
      HelperToast.displayMsgError(props.txtErroCriptos)
      props.modificaMsgCriptos('')
    }
  }, [props.txtErroCriptos])

  const _HandleOnPressItem = async (tpApuracao, dtMesAno) => {
    dtMesAno = dtMesAno.replace("/", "")
    dtMesAno = dtMesAno.substring(2, 6) + dtMesAno.substring(0, 2)
    props.navigation.navigate('ApuracoesDetalhe', {tpApuracao: tpApuracao, dtMesAno: dtMesAno})
  }
  
  const setFiltroAno = async (index, item) => {
    setTxtFiltroAno(item.name)
  }
  
  const _HandleOnPressFiltro = async () => {
    setIsModalVisible(false) 
    _CarregarDados( txtFiltroAno.toString() ) 
  }

  const _CarregarDados = async (txtAno) => {
    props.buscaListaApuracoes("C", txtAno)  // C - Acoes Comum
    setTimeout(() => {
      props.buscaListaApuracoes("D", txtAno) // D - Acoes DayTrade
      props.buscaListaApuracoes("F", txtAno) // F - Fiss
      props.buscaListaApuracoes("E", txtAno) // E - Etfs Comum
      props.buscaListaApuracoes("G", txtAno) // G - Etfs DayTrade
      props.buscaListaApuracoes("I", txtAno) // I - Bdrs Comum
      props.buscaListaApuracoes("J", txtAno) // J - Bdrs DayTrade
      props.buscaListaApuracoes("K", txtAno) // K - Criptos
    }, 500)
  }

  const _CarregarListas = async () => {
    return new Promise((resolve, reject) => {
      props.buscaListaAnosApuracoes() 
      // resolve('result')
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
      
      <ApuracoesModalFiltro 
        isModalVisible={isModalVisible}
        txtFiltroAno={txtFiltroAno}
        lstFiltroAnos={props.lstFiltroAnos}
        setModalVisible={setIsModalVisible} 
        setFiltroAno={setFiltroAno} 
        _HandleOnPressFiltro={_HandleOnPressFiltro} 
      /> 
      
      <TabView
        style={{ flex: 1, }}
        navigationState={{
          index: index,
          routes: [
            { key: 'acoesc',  title: 'AÇÕES Comum' },
            { key: 'acoesd',  title: 'AÇÕES Day Trade' },
            { key: 'fiis',    title: 'FIIs' },
            { key: 'etfc',    title: 'ETFs Comum' },
            { key: 'etfd',    title: 'ETFs Day Trade' },
            { key: 'bdrsc',   title: 'BDRs Comum' },
            { key: 'bdrsd',   title: 'BDRs Day Trade' },
            { key: 'criptos', title: 'CRIPTOS' },
          ],
        }}
        renderScene={SceneMap({
          acoesc:  () => <ApuracoesDetalhe _tipo={'AÇÕES Comum'}     _tipo={'C'} _lista={props.listaAcoesComum}    _isLoading={props.isLoadingAcoesComum}    _HandleOnPressFiltro={_HandleOnPressFiltro} _HandleOnPressItem={_HandleOnPressItem} />,
          acoesd:  () => <ApuracoesDetalhe _tipo={'AÇÕES Day Trade'} _tipo={'D'} _lista={props.listaAcoesDayTrade} _isLoading={props.isLoadingAcoesDayTrade} _HandleOnPressFiltro={_HandleOnPressFiltro} _HandleOnPressItem={_HandleOnPressItem} />, 
          fiis:    () => <ApuracoesDetalhe _tipo={'FIIs'}            _tipo={'F'} _lista={props.listaFiis}          _isLoading={props.isLoadingFiis}          _HandleOnPressFiltro={_HandleOnPressFiltro} _HandleOnPressItem={_HandleOnPressItem} />, 
          etfc:    () => <ApuracoesDetalhe _tipo={'ETFs Comum'}      _tipo={'E'} _lista={props.listaEtfsComum}     _isLoading={props.isLoadingEtfsComum}     _HandleOnPressFiltro={_HandleOnPressFiltro} _HandleOnPressItem={_HandleOnPressItem} />, 
          etfd:    () => <ApuracoesDetalhe _tipo={'ETFs Day Trade'}  _tipo={'G'} _lista={props.listaEtfsDayTrade}  _isLoading={props.isLoadingEtdsDayTrade}  _HandleOnPressFiltro={_HandleOnPressFiltro} _HandleOnPressItem={_HandleOnPressItem} />, 
          bdrsc:   () => <ApuracoesDetalhe _tipo={'BDRs Comum'}      _tipo={'I'} _lista={props.listaBdrsComum}     _isLoading={props.isLoadingBdrsComum}     _HandleOnPressFiltro={_HandleOnPressFiltro} _HandleOnPressItem={_HandleOnPressItem} />, 
          bdrsd:   () => <ApuracoesDetalhe _tipo={'BDRs Day Trade'}  _tipo={'J'} _lista={props.listaBdrsDayTrade}  _isLoading={props.isLoadingBdrsDayTrade}  _HandleOnPressFiltro={_HandleOnPressFiltro} _HandleOnPressItem={_HandleOnPressItem} />, 
          criptos: () => <ApuracoesDetalhe _tipo={'CRIPTOS'}         _tipo={'K'} _lista={props.listaCriptos}       _isLoading={props.isLoadingCriptos}       _HandleOnPressFiltro={_HandleOnPressFiltro} _HandleOnPressItem={_HandleOnPressItem} />, 
        })}
        onIndexChange={(index) => setIndex(index)}
        initialLayout={{ width: screenWidth }}
        renderTabBar={(props) => 
            <TabBar
            {...props}            
            scrollEnabled
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

function ApuracoesModalFiltro (props) {
  return(
    <Modal
      style={{ justifyContent: 'flex-end', margin: 0, }}
      isVisible={props.isModalVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      swipeDirection={['up', 'left', 'right', 'down']}
      onSwipeComplete={() => props.setModalVisible(!props.isModalVisible)}
      onBackdropPress={() => props.setModalVisible(!props.isModalVisible)}
    >  
      <View style={{ padding: 22, borderTopStartRadius: 20, borderTopEndRadius: 20, borderColor: 'rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', }} >
        
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#666666', marginBottom: 15, }}>Filtrar</Text>
        
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#666666', }}>Ano:</Text>
        
        <RNPicker
          dataSource={props.lstFiltroAnos}
          dummyDataSource={props.lstFiltroAnos}
          defaultValue={false}
          pickerTitle={"Selecione o Ano..."}
          showSearchBar={true}
          disablePicker={false}
          changeAnimation={"none"}
          searchBarPlaceHolder={"Procurar....."}
          showPickerTitle={true}
          searchBarContainerStyle={{ marginBottom: 10, flexDirection: "row", height: 40, shadowOpacity: 1.0, shadowRadius: 5, shadowOffset: { width: 1, height: 1 }, backgroundColor: "rgba(255,255,255,1)", shadowColor: "#d3d3d3", borderRadius: 10, elevation: 3, marginLeft: 10, marginRight: 10 }}
          pickerStyle={{ marginTop: 5, marginLeft: 12, elevation: 3, paddingRight: 25, marginBottom: 10, shadowOpacity: 1.0, shadowOffset: { width: 1, height: 1 }, borderWidth:1, shadowRadius: 10, backgroundColor: "rgba(255,255,255,1)", shadowColor: "#d3d3d3", borderRadius: 5, flexDirection: "row" }}
          itemSeparatorStyle={{ height: 1, width: "90%", alignSelf: "center", backgroundColor: "#D3D3D3" }}
          pickerItemTextStyle={{ color: "#000", marginVertical: 10, flex: 0.9, marginLeft: 20, marginHorizontal: 10, textAlign: "left" }}
          selectedLabel={props.txtFiltroAno.toString()}
          placeHolderLabel={"Selecione..."}
          selectLabelTextStyle={{ color: "#000", textAlign: "left", width: "99%", padding: 10, flexDirection: "row" }}
          placeHolderTextStyle={{ color: "#d3d3d3", padding: 10, textAlign: "left", width: "99%", flexDirection: "row" }}
          selectedValue={(index, item) => props.setFiltroAno(index, item)}
        />
        
        <TouchableOpacity onPress={() => props._HandleOnPressFiltro() } style={{ marginTop: 15, marginBottom: 10, backgroundColor: '#152d44', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>APLICAR FILTRO</Text>
        </TouchableOpacity>

      </View>
    </Modal> 
  )
}

function ApuracoesDetalhe (props) {
  return(
    <View style={{ flex: 1, backgroundColor: '#ECF0F1', }} >
      {
        props._isLoading
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color='#152d44' />
        </View>
        :
        <FlatList
          style={{  }}
          data={props._lista}
          scrollEnabled={true} 
          keyExtractor={(item, index) => item[0].toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isLoading ? 'Sem apuração...' : null}</Text>}
          renderItem={({ item, index }) => <ApuracoesDetalheItem index={index} item={item} _tipo={props._tipo} _HandleOnPressItem={props._HandleOnPressItem} />}
          initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._HandleOnPressFiltro() }}  title="Carregando..."  />}
        />  
        }
    </View>
  )
}

function ApuracoesDetalheItem (props) {

  const tipo = props._tipo
  const dtMesAno = props.item[0] // moment(props.item[0]).format("DD/MM/YYYY") 
  const vlrTotVenda =  props.item[1]
  const vlrLucroApurado = parseFloat(HelperNumero.GetValorDecimal(props.item[2] || 0.0))
  const vlrPrejuizoACompensar = parseFloat(HelperNumero.GetValorDecimal(props.item[3] || 0.0))
  const vlrBaseCalculoIR =  props.item[4]
  const vlrIRDevido =  props.item[5]
  const vlrIRPago =  props.item[6]
  const vlrIRAPagar =  props.item[7]
  
  // console.log('Key: ', props.item.Key)

  return(
    <View key={dtMesAno} style={{ flex: 1, backgroundColor: '#fff', marginBottom: 2, padding: 5, }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }} onPress={() => { props._HandleOnPressItem(tipo, dtMesAno) }} >
      
        <View style={{ flex: 5, marginLeft: 20, }}>
          <Text style={{ fontSize: 14, }}>Mes/Ano</Text>
          <Text style={{ fontSize: 14, }}>Total Venda</Text>
          <Text style={{ fontSize: 14, }}>Lucro Apurado</Text>
          <Text style={{ fontSize: 14, }}>Prejuízo a Compensar</Text>
          <Text style={{ fontSize: 14, }}>Base de Cálculo IR</Text>
          <Text style={{ fontSize: 14, }}>IR Devido</Text>
          <Text style={{ fontSize: 14, }}>IR Pago</Text>
          <Text style={{ fontSize: 14, }}>IR a Pagar</Text>
        </View>
        
        <View style={{ flex: 5, }}>
          <Text style={[{ fontSize: 14, }, (vlrLucroApurado > 0.0) && { fontWeight: 'bold', color: 'green' }, (vlrLucroApurado < 0.0) && { fontWeight: 'bold', color: 'red' }]}>{dtMesAno}</Text>
          <Text style={[{ fontSize: 14, }]}>R$ {vlrTotVenda}</Text>
          <Text style={[{ fontSize: 14, }, (vlrLucroApurado > 0.0) && { fontWeight: 'bold', color: 'green' }, (vlrLucroApurado < 0.0) && { fontWeight: 'bold', color: 'red' }]}>R$ {HelperNumero.GetMascaraValorDecimal(vlrLucroApurado)}</Text>
          <Text style={[{ fontSize: 14, }, (vlrPrejuizoACompensar > 0.0) && { fontWeight: 'bold', color: 'green' }, (vlrPrejuizoACompensar < 0.0) && { fontWeight: 'bold', color: 'red' }]}>R$ {HelperNumero.GetMascaraValorDecimal(vlrPrejuizoACompensar)}</Text>
          <Text style={[{ fontSize: 14, }]}>R$ {vlrBaseCalculoIR}</Text>
          <Text style={[{ fontSize: 14, }]}>R$ {vlrIRDevido}</Text>
          <Text style={[{ fontSize: 14, }]}>R$ {vlrIRPago}</Text>
          <Text style={[{ fontSize: 14, }]}>R$ {vlrIRAPagar}</Text>
        </View> 
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', }}>
          <Icon name="chevron-right" size={12} color="gray" />
        </View>

      </TouchableOpacity>
    </View>
  )

}

const mapStateToProps = state => ({

  // Lista Anos
  lstFiltroAnos: state.apuracoes.lstFiltroAnos,

  // Acoes Comum
  isLoadingAcoesComum: state.apuracoes.isLoadingAcoesComum,
  listaAcoesComum: state.apuracoes.listaAcoesComum,
  txtErroAcoesComum: state.apuracoes.txtErroAcoesComum,

  // Acoes DayTrade
  isLoadingAcoesDayTrade: state.apuracoes.isLoadingAcoesDayTrade,
  listaAcoesDayTrade: state.apuracoes.listaAcoesDayTrade,
  txtErroAcoesDayTrade: state.apuracoes.txtErroAcoesDayTrade,

  // Fiis
  isLoadingFiis: state.apuracoes.isLoadingFiis,
  listaFiis: state.apuracoes.listaFiis,
  txtErroFiis: state.apuracoes.txtErroFiis,

  // Etds Comum
  isLoadingEtfsComum: state.apuracoes.isLoadingEtfsComum,
  listaEtfsComum: state.apuracoes.listaEtfsComum,
  txtErroEtfsComum: state.apuracoes.txtErroEtfsComum,

  // Etds DayTrade
  isLoadingEtdsDayTrade: state.apuracoes.isLoadingEtdsDayTrade,
  listaEtfsDayTrade: state.apuracoes.listaEtfsDayTrade,
  txtErroEtfsDayTrade: state.apuracoes.txtErroEtfsDayTrade,

  // Bdrs Comum
  isLoadingBdrsComum: state.apuracoes.isLoadingBdrsComum,
  listaBdrsComum: state.apuracoes.listaBdrsComum,
  txtErroBdrsComum: state.apuracoes.txtErroBdrsComum,

  // Bdrs DayTrade
  isLoadingBdrsDayTrade: state.apuracoes.isLoadingBdrsDayTrade,
  listaBdrsDayTrade: state.apuracoes.listaBdrsDayTrade,
  txtErroBdrsDayTrade: state.apuracoes.txtErroBdrsDayTrade,

  // Criptos
  isLoadingCriptos: state.apuracoes.isLoadingCriptos,
  listaCriptos: state.apuracoes.listaCriptos,
  txtErroCriptos: state.apuracoes.txtErroCriptos,

})

const mapDispatchToProps = { limpaApuracoes, modificaMsgAcoesComum, modificaMsgAcoesDayTrade, modificaMsgFiis, modificaMsgEtfsComum, modificaMsgEtfsDayTrade, modificaMsgBdrsComum, modificaMsgBdrsDayTrade, modificaMsgCriptos, buscaListaAnosApuracoes, buscaListaApuracoes, }

export default connect(mapStateToProps, mapDispatchToProps)(Apuracoes)