import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, RefreshControl, ActivityIndicator, Dimensions, TouchableOpacity, TextInput, Keyboard, } from 'react-native'
import { RecyclerListView, LayoutProvider, } from 'recyclerlistview'
import { TabView,TabBar, SceneMap, } from 'react-native-tab-view'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { limpaDrawdown, modificaMsgDrawdown, buscarConfigDias, buscarConfigMargem, buscaListaDrawdown, } from '../store/ducks/analises'
  
const screenWidth = Dimensions.get("window").width

function Drawdown(props) {
  
  const [index, setIndex] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [txtFiltroDias, setTxtFiltroDias] = useState(0)
  const [txtFiltroMargem, setTxtFiltroMargem] = useState(0.0) 

  useEffect(() => {
    _CarregarConfig()
    _CarregarDados()
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 50, borderColor: 'red', borderWidth: 0, }} onPress={() => setIsModalVisible(true) } >
          <Icon name="sliders" size={25} color="#fff" />
        </TouchableOpacity>
      ),
    })
    return () => { props.limpaDrawdown() }
  }, [])

  useEffect(() => {
    if (props.txtErro != '') { 
      HelperToast.displayMsgError(props.txtErro)
      props.modificaMsgDrawdown('')
    }
  }, [props.txtErro])

  useEffect(() => {
    if (props.txtDrawdownFiltroDias.toString() != '0' && props.txtDrawdownFiltroMargem.toString() != '0') {
      setTxtFiltroDias(props.txtDrawdownFiltroDias)
      setTxtFiltroMargem(props.txtDrawdownFiltroMargem)
      _CarregarDados(props.txtDrawdownFiltroDias, props.txtDrawdownFiltroMargem)
    }
  }, [props.txtDrawdownFiltroDias, props.txtDrawdownFiltroMargem])

  const _HandleOnPressFiltro = async () => {
    setIsModalVisible(false)
    _CarregarDados(txtFiltroDias, txtFiltroMargem) 
  }

  const _CarregarDados = async (txtDias, txtMargem) => {
    if (txtDias != undefined && txtMargem != undefined && txtDias.toString() != '0' && txtMargem.toString() != '0') props.buscaListaDrawdown(txtDias, txtMargem) 
  }
 
  const _CarregarConfig = async () => {
    props.buscarConfigDias()
    props.buscarConfigMargem()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
      
      <DrawdownModalFiltro 
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        txtFiltroDias={txtFiltroDias}
        setTxtFiltroDias={setTxtFiltroDias}
        txtFiltroMargem={txtFiltroMargem}
        setTxtFiltroMargem={setTxtFiltroMargem} 
        _HandleOnPressFiltro={_HandleOnPressFiltro} 
      /> 
      
      <TabView
        style={{ flex: 1, }}
        navigationState={{ index: index, routes: [{ key: 'portf', title: 'Portfólio' }, { key: 'radar', title: 'Radar' }], }}
        renderScene={SceneMap({
          portf: () => <DrawdownDetalhe _tipo={'Portfólio'} _tipo={'P'} _margem={txtFiltroMargem} _lista={props.listaPortf} _isLoading={props.isLoading} _HandleOnPressFiltro={_HandleOnPressFiltro} />,
          radar: () => <DrawdownDetalhe _tipo={'Radar'}     _tipo={'R'} _margem={txtFiltroMargem} _lista={props.listaRadar} _isLoading={props.isLoading} _HandleOnPressFiltro={_HandleOnPressFiltro} />, 
        })}
        onIndexChange={(index) => setIndex(index)}
        initialLayout={{ width: screenWidth }}
        renderTabBar={(props) => <TabBar {...props} scrollEnabled indicatorStyle={{ backgroundColor: '#fff' }} style={{ height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#152d44',  }} tabStyle={{ }} labelStyle={{ fontWeight: 'bold', }} /> }
      />

    </SafeAreaView>
  )

}

function DrawdownDetalhe (props) {
  return(
    <View style={{ flex: 1, backgroundColor: '#ECF0F1', }} >
 
      {
        props._isLoading &&
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator color='#152d44' size='large' style={{ }} /> 
        </View>
      } 
      
      {
        !props._isLoading && // props.dataProvider._data.length > 0 &&
        <FlatList
          style={{  }}
          data={props._lista}
          scrollEnabled={true} 
          keyExtractor={(item, index) => index} // item + index
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props._isLoading ? 'Sem ativos...' : null}</Text>}
          renderItem={({ item, index }) => <DrawdownDetalheItem index={index} item={item} _margem={props._margem} _tipo={props._tipo} />}
          initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._HandleOnPressFiltro() }}  title="Carregando..."  />}
        />
        // <RecyclerListView
        //   style={{ marginBottom: 0, }}
        //   contentContainerStyle={{ margin: 3 }}
        //   showsVerticalScrollIndicator={false}
        //   forceNonDeterministicRendering={false}
        //   canChangeSize={true}
        //   rowRenderer={(type, item, index) => <DrawdownDetalheItem type={type} index={index} item={item} _tipo={props._tipo} />}
        //   dataProvider={props.dataProvider}
        //   layoutProvider={layoutProvider}
        //   refreshControl={<RefreshControl refreshing={false} onRefresh={() => { props._HandleOnPressFiltro() }} title="Carregando..." />}
        // />
      }
      
    </View>
  )
}

