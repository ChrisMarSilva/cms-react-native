import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { router, useNavigation } from 'expo-router'

import imglogoJD from '@/src/assets/imgs/logo-red.png'

export default function PageScreen() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation, (router as any).params])

    const handleEnroll = () => console.log('Enroll')
    const handleBackToLogin = () => console.log('Back to Login')

    return (
        <View style={styles.container}>
            <Image source={imglogoJD} style={styles.logo} />

            <KeyboardAvoidingView style={styles.card} behavior="padding" enabled>
                <Text style={styles.title}>Enrollment</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Legal Name" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Physical Address" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} inputMode={'tel'} placeholder="Phone" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} inputMode={'email'} placeholder="Email" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} inputMode={'numeric'} placeholder="Card or Account Number" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} inputMode={'numeric'} placeholder="Social Security Number(SSN)/Tax ID Number(TIN)" />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleEnroll} style={styles.loginButton} activeOpacity={0.7}>
                        <Text style={styles.loginButtonText}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <View style={styles.backToLoginContainer}>
                <Text style={styles.backToLoginText} onPress={handleBackToLogin}>
                    Back to Login
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' },

    logo: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },

    card: { width: '90%', backgroundColor: '#ffffff', padding: 5, borderRadius: 10, marginTop: 0, paddingTop: 50, shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.21, shadowRadius: 6.65, elevation: 9 },
    title: { fontSize: 18, textAlign: 'center', fontWeight: 'bold' },

    inputContainer: { paddingHorizontal: 10 },
    input: { fontSize: 13, width: '100%', height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#dddddd', marginVertical: 5, paddingHorizontal: 10 },

    buttonContainer: { marginBottom: 20, alignSelf: 'center' },
    loginButton: { width: 150, height: 40, backgroundColor: '#2a5ab2', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    loginButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },

    backToLoginContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    backToLoginText: { fontSize: 16, fontWeight: 'bold', color: '#007aff', textDecorationLine: 'underline' },
})
