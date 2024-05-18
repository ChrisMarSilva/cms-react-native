import { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import * as HelperSessao from '@/util/HelperSessao'
import * as HelperNumero from '@/util/HelperNumero'
import * as CONSTANTE from '@/util/Constante'

import imglogoJD from '@/assets/imgs/icon-red.png'
import imglogoJ3 from '@/assets//imgs/icon-blue.png'
import imgBluePerson from '@/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/assets/imgs/person-red.jpg'

export default function PerfilScreen() {
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	const userBGColorScreen = params.userBGColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE
	const userIcon = params.userBGColor == CONSTANTE.BG_VERMELHO ? imgRedPerson : imgBluePerson
	const userBGColorFim = params.userBGColor ?? CONSTANTE.BG_VERMELHO
	const userBGColorMeio = userBGColorFim === CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim === CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userlogo = userBGColorFim === CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3

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
						Perfil
					</Text>
				</View>
			),
			headerRight: () => (
				<View style={{ flex: 1 }}>
					<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={_onPressHome}>
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
	}, [navigation, router.params])

	const _onPressLogout = async () => {
		// await HelperSessao.ClearAllSessao()
		// await HelperSessao.SetUserURL(params.userURL)
		// await HelperSessao.SetUserIspb(params.useIspb)
		// await HelperSessao.SetUserNomeBanco(params.userNomeBanco)
		// await HelperSessao.SetUserBGColor(params.userBGColor)
		// await HelperSessao.SetUserIcon(params.userIcon)

		router.replace('/login')
	}

	const _onPressHome = async () => {
		router.navigate({
			pathname: '/home',
			params: {
				userURL: params.userURL,
				userIspb: params.userIspb,
				userNomeBanco: params.userNomeBanco,
				userBGColor: params.userBGColor,
			},
		})
	}

	return (
		<View style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					borderWidth: 0,
					borderColor: 'blue',
					alignItems: 'center',
				}}
			>
				<Image
					style={{
						opacity: 0.7,
						width: 100,
						height: 100,
						borderRadius: 63,
						borderWidth: 1,
						borderColor: '#fff',
						marginTop: 0,
						marginBottom: 20,
					}}
					source={userIcon}
				/>
				<Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{params.userNome}</Text>
				<Text style={{ color: '#fff', fontSize: 14 }}>
					CPF: <Text style={{ fontWeight: 'bold' }}>{HelperNumero.GetMascaraCPF(params.userDocumento)}</Text>
				</Text>
				<Text style={{ color: '#fff', fontSize: 14, marginBottom: 20 }}>
					Celular: <Text style={{ fontWeight: 'bold' }}>{HelperNumero.GetMascaraTelefone(params.userChave)}</Text>
				</Text>
				<Text style={{ color: '#fff', fontSize: 18 }}>
					<Text style={{ fontWeight: 'bold' }}>{params.userNomeBanco}</Text>
				</Text>
				<Text style={{ color: '#fff', fontSize: 14 }}>
					Agência: <Text style={{ fontWeight: 'bold' }}>{params.userAgencia}</Text> || Conta: <Text style={{ fontWeight: 'bold' }}>{params.userConta}</Text>
				</Text>
			</View>
			<View
				style={{
					justifyContent: 'flex-end',
					marginLeft: 15,
					marginRight: 15,
					marginBottom: 15,
					borderWidth: 0,
					borderColor: 'blue',
				}}
			>
				<TouchableOpacity
					style={{
						height: 50,
						justifyContent: 'center',
						alignItems: 'center',
						paddingTop: 10,
						paddingBottom: 5,
						borderRadius: 10,
						marginBottom: 10,
						width: '100%',
						backgroundColor: '#fff',
					}}
					activeOpacity={0.7}
					onPress={_onPressLogout}
				>
					<Text
						style={{
							color: userBGColorScreen,
							fontWeight: 'bold',
							fontSize: 18,
							textAlign: 'center',
						}}
					>
						TROCA DE CONTA
					</Text>
				</TouchableOpacity>
				<View style={{ alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
					<Text style={{ fontWeight: 'bold', fontSize: 10, color: '#fff' }}>Versão: {Constants.expoConfig.version}</Text>
				</View>
			</View>
		</View>
	)
}
