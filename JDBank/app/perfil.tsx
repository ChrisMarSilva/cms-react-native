import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import Constants from 'expo-constants'

import usePerfil from '@/src/hooks/usePerfil'

export default function PerfilScreen() {
    const { currentUser, imgPerson, handleLogout } = usePerfil()

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <Image source={imgPerson} style={styles.userPhoto} />
                <Text style={styles.userName}>{currentUser.name}</Text>
            </View>

            <View style={styles.profileDetails}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Social Security/Tax ID:</Text>
                    <Text style={styles.detailValue}>{currentUser.socialSecurity}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Date of Birth:</Text>
                    <Text style={styles.detailValue}>{currentUser.birth}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Phone:</Text>
                    <Text style={styles.detailValue}>{currentUser.phone}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailValue}>{currentUser.email}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Citizen?</Text>
                    <Text style={styles.detailValue}>{currentUser.citizen}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Country:</Text>
                    <Text style={styles.detailValue}>{currentUser.country}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Physical:</Text>
                    <Text style={styles.detailValue}>{currentUser.address}</Text>
                </View>
            </View>

            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.buttonLogout} activeOpacity={0.7} onPress={handleLogout}>
                    <Text style={styles.buttonTextLogout}>LOGOUT</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>Version {Constants.expoConfig?.version}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: '#ffffff', justifyContent: 'space-between' },

    profileHeader: { alignItems: 'center', marginTop: 30 },
    userPhoto: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
    userName: { fontSize: 24, fontWeight: 'bold' },

    profileDetails: { marginHorizontal: 20, backgroundColor: '#ffffff', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2, marginTop: 10 },
    detailItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    detailLabel: { fontSize: 13, color: '#888' },
    detailValue: { fontSize: 15, fontWeight: 'bold' },

    logoutContainer: { marginHorizontal: 20, alignItems: 'center' },
    buttonLogout: { height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: '100%', backgroundColor: '#d9534f' },
    buttonTextLogout: { fontWeight: 'bold', fontSize: 18, color: '#ffffff' },
    footerText: { color: '#888', fontWeight: 'bold', fontSize: 12, marginTop: 5, marginBottom: 10 },
})
