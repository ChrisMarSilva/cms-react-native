import { useRef, useEffect, useContext } from 'react'
import { Text, View, Image, TouchableOpacity, Animated, Easing, Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Audio } from 'expo-av'
import LottieView from 'lottie-react-native'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/icon-red.png'
import imglogoJ3 from '@/src/assets/imgs/icon-blue.png'

export default function PagarTransferirReciboScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const animation = useRef(null)

	const userBGColorFim = currentUser.bgColor
	const userBGColorMeio = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userBGColorScreen = currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE

	useEffect(() => {
		_getTocarSom()
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <LinearGradient colors={[userBGColorIni, userBGColorMeio, userBGColorFim]} style={{ flex: 1 }} />,
			headerLeft: () => (
				<View>
					<Image style={{ resizeMode: 'cover', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: '#fff', marginLeft: 10 }} source={userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3} />
				</View>
			),
			headerTitle: () => (
				<View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Pagamento Feito!</Text>
				</View>
			),
			headerRight: () => (
				<View>
					<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => _OnPressVerComprovante()}>
						<FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold' }} name="close" />
					</TouchableOpacity>
				</View>
			),
		})
	}, [navigation])

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
			Alert.alert('Erro ao tocar som: ' + error)
		}
	}

	const _OnPressVerComprovante = () => {
		const valor = HelperNumero.isNumber(params.valorRecebedor || '0,00') ? parseFloat(params.valorRecebedor || '0,00') : 0
		const saldo = HelperNumero.isNumber(currentUser.saldo || '0,00') ? parseFloat(currentUser.saldo || '0,00') : 0

		currentUser.setSaldo(saldo - valor)
		router.replace('/home')
	}

	return (
		<View style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
				<View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', height: '80%', borderRadius: 25, backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue' }}>
					<LottieView
						style={{
							height: 200,
							width: 500,
							marginBottom: 5,
							borderWidth: 0,
						}}
						ref={animation}
						source={require('@/src/assets/lottie/1127-success.json')}
						autoPlay
						loop
					/>

					<Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30, marginBottom: 10 }}> R$ {HelperNumero.GetMascaraValorDecimal(HelperNumero.isNumber(params.valorRecebedor || '0,00') ? parseFloat(params.valorRecebedor || '0,00') : 0)} </Text>

					<Text style={{ color: '#555', fontSize: 18, marginBottom: 5 }}>
						para <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>{params.nomeRecebedor}</Text>
					</Text>

					<Text style={{ color: '#555', fontSize: 15, marginBottom: 10 }}>
						x Celular: <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{HelperNumero.GetMascaraTelefone(params.chaveRecebedor)}</Text>
					</Text>

					<Text style={{ color: '#000', fontSize: 18, marginBottom: 5 }}>
						<Text style={{ fontWeight: 'bold' }}>{params.nomeBancoRecebedor}</Text>
					</Text>

					<Text style={{ color: '#555', fontSize: 15 }}>
						Agência: <Text style={{ fontWeight: 'bold' }}>{params.agenciaRecebedor}</Text> || Conta: <Text style={{ fontWeight: 'bold' }}>{params.contaRecebedor}</Text>
					</Text>
				</View>
			</View>

			<View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 25, marginRight: 25, marginBottom: 30, borderWidth: 0, borderColor: 'blue' }}>
				<TouchableOpacity style={{ borderRadius: 10, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_OnPressVerComprovante}>
					<Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}> ver comprovante </Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
