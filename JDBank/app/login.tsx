import { View, Text, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Constants from 'expo-constants'

import * as CONSTANTE from '@/src/util/Constante'
import useLogin from "@/src/hooks/useLogin"

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

export default function LoginScreen() {
	const {currentUser, txtChave, setTxtChave, isLoadingLogin, _onPressLogin, _onPressCadastro, _onPressAlterarCorApp} = useLogin()

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 30, borderWidth: 0, borderColor: 'blue' }}>
				<TouchableOpacity style={{ borderWidth: 0, borderColor: 'red' }} onPress={_onPressAlterarCorApp}>
					<Image source={(currentUser as any).bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3} style={{ resizeMode: 'contain', width: 200, height: 100, borderWidth: 0, borderColor: 'red' }} />
				</TouchableOpacity>
			</View>

			<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 3, width: '100%', alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
				<TextInputMask type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '+55 (99) ' }} editable={true} autoFocus={false} autoCorrect={true} placeholder="Telefone" autoCapitalize={'none'} underlineColorAndroid="transparent" returnKeyType={'done'} enablesReturnKeyAutomatically={true} value={txtChave} onChangeText={(value) => setTxtChave(value)} onSubmitEditing={Keyboard.dismiss} style={{ fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 10, marginBottom: 10, width: '88%', height: 40, textAlign: 'center' }} />

				<TouchableOpacity style={{ height: 45, paddingTop: 10, paddingBottom: 10, borderRadius: 10, marginTop: 20, marginBottom: 20, width: '90%', backgroundColor: (currentUser as any).bgColor }} activeOpacity={0.7} onPress={_onPressLogin}>
					{isLoadingLogin ? <ActivityIndicator color="#fff" size="small" /> : <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>LOGIN</Text>}
				</TouchableOpacity>

				<View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 16, color: '#6C7B8B', textAlign: 'left' }} onPress={_onPressCadastro}>
						Criar Conta
					</Text>
				</View>
			</KeyboardAvoidingView>

			<View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
				<Text style={{ fontWeight: 'bold', fontSize: 10, color: '#555' }}>Versão: {Constants.expoConfig?.version}</Text>
			</View>
		</View>
	)
}
