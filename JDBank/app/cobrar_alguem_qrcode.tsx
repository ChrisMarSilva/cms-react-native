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
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

export default function CobrarAlguemQrCodeScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const animation = useRef(null)
	const [encodedData, setEncodedData] = useState(null)
	const [isLoadingGerarQRCode, setIsLoadingGerarQRCode] = useState(true)

	const valor = HelperNumero.isNumber(params.valorReceber || '0') ? parseFloat(params.valorReceber || '0') : 0

	useEffect(() => {
		setEncodedData(null)
		setIsLoadingGerarQRCode(true)

		_GetGerarQRCode()
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <HeaderBackground />,
			headerLeft: () => <HeaderLeft />,
			headerTitle: () => <HeaderTitle titulo={'Cobrar com Código QR'} />,
			headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
		})
	}, [navigation])

	const _onPressHome = async () => router.replace('/home')

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
		router.navigate({
			pathname: '/cobrar_alguem',
			params: { valorReceber: '0' },
		})
	}

	return (
		<View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
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
