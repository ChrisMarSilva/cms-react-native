import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Link, router, useLocalSearchParams } from 'expo-router'

export default function RecipientsScreen() {
    // const params = useLocalSearchParams()

    // const { recipient } = params || { name: '', email: '' }
    const [name, setName] = useState<string>('') // recipient ? recipient.name : ''
    const [email, setEmail] = useState<string>('') // recipient ? recipient.email : ''

    const isPresented = router.canGoBack()

    const saveRecipient = () => {}

    return (
        <View style={styles.container}>
            {!isPresented && <Link href="../">Dismiss</Link>}

            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />

            <TouchableOpacity onPress={saveRecipient} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },

    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8 },

    saveButton: { width: 150, height: 40, backgroundColor: '#2a5ab2', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
})
