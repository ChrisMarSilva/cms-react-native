import { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { TextInputMask } from 'react-native-masked-text'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'

import * as HelperNumero from '@/util/HelperNumero'
import * as CONSTANTE from '@/util/Constante'

import imglogoJD from '@/assets/imgs/icon-red.png'
import imglogoJ3 from '@/assets/imgs/icon-blue.png'

export default function CobrarAlguemScreen() {
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const [valor, setValor] = useState(0)

	const userBGColorFim = params.userBGColor || CONSTANTE.BG_VERMELHO
	const userBGColorMeio = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userlogo = userBGColorFim == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3
	const userBGColorScreen = params.userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE

	useEffect(() => {
		setValor(0)
		router.setParams({ valor: 0 })
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

	const _goToOpenScreenCobrarAlguemQrCode = () => {
		router.navigate({
			pathname: '/cobrar_alguem_qrcode',
			params: {
				userURL: params.userURL || CONSTANTE.URL_PAGADOR,
				userChave: params.userChave || '',
				userIspb: params.userIspb || '',
				userNomeBanco: params.userNomeBanco || '',
				userTipoPessoa: params.userTipoPessoa || '',
				userDocumento: params.userDocumento || '',
				userAgencia: params.userAgencia || '',
				userConta: params.userConta || '',
				userTipoConta: params.userTipoConta || '',
				userNome: params.userNome || '',
				userCidade: params.userCidade || '',
				userBGColor: params.userBGColor || CONSTANTE.BG_VERMELHO,
				valorReceber: parseFloat(HelperNumero.GetValorDecimal(valor)),
			},
		})
	}

	return (
		<KeyboardAvoidingView
			behavior="padding"
			enabled
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: userBGColorScreen,
			}}
		>
			<Text
				style={{
					color: '#fff',
					fontSize: 18,
					fontWeight: 'bold',
					marginBottom: 10,
				}}
			>
				digite o valor
			</Text>

			<TextInputMask
				type={'money'}
				options={{
					precision: 2,
					separator: ',',
					delimiter: '.',
					unit: 'R$ ',
					suffixUnit: '',
				}}
				value={valor}
				onChangeText={(value) => setValor(value)}
				onSubmitEditing={Keyboard.dismiss}
				style={{
					textAlign: 'center',
					fontSize: 25,
					fontWeight: 'bold',
					width: '90%',
					height: 40,
					borderRadius: 10,
					borderBottomWidth: 1,
					borderBottomColor: '#fff',
					color: '#fff',
					backgroundColor: userBGColorScreen,
					marginHorizontal: 10,
					marginBottom: 10,
				}}
			/>

			<TouchableOpacity
				style={{
					borderRadius: 10,
					marginLeft: 15,
					marginRight: 15,
					marginTop: 20,
					marginBottom: 15,
					width: '90%',
					height: 50,
					padding: 10,
					backgroundColor: '#fff',
				}}
				onPress={() => {
					Keyboard.dismiss()
					_goToOpenScreenCobrarAlguemQrCode()
				}}
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
					continuar
				</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	)
}
