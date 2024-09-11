import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import useSendPayQrCodeManualValue from '@/src/hooks/useSendPayQrCodeManualValue'

export default function SendPayQrCodeManualValueScreen() {
    const { value, setValue, refValue, handleContinue } = useSendPayQrCodeManualValue()

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <Text style={styles.title}>Amount:</Text>

            <TextInputMask type={'money'} ref={refValue} autoFocus={true} onSubmitEditing={handleContinue} returnKeyType={'done'} options={{ precision: 2, separator: '.', delimiter: ',', unit: '$', suffixUnit: '' }} value={value} onChangeText={(value) => setValue(value)} style={styles.input} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 50 },
    input: { textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#1550b7', width: '90%', paddingBottom: 20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#cccccc' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', bottom: 20, left: 10, right: 10 },
    button: { backgroundColor: '#1550b7', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 50, width: '90%', alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
})
