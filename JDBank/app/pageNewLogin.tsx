import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native'
import { router, useNavigation } from 'expo-router'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

export default function PageScreen() {
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
    const handleLogin = () => console.log('Login')
    const handleEnroll = () => console.log('Enroll')

    return (
        <View style={styles.container}>
            <Image source={imglogoJD} style={styles.logo} />

            <View style={styles.loginCard}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Username" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
                </View>

                <View style={styles.switchContainer}>
                    <Switch style={styles.switch} trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isEnabled ? '#4177cc' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled} />
                    <Text style={styles.switchText} onPress={toggleSwitch}>
                        Set up Face ID
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>LOG IN</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>Forgot ID/Password</Text>
                </View>
            </View>

            <View style={styles.enrollContainer}>
                <Text style={styles.enrollText} onPress={handleEnroll}>
                    Enroll
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' },

    // logoCard: { width: '90%', alignItems: 'center', padding: 5, backgroundColor: '#ffffff', borderRadius: 5, marginTop: 50 },
    logo: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },

    loginCard: { width: '90%', backgroundColor: '#ffffff', padding: 5, borderRadius: 10, marginTop: 0, paddingTop: 50, shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.21, shadowRadius: 6.65, elevation: 9 },
    inputContainer: { paddingHorizontal: 10 },
    input: { fontSize: 14, height: 40, width: '100%', paddingHorizontal: 10, marginBottom: 20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#dddddd' },

    switchContainer: { flexDirection: 'row', alignItems: 'center' },
    switch: { marginLeft: 10 },
    switchText: { fontSize: 16, color: '#007aff' },

    buttonContainer: { marginBottom: 20, alignSelf: 'center' },
    loginButton: { width: 150, height: 40, backgroundColor: '#2a5ab2', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    loginButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },

    forgotPasswordContainer: { alignItems: 'center', margin: 0, marginBottom: 20 },
    forgotPassword: { marginTop: 10, fontSize: 14, color: '#007aff' },

    enrollContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    enrollText: { fontSize: 16, fontWeight: 'bold', color: '#007aff' },
})
