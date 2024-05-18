import { useRef, useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, Animated, Easing } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import LottieView from 'lottie-react-native'
import axios from 'axios'

import * as HelperNumero from '@/util/HelperNumero'
import * as CONSTANTE from '@/util/Constante'

import imglogoJD from '@/assets/imgs/icon-red.png'
import imglogoJ3 from '@/assets/imgs/icon-blue.png'

export default function CobrarAlguemQrCodeScreen() {
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const animation = useRef(null)
	const [encodedData, setEncodedData] = useState(null)
	const [isLoadingGerarQRCode, setIsLoadingGerarQRCode] = useState(true)

	const userBGColorFim = params.userBGColor || CONSTANTE.BG_VERMELHO
	const userBGColorMeio = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userlogo = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3
	const userBGColorScreen = (params.userBGColor || CONSTANTE.BG_VERMELHO) == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE
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
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
				<View style={{ flex: 1 }}>
					<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => router.navigate('/home')}>
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

			axios({
				method: 'post',
				url: (params.userURL || CONSTANTE.URL_PAGADOR) + CONSTANTE.URL_GERAR_QRCODE,
				timeout: CONSTANTE.URL_TIMEOUT,
				responseType: 'text',
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				data: JSON.parse(` {"chaveIdentificacao":"${params.userChave}","nomeRecebedor":"${params.userNome}","cidade":"${params.userCidade}","valor":${valor}}`),
			})
				.then((response) => {
					let data = response.data

					// data = 'iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAY1SURBVO3BQY4cy5LAQDLQ978yR0tfJZCoar34GjezP1jrEoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS7yw4dU'
					// data = '00020101021126360014br.gov.bcb.spi0114+55119421246815204000053039865802BR5906Fulano6009São Paulo63041689' //  0,00 ok
					// data = '00020101021126360014br.gov.bcb.spi0114+55119421200015204000053039865406100.005802BR5913Fulano de Tal6009São Paulo63041A9B' // 100,00 ok
					// data = '00020101021126360014br.gov.bcb.spi0114+55119421200055204000053039865406100.005802BR5909Anderson 6009São Paulo63040CB1' // 100,00 ok
					// data = '00020101021126360014br.gov.bcb.spi0114+55119421255555204000053039865406100.005802BR5917J3 AZUL RECEBEDOR6009São Paulo630417AC'
					// data = '00020101021126360014br.gov.bcb.spi0114+551194212333352040000530398654040.005802BR5919JD VERMELHO PAGADOR6009São Paulo630416DC'
					// data = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII='
					// data = 'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
					data = 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABGUlEQVR42u2YSw7DIAxEzYpjcFM+N+UYrErtMUkjpd2WWQQlyudtLI89JpH5a8lDHvJnUkVXmkMPKcMeAg1peo70inrpRbm/ISFDwkhNX4NUSWxEo26WVFKisgc2ArWncSO3OthJvEs0nTju/bOT+NJKzJK++c5OovJWRIob2AwNsf6YXWJ3eFGbgXS4skgEGafaDGSifVONS/ZCQ/Q2YI5l8BdSS0ImwtTezehjiM9C3FG8fbVdykft/URTeEY918hlIZZFC9Yq0Rw6ns63nyxXtkTCYK6VuJv4NKvmMdgFMBHfBbRjb8JFxgoWW04RPmKfEaY2pgcZcT/OsL3GQ5baFrUN23iZZrvJ6pKjDJFXFvL8P3jIfvIGvNX7jsCaJvEAAAAASUVORK5CYII='

					setEncodedData(data)
					setIsLoadingGerarQRCode(false)
				})
				.catch((err) => {
					Alert.alert('Erro Chamada: ' + err.messag)
				})
		} catch (err) {
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
							source={require('@/assets/lottie/201-simple-loader.json')}
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
