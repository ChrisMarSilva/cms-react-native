import React, { useEffect, useRef, } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput, Keyboard, Alert, ActivityIndicator, FlatList, Platform, } from 'react-native'
import { FontAwesome, Ionicons, } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import SuperAlert from "react-native-super-alert";

import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import * as HelperNumero from '../util/HelperNumero'
import { modificaUrl, } from '../store/ducks/config'
import { modificaFiltroCartao, modificaMsgConsumo, limpaListaConsumo, buscaListaConsumo, } from '../store/ducks/consumo'

const TituloPaddingTop = Platform.OS === 'ios' ? 0 : 20;

const Consumo = (props) => {

  const refInputCartao = useRef(null)

  useEffect(() => {
    // console.log('Consumo.Entrar')
    _LimparDados()
    _CarregarDados()
    refInputCartao.current.focus()
    return () => {
      //console.log('Consumo.Sair')
      _LimparDados()
    }
  }, [])

  useEffect(() => {
    if (props.txtErroConsumo != '') {
      // Alert.alert("", props.txtErroConsumo, [{ text: "OK" }], { cancelable: true, onDismiss: () => { props.modificaMsgConsumo(''); refInputCartao.current.focus(); } })
      alert('', props.txtErroConsumo, { textConfirm: '     OK     ', onConfirm: () => _onPressConfirmAlert(), });
      props.modificaMsgConsumo('')
      //refInputCartao.current.focus()
    }
  }, [props.txtErroConsumo])

  const _onPressConfirmAlert = () => {
    props.modificaMsgConsumo('');
    refInputCartao.current.focus();
  }

  const _LimparDados = async () => {
    props.limpaListaConsumo('')
  }

  const _CarregarDados = async () => {
    _GetUrlPadrao()
    setTimeout(function () { refInputCartao.current.focus(); }, 500)
  }

  const _GetUrlPadrao = async () => {
    let url = props.txtURL
    if (url == '') {
      url = await AsyncStorage.getItem(CONSTANTE.SESSAO_URL)
      props.modificaUrl(url)
    }
    return url
  }

  const _HandleOnPressPesquisar = async () => {
    let cartao = props.txtFiltroCartao.toString().trim()
    if (cartao == '') {
      //Alert.alert('', 'Cartão não informado!')
      alert('', 'Cartão não informado!', { textConfirm: '     OK     ' });
      refInputCartao.current.focus()
      return false
    }
    cartao = cartao.padStart(5, '0')
    props.modificaFiltroCartao(cartao)
    const url = await _GetUrlPadrao()
    if (url) props.buscaListaConsumo(url, cartao)
    Keyboard.dismiss()
  }

  //  const isDisabledButtonOnLoad = props.listaPedidoCartao.length > 0 || props.txtPedidoMoca != '...' || props.listaPedidoProduto.length > 0

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.branco, }}>

      <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: colors.default, height: 120, borderBottomEndRadius: 70, paddingTop: TituloPaddingTop, }}>

        <Text style={{ color: colors.branco, fontSize: 14, fontWeight: 'bold', alignSelf: "flex-end", marginRight: 15, }}>CONSULTA DE CARTÃO</Text>

        <Text style={{ color: colors.branco, fontSize: 30, fontWeight: 'bold', marginBottom: 10, }}>Safira Mobile</Text>

        <Text style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 10, marginLeft: 10, color: colors.branco, fontSize: 12, }}>Garçom: <Text style={{ fontWeight: 'bold', }}>{props.txtNome}</Text></Text>

        <TouchableOpacity onPress={() => props.navigation.openDrawer()} style={{ position: 'absolute', left: 0, top: 30, height: 50, width: 50, shadowColor: colors.default, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.default, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
          <Ionicons name="md-menu" size={32} color={colors.branco} />
        </TouchableOpacity>

      </View>

      <SuperAlert customStyle={styles.customStyle} />

      <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 30, alignItems: 'center', }}>
        <Text style={{ color: colors.default, fontSize: 16, fontWeight: 'bold', }}>Informe o código do Cartão</Text>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 30, alignItems: 'center', }}>
        <TextInput ref={refInputCartao} placeholder="..." placeholderTextColor={colors.cinza_escuro} maxLength={5} style={{ flex: 1, color: colors.default, borderWidth: 1, borderColor: colors.default, borderRadius: 15, marginRight: 15, height: 50, textAlign: 'center', fontSize: 28, fontWeight: "bold", }} autoCapitalize="none" keyboardType='numeric' autoFocus={true} autoCorrect={false} underlineColorAndroid='transparent' returnKeyType={'done'} value={props.txtFiltroCartao} onChangeText={value => props.modificaFiltroCartao(value)} onSubmitEditing={_HandleOnPressPesquisar} onFocus={_LimparDados} onEndEditing={props.clearFocus} />
        <TouchableOpacity onPress={() => _HandleOnPressPesquisar()} disabled={props.isLoadingConsumo} style={{ marginRight: 10, height: 60, width: 60, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
          {props.isLoadingConsumo ? <ActivityIndicator color={colors.preto_claro} size='large' /> : <FontAwesome name="check" size={50} color={colors.successo} />}
        </TouchableOpacity>
      </View>

      {
        props.isLoadingConsumo &&
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <ActivityIndicator color={colors.default} size='large' />
        </View>
      }

      {
        props.isShowLista &&
        <View style={{ paddingTop: 10, paddingLeft: 15, paddingRight: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ flex: 1, fontSize: 12, color: colors.preto, }}>Nome</Text>
            <Text style={{ flex: 6, fontSize: 18, color: colors.default, fontWeight: "bold", }}>{props.nomeConsumo.toString().trim() || '---'}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ flex: 1, fontSize: 14, color: colors.preto, }}>Saldo</Text>
            <Text style={{ flex: 6, fontSize: 25, color: colors.default, fontWeight: "bold", }}>R$ {HelperNumero.GetMascaraValorDecimal(props.saldoConsumo || 0.00)}</Text>
          </View>
        </View>
      }

      {props.isShowLista &&
        <FlatList
          style={{ flex: 1, marginTop: 10, marginBottom: 55, }}
          data={props.listaConsumo}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={30}
          maxToRenderPerBatch={30}
          windowSize={31}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          renderItem={({ item, index }) => <ConsumoItem index={index} item={item} />}
          ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!props.isLoadingConsumo ? 'Nenhum resultado encontrado...' : null}</Text>}
        />
      }

      <View style={{ position: 'absolute', bottom: 0, padding: 10, width: '100%', }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} disabled={props.isLoadingConsumo} >
          <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
            <Text style={{ color: colors.branco, fontSize: 18, fontWeight: 'bold' }}>VOLTAR</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )

}

