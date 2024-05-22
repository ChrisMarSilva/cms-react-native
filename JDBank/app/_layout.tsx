import { LogBox } from 'react-native'
import { Stack } from 'expo-router'

import { UserProvider } from '@/src/providers/userProvider'

export default function RootLayout() {
    // Ignore log notification by message:
    LogBox.ignoreLogs(['Warning: ...'])

    // Ignore all log notifications:
    LogBox.ignoreAllLogs()
    //LogBox.ignoreAllLogs(true)

    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />

                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="login_cadastro" options={{ headerShown: false }} />

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
