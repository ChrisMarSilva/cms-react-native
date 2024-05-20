import { useEffect, useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView, Alert, BackHandler, Platform } from 'react-native'
import { router } from 'expo-router'
import { TextInputMask } from 'react-native-masked-text'
import Constants from 'expo-constants'
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'
import { getChave } from '@/src/services/chaveService'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

export default function LoginScreen() {
	const currentUser = useContext(UserContext)

	const [txtChave, setTxtChave] = useState('')
	const [isLoadingLogin, setIsLoadingLogin] = useState(false)

	useEffect(() => {
		setTxtChave('+5511911111111')
		setIsLoadingLogin(false)

		_limparDadosUsuario()
		//_verificarSessaoUsuario()
	}, [])

	const _limparDadosUsuario = async () => {
		currentUser.setChave('')
		currentUser.setTipoPessoa('')
		currentUser.setNome('')
		currentUser.setDocumento('')
		currentUser.setCidade('')
		currentUser.setAgencia('')
		currentUser.setTipoConta('')
		currentUser.setConta('')
		currentUser.setSaldo('0')
		currentUser.setIcon('')
	}

	// const _verificarSessaoUsuario = () => {
	// 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ICON).then((value) => currentUser.setIcon(value))
	// 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_BGCOLOR).then((value) => currentUser.setBgColor(value))
	// 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_CHAVE).then((value) => setTxtChave(value))
	// 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_URL).then((value) => currentUser.setNomeBanco(value))
	// 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ISPB_IF).then((value) => currentUser.setIspb(value))
	// 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_NOME_IF).then((value) => currentUser.setNomeBanco(value))
	// }

	const _onPressLogin = async () => {
		try {
			Keyboard.dismiss()
			setIsLoadingLogin(true)

			if (txtChave == null || txtChave == '') {
				setIsLoadingLogin(false)
				Alert.alert('Informe o Telefone...')
				return
			}

			data = await getChave(currentUser.url, txtChave)

			if (data?.ispb == null || data?.ispb == '' || data?.ispb == 'undefined' || data?.ispb == undefined) {
				setIsLoadingLogin(false)
				Alert.alert('Telefone não cadastrado - ' + txtChave)
				return false
			}

			if (data?.ispb != currentUser.ispb) {
				setIsLoadingLogin(false)
				Alert.alert('Ispb não pertence ao Banco - ' + txtChave)
				return false
			}

			_realizarLogin(data?.chave, data?.ispb, data?.nomeBanco, data?.tipoPessoa, data?.documento, data?.agencia, data?.conta, data?.tipoConta, data?.nome)
		} catch (error) {
			setIsLoadingLogin(false)
			Alert.alert('Erro(Geral): ' + error.message)
		}
	}

	const _realizarLogin = async (chave, ispb, nomeBanco, tipoPessoa, documento, agencia, conta, tipoConta, nome) => {
		await HelperSessao.SetUserURL(currentUser.url)
		await HelperSessao.SetUserChave(chave)
		await HelperSessao.SetUserIspb(ispb)
		await HelperSessao.SetUserNomeBanco(nomeBanco)
		await HelperSessao.SetUserBGColor(currentUser.bgColor)
		await HelperSessao.SetUserIcon(currentUser.icon)

		currentUser.setChave(chave)
		currentUser.setTipoPessoa(tipoPessoa)
		currentUser.setNome(nome)
		currentUser.setDocumento(documento)
		currentUser.setCidade('São Paulo')
		currentUser.setIspb(ispb)
		currentUser.setNomeBanco(nomeBanco)
		currentUser.setAgencia(agencia)
		currentUser.setTipoConta(tipoConta)
		currentUser.setConta(conta)
		currentUser.setSaldo('0')
		currentUser.setLogo(currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3)

		setIsLoadingLogin(false)
		router.replace('/home')
	}

	const _onPressCadastro = () => {
		Keyboard.dismiss()
		setTxtChave('')
		setIsLoadingLogin(false)
		router.replace('/login_cadastro')
	}

	const _onPressAlterarCorApp = async () => {
		Keyboard.dismiss()

		let url = ''
		let ispb = ''
		let nomeBanco = ''
		let icon = ''
		let bgColor = ''

		if (currentUser.bgColor == CONSTANTE.BG_VERMELHO) {
			url = CONSTANTE.URL_RECEBEDOR
			ispb = CONSTANTE.ISPB_RECEBEDOR
			nomeBanco = CONSTANTE.NOME_RECEBEDOR
			icon = CONSTANTE.ICON_RECEBEDOR
			bgColor = CONSTANTE.BG_AZUL
		} else {
			url = CONSTANTE.URL_PAGADOR
			ispb = CONSTANTE.ISPB_PAGADOR
			nomeBanco = CONSTANTE.NOME_PAGADOR
			userIcon = CONSTANTE.ICON_PAGADOR
			bgColor = CONSTANTE.BG_VERMELHO
		}

		await HelperSessao.SetUserURL(url)
		await HelperSessao.SetUserIspb(ispb)
		await HelperSessao.SetUserNomeBanco(nomeBanco)
		await HelperSessao.SetUserIcon(icon)
		await HelperSessao.SetUserBGColor(bgColor)

		currentUser.setUrl(url)
		currentUser.setIspb(ispb)
		currentUser.setNomeBanco(nomeBanco)
		currentUser.setIcon(icon)
		currentUser.setBgColor(bgColor)
	}

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
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
						source={currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3}
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
						backgroundColor: currentUser.bgColor,
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
