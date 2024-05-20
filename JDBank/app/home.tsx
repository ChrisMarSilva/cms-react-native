import { useState, useEffect, useContext } from 'react'
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { Audio } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import * as signalR from '@microsoft/signalr'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'
import { getSaldo } from '@/src/services/saldoService'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

export default function HomeScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()

	const [isVisiblePagRec, setIsVisiblePagRec] = useState(false)
	const [tipoPessoaPagRec, setTipoPessoaPagRec] = useState('')
	const [documentoPagRec, setDocumentoPagRec] = useState('')
	const [agenciaPagRec, setAgenciaPagRec] = useState('')
	const [contaPagRec, setContaPagRec] = useState('')
	const [nomePagRec, setNomePagRec] = useState('')
	const [valorPagRec, setValorPagRec] = useState(0)

	useEffect(() => {
		currentUser.setSaldo(0)
		setIsVisiblePagRec(false)

		_getDadosSessao()
		_getDadosSaldo()
		_getDadosRecebimentoSignalR()
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <HeaderBackground />,
			headerLeft: () => <HeaderLeft />,
			headerTitle: () => <HeaderTitle titulo={currentUser.nomeBanco} />,
			headerRight: () => <HeaderRight isVisible={isVisiblePagRec} onPress={_onPressNotificacao} icone={'bell-o'} />,
		})
	}, [navigation])

	const _getDadosSessao = async () => {
		// currentUser.setUrl(await HelperSessao.GetUserURL())
		// currentUser.setChave(await HelperSessao.GetUserChave())
		// currentUser.setTipoPessoa(await HelperSessao.GetUserTipoPessoa())
		// currentUser.setNome(await HelperSessao.GetUserNome())
		// currentUser.setDocumento(await HelperSessao.GetUserDocumento())
		// currentUser.setCidade(await HelperSessao.GetUserCidade())
		// currentUser.setIspb(await HelperSessao.GetUserIspb())
		// currentUser.setNomeBanco(await HelperSessao.GetUserNomeBanco())
		// currentUser.setAgencia(await HelperSessao.GetUserAgencia())
		// currentUser.setTipoConta(await HelperSessao.GetUserTipoConta())
		// currentUser.setConta(await HelperSessao.GetUserConta())
		// currentUser.setIcon(await HelperSessao.GetUserIcon())
		// currentUser.setBgColor(await HelperSessao.GetUserBGColor())
	}

	const _getDadosSaldo = async () => {
		try {
			const data = await getSaldo(currentUser.url, currentUser.agencia, currentUser.conta)

			currentUser.setSaldo(HelperNumero.isNumber(data) ? parseFloat(data) : 0)
		} catch (err) {
			console.error(err)
			Alert.alert('Erro(Geral): ' + err.message)
		}
	}

	const _getDadosRecebimentoSignalR = async () => {
		setTimeout(() => {
			setIsVisiblePagRec(true)
			setTipoPessoaPagRec('F')
			setDocumentoPagRec('111.111.111-11')
			setAgenciaPagRec('8553')
			setContaPagRec('05245-8')
			setNomePagRec('Fulando de Tal')
			setValorPagRec('3000')
		}, 2000)

		// let connection = new signalR.HubConnectionBuilder()
		// 	.withUrl(userURL + CONSTANTE.URL_RECEBE_PAGTO, { transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling, 'content-type': 'application/json' })
		// 	.configureLogging(signalR.LogLevel.None)
		// 	.build()
		// connection.on('AtualizarSaldo', (agencia, conta, valor) => {
		// 	if (currentUser.agencia == agencia && currentUser.conta == conta) urrentUser.setSaldo(HelperNumero.isNumber(valor) ? parseFloat(valor) : 0)
		// })
		// connection.on('ReceivePayment', (agencia, conta, documento, tipoPessoa, nome, valor) => {
		// 	_getTocarSom()
		// setIsVisiblePagRec(true)
		// setTipoPessoaPagRec(tipoPessoa)
		// setDocumentoPagRec(documento)
		// setAgenciaPagRec(agencia)
		// setContaPagRec(conta)
		// setNomePagRec(nome)
		// setValorPagRec(HelperNumero.isNumber(valor) ? parseFloat(valor) : 0)
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
			const source = require('@/src/assets/sounds/02.mp3')

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

	const _onPressPagarTransferir = () => router.navigate('/pagar_transferir')
	const _onPressCobrarAlguem = () => router.navigate('/cobrar_alguem')
	const _onPressColocarDinheiro = () => router.navigate('/colocar_dinheiro')
	const _onPressMovimentacao = () => router.navigate('/movimentacao')
	const _onPressPerfil = () => router.navigate('/perfil')

	const _onPressNotificacao = () => {
		setIsVisiblePagRec(false)

		router.navigate({
			pathname: '/cobrar_alguem_recibo',
			params: {
				tipoPessoaPagRec: tipoPessoaPagRec,
				documentoPagRec: documentoPagRec,
				agenciaPagRec: agenciaPagRec,
				contaPagRec: contaPagRec,
				nomePagRec: nomePagRec,
				valorPagRec: HelperNumero.isNumber(valorPagRec || '0,00') ? parseFloat(valorPagRec || '0,00') : 0,
			},
		})
	}

	return (
		<View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
			<View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
				<TouchableOpacity onPress={_onPressPerfil}>
					<Image style={{ width: 80, height: 80, borderRadius: 60, borderWidth: 2, borderColor: '#fff', marginTop: 20, marginBottom: 10 }} source={currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imgRedPerson : imgBluePerson} />
				</TouchableOpacity>

				<Text style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>
					Olá, <Text style={{ fontWeight: 'bold' }}>{currentUser.nome}</Text>!
				</Text>

				<Text style={{ color: '#fff', fontSize: 12 }}>Saldo Atual:</Text>
				<Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}> R$ {HelperNumero.GetMascaraValorDecimal(HelperNumero.isNumber(currentUser.saldo || '0,00') ? parseFloat(currentUser.saldo || '0,00') : 0)}</Text>
			</View>

			<View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginTop: 2, marginLeft: 10, marginRight: 5 }}>
					<TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: currentUser.bgColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressPagarTransferir}>
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
					<TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: currentUser.bgColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressCobrarAlguem}>
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
					<TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: currentUser.bgColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressColocarDinheiro}>
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
					<TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: currentUser.bgColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressMovimentacao}>
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
