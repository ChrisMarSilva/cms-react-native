import { useRef, useEffect, useState, useContext } from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Animated, Easing } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import LottieView from 'lottie-react-native'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/icon-red.png'
import imglogoJ3 from '@/src/assets/imgs/icon-blue.png'

export default function CobrarAlguemReciboScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()
	const params = useLocalSearchParams()
	const animation = useRef(null)

	const [isLoadingRecebimento, setIsLoadingRecebimento] = useState(true)

	const userBGColorFim = currentUser.bgColor
	const userBGColorMeio = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userlogo = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3
	const userBGColorScreen = currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE

	useEffect(() => {
		setIsLoadingRecebimento(true)
		animation.current?.reset()
		animation.current?.play(30, 120)

		setTimeout(() => {
			setIsLoadingRecebimento(false)
		}, 200)
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
						Pagamento Recebido!
					</Text>
				</View>
			),
			headerRight: () => (
				<View>
					<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={_OnPressHome}>
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

	const _OnPressHome = async () => {
		const valor = HelperNumero.isNumber(params.valorPagRec || '0,00') ? parseFloat(params.valorPagRec || '0,00') : 0
		const saldo = HelperNumero.isNumber(currentUser.saldo || '0,00') ? parseFloat(currentUser.saldo || '0,00') : 0

		currentUser.setSaldo(saldo + valor)

		router.replace({
			pathname: '/home',
			params: {
				tipoPessoaPagRec: '',
				documentoPagRec: '',
				agenciaPagRec: '',
				contaPagRec: '',
				nomePagRec: '',
				valorPagRec: '0',
			},
		})
	}

	const _OnPressVerComprovante = async () => {
		router.replace({
			pathname: '/home',
			params: {
				tipoPessoaPagRec: '',
				documentoPagRec: '',
				agenciaPagRec: '',
				contaPagRec: '',
				nomePagRec: '',
				valorPagRec: '0',
			},
		})
	}

	return (
		<View style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View
				style={{
					flex: 8,
					backgroundColor: '#fff',
					justifyContent: 'center',
					alignItems: 'center',
					marginLeft: 25,
					marginRight: 25,
					marginTop: 80,
					marginBottom: 80,
					borderRadius: 25,
				}}
			>
				{isLoadingRecebimento ? (
					<ActivityIndicator color="#000" size="large" />
				) : (
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<LottieView
							style={{
								height: 250,
								width: 500,
								marginBottom: 20,
							}}
							ref={animation}
							source={require('@/src/assets/lottie/1309-smiley-stack-02.json')}
							autoPlay
							loop
						/>
						<Text
							style={{
								color: '#000',
								fontWeight: 'bold',
								fontSize: 25,
								marginBottom: 10,
							}}
						>
							R$ {HelperNumero.GetMascaraValorDecimal(HelperNumero.isNumber(params.valorPagRec || '0,00') ? parseFloat(params.valorPagRec || '0,00') : 0)}
						</Text>
						<Text style={{ color: '#555', fontSize: 16 }}>
							Agência: <Text style={{ color: '#000', fontWeight: 'bold' }}>{params.agenciaPagRec}</Text> || Conta: <Text style={{ color: '#000', fontWeight: 'bold' }}>{params.contaPagRec}</Text>
						</Text>
					</View>
				)}
			</View>

			{isLoadingRecebimento ? null : (
				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
						marginLeft: 25,
						marginRight: 25,
						marginBottom: 30,
						borderWidth: 0,
						borderColor: 'blue',
					}}
				>
					<TouchableOpacity
						style={{
							borderRadius: 10,
							height: 50,
							padding: 12,
							backgroundColor: '#fff',
						}}
						onPress={_OnPressVerComprovante}
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
							ver comprovante
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}
