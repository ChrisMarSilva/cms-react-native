import { useRef, useEffect, useState, useContext } from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, Animated, Easing } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import LottieView from 'lottie-react-native'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'
import { createQrCode } from '@/src/services/qrcodeService'

import imglogoJD from '@/src/assets/imgs/icon-red.png'
import imglogoJ3 from '@/src/assets/imgs/icon-blue.png'

export default function CobrarAlguemQrCodeScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const animation = useRef(null)
	const [encodedData, setEncodedData] = useState(null)
	const [isLoadingGerarQRCode, setIsLoadingGerarQRCode] = useState(true)

	const userBGColorFim = currentUser.bgColor
	const userBGColorMeio = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userlogo = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3
	const userBGColorScreen = currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE
	const valor = HelperNumero.isNumber(params.valorReceber || '0') ? parseFloat(params.valorReceber || '0') : 0

	useEffect(() => {
		setEncodedData(null)
		setIsLoadingGerarQRCode(true)

		_GetGerarQRCode()
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
				<View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
					<Text
						style={{
							marginLeft: 5,
							color: '#fff',
							fontSize: 18,
							fontWeight: 'bold',
						}}
					>
						Cobrar com Código QR
					</Text>
				</View>
			),
			headerRight: () => (
				<View>
					<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => router.replace('/home')}>
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

	const _GetGerarQRCode = async () => {
		try {
			setEncodedData(null)
			setIsLoadingGerarQRCode(true)

			const data = await createQrCode(currentUser.url, currentUser.chave, currentUser.nome, currentUser.cidade, valor)

			setEncodedData(data)
			setIsLoadingGerarQRCode(false)
		} catch (err) {
			console.error('_GetGerarQRCode:', err)
			Alert.alert('Erro Geral: ' + err.messag)
		}
	}

	const _goToOpenScreenCobrarAlguemAgain = () => {
		router.replace({
			pathname: '/cobrar_alguem',
			params: { valorReceber: '0' },
		})
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
				{valor > 0 && <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, marginBottom: 10 }}>R$ {HelperNumero.GetMascaraValorDecimal(valor)} </Text>}

				{isLoadingGerarQRCode ? <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}> </Text> : <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>mostre o Código QR para receber </Text>}

				<View
					style={{
						width: 300,
						height: 300,
						backgroundColor: '#fff',
						borderWidth: 0,
						borderColor: 'blue',
					}}
				>
					{isLoadingGerarQRCode ? (
						<LottieView
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								height: 200,
							}}
							ref={animation}
							source={require('@/src/assets/lottie/201-simple-loader.json')}
							autoPlay
							loop
						/>
					) : (
						<Image
							source={{
								uri: `data:image/png;base64,${encodedData}`, // jpeg // gif // png
							}}
							style={{
								width: '100%',
								height: '100%',
								borderWidth: 0,
								borderColor: '#000',
							}}
						/>
					)}
				</View>
			</View>

			<View
				style={{
					flex: 1,
					justifyContent: 'flex-end',
					alignItems: 'center',
					marginLeft: 15,
					marginRight: 15,
					marginBottom: 15,
					borderWidth: 0,
					borderColor: 'blue',
				}}
			>
				<TouchableOpacity style={{ borderRadius: 10, width: 300, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_goToOpenScreenCobrarAlguemAgain}>
					<Text
						style={{
							paddingLeft: 5,
							textAlign: 'center',
							color: '#555',
							fontSize: 18,
						}}
					>
						criar novo Código QR
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
