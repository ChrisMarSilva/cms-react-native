import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { LinearGradient } from 'expo-linear-gradient'

import { useNavigation } from 'expo-router'

export default function Page1Screen() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
            // headerBackground: () => <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ flex: 1 }} />,
            // headerTitle: () => (
            //     <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
            //         <Text style={{ marginLeft: 5, color: '#888', fontSize: 16 }}>Payment sent</Text>
            //     </View>
            // ),
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment sent</Text>

            <AntDesign style={styles.icon} name="checkcircleo" size={110} color="green" />

            <Text style={styles.sentAmount}>Sent $5.00</Text>
            <Text style={styles.toText}>to</Text>
            <Text style={styles.recipient}>Allieeee</Text>

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneButtonText}>SEE RECEIPT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#fff' },

    title: { marginTop: 60, color: '#888', fontSize: 20 },
    icon: { marginTop: 130 },

    sentAmount: { fontSize: 24, fontWeight: 'bold', marginTop: 50 },
    toText: { fontSize: 18, color: '#888', marginTop: 10 },
    recipient: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },

    containerButton: { width: '100%', backgroundColor: '#f7f7f7', position: 'absolute', bottom: 0, alignItems: 'center' },
    doneButton: { backgroundColor: '#003366', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, marginVertical: 30 },
    doneButtonText: { color: '#fff', fontSize: 18 },
})
