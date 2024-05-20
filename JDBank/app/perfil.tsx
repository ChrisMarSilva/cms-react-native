import { useEffect, useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Link, router, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/icon-red.png'
import imglogoJ3 from '@/src/assets//imgs/icon-blue.png'
import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

export default function PerfilScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()

	const userBGColorScreen = currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE
	const userIcon = currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imgRedPerson : imgBluePerson
	const userBGColorFim = currentUser.bgColor
	const userBGColorMeio = userBGColorFim === CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorIni = userBGColorFim === CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <LinearGradient colors={[userBGColorIni, userBGColorMeio, userBGColorFim]} style={{ flex: 1 }} />,
			headerLeft: () => (
				<View>
					<Image style={{ resizeMode: 'cover', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: '#fff', marginLeft: 10 }} source={userBGColorFim === CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3} />
				</View>
			),
			headerTitle: () => (
				<View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Perfil</Text>
				</View>
			),
			headerRight: () => (
				<View>
					<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={_onPressHome}>
						<FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold' }} name="close" />
					</TouchableOpacity>
				</View>
			),
		})
	}, [navigation, router.params])

	const _onPressLogout = async () => {
		// await HelperSessao.ClearAllSessao()
		// await HelperSessao.SetUserURL(currentUser.url)
		// await HelperSessao.SetUserIspb(currentUser.ispb)
		// await HelperSessao.SetUserNomeBanco(currentUser.nomeBanco)
		// await HelperSessao.SetUserIcon(currentUser.icon)
		// await HelperSessao.SetUserBGColor(currentUser.bgColor)

		router.replace('/login')
	}

	const _onPressHome = () => {
		router.replace('/home')
	}

	return (
		<View style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View style={{ flex: 1, justifyContent: 'center', borderWidth: 0, borderColor: 'blue', alignItems: 'center' }}>
				<Image style={{ opacity: 0.7, width: 100, height: 100, borderRadius: 63, borderWidth: 1, borderColor: '#fff', marginTop: 0, marginBottom: 20 }} source={userIcon} />
				<Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{currentUser.nome}</Text>
				<Text style={{ color: '#fff', fontSize: 14 }}>
					CPF: <Text style={{ fontWeight: 'bold' }}>{HelperNumero.GetMascaraCPF(currentUser.documento)}</Text>
				</Text>
				<Text style={{ color: '#fff', fontSize: 14, marginBottom: 20 }}>
					Celular: <Text style={{ fontWeight: 'bold' }}>{HelperNumero.GetMascaraTelefone(currentUser.chave)}</Text>
				</Text>
				<Text style={{ color: '#fff', fontSize: 18 }}>
					<Text style={{ fontWeight: 'bold' }}>{currentUser.nomeBanco}</Text>
				</Text>
				<Text style={{ color: '#fff', fontSize: 14 }}>
					Agência: <Text style={{ fontWeight: 'bold' }}>{currentUser.agencia}</Text> || Conta: <Text style={{ fontWeight: 'bold' }}>{currentUser.conta}</Text>
				</Text>
			</View>
			<View style={{ justifyContent: 'flex-end', marginLeft: 15, marginRight: 15, marginBottom: 15, borderWidth: 0, borderColor: 'blue' }}>
				<TouchableOpacity style={{ height: 50, justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 5, borderRadius: 10, marginBottom: 10, width: '100%', backgroundColor: '#fff' }} activeOpacity={0.7} onPress={_onPressLogout}>
					<Text style={{ color: userBGColorScreen, fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>TROCA DE CONTA</Text>
				</TouchableOpacity>
				<View style={{ alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
					<Text style={{ fontWeight: 'bold', fontSize: 10, color: '#fff' }}>Versão: {Constants.expoConfig.version}</Text>
				</View>
			</View>
		</View>
	)
}
