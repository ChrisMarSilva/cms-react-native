import { useEffect, useState, useContext } from 'react'
import { Text, View, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { TextInputMask } from 'react-native-masked-text'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

export default function CobrarAlguemScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()

	const [valor, setValor] = useState(0)

	useEffect(() => {
		setValor(0)
		router.setParams({ valorReceber: 0 })
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

	const _goToOpenScreenCobrarAlguemQrCode = () => {
		Keyboard.dismiss()

		router.navigate({
			pathname: '/cobrar_alguem_qrcode',
			params: { valorReceber: parseFloat(HelperNumero.GetValorDecimal(valor)) },
		})
	}

	return (
		<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: currentUser.bgColorScreen }}>
			<Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>digite o valor</Text>

			<TextInputMask type={'money'} options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }} value={valor} onChangeText={(value) => setValor(value)} onSubmitEditing={Keyboard.dismiss} style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', width: '90%', height: 40, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#fff', color: '#fff', backgroundColor: currentUser.bgColorScreen, marginHorizontal: 10, marginBottom: 10 }} />

			<TouchableOpacity style={{ borderRadius: 10, marginLeft: 15, marginRight: 15, marginTop: 20, marginBottom: 15, width: '90%', height: 50, padding: 10, backgroundColor: '#fff' }} onPress={_goToOpenScreenCobrarAlguemQrCode}>
				<Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}>continuar</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	)
}
