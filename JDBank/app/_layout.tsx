//import { useState } from 'react'
import { LogBox } from 'react-native'
import { Stack } from 'expo-router'

import { UserProvider } from '@/src/providers/userProvider'
//import { UserContext } from '@/src/contexts/userContext'

LogBox.ignoreAllLogs(true)

export default function RootLayout() {
	//const [user, setUser] = useState('')
	//return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>

	return (
		<UserProvider>
			<Stack>
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
		</UserProvider>
	)
}
