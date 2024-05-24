import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'

export default function Page1Screen() {
    const navigation = useNavigation()
    const [encodedData, setEncodedData] = useState<string>('iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABGUlEQVR42u2YSw7DIAxEzYpjcFM+N+UYrErtMUkjpd2WWQQlyudtLI89JpH5a8lDHvJnUkVXmkMPKcMeAg1peo70inrpRbm/ISFDwkhNX4NUSWxEo26WVFKisgc2ArWncSO3OthJvEs0nTju/bOT+NJKzJK++c5OovJWRIob2AwNsf6YXWJ3eFGbgXS4skgEGafaDGSifVONS/ZCQ/Q2YI5l8BdSS0ImwtTezehjiM9C3FG8fbVdykft/URTeEY918hlIZZFC9Yq0Rw6ns63nyxXtkTCYK6VuJv4NKvmMdgFMBHfBbRjb8JFxgoWW04RPmKfEaY2pgcZcT/OsL3GQ5baFrUN23iZZrvJ6pKjDJFXFvL8P3jIfvIGvNX7jsCaJvEAAAAASUVORK5CYII=')

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ flex: 1 }} />,
            headerTitle: () => (
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, color: '#888', fontSize: 16 }}>Request for Pay through QR Code</Text>
                </View>
            ),
        })
    }, [navigation])

    const handleHome = () => console.log('Home')

    return (
        <View style={styles.container}>
            <Text style={styles.textValue}>$ 12,345.67</Text>
            <Text style={styles.textMessage}>Show the QR Code to receive the payment</Text>

            <View style={styles.containerQRCode}>
                <Image source={{ uri: `data:image/png;base64,${encodedData}` }} style={styles.imgQRCode} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },

    textValue: { color: '#1550b7', fontWeight: 'bold', fontSize: 35, marginBottom: 10 },
    textMessage: { color: '#7f7f7f', fontSize: 16, marginBottom: 40 },

    containerQRCode: { alignItems: 'center', width: 300, height: 300, backgroundColor: '#fff', padding: 5, borderRadius: 10, marginTop: 0, shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.21, shadowRadius: 6.65, elevation: 9 },
    imgQRCode: { width: '100%', height: '100%' },
})
