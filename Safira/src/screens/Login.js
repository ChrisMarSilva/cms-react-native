import React, { useState, useEffect, useRef, } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, Keyboard, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome, Feather, } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions, } from '@react-navigation/native'
import * as Updates from 'expo-updates'
import { connect } from 'react-redux'
import SuperAlert from "react-native-super-alert";

import * as CONSTANTE from '../util/Constante'
import { colors } from '../styles'
import { modificaEmail, modificaSenha, modificaMsgLogin, modificaLoginOKErro, autenticarUsuario, } from '../store/ducks/login'
import { modificaUrl, } from '../store/ducks/config'
import LoginModalAdmin from './LoginModalAdmin'

const TituloPaddingTop = Platform.OS === 'ios' ? 0 : 20;

const Login = (props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [isModalAdminVisible, setModalAdminVisible] = useState(false)
  const [txtStatusAtualizacao, setTxtStatusAtualizacao] = useState('')
  const refInputEmail = useRef(null)
  const refInputSenha = useRef(null)

  useEffect(() => {
    // console.log('Login.Entrar')
    _VerificarAtualizacao()
    _LimparDados()
    _CarregarDados()

    return () => {
      //console.log('Login.Sair')
      _LimparDados()
    }
  }, [])

  useEffect(() => {
    if (props.txtErroLogin != '') {
      // Alert.alert("", props.txtErroLogin, [{ text: "OK" }], { cancelable: true, onDismiss: () => props.modificaMsgLogin('') })
      alert('', props.txtErroLogin, { textConfirm: '     OK     ' });
      props.modificaMsgLogin('')
    }
  }, [props.txtErroLogin])

  useEffect(() => {
    if (props.isLoginOK) {
      props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'HomeMainStack' }] }))
      props.modificaLoginOKErro()
    }
  }, [props.isLoginOK])

  const _VerificarAtualizacao = async () => {
    try {

      if (__DEV__) return  // NAO PODE TER ATUALIZAÇOES EM MODE DE DESENVOLVIMENTO

      const update = await Updates.checkForUpdateAsync()  // setTxtStatusAtualizacao("Verificando atualizações...")

      if (!update.isAvailable) return  // setTxtStatusAtualizacao("Você já está com a versão mais atual!!!")

      setTxtStatusAtualizacao("NOVA VERSÃO DISPONÍVEL")
      await Updates.fetchUpdateAsync()  //setTxtStatusAtualizacao("Baixando nova versão...")
      await Updates.reloadAsync()  // setTxtStatusAtualizacao("Reiniciando aplicativo...")

    } catch (err) {
      setTxtStatusAtualizacao(err)
    }
  }

  const _GetUrlPadrao = async () => {
    let url = await AsyncStorage.getItem(CONSTANTE.SESSAO_URL) || 'http://10.0.0.169:5000/'
    // SOMENTE DESENV - INICIO
    // url = 'http://rela.no-ip.net:8885/v1/'
    // await AsyncStorage.setItem(CONSTANTE.SESSAO_URL, url)
    // SOMENTE DESENV - FIM
    if (url) props.modificaUrl(url)
    return url
  }

  const _LimparDados = async () => {
    _GetUrlPadrao()
    setModalAdminVisible(false)
    props.modificaUrl('')
    props.modificaEmail('')
    props.modificaSenha('')
    props.modificaLoginOKErro()
  }

  const _CarregarDados = async () => {
    let login = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_EMAIL) || ''
    if (login.toString().trim()) {
      login = login.toString().trim().padStart(6, '0')
      props.modificaEmail(login)
    }
    if (!login && refInputEmail) refInputEmail.current.focus()
    if (login && refInputSenha) refInputSenha.current.focus()
    if (__DEV__) {
      const senha = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_SENHA) || ''
      if (senha) props.modificaSenha(senha)
      const url = await _GetUrlPadrao()
      // if (login && senha && url) props.autenticarUsuario(url, login, senha)
    }
  }

  const _onPressLogin = async () => {
    Keyboard.dismiss()
    const url = await _GetUrlPadrao()
    let login = props.txtEmail.toString().trim()
    const senha = props.txtSenha.toString().trim()
    if (login) {
      login = login.toString().trim().padStart(6, '0')
      props.modificaEmail(login)
    }
    props.autenticarUsuario(url, login, senha)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.branco, }}>

      <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: colors.default, height: 120, borderBottomEndRadius: 90, paddingTop: TituloPaddingTop, }}>

        <Text style={{ color: colors.branco, fontSize: 14, fontWeight: 'bold', alignSelf: "flex-end", marginRight: 15, }}>LOGIN</Text>

        <Text style={{ color: colors.branco, fontSize: 30, fontWeight: 'bold', }}>Safira Mobile</Text>

        <TouchableOpacity onPress={() => setModalAdminVisible(true)} disabled={props.isLoadingLogin} style={{ position: 'absolute', left: 0, top: 30, height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
          <FontAwesome name="cog" size={35} color={colors.branco} />
        </TouchableOpacity>

      </View>

      {isModalAdminVisible && <LoginModalAdmin isModalVisible={isModalAdminVisible} setModalVisible={setModalAdminVisible} navigation={props.navigation} />}

      <KeyboardAvoidingView style={{ flex: 3, padding: 10, backgroundColor: colors.branco, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingVertical: 30, }}>

        <Text style={{ color: colors.default, fontSize: 20, fontWeight: 'bold', }}>Login</Text>

        <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: colors.cinza_escuro, paddingBottom: 5, }}>
          <FontAwesome name="user" color={colors.cinza_escuro} size={25} style={{ marginBottom: 8, }} />
          <TextInput ref={refInputEmail} placeholder="..." placeholderTextColor={colors.cinza_escuro} maxLength={6} style={{ flex: 1, marginTop: -12, paddingLeft: 15, color: colors.default, height: 50, fontSize: 30, fontWeight: 'bold', }} autoCapitalize="none" keyboardType='numeric' autoFocus={true} autoCorrect={false} underlineColorAndroid='transparent' returnKeyType={"next"} value={props.txtEmail} onChangeText={value => props.modificaEmail(value)} onSubmitEditing={(event) => refInputSenha.current.focus()} />
        </View>

        <Text style={{ color: colors.default, fontSize: 20, fontWeight: 'bold', marginTop: 35, }}>Senha</Text>

        <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: colors.cinza_escuro, paddingBottom: 5 }}>
          <Feather name="lock" color={colors.cinza_escuro} size={25} style={{ marginBottom: 8, }} />
          <TextInput ref={refInputSenha} placeholder="..." placeholderTextColor={colors.cinza_escuro} style={{ flex: 1, marginTop: -12, paddingLeft: 15, color: colors.default, height: 50, fontSize: 30, fontWeight: 'bold', }} autoCapitalize="none" keyboardType='numeric' autoFocus={false} autoCorrect={false} secureTextEntry={secureTextEntry ? true : false} returnKeyType={'done'} underlineColorAndroid='transparent' enablesReturnKeyAutomatically={true} value={props.txtSenha} onChangeText={value => props.modificaSenha(value)} onSubmitEditing={_onPressLogin} onEndEditing={props.clearFocus} />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            {secureTextEntry ? <Feather name="eye-off" color="grey" size={30} /> : <Feather name="eye" color="grey" size={30} />}
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: 40, }}>
          <TouchableOpacity onPress={() => _onPressLogin()} disabled={props.isLoadingLogin} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, }} >
            <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ width: '100%', height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
              {props.isLoadingLogin ? <ActivityIndicator color={colors.branco} size='large' /> : <Text style={{ color: colors.branco, fontSize: 18, fontWeight: 'bold' }}>LOGIN</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* {props.txtErroLogin != '' && <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', color: colors.error, }}>{props.txtErroLogin}</Text>}  */}

      </KeyboardAvoidingView>

      <View style={{ marginTop: 20, alignItems: 'center', }}>
        <Text style={{ fontSize: 12, color: colors.cinza_escuro, }}>
          {txtStatusAtualizacao}
        </Text>
        <Text style={{ fontSize: 12, color: colors.cinza_escuro, fontWeight: 'bold', }}>
          Versão: {CONSTANTE.VERSAO_APP}
        </Text>
      </View>

      <SuperAlert customStyle={styles.customStyle} />

    </SafeAreaView>
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

  // login
  txtEmail: state.login.txtEmail,
  txtSenha: state.login.txtSenha,
  txtErroLogin: state.login.txtErroLogin,
  isLoadingLogin: state.login.isLoadingLogin,
  isLoginOK: state.login.isLoginOK,

})

const mapDispatchToProps = {
  autenticarUsuario,
  modificaEmail,
  modificaSenha,
  modificaMsgLogin,
  modificaLoginOKErro,
  modificaUrl,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
