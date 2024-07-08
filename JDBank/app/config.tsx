import { StyleSheet, View, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Constants from 'expo-constants'

import useConfig from '@/src/hooks/useConfig'

export default function ConfigScreen() {
    const { refIspb, refBank, refUrl, ispb, setIspb, bank, setBank, url, setUrl, status, handleSave, handleCancel, handleUpdateApp } = useConfig()

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.card} behavior="padding" enabled>
                <Text style={styles.title}>Settings</Text>

                <Text style={styles.inputTitle}>Clearing System Member ID</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refIspb} onSubmitEditing={() => refBank?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCapitalize="none" autoCorrect={false} placeholder="..." value={ispb} onChangeText={(value) => setIspb(value)} />
                    <TouchableOpacity onPress={() => setIspb('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputTitle}>Financial Institution Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refBank as React.RefObject<TextInput>} onSubmitEditing={() => refUrl?.current?.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCapitalize="none" autoCorrect={false} placeholder="..." value={bank} onChangeText={(value) => setBank(value)} />
                    <TouchableOpacity onPress={() => setBank('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputTitle}>URL</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} ref={refUrl} onSubmitEditing={handleSave} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'done'} autoFocus={false} autoCapitalize="none" autoCorrect={false} enablesReturnKeyAutomatically={true} placeholder="..." value={url} onChangeText={(value) => setUrl(value)} />
                    <TouchableOpacity onPress={() => setUrl('')}>
                        <FontAwesome name="close" color={'#999'} size={25} />
                    </TouchableOpacity>
                </View>

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
                <Text style={styles.versionText}>{status}</Text>
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
