
import React, { useEffect } from 'react'
import { Text, View, SafeAreaView, ActivityIndicator, FlatList, RefreshControl, } from 'react-native'
import { connect } from 'react-redux'
import { useRoute } from '@react-navigation/native'

import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { modificaMsgOperacoes, buscaListaOperApuracoes, } from '../store/ducks/apuracoes'

function ApuracoesDetalhe (props) {

  const route = useRoute()
  const { tpApuracao, dtMesAno } = route.params // this.props.route.params

  const descricaoTipoApuracao = (tipo) => {
    switch(tipo) {
      case 'C': return 'Operações Comum com AÇÕES'
      case 'D': return 'Operações DayTrade com AÇÕES'
      case 'F': return 'Operações com FIIs'
      case 'E': return 'Operações Comum com ETFs'
      case 'G': return 'Operações DayTrade com ETFs'
      case 'I': return 'Operações Comum com BDRs'
      case 'J': return 'Operações DayTrade com BDRs'
      case 'K': return 'Operações com CRIPTOS'
      default: return 'Desconhecido'
      }
  }
  
  useEffect(() => {
    _CarregarDados()
  }, [])
  
  useEffect(() => {
    if (props.txtErroOperacoes != '') { 
      HelperToast.displayMsgError(props.txtErroOperacoes)
      props.modificaMsgOperacoes('')
    }
  }, [props.txtErroOperacoes])  
  
  const _CarregarDados = async () => {
    props.buscaListaOperApuracoes(tpApuracao, dtMesAno) 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F1', }}>
      
      <Text style={{ alignSelf: 'center', fontSize: 16, color: "#000", fontWeight: 'bold', marginBottom: 10, marginTop: 20, }}>{descricaoTipoApuracao(tpApuracao)}</Text>
      
      {
        props.isLoadingOperacoes
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200, }}>
          <ActivityIndicator size="large" color='#152d44' />
        </View>
        :
        <FlatList
          style={{ marginTop: 0, }}
          data={props.lstFiltroOperacoes}
          scrollEnabled={true} 
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props.isLoadingOperacoes ? 'Sem operações...' : null}</Text>}
          renderItem={({ item, index }) => <ApuracoesDetalheItem index={index} item={item} />}   
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

function ApuracoesDetalheItem (props) {

  const id = props.index
  const operData = props.item[0]
  const operCodigo = props.item[1]
  const operQuant = props.item[2]
  const operPrecoMedio = props.item[3]
  const operPrecoCusto = props.item[4]
  const operTotal = props.item[5]
  const operValorizFormat = props.item[6]
  const operValoriz = HelperNumero.GetValorDecimal(props.item[6] || 0.00) 
  const operPercent = props.item[7]
  
 //  console.log('operValoriz', props.item[6], operValoriz) 

  // console.log('Key: ', props.item.Key)

  return(
    <View key={id} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 10, elevation: 1, marginBottom: 7, marginTop: 7, marginLeft: 10, marginRight: 10, paddingHorizontal: 15, paddingVertical: 15, }}>

      <View style={{ flex: 1, marginLeft: 20, }}>
        <Text style={{ fontSize: 14, }}>Data</Text>
        <Text style={{ fontSize: 14, }}>Ativo</Text>
        <Text style={{ fontSize: 14, }}>Quant.</Text>
        <Text style={{ fontSize: 14, }}>Preço Médio</Text>
        <Text style={{ fontSize: 14, }}>Preço Venda</Text>
        <Text style={{ fontSize: 14, }}>Total</Text>
        <Text style={{ fontSize: 14, }}>Valorização</Text>
        <Text style={{ fontSize: 14, }}>Percentual</Text>
      </View>
        
      <View style={{ flex: 1, }}>
        <Text style={{ fontSize: 14, }}>{operData}</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', }}>{operCodigo}</Text>
        <Text style={{ fontSize: 14, }}>{operQuant}</Text>
        <Text style={{ fontSize: 14, }}>R$ {operPrecoCusto}</Text>
        <Text style={{ fontSize: 14, }}>R$ {operPrecoMedio}</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', }}>R$ {operTotal}</Text>
        <Text style={[{ fontSize: 14, }, (operValoriz > 0.0) && { fontWeight: 'bold', color: 'green' }, (operValoriz < 0.0) && { fontWeight: 'bold', color: 'red' }]}>R$ {operValorizFormat}</Text>
        <Text style={[{ fontSize: 14, }, (operValoriz > 0.0) && { fontWeight: 'bold', color: 'green' }, (operValoriz < 0.0) && { fontWeight: 'bold', color: 'red' }]}>{operPercent}%</Text>
      </View>

    </View>
  )

}

const mapStateToProps = state => ({
  txtErroOperacoes: state.apuracoes.txtErroOperacoes,
  lstFiltroOperacoes: state.apuracoes.lstFiltroOperacoes,
  isLoadingOperacoes: state.apuracoes.isLoadingOperacoes,
})

const mapDispatchToProps = { modificaMsgOperacoes, buscaListaOperApuracoes, }

export default connect(mapStateToProps, mapDispatchToProps)(ApuracoesDetalhe)

