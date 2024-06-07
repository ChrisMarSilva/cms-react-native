import { StyleSheet, View, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Constants from 'expo-constants'

import useConfig from '@/src/hooks/useConfig'

export default function ConfigScreen() {
    const { refIspbReceiveBank, refNameReceiveBank, refUrlReceiveBank, refIspbPaymentBank, refNamePaymentBank, refUrlPaymentBank, ispbReceiveBank, setIspbReceiveBank, nameReceiveBank, setNameReceiveBank, urlReceiveBank, setUrlReceiveBank, ispbPaymentBank, setIspbPaymentBank, namePaymentBank, setNamePaymentBank, urlPaymentBank, setUrlPaymentBank, updateAppStatus, handleSave, handleCancel, handleUpdateApp } = useConfig()

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.card} behavior="padding" enabled>
                <Text style={styles.title}>Configuration</Text>

                {/* ------------------------------------------- */}

                <Text style={styles.inputTitle}>Another Bank: ISPB</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refIspbReceiveBank} onSubmitEditing={() => refNameReceiveBank?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCapitalize="none" autoCorrect={false} placeholder="..." value={ispbReceiveBank} onChangeText={(value) => setIspbReceiveBank(value)} />
                    <TouchableOpacity onPress={() => setIspbReceiveBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputTitle}>Another Bank: NAME</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refNameReceiveBank as React.RefObject<TextInput>} onSubmitEditing={() => refUrlReceiveBank?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCapitalize="none" autoCorrect={false} placeholder="..." value={nameReceiveBank} onChangeText={(value) => setNameReceiveBank(value)} />
                    <TouchableOpacity onPress={() => setNameReceiveBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputTitle}>Another Bank: URL</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refUrlReceiveBank} onSubmitEditing={() => refIspbPaymentBank?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} placeholder="..." value={urlReceiveBank} onChangeText={(value) => setUrlReceiveBank(value)} />
                    <TouchableOpacity onPress={() => setUrlReceiveBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                {/* ------------------------------------------- */}

                <Text style={styles.inputTitle}>My Bank: ISPB</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refIspbPaymentBank} onSubmitEditing={() => refNamePaymentBank?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} placeholder="..." value={ispbPaymentBank} onChangeText={(value) => setIspbPaymentBank(value)} />
                    <TouchableOpacity onPress={() => setIspbPaymentBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputTitle}>My Bank: NAME</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refNamePaymentBank} onSubmitEditing={() => refUrlPaymentBank?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={false} autoCapitalize="none" autoCorrect={false} placeholder="..." value={namePaymentBank} onChangeText={(value) => setNamePaymentBank(value)} />
                    <TouchableOpacity onPress={() => setNamePaymentBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.inputTitle}>My Bank: URL</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refUrlPaymentBank} onSubmitEditing={handleSave} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'done'} autoFocus={false} autoCapitalize="none" autoCorrect={false} enablesReturnKeyAutomatically={true} placeholder="..." value={urlPaymentBank} onChangeText={(value) => setUrlPaymentBank(value)} />
                    <TouchableOpacity onPress={() => setUrlPaymentBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                {/* ------------------------------------------- */}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton} activeOpacity={0.7}>
                        <Text style={styles.saveButtonText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <View style={styles.updateAppContainer}>
                <Text style={styles.updateAppText} onPress={handleUpdateApp}>
                    Update App
                </Text>
                <Text style={styles.versionText}>{updateAppStatus}</Text>
            </View>

            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>Version: {Constants.expoConfig?.version}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' },

    card: { width: '90%', backgroundColor: '#ffffff', padding: 5, borderRadius: 10, marginTop: 0, paddingTop: 30, shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.21, shadowRadius: 6.65, elevation: 9 },
    title: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },

    inputContainer: { flexDirection: 'row', marginTop: 0, borderBottomWidth: 1, borderBottomColor: '#999', marginHorizontal: 10 },
    inputTitle: { fontSize: 12, fontWeight: 'bold', marginTop: 10, paddingHorizontal: 10 },
    input: { flex: 1, marginTop: -5, color: '#152d44', height: 40, fontSize: 13 },

    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20, paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' },
    cancelButton: { width: 150, height: 40, backgroundColor: '#888', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    cancelButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
    saveButton: { width: 150, height: 40, backgroundColor: '#2a5ab2', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 },
    saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },

    updateAppContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 15 },
    updateAppText: { fontSize: 16, fontWeight: 'bold', color: '#007aff' },

    versionContainer: { position: 'absolute', bottom: 0, alignItems: 'center', marginBottom: 5 },
    versionText: { fontWeight: 'bold', fontSize: 10, color: '#555' },
})
