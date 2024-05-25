import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Image } from 'react-native'
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
        })
    }, [navigation])

    const handlePerfil = () => console.log('Perfil')

    const userName = 'John Doe'
    const userBalance = '$12,345.67'
    const userPhoto = 'https://randomuser.me/api/portraits/men/1.jpg'

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="account-balance" size={30} />
                <Text style={styles.bankName}>Banco Americano</Text>
                <MaterialIcons name="logout" size={30} onPress={() => console.log('Logout pressed')} />
            </View>

            <View style={styles.userInfo}>
                <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
                <View>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Saldo</Text>
                <Text style={styles.balanceValue}>{userBalance}</Text>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Transfer pressed')}>
                    <MaterialIcons name="send" size={40} color="#888" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Transferir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Receive pressed')}>
                    <MaterialIcons name="call-received" size={40} color="#888" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Receber</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Contacts pressed')}>
                    <MaterialIcons name="contacts" size={40} color="#888" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Contatos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Movements pressed')}>
                    <MaterialIcons name="list" size={40} color="#888" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Movimentações</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Versão 1.0.0</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    bankName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    greeting: {
        fontSize: 18,
        color: '#888',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    balanceCard: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    balanceLabel: {
        fontSize: 18,
        color: '#888',
    },
    balanceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 5,
    },
    menuContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    menuItem: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '45%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        position: 'relative',
    },
    menuIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    menuText: {
        marginTop: 50,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#888',
        fontSize: 14,
    },
})

/*




-------------

import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Image } from 'react-native'
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
        })
    }, [navigation])

    const handlePerfil = () => console.log('Perfil')

    const userName = 'John Doe'
    const userBalance = '$12,345.67'
    const userPhoto = 'https://randomuser.me/api/portraits/men/1.jpg'

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image source={imgPerson} style={styles.userPhoto} />
                    <View>
                        <Text style={styles.userTxtName}>Hello,</Text>
                        <Text style={styles.userName}>{userName}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.balanceContainer}>
                <Text style={styles.userTxtBalance}>Balance</Text>
                <Text style={styles.userBalance}>{userBalance}</Text>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Transfer pressed')}>
                    <MaterialIcons name="send" size={40} />
                    <Text style={styles.menuText}>Transferir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Receive pressed')}>
                    <MaterialIcons name="call-received" size={40} />
                    <Text style={styles.menuText}>Receber</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Contacts pressed')}>
                    <MaterialIcons name="contacts" size={40} />
                    <Text style={styles.menuText}>Contatos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Movements pressed')}>
                    <MaterialIcons name="list" size={40} />
                    <Text style={styles.menuText}>Movimentações</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    userTxtName: {
        fontSize: 16,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    balanceContainer: {
        marginBottom: 20,
    },
    userTxtBalance: {
        fontSize: 16,
    },
    userBalance: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
    },
    menuContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    menuItem: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '45%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    menuText: {
        marginTop: 10,
        fontSize: 16,
    },
})



----


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },

    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },

    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    currentBalance: {
        fontSize: 16,
        color: '#009900', // Verde para saldo positivo
    },

    mainMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },

    menuItemButton: {
        alignItems: 'center',
    },

    menuItemIcon: {
        width: 24,
        height: 24,
        marginBottom: 5,
    },

    menuItemText: {
        fontSize: 14,
    },

    mainContent: {
        flex: 1,
        padding: 20,
    },

    highlightSection: {
        marginBottom: 20,
    },

    highlightTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    highlightSubtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 20,
    },

    highlightCard: {
        backgroundColor: '#F2F2F2',
        padding: 15,
        borderRadius: 10,
    },

    highlightCardValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#009900', // Verde para valor positivo
        marginBottom: 5,
    },

    highlightCardDescription: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 10,
    },

    highlightCardButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },

    highlightCardButtonText: {
        fontSize: 14,
        color: '#FFFFFF',
    },

    shortcutsSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    shortcutButton: {
        alignItems: 'center',
        width: 80,
        height: 80,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    shortcutIcon: {
        width: 32,
        height: 32,
        marginBottom: 5,
    },

    shortcutText: {
        fontSize: 14,
    },

    logoutButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 5,
    },

    logoutButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
})



backgroundColor: '#f5f5f5',


*/