const ConsumoItem = (props) => {
  const id = props.index
  const descricao = props.item.descricao.toString().trim() || 'NÃO INFORMADO'
  const quantidade = props.item.qtd || ''
  const valor = props.item.valor || 0.00
  const isDisabled = quantidade.toString().trim() == ''
  return (
    <View key={id} style={{ flex: 1, height: 50, backgroundColor: colors.branco, borderBottomColor: colors.cinza, borderBottomWidth: 1, alignItems: 'center', flexDirection: "row", justifyContent: 'space-around', }}>
      <Text numberOfLines={1} style={[{ flex: 1, marginLeft: 10, fontSize: 16, color: colors.preto, textAlign: 'center', fontWeight: 'bold', paddingTop: 4, height: 30, borderRadius: 5, backgroundColor: colors.cinza, }, (isDisabled) && { backgroundColor: colors.branco, }]}>{quantidade == '' ? '' : quantidade + 'x'}</Text>
      <Text numberOfLines={1} style={{ flex: 7, marginLeft: 15, fontSize: 16, color: colors.preto, textAlign: 'left', }}>{descricao}</Text>
      <Text numberOfLines={1} style={{ flex: 4, marginRight: 10, fontSize: 16, color: colors.preto, textAlign: 'right', fontWeight: 'bold', }}>R$ {HelperNumero.GetMascaraValorDecimal(valor)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  customStyle: {
    container: { flex: 1, backgroundColor: '#e8e8e8', borderRadius: 10, },
    message: { color: '#4f4f4f', fontSize: 20, },
    buttonConfirm: { backgroundColor: '#4490c7', borderRadius: 10, },
    textButtonConfirm: { color: '#fff', fontWeight: 'bold', fontSize: 25, },
  },
});

const mapStateToProps = state => ({

  // config
  txtURL: state.config.txtURL,

  // login
  txtCodigo: state.login.txtCodigo,
  txtNome: state.login.txtNome,

  // Consumo
  txtFiltroCartao: state.consumo.txtFiltroCartao,
  isShowLista: state.consumo.isShowLista,
  isLoadingConsumo: state.consumo.isLoadingConsumo,
  txtErroConsumo: state.consumo.txtErroConsumo,
  listaConsumo: state.consumo.listaConsumo,
  totalConsumo: state.consumo.totalConsumo,
  pagamentoConsumo: state.consumo.pagamentoConsumo,
  saldoConsumo: state.consumo.saldoConsumo,
  cartaoConsumo: state.consumo.cartaoConsumo,
  nomeConsumo: state.consumo.nomeConsumo,

})

const mapDispatchToProps = {
  // Config
  modificaUrl,

  // Consumo
  modificaFiltroCartao,
  modificaMsgConsumo,
  limpaListaConsumo,
  buscaListaConsumo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Consumo)
