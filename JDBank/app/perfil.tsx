import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'

import usePerfil from '@/src/hooks/usePerfil'

export default function PerfilScreen() {
    const { currentUser, imgPerson, handleLogout } = usePerfil()

    return (
        <View style={styles.container}>
            <View style={styles.estilo2}>
                <Image style={styles.estilo3} source={imgPerson} />

                <Text style={styles.estilo5}>
                    Legal name: <Text style={styles.estilo6}>{currentUser.name}</Text>
                </Text>

                <Text style={styles.estilo5}>
                    Social Security/Tax ID number: <Text style={styles.estilo6}>000 – 00 – 0000</Text>
                </Text>

                <Text style={styles.estilo5}>
                    Date of birth: <Text style={styles.estilo6}>MM/DD/YYYY</Text>
                </Text>

                <Text style={styles.estilo5}>
                    Phone: <Text style={styles.estilo6}>(949) 402-4538</Text>
                </Text>

                <Text style={styles.estilo5}>
                    Email <Text style={styles.estilo6}>pay01@gmail.com / rec01@gmail.com</Text>
                </Text>

                <Text style={styles.estilo5}>
                    U.S. Citizen?<Text style={styles.estilo6}>Y/N</Text>
                </Text>

                <Text style={styles.estilo5}>
                    Country of Residence:<Text style={styles.estilo6}>United States</Text>
                </Text>

                <Text style={styles.estilo7}>
                    Physical Address: <Text style={styles.estilo6}>787, Central Avenue</Text>
                </Text>
            </View>

            <View style={styles.estilo8}>
                <TouchableOpacity style={styles.estilo9} activeOpacity={0.7} onPress={handleLogout}>
                    <Text style={styles.estilo10}>LOGOUT</Text>
                </TouchableOpacity>
                <View style={styles.estilo11}>
                    <Text style={styles.estilo12}>Version: {Constants.expoConfig?.version}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
    estilo2: { alignItems: 'center' },
    estilo3: { opacity: 0.7, width: 100, height: 100, borderRadius: 63, borderWidth: 1, borderColor: '#000', marginTop: 0, marginBottom: 20 },

    estilo5: { width: '100%', fontSize: 14, justifyContent: 'space-between' },
    estilo6: { fontWeight: 'bold' },
    estilo7: { fontSize: 18 },
    estilo8: { justifyContent: 'flex-end', marginLeft: 15, marginRight: 15, marginBottom: 15 },
    estilo9: { height: 50, justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 5, borderRadius: 10, marginBottom: 10, width: '100%', backgroundColor: '#fff' },
    estilo10: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
    estilo11: { alignItems: 'center' },
    estilo12: { fontWeight: 'bold', fontSize: 10 },
})
