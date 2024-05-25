import { LogBox } from 'react-native'
import { Stack } from 'expo-router'

import { UserProvider } from '@/src/providers/userProvider'

export default function RootLayout() {
    LogBox.ignoreLogs(['Warning: ...'])
    LogBox.ignoreAllLogs(true)

    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />

                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="enrollment" options={{ headerShown: false }} />
                <Stack.Screen name="enrollment_done" options={{ headerShown: false }} />

                <Stack.Screen name="home" options={{ headerBackVisible: false }} />
                <Stack.Screen name="transaction_history" options={{ headerTintColor: '#888' }} />
                <Stack.Screen name="perfil" options={{ headerTintColor: '#888' }} />

                {/*
                <Stack.Screen name="cobrar_alguem" options={{ headerBackVisible: false }} />
                <Stack.Screen name="cobrar_alguem_qrcode" options={{ headerBackVisible: false }} />
                <Stack.Screen name="pagar_transferir" options={{ headerBackVisible: false }} />
                <Stack.Screen name="pagar_transferir_confirma" options={{ headerBackVisible: false }} />
                <Stack.Screen name="pagar_transferir_recibo" options={{ headerBackVisible: false }} />
                */}

                <Stack.Screen name="page1" options={{ headerBackVisible: false }} />
                <Stack.Screen name="page2" options={{ headerBackVisible: false }} />
            </Stack>
        </UserProvider>
    )
}
