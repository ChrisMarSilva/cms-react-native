import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import * as HelperNumero from '@/src/util/HelperNumero'
import useHome from '@/src/hooks/useHome'

export default function HomeScreen() {
    const { currentUser, imgPerson, isLoadingBalance, handleBalance, handlePersonalInfo, handleSendPayQrCode, handleRequestPayQrCode, handleRecipients, handleTransactionHistory } = useHome()

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <TouchableOpacity onPress={handlePersonalInfo}>
                    <Image source={imgPerson} style={styles.userPhoto} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Text style={styles.userName}>{currentUser.name}!</Text>
                </View>
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Account Balance:</Text>
                <View style={styles.balanceRow}>
                    <Text style={styles.balanceValue}>{HelperNumero.FormatCurrency(currentUser.balance)}</Text>
                    <TouchableOpacity onPress={handleBalance} disabled={isLoadingBalance}>
                        {isLoadingBalance ? <ActivityIndicator color="#888" size="small" /> : <MaterialIcons name="refresh" size={30} color="#888" style={styles.refreshIcon} />}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={handleSendPayQrCode}>
                    <MaterialIcons name="send" size={40} color="#888" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Send</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleRequestPayQrCode}>
                    <MaterialIcons name="attach-money" size={40} color="#888" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Request for Pay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleRecipients}>
                    <MaterialIcons name="contacts" size={40} color="#888" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Recipients</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleTransactionHistory}>
                    <MaterialIcons name="list" size={40} color="#888" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Transaction History</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Version {Constants.expoConfig?.runtimeVersion?.toString()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexGrow: 1 },

    userInfo: { flexDirection: 'row', alignItems: 'center', padding: 20, marginBottom: 10, backgroundColor: '#FFFFFF' },
    userPhoto: { width: 80, height: 80, borderRadius: 50, marginRight: 15, borderColor: '#ccc', borderWidth: 1 },
    greeting: { fontSize: 16, color: '#888' },
    userName: { fontSize: 22, fontWeight: 'bold' },

    balanceCard: { backgroundColor: '#FFFFFF', padding: 20, marginHorizontal: 20, borderRadius: 10, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    balanceLabel: { fontSize: 14, color: '#888' },
    balanceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, // Adicionado para alinhar saldo e refresh
    balanceValue: { fontSize: 24, fontWeight: 'bold', color: '#138a17', marginTop: 5 },
    refreshIcon: { marginLeft: 10 },

    menuContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
    menuItem: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, width: '45%', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, position: 'relative' },
    menuIcon: { position: 'absolute', top: 10, right: 10 },
    menuText: { marginTop: 50, fontSize: 16, fontWeight: 'bold', textAlign: 'left' },

    footer: { alignSelf: 'center', position: 'absolute', bottom: 10 },
    footerText: { color: '#888', fontSize: 12, fontWeight: 'bold' },
})