function DrawdownDetalheItem (props) {

  const key       = props.index
  // const origem = props.item[0]
  let tipo        = props.item[1]
  const ativo     = props.item[2]
  const vlrCotacao   = parseFloat(props.item[3])
  const vlrMaxima    = parseFloat(props.item[4])
  const vlrDrawdown  = parseFloat(props.item[5])
  const vlrMargem    = parseFloat(props.item[6])
  
  if ( tipo == 'ACAO' ) tipo = 'AÇÃO'
  
  // Manter/Vender      -        0% : preço está na máxima do mercado.
  // Manter             -  0% a 10% : preço está abaixo da metade do ponto de compra.
  // Acompanhar         - 10% a 15% : indica acompanhamento do preço.
  // Acompanhar/Comprar - 15% a 20% : preço já está perto do ponto do preço de entrada.
  // Comprar            -       20% : ponto de compra

  let margemDigitada    = props._margem
  let margemMetadeAbaxo = parseFloat( 0.00 )
  let margemMetadeAcima = parseFloat( 0.00 )
  margemDigitada        = parseFloat(HelperNumero.GetValorDecimal( margemDigitada.toString().replace('.', ',') ))
  if ( margemDigitada   > 0.0 ) margemMetadeAbaxo = parseFloat( margemDigitada / 2 )
  if (margemMetadeAbaxo > 0.0 ) margemMetadeAcima = parseFloat(margemMetadeAbaxo + (margemMetadeAbaxo / 2))

  let situacao = ''
  if ( vlrMargem <  margemMetadeAbaxo                                  ) situacao = 'Entre 0% e '+HelperNumero.GetMascaraValorDecimal(margemMetadeAbaxo)+'%: MANTER ou VENDER'; // VERMELHO
  if ( vlrMargem >= margemMetadeAbaxo && vlrMargem < margemMetadeAcima ) situacao = 'Entre '+HelperNumero.GetMascaraValorDecimal(margemMetadeAbaxo)+'% e '+HelperNumero.GetMascaraValorDecimal(margemMetadeAcima)+'%: MANTER'; // LARANJA
  if ( vlrMargem >= margemMetadeAcima && vlrMargem < margemDigitada    ) situacao = 'Entre '+HelperNumero.GetMascaraValorDecimal(margemMetadeAcima)+'% e '+HelperNumero.GetMascaraValorDecimal(margemDigitada)+'%: ACOMPANHAR'; // VERDE CLARO
  if ( vlrMargem >= margemDigitada                                     ) situacao = 'Maior que '+HelperNumero.GetMascaraValorDecimal(margemDigitada)+'%: COMPRAR'; // VERDE ESCURO

  let color = '#000'
  if      ( vlrMargem <  margemMetadeAbaxo                                  ) color = '#c94040' //'#ffbcb2'
  else if ( vlrMargem >= margemMetadeAbaxo && vlrMargem < margemMetadeAcima ) color = '#ffd191'
  else if ( vlrMargem >= margemMetadeAcima && vlrMargem < margemDigitada    ) color = '#aae89c'
  else if ( vlrMargem >= margemDigitada                                     ) color = '#059918' // '#6bbd5b'

  // console.log('Key: ', props.item.Key)

  return(
    <View key={key} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', backgroundColor: '#fff', marginBottom: 2, padding: 5, }}>
      
      <View style={{ flex: 1, marginLeft: 20, }}>
        <Text style={{ fontSize: 14, }}>Tipo</Text>
        <Text style={{ fontSize: 14, }}>Ativo</Text>
        <Text style={{ fontSize: 14, }}>Cotação</Text>
        <Text style={{ fontSize: 14, }}>Máxima</Text>
        <Text style={{ fontSize: 14, }}>Drawdown</Text>
        <Text style={{ fontSize: 14, }}>Margem</Text>
        <Text style={{ fontSize: 14, }}>Situação</Text>
      </View>
      
      <View style={{ flex: 3, }}>
        <Text style={[{ fontSize: 14, }]}>{tipo}</Text> 
        <Text style={[{ fontSize: 14, fontWeight: 'bold', color: color, }]}>{ativo}</Text> 
        <Text style={[{ fontSize: 14, }]}>R$ {HelperNumero.GetMascaraValorDecimal(vlrCotacao)}</Text> 
        <Text style={[{ fontSize: 14, }]}>R$ {HelperNumero.GetMascaraValorDecimal(vlrMaxima)}</Text> 
        <Text style={[{ fontSize: 14, }]}>R$ {HelperNumero.GetMascaraValorDecimal(vlrDrawdown)}</Text> 
        <Text style={[{ fontSize: 14, fontWeight: 'bold', color: color, }]}>{HelperNumero.GetMascaraValorDecimal(vlrMargem)}%</Text> 
        <Text style={[{ fontSize: 13, fontWeight: 'bold', color: color, }]}>{situacao}</Text>
      </View> 

    </View>
  )

}

