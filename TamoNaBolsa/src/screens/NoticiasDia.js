
import React, { useEffect } from 'react'
import { Linking, Text, View, SafeAreaView, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, } from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'

import * as HelperToast from '../util/HelperToast'
import { modificaListaNoticias, modificaMsgNoticias, buscaListaNoticiasDia, } from '../store/ducks/noticias'

function NoticiasDia (props) {
  
  useEffect(() => {
    _CarregarDados()
  }, [])
  
  useEffect(() => {
    if (props.txtErroNoticias != '') { 
      HelperToast.displayMsgError(props.txtErroNoticias)
      props.modificaMsgNoticias('')
    }
  }, [props.txtErroNoticias])
  
  const _CarregarDados = async () => {
    props.buscaListaNoticiasDia() 
  }
  
  const _HandleOnPressItem = async (link) => {
    Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
  }
  
  const _HandleOnDeleteItem = async (id) => {
    // props.modificaListaNoticias(props.listNoticias.filter(item => item[0] !== id)) 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0', }}>
      
      {
        props.isLoadingNoticias
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color='#152d44' />
        </View>
        :
        <FlatList
          style={{ marginTop: 0, paddingHorizontal: 5, }}
          data={props.listNoticias}
          scrollEnabled={true} 
          keyExtractor={(item, index) => item[0].toString()}
          extraData={props}
          enableEmptySections={true}
          // ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'black', }}></View>}     
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props.isLoadingNoticias ? 'Sem notícias no dia...' : null}</Text>}
          renderItem={({ item, index }) => <NoticiasDiaItem index={index} item={item} _HandleOnPressItem={_HandleOnPressItem} _HandleOnDeleteItem={_HandleOnDeleteItem} />}   
          initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => { _CarregarDados() }} title="Carregando..." />}
        /> 
      }

    </SafeAreaView>
  )

}

const NoticiasDiaItem = (props) => {

  const id = props.item[0]
  const site = props.item[1]
  const datahora = moment(props.item[2], "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm")
  const tipo = props.item[3]
  const titulo = props.item[4]
  const link = props.item[5]

  // console.log('Key: ', props.item.Key)

  return (
    <View key={id} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 10, elevation: 1,  marginBottom: 7, marginTop: 7, marginLeft: 7, marginRight: 7, paddingHorizontal: 15, paddingVertical: 15, }}>
      <TouchableOpacity style={{ flex: 1, }} onPress={() => { props._HandleOnPressItem(link) }} >

        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 10, }}>
          <Text style={{ fontSize: 12, color: 'gray', fontWeight: 'bold', }}>{tipo}</Text>
          <Text style={{ fontSize: 12, color: 'gray', }}>{datahora}</Text>
        </View>

        <View style={{ marginBottom: 10, }}>
          <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold', }}>{titulo}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: 'flex-end', }}>
          <Text style={{ fontSize: 12, color: 'gray', }}>Fonte: <Text style={{ fontWeight: 'bold', }}>{site}</Text></Text>
        </View>
        
      </TouchableOpacity>
    </View>
  )

}

const mapStateToProps = state => ({
  txtErroNoticias: state.noticias.txtErroNoticias,
  listNoticias: state.noticias.listNoticias,
  isLoadingNoticias: state.noticias.isLoadingNoticias,
})

const mapDispatchToProps = { modificaListaNoticias, modificaMsgNoticias, buscaListaNoticiasDia, }

export default connect(mapStateToProps, mapDispatchToProps)(NoticiasDia)

