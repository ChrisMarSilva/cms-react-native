
import React, { useEffect, useState, } from 'react'
import { Text, View, SafeAreaView, Image, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'

import * as CONSTANTE from '../util/Constante'
import * as HelperToast from '../util/HelperToast'
import { modificaMsgComentarios, buscaListaComentarios, } from '../store/ducks/comentarios'

const imgDefault = require('../assets/pessoa-icon.png')

function Comentarios(props) {
  
  const [page, setPage] = useState(1)
  
  useEffect(() => {
    _CarregarDados()
    // props.navigation.setOptions({
    //   headerRight: () => (
    //     <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 50, borderColor: 'red', borderWidth: 0, }} onPress={() => _CarregarMaisDados() } >
    //       <Icon name="refresh" size={20} color="#fff" />
    //     </TouchableOpacity>
    //   ),
    // })
  }, [])
  
  useEffect(() => {
    if (props.txtErroComentarios != '') { 
      HelperToast.displayMsgError(props.txtErroComentarios)
      props.modificaMsgComentarios('')
    }
  }, [props.txtErroComentarios])  
  
  const _CarregarDados = async () => {
    let pagAtual = 1
    props.buscaListaComentarios(pagAtual)
    setPage(pagAtual) 
  }
  
  const _CarregarMaisDados = async () => {
    let pagAtual = page + 1
    props.buscaListaComentarios(pagAtual)
    setPage(pagAtual)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F1', }}>

      <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'black', marginTop: 10, marginBottom: 5, marginRight: 15}}>Página: <Text style={{ fontWeight: 'bold', }}>#{page}</Text></Text>
      
      {
        props.isLoadingComentarios
        ? 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <ActivityIndicator color='#152d44' size='large' style={{ }} /> 
        </View>
        : 
        <FlatList
          style={{ marginTop: 0, paddingHorizontal: 5, }}
          data={props.listComentarios}
          scrollEnabled={true} 
          keyExtractor={(item, index) => item.Id.toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props.isLoadingComentarios && props.txtErroComentarios == '' ? 'Nenhum comentário encontrado...' : null}</Text>}
          renderItem={({ item, index }) => <ComentariosItem index={index} item={item} />} 
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => { _CarregarDados() }} title="Carregando..." />}  
          initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          //onEndReached={_CarregarMaisDados}
          //onEndReachedThreshold={0.1}
        />
      }

      <TouchableOpacity disabled={props.isLoadingComentarios} style={{ position: 'absolute', right: 20, bottom: 20, }} onPress={() => _CarregarMaisDados() } >
        <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 50,  }} >
          { props.isLoadingComentarios ?  <ActivityIndicator color='#fff' size='small' style={{}} /> : <Icon name="refresh" size={20} color="#fff" /> }
        </LinearGradient>
      </TouchableOpacity>
      
    </SafeAreaView>
  )

}
  
