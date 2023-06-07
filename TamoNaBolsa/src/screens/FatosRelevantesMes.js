
import React, { useEffect } from 'react'
import { Linking , Text, View, SafeAreaView, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, } from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'

import * as HelperToast from '../util/HelperToast'
import { modificaMsgFatos, buscaListaFatosMes, } from '../store/ducks/fatos'

function FatosRelevantesMes (props) {
  
  useEffect(() => {
    _CarregarDados()
  }, [])
  
  useEffect(() => {
    if (props.txtErroFatos != '') { 
      HelperToast.displayMsgError(props.txtErroFatos)
      props.modificaMsgFatos('')
    }
  }, [props.txtErroFatos])  
  
  const _CarregarDados = async () => {
    props.buscaListaFatosMes() 
  }
  
  const _HandleOnPressItem = async (link) => {
    Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F1', }}>

      {
        props.isLoadingFatos
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color='#152d44' />
        </View>
        :
        <FlatList
          style={{ marginTop: 0, paddingHorizontal: 5, }}
          data={props.listFatos}
          scrollEnabled={true} 
          keyExtractor={(item, index) => item[0].toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props.isLoadingFatos ? 'Sem fatos relevantes no mês...' : null}</Text>}
          renderItem={({ item, index }) => <FatosRelevantesMesItem index={index} item={item} _HandleOnPressItem={_HandleOnPressItem} />}   
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
  
function FatosRelevantesMesItem (props) {

  const id = props.item[0]
  const empresa = props.item[1]
  const datahora = moment(props.item[2], "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm")
  const link = props.item[3]
  const assunto = props.item[4]
  const protocolo = props.item[5]
  const tipoInvest = props.item[6]

  // console.log('Key: ', props.item.Key)

  return(
    <View key={id} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 10, elevation: 1,  marginBottom: 7, marginTop: 7, marginLeft: 7, marginRight: 7, paddingHorizontal: 15, paddingVertical: 15, }}>
      <TouchableOpacity style={{ flex: 1, }} onPress={() => { props._HandleOnPressItem(link) }} >

        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 10, }}>
          <Text style={{ fontSize: 12, color: 'gray', }}>{tipoInvest}</Text>
          <Text style={{ fontSize: 12, color: 'gray', }}>{datahora}</Text>
        </View>

        <View style={{ marginBottom: 10, }}>
          <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold', }}>{empresa}</Text>
          <Text numberOfLines={1} style={{ fontSize: 14, color: 'gray', fontWeight: 'bold', }}>{assunto}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: 'flex-end', }}>
          <Text style={{ fontSize: 12, color: 'gray', }}>Protocolo: <Text style={{ fontWeight: 'bold', }}>#{protocolo}</Text></Text>
        </View>
        
      </TouchableOpacity>
    </View>
  )

}

const mapStateToProps = state => ({
  txtErroFatos: state.fatos.txtErroFatos,
  listFatos: state.fatos.listFatos,
  isLoadingFatos: state.fatos.isLoadingFatos,
})

const mapDispatchToProps = { modificaMsgFatos, buscaListaFatosMes, }

export default connect(mapStateToProps, mapDispatchToProps)(FatosRelevantesMes)
