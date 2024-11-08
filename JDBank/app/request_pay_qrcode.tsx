import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import useRequestPayQrCode from '@/src/hooks/useRequestPayQrCode'

export default function RequestPayQrCodeScreen() {
    const { value, setValue, refValue, handleCancel, handleContinue } = useRequestPayQrCode()

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <Text style={styles.title}>Amount:</Text>

            <TextInputMask type={'money'} ref={refValue} autoFocus={true} onSubmitEditing={handleContinue} returnKeyType={'done'} options={{ precision: 2, separator: '.', delimiter: ',', unit: '$', suffixUnit: '' }} value={value} onChangeText={(value) => setValue(value)} style={styles.input} />

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
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

    title: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 50 },

    input: { textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#1550b7', width: '90%', paddingBottom: 20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#cccccc' },

    containerButton: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', backgroundColor: '#f7f7f7', position: 'absolute', bottom: 0, alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
    cancelButton: { width: 170, height: 40, marginHorizontal: 10, backgroundColor: '#fff', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    cancelButtonText: { fontSize: 18, fontWeight: 'bold', color: '#1550b7' },
    continueButton: { width: 170, height: 40, backgroundColor: '#1550b7', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    continueButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
})
