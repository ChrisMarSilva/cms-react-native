import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
//import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
//import Ionicons from '@expo/vector-icons/Ionicons'

import * as HelperNumero from '@/src/util/HelperNumero'
import useHome from '@/src/hooks/useHome'

export default function HomeScreen() {
    const { currentUser, imgPerson, handlePerfil, handleSend, handleRequestForPay, handleRecipients, handleTransactionHistory } = useHome()

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <TouchableOpacity onPress={handlePerfil}>
                    <Image source={imgPerson} style={styles.userPhoto} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Text style={styles.userName}>{currentUser.name}!</Text>
                </View>
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Account Balance:</Text>
                <Text style={styles.balanceValue}>${HelperNumero.GetMascaraValorDecimal(currentUser.balance)}</Text>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={handleSend}>
                    <MaterialIcons name="send" size={40} color="#888" style={styles.menuIcon} />
                    {/* <Ionicons name="swap-horizontal" size={50} color="#000" /> */}
                    <Text style={styles.menuText}>Send</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleRequestForPay}>
                    <MaterialIcons name="call-received" size={40} color="#888" style={styles.menuIcon} />
                    {/* <MaterialIcons name="request-page" size={50} color="#000" /> */}
                    <Text style={styles.menuText}>Request for Pay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleRecipients}>
                    <MaterialIcons name="contacts" size={40} color="#888" style={styles.menuIcon} />
                    {/* <FontAwesome6 name="contact-card" size={50} color="#000" /> */}
                    <Text style={styles.menuText}>Recipients</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleTransactionHistory}>
                    <MaterialIcons name="list" size={40} color="#888" style={styles.menuIcon} />
                    {/* <FontAwesome6 name="contact-card" size={50} color="#000" /> */}
                    <Text style={styles.menuText}>Transaction History</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Version 1.0.0</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: '#FFFFFF' },

    userInfo: { flexDirection: 'row', alignItems: 'center', padding: 20, marginBottom: 10 },
    userPhoto: { width: 80, height: 80, borderRadius: 50, marginRight: 15 },
    greeting: { fontSize: 16, color: '#888' },
    userName: { fontSize: 22, fontWeight: 'bold' },

    balanceCard: { backgroundColor: '#FFFFFF', padding: 20, marginHorizontal: 20, borderRadius: 10, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    balanceLabel: { fontSize: 14, color: '#888' },
    balanceValue: { fontSize: 24, fontWeight: 'bold', color: 'green', marginTop: 5 },

    menuContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
    menuItem: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, width: '45%', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, position: 'relative' },
    menuIcon: { position: 'absolute', top: 10, right: 10 },
    menuText: { marginTop: 50, fontSize: 16, fontWeight: 'bold', textAlign: 'left' },

    footer: { alignSelf: 'center', position: 'absolute', bottom: 10 },
    footerText: { color: '#888', fontSize: 12, fontWeight: 'bold' },
})
