import { useRef, useState, useEffect, useContext } from 'react'
import { Text, View, Image, TouchableOpacity, Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, Animated, Easing } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import LottieView from 'lottie-react-native'
import { TextInputMask } from 'react-native-masked-text'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'
import { getChave } from '@/src/services/chaveService'
import { payQrCode } from '@/src/services/qrcodeService'

import imglogoJD from '@/src/assets/imgs/icon-red.png'
import imglogoJ3 from '@/src/assets/imgs/icon-blue.png'

export default function PagarTransferirConfirmaScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const animation = useRef(null)
	const [isLoadingDadosRecebedor, setIsLoadingDadosRecebedor] = useState(true)
	const [isLoadingPagamento, setIsLoadingPagamento] = useState(false)
	const [valor, setValor] = useState(0)
	const [valorRecebedor, setValorRecebedor] = useState(0)

	const userBGColorFim = currentUser.bgColor
	const userBGColorMeio = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userlogo = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3
	const userBGColorScreen = currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE

	useEffect(() => {
		setIsLoadingDadosRecebedor(true)
		setIsLoadingPagamento(false)
		setValor(HelperNumero.isNumber(params.valorRecebedor) ? parseFloat(params.valorRecebedor) : 0)
		setValorRecebedor(HelperNumero.isNumber(params.valorRecebedor) ? parseFloat(params.valorRecebedor) : 0)

		_buscarDadosRecebedor()
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <LinearGradient colors={[userBGColorIni, userBGColorMeio, userBGColorFim]} style={{ flex: 1 }} />,
			headerLeft: () => (
				<View>
					<Image style={{ resizeMode: 'cover', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: '#fff', marginLeft: 10 }} source={userlogo} />
				</View>
			),
			headerTitle: () => (
				<View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Confirmação de Pagamento</Text>
				</View>
			),
			headerRight: () => (
				<View>
					<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => router.replace('/home')}>
						<FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold' }} name="close" />
					</TouchableOpacity>
				</View>
			),
		})
	}, [navigation])

	const _buscarDadosRecebedor = async () => {
		try {
			setIsLoadingDadosRecebedor(true)

			const data = await getChave(currentUser.url, params.chaveRecebedor)

			router.setParams({
				chaveRecebedor: params.chaveRecebedor,
				ispbRecebedor: data?.ispb,
				nomeBancoRecebedor: data?.nomeBanco,
				tipoPessoaRecebedor: data?.tipoPessoa,
				documentoRecebedor: data?.documento,
				agenciaRecebedor: data?.agencia,
				contaRecebedor: data?.conta,
				tipoContaRecebedor: data?.tipoConta,
				nomeRecebedor: data?.nome,
			})

			setIsLoadingDadosRecebedor(false)
		} catch (err) {
			console.error(err)

			setIsLoadingDadosRecebedor(false)
			Alert.alert('Erro(Geral): ' + err.message)

			router.setParams({
				chaveRecebedor: params.chaveRecebedor,
				ispbRecebedor: '',
				nomeBancoRecebedor: '',
				tipoPessoaRecebedor: '',
				documentoRecebedor: '',
				agenciaRecebedor: '',
				contaRecebedor: '',
				tipoContaRecebedor: '',
				nomeRecebedor: '',
			})

			router.replace('/pagar_transferir')
		}
	}

	const _onPressAgendarPagtoQRCode = () => {
		Keyboard.dismiss()
		Alert.alert('Pagto Agendado!')
		router.replace('/home')
	}

	const _onPressEfetuarPagtoQRCode = async () => {
		try {
			setIsLoadingPagamento(true)

			if (currentUser.chave.trim() == '') {
				Alert.alert('Dados do Pagador Vazio.')
				setIsLoadingPagamento(false)
				return false
			}

			if (params.chaveRecebedor.trim() == '') {
				Alert.alert('Dados do Recebedor Vazio.')
				setIsLoadingPagamento(false)
				return false
			}

			if (valorRecebedor <= 0) {
				Alert.alert('Valor do Pagamento não Informado.')
				setIsLoadingPagamento(false)
				return false
			}

			if (valorRecebedor <= 0) setValorRecebedor(parseFloat(HelperNumero.GetValorDecimal(valor)))

			await payQrCode(currentUser.url, currentUser.ispb, currentUser.tipoPessoa, currentUser.tipoConta, currentUser.agencia, currentUser.conta, currentUser.documento, currentUser.nome, params.ispbRecebedor, params.tipoPessoaRecebedor, params.documentoRecebedor, params.agenciaRecebedor, params.contaRecebedor, params.tipoContaRecebedor, params.nomeRecebedor, valorRecebedor, params.infoRecebedor)

			setIsLoadingPagamento(false)

			router.replace({
				pathname: '/pagar_transferir_recibo',
				params: {
					chaveRecebedor: params.chaveRecebedor,
					ispbRecebedor: params.ispbRecebedor,
					nomeBancoRecebedor: params.nomeBancoRecebedor,
					tipoPessoaRecebedor: params.tipoPessoaRecebedor,
					documentoRecebedor: params.documentoRecebedor,
					agenciaRecebedor: params.agenciaRecebedor,
					contaRecebedor: params.contaRecebedor,
					tipoContaRecebedor: params.tipoContaRecebedor,
					nomeRecebedor: params.nomeRecebedor,
					valorRecebedor: valorRecebedor,
				},
			})
		} catch (err) {
			setIsLoadingPagamento(false)
			Alert.alert('Erro(Geral): ' + err.message)
		}
	}

	return (
		<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
				<View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', height: '70%', borderRadius: 25, backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue' }}>
					{isLoadingDadosRecebedor ? (
						<LottieView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} ref={animation} source={require('@/src/assets/lottie/201-simple-loader.json')} autoPlay loop />
					) : (
						<View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
							<Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{valorRecebedor <= 0 && 'Informe o'} Valor do Pagamento</Text>

							{valorRecebedor > 0 ? <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30, marginBottom: 20 }}> R$ {HelperNumero.GetMascaraValorDecimal(valorRecebedor)} </Text> : <TextInputMask type={'money'} options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }} value={valor} onChangeText={(value) => setValor(value)} onSubmitEditing={Keyboard.dismiss} style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', height: 40, borderBottomWidth: 1, borderBottomColor: '#555', color: '#000', backgroundColor: '#fff', marginBottom: 30, width: '80%' }} />}

							<Text style={{ color: '#555', fontSize: 18, marginBottom: 10 }}>
								para <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>{params.nomeRecebedor}</Text>
							</Text>

							<Text style={{ color: '#555', fontSize: 15, marginBottom: 10 }}>
								Celular: <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{HelperNumero.GetMascaraTelefone(params.chaveRecebedor)}</Text>
							</Text>

							<Text style={{ color: '#000', fontSize: 18, marginBottom: 5 }}>
								<Text style={{ fontWeight: 'bold' }}>{params.nomeBancoRecebedor}</Text>
							</Text>

							<Text style={{ color: '#555', fontSize: 15 }}>
								Agência: <Text style={{ fontWeight: 'bold' }}>{params.agenciaRecebedor}</Text> || Conta: <Text style={{ fontWeight: 'bold' }}>{params.contaRecebedor}</Text>
							</Text>
						</View>
					)}
				</View>
			</View>

			<View style={{ marginLeft: 25, marginRight: 25, marginBottom: 10, borderWidth: 0, borderColor: 'red' }}>
				{isLoadingDadosRecebedor ? null : (
					<View>
						<TouchableOpacity
							style={{ borderRadius: 10, marginBottom: 10, height: 50, padding: 12, backgroundColor: '#fff' }}
							onPress={() => {
								Keyboard.dismiss()
								_onPressEfetuarPagtoQRCode()
							}}
						>
							{isLoadingPagamento ? (
								<ActivityIndicator color="#000" size="small" />
							) : (
								<Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}>
									<FontAwesome style={{ color: '#555', fontSize: 20 }} name="dollar" />
									<Text> Pagar</Text>
								</Text>
							)}
						</TouchableOpacity>

						<TouchableOpacity style={{ borderRadius: 10, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_onPressAgendarPagtoQRCode}>
							<Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}>
								<FontAwesome style={{ color: '#555', fontSize: 20 }} name="calendar" />
								<Text> Agendar </Text>
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</KeyboardAvoidingView>
	)
}