function DrawdownModalFiltro (props) {
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
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10, }} >
          <View style={{ }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666666', }}>Dias:</Text>
            <TextInput keyboardType='numeric' autoFocus={false} autoCorrect={false} autoCapitalize="none" onChangeText={value => props.setTxtFiltroDias(value) } value={props.txtFiltroDias.toString()} style={{ marginTop: 5, textAlign: 'center', width: 120, borderColor: "#000", borderWidth: 1, height: 35, shadowOpacity: 1.0, shadowRadius: 5, shadowOffset: { width: 1, height: 1 }, borderRadius: 5, }} />
          </View>
          <View style={{ }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666666', }}>Margem:</Text>      
            <TextInput keyboardType='numeric' autoFocus={false} autoCorrect={false} autoCapitalize="none" onChangeText={value => props.setTxtFiltroMargem(value) } value={props.txtFiltroMargem.toString()} style={{ marginTop: 5, textAlign: 'center', width: 120, borderColor: "#000", borderWidth: 1, height: 35, shadowOpacity: 1.0, shadowRadius: 5, shadowOffset: { width: 1, height: 1 }, borderRadius: 5, }} />
          </View>
        </View>

        <TouchableOpacity onPress={() => { Keyboard.dismiss(); props._HandleOnPressFiltro(); } } style={{ marginTop: 15, marginBottom: 10, backgroundColor: '#152d44', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>APLICAR FILTRO</Text>
        </TouchableOpacity>

      </View>
    </Modal> 
  )
}

const mapStateToProps = state => ({

  // Filtro Config
  txtDrawdownFiltroDias: state.analises.txtDrawdownFiltroDias,
  txtDrawdownFiltroMargem: state.analises.txtDrawdownFiltroMargem,

  // Portfolio e Radar
  isLoading: state.analises.isLoadingDrawdown,
  txtErro: state.analises.txtErroDrawdown,
  listaPortf: state.analises.listaDrawdownPortf,
  listaRadar: state.analises.listaDrawdownRadar,

})

const mapDispatchToProps = { limpaDrawdown, modificaMsgDrawdown, buscarConfigDias, buscarConfigMargem, buscaListaDrawdown, }

export default connect(mapStateToProps, mapDispatchToProps)(Drawdown)