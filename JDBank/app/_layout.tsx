import { LogBox } from 'react-native'
import { Stack } from 'expo-router'

import { UserProvider } from '@/src/providers/userProvider'

LogBox.ignoreAllLogs(true)

export default function RootLayout() {
	return (
		<UserProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false, gesturesEnabled: false }} />
				<Stack.Screen name="splash" options={{ headerShown: false, gesturesEnabled: false }} />

				<Stack.Screen name="login" options={{ headerShown: false, gesturesEnabled: false }} />
				<Stack.Screen name="login_cadastro" options={{ headerShown: false, gesturesEnabled: false }} />

				<Stack.Screen name="home" options={{ headerBackVisible: false }} />
				<Stack.Screen name="cobrar_alguem" options={{ headerBackVisible: false }} />
				<Stack.Screen name="cobrar_alguem_qrcode" options={{ headerBackVisible: false }} />
				<Stack.Screen name="cobrar_alguem_recibo" options={{ headerBackVisible: false }} />
				<Stack.Screen name="pagar_transferir" options={{ headerBackVisible: false }} />
				<Stack.Screen name="pagar_transferir_confirma" options={{ headerBackVisible: false }} />
				<Stack.Screen name="pagar_transferir_recibo" options={{ headerBackVisible: false }} />
				<Stack.Screen name="movimentacao" options={{ headerBackVisible: false }} />
				<Stack.Screen name="perfil" options={{ headerBackVisible: false }} />

				<Stack.Screen name="page1" options={{ headerBackVisible: false }} />
				<Stack.Screen name="page2" options={{ headerBackVisible: false }} />
			</Stack>
		</UserProvider>
	)
}
