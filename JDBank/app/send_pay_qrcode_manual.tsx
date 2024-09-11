import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'

import useSendPayQrCodeManual from '@/src/hooks/useSendPayQrCodeManual'

export default function SendPayQrCodeManualScreen() {
    const { value, setValue, refValue, isLoading, handleContinue } = useSendPayQrCodeManual()

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>FedNow Key:</Text>
            <TextInput ref={refValue} style={styles.input} placeholder="FedNow Key" value={value} onChangeText={(value) => setValue(value)} placeholderTextColor="#999" />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    {isLoading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>CONTINUE</Text>}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginTop: 5 },
    input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 80, fontSize: 16, paddingVertical: 10 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', bottom: 20, left: 10, right: 10 },
    button: { backgroundColor: '#1550b7', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 50, width: '90%', alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
})
