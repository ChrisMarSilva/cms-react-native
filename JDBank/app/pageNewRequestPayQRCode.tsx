import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useNavigation } from 'expo-router'

import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

export default function Page1Screen() {
    const navigation = useNavigation()
    const [valor, setValor] = useState<string>('0')

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
    const handleContinue = () => console.log('Continue')

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <Text style={styles.title}>Amount</Text>

            <TextInputMask type={'money'} options={{ precision: 2, separator: '.', delimiter: ',', unit: '$', suffixUnit: '' }} value={valor} onChangeText={(value) => setValor(value)} onSubmitEditing={Keyboard.dismiss} style={styles.input} />

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleContinue}>
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueButtonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },

    title: { fontSize: 18, fontWeight: 'bold', color: '#7f7f7f', marginBottom: 50 },

    input: { textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#1550b7', width: '90%', paddingBottom: 20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#cccccc' },

    containerButton: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', backgroundColor: '#f7f7f7', position: 'absolute', bottom: 0, alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
    cancelButton: { width: 170, height: 40, marginHorizontal: 10, backgroundColor: '#fff', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    cancelButtonText: { fontSize: 18, fontWeight: 'bold', color: '#007aff' },
    continueButton: { width: 170, height: 40, backgroundColor: '#134bb6', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    continueButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
})
