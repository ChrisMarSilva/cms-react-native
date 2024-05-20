import { useRef, useState, useEffect, useContext } from 'react'
import { Text, View, TouchableOpacity, Alert, Image, Button } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { CameraView, useCameraPermissions } from 'expo-camera'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'
import { sendQrCode } from '@/src/services/qrcodeService'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

export default function PagarTransferirScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()

	const animation = useRef(null)
	const [hasCameraPermission, setHasCameraPermission] = useState(false)
	const [hasScanned, setHasScanned] = useState(false)
	const [permission, requestPermission] = useCameraPermissions()

	useEffect(() => {
		setHasScanned(false)
		setHasCameraPermission(false)

		//setTimeout(() => {
		_requestCameraPermission()
		//}, 150)
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <HeaderBackground />,
			headerLeft: () => <HeaderLeft />,
			headerTitle: () => <HeaderTitle titulo={'Pagar com Código QR'} />,
			headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
		})
	}, [navigation])

	const _onPressHome = async () => router.replace('/home')

	const _requestCameraPermission = async () => {
		//const { status } = await Camera.requestCameraPermissionsAsync()
		//setHasCameraPermission(status === 'granted')
		if (!permission || !permission.granted) requestPermission()
		setHasCameraPermission(true)
	}

	const _PostEnviarQRCode = async ({ type, data }) => {
		try {
			// setHasScanned(false)
			if (data.trim() == '') return
			setHasScanned(true)

			const result = await sendQrCode(currentUser.url, data)

			const valorRecebedor = HelperNumero.isNumber(result.transactionAmount) ? parseFloat(result.transactionAmount) : 0
			const infoRecebedor = result.additionalDataField ? result.additionalDataField : '123'
			const chaveRecebedor = result.merchantAccountInformation.itens[1].descricao

			router.navigate({
				pathname: '/pagar_transferir_confirma',
				params: {
					chaveRecebedor: chaveRecebedor,
					infoRecebedor: infoRecebedor,
					valorRecebedor: valorRecebedor,
				},
			})
		} catch (err) {
			console.error('Erro(Geral): ', err)
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
	}

	return (
		<View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
			<View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
				<View style={{ width: '80%', height: '70%', alignItems: 'center', backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue' }}>{hasCameraPermission == null || hasCameraPermission == false ? <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 200 }}>Sem acesso à Câmera</Text> : <CameraView onBarcodeScanned={hasScanned ? undefined : _PostEnviarQRCode} style={{ height: '100%', width: '100%' }} facing={'back'} barcodeScannerSettings={{ barcodeTypes: ['qr', 'pdf417'] }} />}</View>

				<Text style={{ marginTop: 15, color: '#fff', fontSize: 15 }}>aponte a câmera para código ou</Text>

				<Text style={{ marginTop: 2, color: '#fff', fontSize: 15 }}>pague via transferência</Text>

				{hasScanned && (
					<TouchableOpacity style={{ marginTop: 30, borderRadius: 15, width: '70%', height: 40, padding: 10, backgroundColor: '#fff' }} onPress={() => setHasScanned(false)}>
						<Text style={{ textAlign: 'center', color: currentUser.bgColor, fontWeight: 'bold', fontSize: 16 }}>ler código novamente</Text>
					</TouchableOpacity>
				)}
			</View>

			<View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 15, marginRight: 15, borderWidth: 0, borderColor: 'blue' }}>
				<TouchableOpacity style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 60, padding: 10, backgroundColor: '#fff' }} onPress={_PostEnviarQRCodeFake}>
					<Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}>pagar via transferência</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
