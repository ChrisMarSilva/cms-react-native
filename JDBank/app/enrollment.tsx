import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard } from 'react-native'

import useEnrollment from '@/src/hooks/useEnrollment'

export default function EnrollmentScreen() {
    const { imglogo, txtName, setTxtName, txtAddress, setTxtAddress, txtPhone, setTxtPhone, txtEmail, setTxtEmail, txtCardOrAccount, setTxtCardOrAccount, txtSocialSecurity, setTxtSocialSecurity, refTxtName, refTxtAddress, refTxtPhone, refTxtEmail, refTxtCardOrAccount, refTxtSocialSecurity, handleBackToLogin, handleEnrollNext } = useEnrollment()

    return (
        <View style={styles.container}>
            <Image source={imglogo} style={styles.logo} />

            <KeyboardAvoidingView style={styles.card} behavior="padding" enabled>
                <Text style={styles.title}>Enrollment</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtName} onSubmitEditing={() => refTxtAddress?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCapitalize="none" autoCorrect={false} placeholder="Legal Name" value={txtName} onChangeText={(value) => setTxtName(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtAddress} onSubmitEditing={() => refTxtPhone?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} placeholder="Physical Address" value={txtAddress} onChangeText={(value) => setTxtAddress(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtPhone} onSubmitEditing={() => refTxtEmail?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} inputMode={'tel'} placeholder="Phone" value={txtPhone} onChangeText={(value) => setTxtPhone(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtEmail} onSubmitEditing={() => refTxtCardOrAccount?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} inputMode={'email'} placeholder="Email" value={txtEmail} onChangeText={(value) => setTxtEmail(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtCardOrAccount} onSubmitEditing={() => refTxtSocialSecurity?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} inputMode={'numeric'} placeholder="Card or Account Number" value={txtCardOrAccount} onChangeText={(value) => setTxtCardOrAccount(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtSocialSecurity} onSubmitEditing={handleEnrollNext} returnKeyType={'done'} onEndEditing={() => Keyboard.dismiss} inputMode={'numeric'} placeholder="Social Security Number(SSN)/Tax ID Number(TIN)" value={txtSocialSecurity} onChangeText={(value) => setTxtSocialSecurity(value)} />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleEnrollNext} style={styles.loginButton} activeOpacity={0.7}>
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