function ComentariosItem(props) {
  
  const id = props.item.Id
  const nome = props.item.Nome
  const foto = props.item.Foto
  const dtHr = props.item.DtHr
  const texto = props.item.Texto
  // const exibeBtnDenu = props.item.ExibeBtnDenu
  // const exibeBtnEdit = props.item.ExibeBtnEdit
  // const exibeBtnExcl = props.item.ExibeBtnExcl
  // const marcarGostei = props.item.MarcarGostei
  // const qtdeGostei = props.item.QtdeGostei
  // const marcarNaoGostei = props.item.MarcarNaoGostei
  // const qtdeNaoGostei = props.item.QtdeNaoGostei
  // const qtdeComent = props.item.QtdeComent
  // const exibirDadosAdmin = props.item.ExibirDadosAdmin
  const listaResp = props.item.ListaResp
  
  const [src, setSrc] = useState(imgDefault) 

  const loadFallback = () => setSrc(imgDefault)
  
  const formatarTeste = (str) => str.replace(/<br>/g, '\n').replace(/(<br\/>)+/g, "\n")
  
  useEffect(() => {
    setSrc({ uri: CONSTANTE.URL_PADRAO + foto, headers: {Pragma: 'force-cache'}, })
  }, [])

  // console.log('Key: ', props.item.Key)

  return (
    <View key={id} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 10, elevation: 1,  marginBottom: 7, marginTop: 7, marginLeft: 7, marginRight: 7, paddingHorizontal: 15, paddingVertical: 15, }}>

      <View style={{ flexDirection: "row", marginBottom: 5, }}>
        <Image source={src} style={{ marginLeft: 5, width: 45, height: 45, borderRadius: 50, }} onError={ () => loadFallback() }/>
        <View style={{ marginLeft: 20, }}>
          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginBottom: 5, }}>{nome}</Text>
          <Text numberOfLines={1} style={{ fontSize: 12, color: 'gray' }}>{dtHr}</Text>
        </View>
      </View>      
      
      <Text style={{ fontSize: 14, color: 'gray', }}>{formatarTeste(texto)}</Text>

      {/* {listaResp.length > 0 && <View style={{ height: 1, width: "100%", backgroundColor: "#f0f0f0",  marginTop: 10, }} /> } */}
      
      {listaResp.length > 0 && <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 20, }}>RESPOSTAS</Text> }
        
      <FlatList
        style={{ paddingLeft: 30, }}
        data={listaResp}
        scrollEnabled={true} 
        keyExtractor={(item, index) => item.Id.toString()}
        renderItem={({ item, index }) => <RespostasItem index={index} item={item} />}   
        initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
        maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
        windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
        removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
        updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
        showsVerticalScrollIndicator={false}
        viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
      />
      
    </View>
  )

}

function RespostasItem(props) {
  
  const id = props.item.Id
  const nome = props.item.Nome
  const foto = props.item.Foto
  const dtHr = props.item.DtHr
  const texto = props.item.Texto
  // const exibeBtnDenu = props.item.ExibeBtnDenu
  // const exibeBtnEdit = props.item.ExibeBtnEdit
  // const exibeBtnExcl = props.item.ExibeBtnExcl
  // const exibirDadosAdmin = props.item.ExibirDadosAdmin
  // const marcarGostei = props.item.MarcarGostei
  // const qtdeGostei = props.item.QtdeGostei
  // const marcarNaoGostei = props.item.MarcarNaoGostei
  // const qtdeNaoGostei = props.item.QtdeNaoGostei
  
  const [src, setSrc] = useState(imgDefault) 

  const loadFallback = () => setSrc(imgDefault)
  
  const formatarTeste = (str) => str.replace(/<br>/g, '\n').replace(/(<br\/>)+/g, "\n")
  
  useEffect(() => {
    setSrc({ uri: CONSTANTE.URL_PADRAO + foto, headers: {Pragma: 'force-cache'}, })
  }, [])

  // console.log('Key: ', props.item.Key)

  return (
    <View key={id} style={{ flex: 1, marginTop: 25, }}>

      <View style={{ flexDirection: "row", marginBottom: 5, }}>
        <Image source={src} style={{ marginLeft: 5, width: 45, height: 45, borderRadius: 50, }} onError={ () => loadFallback() }/>
        <View style={{ marginLeft: 20, }}>
          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: 'bold',color: 'black', marginBottom: 5, }}>{nome}</Text>
          <Text numberOfLines={1} style={{ fontSize: 12, color: 'gray' }}>{dtHr}</Text>
        </View>
      </View>      
      
      <Text style={{ fontSize: 14, color: 'gray' }}>{formatarTeste(texto)}</Text>
      
    </View>
  )

}

const mapStateToProps = state => ({
  txtErroComentarios: state.comentarios.txtErroComentarios,
  listComentarios: state.comentarios.listComentarios,
  isLoadingComentarios: state.comentarios.isLoadingComentarios,
})

const mapDispatchToProps = { modificaMsgComentarios, buscaListaComentarios, }

export default connect(mapStateToProps, mapDispatchToProps)(Comentarios)
