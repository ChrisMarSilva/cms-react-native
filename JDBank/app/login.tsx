import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView, Alert, BackHandler, Platform } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { TextInputMask } from 'react-native-masked-text'
import Constants from 'expo-constants'
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import * as HelperSessao from '@/util/HelperSessao'
import * as CONSTANTE from '@/util/Constante'

import imglogoJD from '@/assets/imgs/logo-red.png'
import imglogoJ3 from '@/assets/imgs/logo-blue.png'

export default function LoginScreen() {
	const params = useLocalSearchParams()

	const [txtChave, setTxtChave] = useState('')
	const [isLoadingLogin, setIsLoadingLogin] = useState(false)

	const userlogo = params.userBGColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3
	const userBGColorScreen = '#fff'

	useEffect(() => {
		setTxtChave('')
		setIsLoadingLogin(false)
		_verificarSessaoUsuario()
	}, [])

	const _verificarSessaoUsuario = () => {
		AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ICON).then((value) => router.setParams({ userIcon: value }))
		AsyncStorage.getItem(CONSTANTE.SESSAO_USER_BGCOLOR).then((value) => router.setParams({ userBGColor: value }))
		AsyncStorage.getItem(CONSTANTE.SESSAO_USER_CHAVE).then((value) => setTxtChave(value))
		AsyncStorage.getItem(CONSTANTE.SESSAO_USER_URL).then((value) => router.setParams({ userURL: value }))
		AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ISPB_IF).then((value) => router.setParams({ userIspb: value }))
		AsyncStorage.getItem(CONSTANTE.SESSAO_USER_NOME_IF).then((value) => router.setParams({ userNomeBanco: value }))
	}

	const _validarChaveUsuario = (userChave) => {
		try {
			setIsLoadingLogin(true)

			userChave = userChave.replace('( ', '').replace(') ', '').replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace(' ', '')

			axios({
				method: 'get',
				url: (params.userURL || CONSTANTE.URL_PAGADOR) + CONSTANTE.URL_GET_CHAVE + '?chave=' + encodeURIComponent(escape(userChave)),
				timeout: CONSTANTE.URL_TIMEOUT,
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
			})
				.then((response) => {
					try {
						const data = Array.isArray(response.data) ? response.data[0] : response.data

						if (data?.ispb == null || data?.ispb == '' || data?.ispb == 'undefined' || data?.ispb == undefined) {
							setIsLoadingLogin(false)
							Alert.alert('Telefone não cadastrado - ' + userChave)
							return false
						}

						const ispb = data?.ispb
						const nomeBanco = data?.nomeBanco
						const tipoPessoa = data?.tipoPessoa
						const documento = data?.documento
						const agencia = data?.agencia
						const conta = data?.conta
						const tipoConta = data?.tipoConta
						const nome = data?.nome

						if (ispb != params.userIspb) {
							setIsLoadingLogin(false)
							Alert.alert('Ispb não pertence ao Banco - ' + userChave)
							return false
						}

						_realizarLogin(userChave, ispb, nomeBanco, tipoPessoa, documento, agencia, conta, tipoConta, nome)
					} catch (error) {
						setIsLoadingLogin(false)
						Alert.alert('Erro(Response): ' + error.message)
					}
				})
				.catch((error) => {
					console.log(error)
					setIsLoadingLogin(false)
					Alert.alert('Telefone não cadastrado - ' + userChave)
				})
		} catch (error) {
			setIsLoadingLogin(false)
			Alert.alert('Erro(Geral): ' + error.message)
		}
	}

	const _realizarLogin = async (chave, ispb, nomeBanco, tipoPessoa, documento, agencia, conta, tipoConta, nome) => {
		await HelperSessao.SetUserURL(params.userURL?.toString() || CONSTANTE.URL_PAGADOR)
		await HelperSessao.SetUserChave(chave?.toString() || '')
		await HelperSessao.SetUserIspb(params.userIspb?.toString() || CONSTANTE.ISPB_PAGADOR)
		await HelperSessao.SetUserNomeBanco(params.userNomeBanco?.toString() || CONSTANTE.NOME_PAGADOR)
		await HelperSessao.SetUserBGColor(params.userBGColor || CONSTANTE.BG_VERMELHO)
		await HelperSessao.SetUserIcon(params.userIcon || CONSTANTE.ICON_PAGADOR)

		setIsLoadingLogin(false)

		router.replace({
			pathname: '/home',
			params: {
				userURL: params.userURL || CONSTANTE.URL_PAGADOR,
				userChave: chave,
				userIspb: params.userIspb || CONSTANTE.ISPB_PAGADOR,
				userNomeBanco: params.userNomeBanco || CONSTANTE.NOME_PAGADOR,
				userTipoPessoa: tipoPessoa,
				userDocumento: documento,
				userAgencia: agencia,
				userConta: conta,
				userTipoConta: tipoConta,
				userNome: nome,
				userCidade: 'São Paulo',
				userBGColor: params.userBGColor || CONSTANTE.BG_VERMELHO,
				userIcon: params.userIcon || CONSTANTE.ICON_PAGADOR,
				userSaldo: '0',
			},
		})
	}

	const _onPressLogin = () => {
		Keyboard.dismiss()
		if (txtChave == null || txtChave == '') {
			Alert.alert('Informe o Telefone...')
			return
		}
		setIsLoadingLogin(false)
		_validarChaveUsuario(txtChave)
	}

	const _onPressCadastro = () => {
		Keyboard.dismiss()
		setTxtChave('')
		setIsLoadingLogin(false)

		router.navigate({
			pathname: '/login_cadastro',
			params: {
				userURL: params.userURL,
				userIspb: params.userIspb,
				userNomeBanco: params.userNomeBanco,
				userBGColor: params.userBGColor,
				userIcon: params.userIcon,
			},
		})
	}

	const _onPressAlterarCorApp = async () => {
		Keyboard.dismiss()

		if ((params.userBGColor || CONSTANTE.BG_VERMELHO) == CONSTANTE.BG_VERMELHO) {
			userURL = CONSTANTE.URL_RECEBEDOR
			userIspb = CONSTANTE.ISPB_RECEBEDOR
			userNomeBanco = CONSTANTE.NOME_RECEBEDOR
			userBGColor = CONSTANTE.BG_AZUL
			userIcon = CONSTANTE.ICON_RECEBEDOR
		} else {
			userURL = CONSTANTE.URL_PAGADOR
			userIspb = CONSTANTE.ISPB_PAGADOR
			userNomeBanco = CONSTANTE.NOME_PAGADOR
			userBGColor = CONSTANTE.BG_VERMELHO
			userIcon = CONSTANTE.ICON_PAGADOR
		}

		await HelperSessao.SetUserURL(userURL)
		await HelperSessao.SetUserIspb(userIspb)
		await HelperSessao.SetUserNomeBanco(userNomeBanco)
		await HelperSessao.SetUserBGColor(userBGColor)
		await HelperSessao.SetUserIcon(userIcon)

		router.setParams({
			userURL: userURL,
			userIspb: userIspb,
			userNomeBanco: userNomeBanco,
			userBGColor: userBGColor,
			userIcon: userIcon,
		})
	}

	return (
		<View style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View
				style={{
					flex: 3,
					alignItems: 'center',
					justifyContent: 'flex-end',
					paddingBottom: 30,
					borderWidth: 0,
					borderColor: 'blue',
				}}
			>
				<TouchableOpacity style={{ borderWidth: 0, borderColor: 'red' }} onPress={_onPressAlterarCorApp}>
					<Image
						source={userlogo}
						style={{
							resizeMode: 'contain',
							width: 200,
							height: 100,
							borderWidth: 0,
							borderColor: 'red',
						}}
					/>
				</TouchableOpacity>
			</View>

			<KeyboardAvoidingView
				behavior="padding"
				enabled
				style={{
					flex: 3,
					width: '100%',
					alignItems: 'center',
					borderWidth: 0,
					borderColor: 'red',
				}}
			>
				<TextInputMask
					type={'cel-phone'}
					options={{ maskType: 'BRL', withDDD: true, dddMask: '+55 (99) ' }}
					editable={true}
					autoFocus={false}
					autoCorrect={true}
					placeholder="Telefone"
					autoCapitalize={'none'}
					underlineColorAndroid="transparent"
					returnKeyType={'done'}
					enablesReturnKeyAutomatically={true}
					value={txtChave}
					onChangeText={(value) => setTxtChave(value)}
					onSubmitEditing={Keyboard.dismiss}
					style={{
						fontSize: 20,
						color: '#000',
						borderBottomWidth: 1,
						borderBottomColor: '#555',
						marginTop: 10,
						marginBottom: 10,
						width: '88%',
						height: 40,
						textAlign: 'center',
					}}
				/>

				<TouchableOpacity
					style={{
						height: 45,
						paddingTop: 10,
						paddingBottom: 10,
						borderRadius: 10,
						marginTop: 20,
						marginBottom: 20,
						width: '90%',
						backgroundColor: params.userBGColor,
					}}
					activeOpacity={0.7}
					onPress={_onPressLogin}
				>
					{isLoadingLogin ? <ActivityIndicator color="#fff" size="small" /> : <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>LOGIN</Text>}
				</TouchableOpacity>

				<View
					style={{
						width: '90%',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							textDecorationLine: 'underline',
							fontWeight: 'bold',
							fontSize: 16,
							color: '#6C7B8B',
							textAlign: 'left',
						}}
						onPress={_onPressCadastro}
					>
						Criar Conta
					</Text>
				</View>
			</KeyboardAvoidingView>

			<View
				style={{
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontWeight: 'bold', fontSize: 10, color: '#555' }}>Versão: {Constants.expoConfig.version}</Text>
			</View>
		</View>
	)
}
