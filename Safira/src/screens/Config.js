import React, { useEffect, } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, Keyboard, TouchableOpacity, Alert, ActivityIndicator, FlatList, Platform, } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
//import { CommonActions, } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import SuperAlert from "react-native-super-alert";

import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import { limpaListaErro, adicionaListaErro, modificaListaErro, } from '../store/ducks/erro'
import { modificaUrl, verificarUrl, modificaMsgConfig, verificarVersao, } from '../store/ducks/config'

const TituloPaddingTop = Platform.OS === 'ios' ? 0 : 20;

const Config = (props) => {

  useEffect(() => {
    // console.log('Config.Entrar') 
    _CarregarDados()
    return () => {
      //console.log('Config.Sair')
    }
  }, [])

  useEffect(() => {
    if (props.isConfigOK) {
      // props.navigation.dispatch( CommonActions.reset({ index: 0, routes: [{name: 'Auth'}] }) ) 
      // props.navigation.navigate('Login') // props.navigation.navigate('Auth') // props.navigation.goBack()
      props.navigation.goBack()
      props.modificaMsgConfig('')
    }
  }, [props.isConfigOK])

  useEffect(() => {
    if (props.txtConfigErro != '') {
      // Alert.alert('', props.txtConfigErro, [{ text: "OK" }], { cancelable: true, onDismiss: () => props.modificaMsgConfig('') })
      alert('', props.txtConfigErro, { textConfirm: '     OK     ' });
      props.modificaMsgConfig('')
    }
  }, [props.txtConfigErro])

  const _GetUrlPadrao = async () => {
    let url = props.txtURL
    if (url == '') {
      url = await AsyncStorage.getItem(CONSTANTE.SESSAO_URL)
      props.modificaUrl(url)
    }
    return url
  }

  const _CarregarDados = async () => {
    // adicionaListaErro('config', 'api/v1/config', {}, '201', 'erro de teste')
    const existingErrors = await AsyncStorage.getItem(CONSTANTE.SESSAO_ERROR)
    const lista = existingErrors != null ? JSON.parse(existingErrors) : []
    lista.reverse()
    props.modificaListaErro(lista)
    const url = await _GetUrlPadrao()
    if (url) props.verificarVersao(url)

  }

  const _onPressLimpar = async () => {
    props.modificaUrl('')
    await AsyncStorage.setItem(CONSTANTE.SESSAO_URL, '')
  }

  const _onPressSalvar = async () => {
    Keyboard.dismiss()
    const url = props.txtURL
    await AsyncStorage.setItem(CONSTANTE.SESSAO_URL, url)
    props.verificarUrl(url)
    props.verificarVersao(url)
  }

  const _onPressExcluirErro = async () => {
    props.limpaListaErro()
    await AsyncStorage.setItem(CONSTANTE.SESSAO_ERROR, JSON.stringify([]))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.branco, }}>

      <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: colors.default, height: 120, borderBottomEndRadius: 90, paddingTop: TituloPaddingTop, }}>

        <Text style={{ color: colors.branco, fontSize: 14, fontWeight: 'bold', alignSelf: "flex-end", marginRight: 15, }}>CONFIGURAÇÃO</Text>

        <Text style={{ color: colors.branco, fontSize: 30, fontWeight: 'bold', }}>Safira Mobile</Text>

      </View>

      {/* <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: colors.default, height: 100, borderBottomEndRadius: 90, }}>
        <Text style={{ color: colors.branco, fontSize: 30, fontWeight: 'bold', }}>Safira Mobile</Text>
        <Text style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 10, marginLeft: 10, color: colors.branco, fontSize: 15, fontWeight: 'bold', }}>Configuração</Text>
      </View> */}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", marginHorizontal: 20, }}>

        <Text style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginTop: 35, alignSelf: 'flex-start', }}>URL</Text>

        <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: colors.cinza_escuro, paddingBottom: 5 }}>
          <TextInput placeholder="..." placeholderTextColor={colors.cinza_escuro} autoFocus={false} autoCorrect={false} style={{ flex: 1, marginTop: -12, color: colors.default, height: 50, fontSize: 16, }} keyboardType='url' autoCapitalize="none" returnKeyType={'done'} underlineColorAndroid='transparent' enablesReturnKeyAutomatically={true} value={props.txtURL} onChangeText={value => props.modificaUrl(value)} onSubmitEditing={_onPressSalvar} onEndEditing={props.clearFocus} />
          <TouchableOpacity onPress={() => _onPressLimpar()} >
            <FontAwesome name="close" color={colors.cinza_escuro} size={25} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, width: '100%', }}>
          <Text style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10, alignSelf: 'flex-start', }}>ERROS ({props.listaErro.length})</Text>
          <TouchableOpacity onPress={() => _onPressExcluirErro()} style={{ alignSelf: 'center', }} >
            <FontAwesome name="close" color={colors.cinza_escuro} size={25} />
          </TouchableOpacity>
        </View>

        <SuperAlert customStyle={styles.customStyle} />

        <View style={{ flex: 1, width: '100%', }}>
          <FlatList
            style={{ flexGrow: 0, minHeight: 20, marginTop: 5, marginHorizontal: 10, }}
            scrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={30}
            maxToRenderPerBatch={30}
            windowSize={31}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={50}
            showsVerticalScrollIndicator={false}
            viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
            data={props.listaErro}
            renderItem={({ item, index }) => <ConfigItem index={index} item={item} />}
          />
        </View>

        <TouchableOpacity onPress={() => _onPressSalvar()} disabled={props.isLoadingConfig} style={{ marginTop: 40, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
          <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ flexDirection: "row", width: '100%', height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
            {props.isLoadingConfig ? <ActivityIndicator color={colors.branco} size='large' /> : <Text style={{ color: colors.branco, fontSize: 18, fontWeight: 'bold' }}>SALVAR</Text>}
          </LinearGradient>
        </TouchableOpacity>

      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontSize: 12, color: colors.cinza_escuro, fontWeight: 'bold' }}>
          Versão EndPoint: {props.txtVsrEndPoint} - Versão App: {CONSTANTE.VERSAO_APP}
        </Text>
      </View>

    </SafeAreaView>
  )

}

