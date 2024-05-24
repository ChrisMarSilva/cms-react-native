import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import imgPerson from '@/src/assets/imgs/person-blue.jpg'

export default function PageScreen() {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ flex: 1 }} />,
            headerTitle: () => (
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, color: '#888', fontSize: 16, fontWeight: 'bold' }}>JD Bank</Text>
                </View>
            ),
            // headerRight: () => (
            //     <View>
            //         <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            //             <MaterialIcons name="logout" size={24} color="#000" />
            //         </TouchableOpacity>
            //     </View>
            // ),
        })
    }, [navigation])

    const handlePerfil = () => console.log('Perfil')
    const handleSend = () => console.log('Send')
    const handleRequestForPay = () => console.log('Request for Pay')
    const handleRecipients = () => console.log('Recipients')
    const handleTransactionHistory = () => console.log('Transaction History')

    return (
        <View style={styles.container}>
            <View style={styles.gridClient}>
                <TouchableOpacity onPress={handlePerfil}>
                    <Image style={styles.clientImg} source={imgPerson} />
                </TouchableOpacity>

                <View style={styles.gridTextClient}>
                    <Text style={styles.helloText}>Hello,</Text>
                    <Text style={styles.clientText}>Client Pay 01!</Text>
                </View>
            </View>

            <View style={styles.gridBalance}>
                <Text style={styles.accountText}>Account Balance:</Text>
                <Text style={styles.balanceText}>$ 12,346.78</Text>
            </View>

            <View style={styles.gridMenu}>
                <TouchableOpacity style={styles.gridItem}>
                    <Ionicons name="swap-horizontal" size={50} color="#000" />
                    <Text style={styles.gridItemText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridItem}>
                    <MaterialIcons name="request-page" size={50} color="#000" />
                    <Text style={styles.gridItemText}>Request for Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridItem}>
                    <FontAwesome6 name="contact-card" size={50} color="#000" />
                    <Text style={styles.gridItemText}>Recipients</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridItem}>
                    <FontAwesome6 name="contact-card" size={50} color="#000" />
                    <Text style={styles.gridItemText}>Transaction History</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    gridClient: { flexDirection: 'row', alignItems: 'center', paddingLeft: 20 },
    clientImg: { width: 80, height: 80, borderRadius: 60, borderWidth: 2, borderColor: '#fff' },

    gridTextClient: { marginLeft: 10, alignSelf: 'center' },
    helloText: { fontSize: 18 },
    clientText: { fontSize: 18, fontWeight: 'bold' },

    gridBalance: { marginLeft: 30, marginTop: 20, marginBottom: 30 },
    accountText: { fontSize: 14 },
    balanceText: { fontSize: 30, fontWeight: 'bold' },

    gridMenu: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
    gridItem: { width: '48%', backgroundColor: '#f9f9f9', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
    gridItemText: { marginTop: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
})
