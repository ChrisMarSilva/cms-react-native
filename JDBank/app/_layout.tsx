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
                <Stack.Screen name="config" options={{ headerShown: false }} />

                <Stack.Screen name="home" options={{ headerBackVisible: false }} />

                <Stack.Screen name="recipients" options={{ headerTintColor: '#888' }} />
                {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}

                <Stack.Screen name="send_pay_qrcode" options={{ headerTintColor: '#888' }} />
                <Stack.Screen name="send_pay_qrcode_view" options={{ headerTintColor: '#888' }} />
                <Stack.Screen name="send_pay_qrcode_done" options={{ headerBackVisible: false, headerTintColor: '#888' }} />

                <Stack.Screen name="request_pay_qrcode" options={{ headerTintColor: '#888' }} />
                <Stack.Screen name="request_pay_qrcode_done" options={{ headerBackVisible: false, headerTintColor: '#888' }} />

                <Stack.Screen name="transaction_history" options={{ headerTintColor: '#888' }} />

                <Stack.Screen name="personal_info" options={{ headerTintColor: '#888' }} />

                <Stack.Screen name="notification" options={{ headerTintColor: '#888' }} />
                <Stack.Screen name="notification_detail" options={{ headerTintColor: '#888' }} />

                <Stack.Screen name="page1" options={{ headerTintColor: '#888' }} />
                <Stack.Screen name="page2" options={{ headerBackVisible: true, headerTintColor: '#888' }} />
            </Stack>
        </UserProvider>
    )
}
