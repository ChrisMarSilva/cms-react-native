import { StyleSheet, View, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Constants from 'expo-constants'

import useConfig from '@/src/hooks/useConfig'

export default function ConfigScreen() {
    const { nameReceiveBank, setNameReceiveBank, urlReceiveBank, setUrlReceiveBank, namePaymentBank, setNamePaymentBank, urlPaymentBank, setUrlPaymentBank, refNameReceiveBank, refUrlReceiveBank, refNamePaymentBank, refUrlPaymentBank, handleSave } = useConfig()

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.card} behavior="padding" enabled>
                <Text style={styles.title}>Configuration</Text>

                <Text style={styles.inputTitle}>Name of Receiver Bank</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refNameReceiveBank} onSubmitEditing={() => refUrlReceiveBank.current.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCapitalize="none" autoCorrect={false} placeholder="..." value={nameReceiveBank} onChangeText={(value) => setNameReceiveBank(value)} />
                    <TouchableOpacity onPress={() => setNameReceiveBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputTitle}>Receiving Bank URL</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refUrlReceiveBank} onSubmitEditing={() => refNamePaymentBank.current.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} placeholder="..." value={urlReceiveBank} onChangeText={(value) => setUrlReceiveBank(value)} />
                    <TouchableOpacity onPress={() => setUrlReceiveBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputTitle}>Name of Paying Bank</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refNamePaymentBank} onSubmitEditing={() => refUrlPaymentBank.current.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} placeholder="..." value={namePaymentBank} onChangeText={(value) => setNamePaymentBank(value)} />
                    <TouchableOpacity onPress={() => setNamePaymentBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputTitle}>Paying Bank URL</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refUrlPaymentBank} onSubmitEditing={handleSave} returnKeyType={'done'} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'done'} autoFocus={false} autoCapitalize="none" autoCorrect={false} enablesReturnKeyAutomatically={true} placeholder="..." value={urlPaymentBank} onChangeText={(value) => setUrlPaymentBank(value)} />
                    <TouchableOpacity onPress={() => setUrlPaymentBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSave} style={styles.loginButton} activeOpacity={0.7}>
                        <Text style={styles.loginButtonText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <View style={styles.versionContainer}>
                <Text style={styles.ersionText}>Version: {Constants.expoConfig?.version}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' },

    card: { width: '90%', backgroundColor: '#ffffff', padding: 5, borderRadius: 10, marginTop: 0, paddingTop: 30, shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.21, shadowRadius: 6.65, elevation: 9 },
    title: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },

    inputContainer: { flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#999', marginHorizontal: 10 },
    inputTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 20, paddingHorizontal: 10 },
    input: { flex: 1, marginTop: -12, color: '#152d44', height: 50, fontSize: 14 },

    buttonContainer: { marginBottom: 20, alignSelf: 'center' },
    loginButton: { width: 150, height: 40, backgroundColor: '#2a5ab2', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    loginButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },

    versionContainer: { position: 'absolute', bottom: 0, alignItems: 'center', marginBottom: 5 },
    ersionText: { fontWeight: 'bold', fontSize: 10, color: '#555' },
})
