import { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import * as CONSTANTE from '@/src/util/Constante'
import imglogoJD from '@/src/assets/imgs/icon-red.png'
import imglogoJ3 from '@/src/assets//imgs/icon-blue.png'

export default function Page1Screen() {
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			headerBackground: () => <LinearGradient colors={[CONSTANTE.BG_HEADER_INI_AZUL, CONSTANTE.BG_HEADER_MEIO_AZUL, CONSTANTE.BG_AZUL]} style={{ flex: 1 }} />,
			headerLeft: () => (
				<View>
					<Image style={{ resizeMode: 'cover', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: '#fff', marginLeft: 10 }} source={imglogoJD} />
				</View>
			),
			headerTitle: () => (
				<View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ marginLeft: 5, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>PAGE 1</Text>
				</View>
			),
			headerRight: () => null,
		})
	}, [navigation, router.params])

	const _onPress = () => router.push('/page2')

	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>PAGINA 1</Text>
			<TouchableOpacity style={{ height: 50, width: 200, marginTop: 20, backgroundColor: CONSTANTE.BG_HEADER_INI_AZUL, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7} onPress={_onPress}>
				<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Ir para Pagina 2</Text>
			</TouchableOpacity>
		</View>
	)
}
