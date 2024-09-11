import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native'

import useEnrollmentDone from '@/src/hooks/useEnrollmentDone'

export default function PageScreen() {
    const { imglogo, txtUsername, setTxtUsername, txtPassword, setTxtPassword, isLoading, refTxtUsername, refTxtPassword, handleBackToLogin, handleEnrollDone } = useEnrollmentDone()

    return (
        <View style={styles.container}>
            <Image source={imglogo} style={styles.logo} />

            <KeyboardAvoidingView style={styles.card} behavior="padding" enabled>
                <Text style={styles.title}>Enrollment</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtUsername} onSubmitEditing={() => refTxtPassword?.current?.focus()} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCapitalize="none" autoCorrect={false} placeholder="Username" value={txtUsername} onChangeText={(value) => setTxtUsername(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtPassword} onSubmitEditing={handleEnrollDone} returnKeyType={'done'} placeholder="Password" secureTextEntry={true} value={txtPassword} onChangeText={(value) => setTxtPassword(value)} />
                </View>

                <View style={styles.buttonContainer}>
                    {isLoading ? (
                        <ActivityIndicator color="#2a5ab2" size="large" />
                    ) : (
                        <TouchableOpacity onPress={handleEnrollDone} style={styles.loginButton} activeOpacity={0.7}>
                            <Text style={styles.loginButtonText}>ENROLL</Text>
                        </TouchableOpacity>
                    )}
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
