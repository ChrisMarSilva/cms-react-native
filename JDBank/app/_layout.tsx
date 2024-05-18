import { LogBox } from 'react-native'
import { Stack } from 'expo-router'

LogBox.ignoreAllLogs(true)

export default function RootLayout() {
	return (
		<Stack
			screenOptions={
				{
					//headerTintColor: '#fff',
					//headerStyle: { height: 68, backgroundColor: 'transparent', color: '#fff', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0, shadowRadius: 0, shadowOffset: { height: 0 }, shadowColor: 'transparent' },
					//headerTitleStyle: { flex: 1, justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', fontSize: 16, color: '#fff', fontWeight: 'bold' },
				}
			}
		>
			<Stack.Screen name="index" options={{ headerShown: false, gesturesEnabled: false }} />
			<Stack.Screen name="splash" options={{ headerShown: false, gesturesEnabled: false }} />
			<Stack.Screen name="login" options={{ headerShown: false, gesturesEnabled: false }} />
			<Stack.Screen name="login_cadastro" options={{ headerShown: false, gesturesEnabled: false }} />
			<Stack.Screen name="home" />
			<Stack.Screen name="cobrar_alguem" />
			<Stack.Screen name="cobrar_alguem_qrcode" />
			<Stack.Screen name="cobrar_alguem_recibo" />
			<Stack.Screen name="pagar_transferir" />
			<Stack.Screen name="pagar_transferir_confirma" />
			<Stack.Screen name="pagar_transferir_recibo" />
			<Stack.Screen name="movimentacao" />
			<Stack.Screen name="perfil" />
		</Stack>
	)
}
