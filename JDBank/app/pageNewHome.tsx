import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { router, useNavigation } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { LinearGradient } from 'expo-linear-gradient'

import imgPerson from '@/src/assets/imgs/person-blue.jpg'

export default function PageScreen() {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ flex: 1 }} />,
            headerTitle: () => (
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, color: '#888', fontSize: 16, fontWeight: 'bold' }}>Dashboard</Text>
                </View>
            ),
        })
    }, [navigation])

    const handlePerfil = () => console.log('Perfil')
    const handleSend = () => console.log('Send')
    const handleRequestForPay = () => console.log('Request for Pay')
    const handleRecipients = () => console.log('Recipients')
    const handleTransactionHistory = () => console.log('Transaction History')

    return (
        <View style={styles.estilo1}>
            <View style={styles.estilo2}>
                <TouchableOpacity onPress={handlePerfil}>
                    <Image style={styles.estilo3} source={imgPerson} />
                </TouchableOpacity>

                <Text style={styles.estilo4}>
                    Hello, <Text style={styles.estilo5}>Client Pay 01</Text>!
                </Text>

                <Text style={styles.estilo6}>Account Balance:</Text>
                <Text style={styles.estilo7}> USD 12,346.78</Text>
            </View>

            <View style={styles.estilo8}>
                <View style={styles.estilo9}>
                    <TouchableOpacity style={styles.estilo10} activeOpacity={0.7} onPress={handleSend}>
                        <View style={styles.estilo11}>
                            <MaterialIcons name="money-off" size={60} color="#dcdcdc" />
                        </View>
                        <Text style={styles.estilo12}>Send</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.estilo9}>
                    <TouchableOpacity style={styles.estilo10} activeOpacity={0.7} onPress={handleRequestForPay}>
                        <View style={styles.estilo11}>
                            <MaterialIcons name="request-page" size={60} color="#dcdcdc" />
                        </View>
                        <Text style={styles.estilo12}>Request for Pay</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.estilo8}>
                <View style={styles.estilo9}>
                    <TouchableOpacity style={styles.estilo10} activeOpacity={0.7} onPress={handleRecipients}>
                        <View style={styles.estilo11}>
                            <FontAwesome6 name="contact-card" size={60} color="#dcdcdc" />
                        </View>
                        <Text style={styles.estilo12}>Recipients</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.estilo9}>
                    <TouchableOpacity style={styles.estilo10} activeOpacity={0.7} onPress={handleTransactionHistory}>
                        <View style={styles.estilo11}>
                            <FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="book" />
                        </View>
                        <Text style={styles.estilo12}>Transaction History </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    estilo1: { flex: 1, backgroundColor: '#fff' },
    estilo2: { flex: 6, justifyContent: 'center', alignItems: 'center' },
    estilo3: { width: 80, height: 80, borderRadius: 60, borderWidth: 2, borderColor: '#fff', marginTop: 20, marginBottom: 10 },
    estilo4: { fontSize: 15, marginBottom: 10 },
    estilo5: { fontWeight: 'bold' },
    estilo6: { fontSize: 12 },
    estilo7: { fontSize: 25, fontWeight: 'bold' },
    estilo8: { flex: 6, flexDirection: 'row', alignItems: 'center' },
    estilo9: { flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginTop: 2, marginLeft: 10, marginRight: 5 },
    estilo10: { justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    estilo11: { alignItems: 'flex-end' },
    estilo12: { paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 },
})
