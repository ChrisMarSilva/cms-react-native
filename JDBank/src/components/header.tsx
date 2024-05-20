import { useContext } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { UserContext } from '@/src/contexts/userContext'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

export const HeaderBackground = () => {
	const currentUser = useContext(UserContext)

	const userBGColorIni = currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_INI_VERMELHO : CONSTANTE.BG_HEADER_INI_AZUL
	const userBGColorMeio = currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_HEADER_MEIO_VERMELHO : CONSTANTE.BG_HEADER_MEIO_AZUL
	const userBGColorFim = currentUser.bgColor

	return <LinearGradient colors={[userBGColorIni, userBGColorMeio, userBGColorFim]} style={{ flex: 1 }} />
}

export const HeaderLeft = () => {
	const currentUser = useContext(UserContext)

	return (
		<View>
			<Image style={{ resizeMode: 'contain', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: '#fff', marginLeft: 10 }} source={currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3} />
		</View>
	)
}

export const HeaderTitle = (props) => {
	return (
		<View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ marginLeft: 5, color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{props.titulo}</Text>
		</View>
	)
}

export const HeaderRight = (props) => {
	if (!props?.isVisible) return null

	return (
		<View>
			<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={props.onPress}>
				<FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold' }} name={props.icone} />
			</TouchableOpacity>
		</View>
	)
}
