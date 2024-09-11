import React from 'react'
import { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function Page1Screen() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1 }} />,
            headerTitle: () => (
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold' }}>PAGE 1</Text>
                </View>
            ),
        })
    }, [navigation])

    const _onPress = () => router.navigate('/page2')

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ height: 50, width: 200, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7} onPress={_onPress}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Ir para Pagina 2</Text>
            </TouchableOpacity>
        </View>
    )
}
