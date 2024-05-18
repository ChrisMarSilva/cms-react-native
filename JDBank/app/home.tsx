import { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Alert, Image, BackHandler, Platform } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { Audio } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import axios from 'axios'
import * as signalR from '@microsoft/signalr'

import * as HelperNumero from '@/util/HelperNumero'
import * as CONSTANTE from '@/util/Constante'

import imglogoJD from '@/assets/imgs/logo-red.png'
import imglogoJ3 from '@/assets/imgs/logo-blue.png'
import imgBluePerson from '@/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/assets/imgs/person-red.jpg'

export default function HomeScreen() {
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const userBGColorFim = params.userBGColor || CONSTANTE.BG_VERMELHO
	const userBGColorMeio = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userBGColorScreen = params.userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE
	const userlogo = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3
	const userSaldo = HelperNumero.isNumber(params.userSaldo || '0,00') ? parseFloat(params.userSaldo || '0,00') : 0
	const userIcon = params.userBGColor == CONSTANTE.BG_VERMELHO ? imgRedPerson : imgBluePerson

	useEffect(() => {
		router.setParams({ userSaldo: 0, visiblePagRec: false })
		_getDadosSessao()
		_getDadosSaldo()
		_getDadosRecebimentoSignalR()
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerBackTitleVisible: false,
			headerBackground: () => <LinearGradient colors={[userBGColorIni, userBGColorMeio, userBGColorFim]} style={{ flex: 1 }} />,
			headerLeft: () => (
				<View>
					<Image style={{ resizeMode: 'cover', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: '#fff', marginLeft: 10 }} source={userlogo} />
				</View>
			),
			headerTitle: () => (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ marginLeft: 5, color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{params.userNomeBanco}</Text>
				</View>
			),
			headerRight: () => (
				<View style={{ flex: 1 }}>
					{params.visiblePagRec ? (
						<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={_onPressNotificacao}>
							<FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold' }} name="bell-o" />
						</TouchableOpacity>
					) : null}
				</View>
			),
		})
	}, [navigation])

	const _getDadosSessao = async () => {
		router.setParams({
			userURL: await HelperSessao.GetUserURL(),
			userChave: await HelperSessao.GetUserChave(),
			userIspb: await HelperSessao.GetUserIspb(),
			userNomeBanco: await HelperSessao.GetUserNomeBanco(),
			userTipoPessoa: await HelperSessao.GetUserTipoPessoa(),
			userDocumento: await HelperSessao.GetUserDocumento(),
			userAgencia: await HelperSessao.GetUserAgencia(),
			userConta: await HelperSessao.GetUserConta(),
			userTipoConta: await HelperSessao.GetUserTipoConta(),
			userNome: await HelperSessao.GetUserNome(),
			userCidade: await HelperSessao.GetUserCidade(),
			userIcon: await HelperSessao.GetUserBGColor(),
			userBGColor: await HelperSessao.GetUserIcon(),
		})
	}

	const _getDadosSaldo = () => {
		try {
			axios({
				method: 'get',
				//url: (params.userURL || CONSTANTE.URL_PAGADOR) + CONSTANTE.URL_GET_SALDO + '/' + params.userAgencia + '/' + params.userConta, // CERTO
				url: (params.userURL || CONSTANTE.URL_PAGADOR) + CONSTANTE.URL_GET_SALDO + '/' + encodeURIComponent(escape(params.userAgencia + '+' + params.userConta)), // DESENV
				timeout: CONSTANTE.URL_TIMEOUT,
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
			})
				.then((response) => {
					try {
						const saldo = response?.data?.saldo ? response.data.saldo : response.data
						router.setParams({ userSaldo: HelperNumero.isNumber(saldo) ? parseFloat(saldo) : 0 })
					} catch (err) {
						Alert.alert('Erro(Response): ' + err.message)
					}
				})
				.catch((err) => {
					Alert.alert('Erro(Requição): ' + err.message)
				})
		} catch (err) {
			Alert.alert('Erro(Geral): ' + err.message)
		}
	}

	const _getDadosRecebimentoSignalR = () => {
		router.setParams({
			userURL: params.userURL,
			userChave: params.userChave,
			userIspb: params.userIspb,
			userNomeBanco: params.userNomeBanco,
			userTipoPessoa: params.userTipoPessoa,
			userDocumento: params.userDocumento,
			userAgencia: params.userAgencia,
			userConta: params.userConta,
			userTipoConta: params.userTipoConta,
			userNome: params.userNome,
			userCidade: params.userCidade,
			userBGColor: params.userBGColor,
			userIcon: params.userIcon,
			userSaldo: params.userSaldo,
			visiblePagRec: true,
			tipoPessoaPagRec: 'F',
			documentoPagRec: '111.111.111-11',
			agenciaPagRec: '8553',
			contaPagRec: '05245-8',
			nomePagRec: 'Fulando de Tal',
			valorPagRec: '3000',
		})

		// let connection = new signalR.HubConnectionBuilder()
		// 	.withUrl(userURL + CONSTANTE.URL_RECEBE_PAGTO, { transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling, 'content-type': 'application/json' })
		// 	.configureLogging(signalR.LogLevel.None)
		// 	.build()
		// connection.on('AtualizarSaldo', (agencia, conta, valor) => {
		// 	if (params.userAgencia == agencia && params.userConta == conta) router.setParams({ userSaldo: HelperNumero.isNumber(valor) ? parseFloat(valor) : 0 })
		// })
		// connection.on('ReceivePayment', (agencia, conta, documento, tipoPessoa, nome, valor) => {
		// 	_getTocarSom()
		// 	router.setParams({
		// 		visiblePagRec: true,
		// 		tipoPessoaPagRec: tipoPessoa,
		// 		documentoPagRec: documento,
		// 		agenciaPagRec: agencia,
		// 		contaPagRec: conta,
		// 		nomePagRec: nome,
		// 		valorPagRec: HelperNumero.isNumber(valor) ? parseFloat(valor) : 0,
		// 		userBGColor: userBGColor || CONSTANTE.BG_VERMELHO,
		// 	})
		// 	_getDadosSaldo()
		// })
		// connection
		// 	.start()
		// 	.then(() => (this.initalAttemptForChat = true))
		// 	.catch((err) => (this.initalAttemptForChat = false))
		// connection.onclose(() => connection.start())
	}

	const _getTocarSom = async () => {
		try {
			const source = require('@/assets/sounds/02.mp3')

			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: 1, // Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: 2, // Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
				shouldDuckAndroid: true,
				playThroughEarpieceAndroid: false,
			})

			const initialStatus = {
				shouldPlay: true, // Play by default
				rate: 1.0, // Control the speed
				shouldCorrectPitch: true, // Correct the pitch
				volume: 1.0, // Control the Volume
				isMuted: false, // mute the Audio
			}

			const { sound } = await Audio.Sound.createAsync(source, initialStatus)

			await sound.playAsync() //  Play the Music
		} catch (error) {
			sound.unloadAsync()
			alert('Erro ao tocar som: ' + error)
		}
	}

	const _onPressPagarTransferir = () => _onPressGenerico('/pagar_transferir')
	const _onPressCobrarAlguem = () => _onPressGenerico('/cobrar_alguem')
	const _onPressColocarDinheiro = () => _onPressGenerico('/colocar_dinheiro')
	const _onPressMovimentacao = () => _onPressGenerico('/movimentacao')
	const _onPressPerfil = () => _onPressGenerico('/perfil')

	const _onPressGenerico = (nameScreen) => {
		router.navigate({
			pathname: nameScreen,
			params: {
				userURL: params.userURL || CONSTANTE.URL_PAGADOR,
				userChave: params.userChave || '',
				userIspb: params.userIspb || CONSTANTE.ISPB_PAGADOR,
				userNomeBanco: params.userNomeBanco || CONSTANTE.NOME_PAGADOR,
				userTipoPessoa: params.userTipoPessoa || '',
				userDocumento: params.userDocumento || '',
				userAgencia: params.userAgencia || '',
				userConta: params.userConta || '',
				userTipoConta: params.userTipoConta || '',
				userNome: params.userNome || '',
				userCidade: params.userCidade || '',
				userSaldo: params.userSaldo || 0,
				userBGColor: params.userBGColor || CONSTANTE.BG_VERMELHO,
				userIcon: params.userIcon || CONSTANTE.ICON_PAGADOR,
				valorReceber: 0,
			},
		})
	}

	const _onPressNotificacao = () => {
		// router.navigate({
		// 	pathname: '/cobrar_alguem_recibo',
		// 	params: {
		// 		visiblePagRec: true,
		// 		tipoPessoaPagRec: 'F',
		// 		documentoPagRec: '350.344.118-22',
		// 		agenciaPagRec: '8553',
		// 		contaPagRec: '05245-8',
		// 		nomePagRec: 'Fulano de Tal',
		// 		valorPagRec: 1234.99,
		// 		userBGColor: params.userBGColor || CONSTANTE.BG_VERMELHO,
		// 		userIcon: params.userIcon,
		// 	},
		// })
		// return

		router.navigate({
			pathname: '/cobrar_alguem_recibo',
			params: {
				tipoPessoaPagRec: params.tipoPessoaPagRec,
				documentoPagRec: params.documentoPagRec,
				agenciaPagRec: params.agenciaPagRec,
				contaPagRec: params.contaPagRec,
				nomePagRec: params.nomePagRec,
				valorPagRec: HelperNumero.isNumber(params.valorPagRec || '0,00') ? parseFloat(params.valorPagRec || '0,00') : 0,
				userBGColor: params.userBGColor,
				userIcon: params.userIcon,
			},
		})
	}

	return (
		<View style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
				<TouchableOpacity onPress={_onPressPerfil}>
					<Image style={{ width: 80, height: 80, borderRadius: 60, borderWidth: 2, borderColor: '#fff', marginTop: 20, marginBottom: 10 }} source={userIcon} />
				</TouchableOpacity>

				<Text style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>
					Olá, <Text style={{ fontWeight: 'bold' }}>{params.userNome}</Text>!
				</Text>

				<Text style={{ color: '#fff', fontSize: 12 }}>Saldo Atual:</Text>
				<Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}> R$ {HelperNumero.GetMascaraValorDecimal(userSaldo)}</Text>
			</View>

			<View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginTop: 2, marginLeft: 10, marginRight: 5 }}>
					<TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: params.userBGColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressPagarTransferir}>
						<View style={{ alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }}>
							<FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="credit-card" />
						</View>
						<Text style={{ paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 }}>
							pagar{'\n'}
							<Text style={{ fontSize: 14 }}>transferir</Text>
						</Text>
					</TouchableOpacity>
				</View>

				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 5, marginRight: 10 }}>
					<TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: params.userBGColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressCobrarAlguem}>
						<View style={{ alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }}>
							<FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="user-o" />
						</View>
						<Text style={{ paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 }}>
							cobrar{'\n'}
							<Text style={{ fontSize: 14 }}>alguém</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 10, marginRight: 5 }}>
					<TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: params.userBGColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressColocarDinheiro}>
						<View style={{ alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }}>
							<FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="dollar" />
						</View>
						<Text style={{ paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 }}>
							colocar{'\n'}
							<Text style={{ fontSize: 14 }}>dinheiro</Text>
						</Text>
					</TouchableOpacity>
				</View>

				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 5, marginRight: 10 }}>
					<TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: params.userBGColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressMovimentacao}>
						<View style={{ alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }}>
							<FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="book" />
						</View>
						<Text style={{ paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 }}>movimentação</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}
