import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Switch } from 'react-native'
import Constants from 'expo-constants'

import useLogin from '@/src/hooks/useLogin'

export default function LoginScreen() {
    const { imglogo, txtUsername, setTxtUsername, txtPassword, setTxtPassword, isLoading, isEnabledFaceID, refTxtUsername, refTxtPassword, toggleSwitch, handleLogin, handleEnroll, handleConfig } = useLogin()

    return (
        <View style={styles.container}>
            <Image source={imglogo} style={styles.logo} />

            <KeyboardAvoidingView style={styles.loginCard}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtUsername} onSubmitEditing={() => refTxtPassword?.current?.focus()} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCapitalize="none" autoCorrect={false} placeholder="Username" value={txtUsername} onChangeText={(value) => setTxtUsername(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refTxtPassword} onSubmitEditing={handleLogin} returnKeyType={'done'} placeholder="Password" secureTextEntry={true} value={txtPassword} onChangeText={(value) => setTxtPassword(value)} />
                </View>

                <View style={styles.switchContainer}>
                    <Switch style={styles.switch} trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isEnabledFaceID ? '#4177cc' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabledFaceID} />
                    <Text style={styles.switchText} onPress={toggleSwitch} disabled={isLoading}>
                        Set up Face ID
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                        {isLoading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.loginButtonText}>LOG IN</Text>}
                    </TouchableOpacity>
                </View>

                <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>Forgot ID/Password</Text>
                </View>
            </KeyboardAvoidingView>

            <View style={styles.enrollContainer}>
                <Text style={styles.enrollText} onPress={handleEnroll} disabled={isLoading}>
                    Enroll
                </Text>
                <Text style={styles.enrollText} onPress={handleEnroll} disabled={isLoading}>
                    {'  '}|{'  '}
                </Text>
                <Text style={styles.enrollText} onPress={handleConfig} disabled={isLoading}>
                    Settings
                </Text>
            </View>

            <View style={styles.versionContainer}>
                <Text style={styles.ersionText}>Version: {Constants.expoConfig?.runtimeVersion?.toString()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' },

    logo: { width: 130, height: 130, resizeMode: 'contain', marginBottom: 10 },

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

    enrollContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 15 },
    enrollText: { fontSize: 16, fontWeight: 'bold', color: '#007aff' },

    versionContainer: { position: 'absolute', bottom: 0, alignItems: 'center', marginBottom: 5 },
    ersionText: { fontWeight: 'bold', fontSize: 10, color: '#555' },
})
