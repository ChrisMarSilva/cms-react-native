import { useRef, useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Camera, CameraType } from 'expo-camera/legacy'
import { BarCodeScanner } from 'expo-barcode-scanner'
import axios from 'axios'

import * as HelperNumero from '@/util/HelperNumero'
import * as CONSTANTE from '@/util/Constante'

import imglogoJD from '@/assets/imgs/icon-red.png'
import imglogoJ3 from '@/assets/imgs/icon-blue.png'

export default function PagarTransferirScreen() {
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const animation = useRef(null)
	const [type, setType] = useState(CameraType.back)
	const [hasCameraPermission, setHasCameraPermission] = useState(false)
	const [hasScanned, setHasScanned] = useState(false)
	const [permission, requestPermission] = Camera.useCameraPermissions()

	const userBGColorFim = params.userBGColor || CONSTANTE.BG_VERMELHO
	const userBGColorMeio = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userlogo = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3
	const userBGColorScreen = params.userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE

	useEffect(() => {
		setHasScanned(false)
		setHasCameraPermission(false)

		setTimeout(() => {
			//_requestCameraPermission()
			_requestBarCodeScannerPermission()
		}, 150)
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <LinearGradient colors={[userBGColorIni, userBGColorMeio, userBGColorFim]} style={{ flex: 1 }} />,
			headerLeft: () => (
				<View>
					<Image
						style={{
							resizeMode: 'cover',
							backgroundColor: '#fff',
							width: 35,
							height: 35,
							borderRadius: 63,
							borderWidth: 2,
							borderColor: '#fff',
							marginLeft: 10,
						}}
						source={userlogo}
					/>
				</View>
			),
			headerTitle: () => (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text
						style={{
							marginLeft: 5,
							color: '#fff',
							fontSize: 18,
							fontWeight: 'bold',
						}}
					>
						Pagar com Código QR
					</Text>
				</View>
			),
			headerRight: () => (
				<View style={{ flex: 1 }}>
					<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => router.navigate('home')}>
						<FontAwesome
							style={{
								marginRight: 10,
								color: '#fff',
								fontSize: 25,
								fontWeight: 'bold',
							}}
							name="close"
						/>
					</TouchableOpacity>
				</View>
			),
		})
	}, [navigation])

	const _requestCameraPermission = () => {
		if (!permission || !permission.granted) requestPermission()
		setHasCameraPermission(permission?.granted || false)
	}

	const _requestBarCodeScannerPermission = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync()
		setHasCameraPermission(status === 'granted')
	}

	const _PostEnviarQRCode = async ({ type, data }) => {
		try {
			setHasScanned(false)

			if (data.trim() == '') return false

			setHasScanned(true)

			axios({
				method: 'post',
				url: params.userURL + CONSTANTE.URL_ENVIAR_QRCODE,
				timeout: CONSTANTE.URL_TIMEOUT,
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				data: JSON.stringify({ emv: data }),
			})
				.then((response) => {
					try {
						let data = response.data

						//---------------------
						// REMOVER DEPOIS DE FINALIZADOS
						data = {
							transactionAmount: 100.99,
							additionalDataField: '45645646',
							merchantAccountInformation: { itens: [{ descricao: '' }, { descricao: '+5511933333333' }] },
						}
						//---------------------

						const valorRecebedor = HelperNumero.isNumber(data.transactionAmount) ? parseFloat(data.transactionAmount) : 0
						const infoRecebedor = data.additionalDataField ? data.additionalDataField : '123'
						const chaveRecebedor = data.merchantAccountInformation.itens[1].descricao

						router.navigate({
							pathname: '/pagar_transferir_confirma',
							params: {
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
								userSaldo: HelperNumero.isNumber(params.userSaldo) ? parseFloat(params.userSaldo) : 0,
								userBGColor: params.userBGColor,
								chaveRecebedor: chaveRecebedor,
								infoRecebedor: infoRecebedor,
								valorRecebedor: valorRecebedor,
							},
						})
					} catch (err) {
						Alert.alert('Erro(Response): ' + err.messag)
					}
				})
				.catch((err) => {
					if (err.response) {
						Alert.alert(err.response.data.descricao)
					} else if (err.request) {
						Alert.alert('Erro(Requição): ' + err.request)
					} else {
						Alert.alert(err.message)
					}
				})
		} catch (err) {
			Alert.alert('Erro(Geral): ' + err.messag)
		}
	}

	const _PostEnviarQRCodeFake = async () => {
		const type = ''
		//const data = '00020101021126360014br.gov.bcb.spi0114+55119421246815204000053039865802BR5906Fulano6009São Paulo63041689'; //  0,00 ok
		//const data = "00020101021126360014br.gov.bcb.spi0114+55119421200015204000053039865406100.005802BR5913Fulano de Tal6009São Paulo63041A9B"; // 100,00 ok
		//const data = "00020101021126360014br.gov.bcb.spi0114+55119421200055204000053039865406100.005802BR5909Anderson 6009São Paulo63040CB1"; // 100,00 ok
		//const data = '00020101021126360014br.gov.bcb.spi0114+55119421255555204000053039865406100.005802BR5917J3 AZUL RECEBEDOR6009São Paulo630417AC';
		const data = '00020101021126360014br.gov.bcb.spi0114+551194212333352040000530398654040.005802BR5919JD VERMELHO PAGADOR6009São Paulo630416DC'

		await _PostEnviarQRCode({ type, data })
		router.navigate('home')
	}

	return (
		<View style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View
				style={{
					flex: 6,
					justifyContent: 'center',
					alignItems: 'center',
					borderWidth: 0,
					borderColor: 'blue',
				}}
			>
				<View
					style={{
						width: '80%',
						height: '70%',
						alignItems: 'center',
						backgroundColor: '#fff',
						borderWidth: 0,
						borderColor: 'blue',
					}}
				>
					{hasCameraPermission == null || hasCameraPermission == false ? (
						<Text
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								paddingTop: 200,
							}}
						>
							Sem acesso à Câmera
						</Text>
					) : (
						<BarCodeScanner onBarCodeScanned={hasScanned ? undefined : _PostEnviarQRCode} barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} style={{ height: '100%', width: '90%' }} />
					)}
				</View>

				<Text style={{ marginTop: 15, color: '#fff', fontSize: 15 }}>aponte a câmera para código ou</Text>

				<Text style={{ marginTop: 2, color: '#fff', fontSize: 15 }}>pague via transferência</Text>

				{hasScanned && (
					<TouchableOpacity
						style={{
							marginTop: 30,
							borderRadius: 15,
							width: '70%',
							height: 40,
							padding: 10,
							backgroundColor: '#fff',
						}}
						onPress={() => setHasScanned(false)}
					>
						<Text
							style={{
								textAlign: 'center',
								color: params.userBGColor,
								fontWeight: 'bold',
								fontSize: 16,
							}}
						>
							ler código novamente
						</Text>
					</TouchableOpacity>
				)}
			</View>

			<View
				style={{
					flex: 1,
					justifyContent: 'flex-end',
					marginLeft: 15,
					marginRight: 15,
					borderWidth: 0,
					borderColor: 'blue',
				}}
			>
				<TouchableOpacity
					style={{
						borderTopLeftRadius: 15,
						borderTopRightRadius: 15,
						height: 60,
						padding: 10,
						backgroundColor: '#fff',
					}}
					onPress={_PostEnviarQRCodeFake}
				>
					<Text
						style={{
							paddingLeft: 5,
							textAlign: 'center',
							color: '#555',
							fontWeight: 'bold',
							fontSize: 20,
						}}
					>
						pagar via transferência
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