const ConfigItem = (props) => {
  const id = props.index
  const datahora = props.item.datahora
  const tela = props.item.tela
  const url = props.item.url
  const params = props.item.params
  const statuscod = props.item.statuscod
  const message = props.item.message
  return (
    <View key={id} style={{ flex: 1, paddingBottom: 10, backgroundColor: colors.branco, borderBottomColor: colors.cinza_escuro, borderBottomWidth: 1, }}>
      <View style={{ flexDirection: 'row', }}>
        <Text style={{ flex: 2, fontWeight: 'bold', }}>DataHora: </Text>
        <Text style={{ flex: 5, }}>{datahora}</Text>
      </View>
      <View style={{ flexDirection: 'row', }}>
        <Text style={{ flex: 2, fontWeight: 'bold', }}>Tela: </Text>
        <Text style={{ flex: 5, }}>{tela}</Text>
      </View>
      <View style={{ flexDirection: 'row', }}>
        <Text style={{ flex: 2, fontWeight: 'bold', }}>URL: </Text>
        <Text style={{ flex: 5, }}>{url}</Text>
      </View>
      <View style={{ flexDirection: 'row', }}>
        <Text style={{ flex: 2, fontWeight: 'bold', }}>Params: </Text>
        <Text style={{ flex: 5, }}>{params}</Text>
      </View>
      <View style={{ flexDirection: 'row', }}>
        <Text style={{ flex: 2, fontWeight: 'bold', }}>StatusCod: </Text>
        <Text style={{ flex: 5, }}>{statuscod}</Text>
      </View>
      <View style={{ flexDirection: 'row', }}>
        <Text style={{ flex: 2, fontWeight: 'bold', }}>Message: </Text>
        <Text style={{ flex: 5, }}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  customStyle: {
    container: { backgroundColor: '#e8e8e8', borderRadius: 10, },
    message: { color: '#4f4f4f', fontSize: 20, },
    buttonConfirm: { backgroundColor: '#4490c7', borderRadius: 10, },
    textButtonConfirm: { color: '#fff', fontWeight: 'bold', fontSize: 25, },
  },
});

const mapStateToProps = state => ({

  // config
  txtURL: state.config.txtURL,
  isLoadingConfig: state.config.isLoadingConfig,
  isConfigOK: state.config.isConfigOK,
  txtConfigErro: state.config.txtConfigErro,
  txtVsrEndPoint: state.config.txtVsrEndPoint,

  // erro
  listaErro: state.erro.listaErro,


})

const mapDispatchToProps = {

  // config
  modificaUrl,
  verificarUrl,
  modificaMsgConfig,
  verificarVersao,

  // erro
  limpaListaErro,
  adicionaListaErro,
  modificaListaErro,

}

export default connect(mapStateToProps, mapDispatchToProps)(Config)
