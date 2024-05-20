import { useRef, useEffect, useState, useContext } from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Animated, Easing } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import LottieView from 'lottie-react-native'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

export default function CobrarAlguemReciboScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()
	const params = useLocalSearchParams()
	const animation = useRef(null)

	const [isLoadingRecebimento, setIsLoadingRecebimento] = useState(true)

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
			headerBackground: () => <HeaderBackground />,
			headerLeft: () => <HeaderLeft />,
			headerTitle: () => <HeaderTitle titulo={'Pagamento Recebido!'} />,
			headerRight: () => <HeaderRight isVisible={true} onPress={_OnPressHome} icone={'close'} />,
		})
	}, [navigation])

	const _OnPressHome = async () => {
		const valor = HelperNumero.isNumber(params.valorPagRec || '0,00') ? parseFloat(params.valorPagRec || '0,00') : 0
		const saldo = HelperNumero.isNumber(currentUser.saldo || '0,00') ? parseFloat(currentUser.saldo || '0,00') : 0

		currentUser.setSaldo(saldo + valor)

		router.replace('/home')
	}

	const _OnPressVerComprovante = async () => router.replace('/home')

	return (
		<View style={{ flex: 1, backgroundColor:  currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE }}>
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
