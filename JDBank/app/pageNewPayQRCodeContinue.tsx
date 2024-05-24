import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function Page1Screen() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ flex: 1 }} />,
            headerTitle: () => (
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, color: '#888', fontSize: 16, fontWeight: 'bold' }}>Review & Send</Text>
                </View>
            ),
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileImagePlaceholder}>
                    <Text style={styles.profileInitial}>A</Text>
                    {/* <View style={styles.zelleIconPlaceholder}>
                        <Text style={styles.zelleText}>Z</Text>
                    </View> */}
                </View>
                <Text style={styles.amountText}>Send $5.00</Text>
                <Text style={styles.toText}>to</Text>
                <Text style={styles.nameText}>Allieeee</Text>
            </View>

            <TouchableOpacity>
                <Text style={styles.addMessageText}>
                    Add message <Text style={styles.addMessageOptionalText}>(Optional)</Text>
                </Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Make sure you're sending to someone you trust, and their information is correct. Money is typically available in their account in minutes.</Text>
                <Text style={styles.warningText}>Once you've sent money, you can't cancel it.</Text>
            </View>

            <View style={styles.containerBtns}>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.scheduleButton}>
                    <Text style={styles.continueButtonText}>SCHEDULE A PAYMENT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },

    profileContainer: { alignItems: 'center', marginBottom: 140, marginTop: 100 },
    profileImagePlaceholder: { width: 70, height: 70, borderRadius: 40, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: 22 },
    profileInitial: { fontSize: 32, color: '#FFF' },
    zelleIconPlaceholder: { position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    zelleText: { color: '#8a2be2', fontSize: 14, fontWeight: 'bold' },

    amountText: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
    toText: { fontSize: 18, color: '#888', marginBottom: 20 },
    nameText: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },

    addMessageText: { fontSize: 16, color: '#007aff', textAlign: 'center', marginBottom: 16 },
    addMessageOptionalText: { color: '#888', marginBottom: 10 },

    infoContainer: { marginBottom: 16, paddingHorizontal: 16 },
    infoText: { fontSize: 14, color: '#888', marginBottom: 8 },
    warningText: { fontSize: 14, color: '#000', fontWeight: 'bold' },

    containerBtns: { width: '100%', backgroundColor: '#f7f7f7', position: 'absolute', bottom: 0, alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
    containerButton: { flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 },
    cancelButton: { width: 170, height: 40, marginHorizontal: 10, backgroundColor: '#fff', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    cancelButtonText: { fontSize: 18, fontWeight: 'bold', color: '#007aff' },
    continueButton: { width: 170, height: 40, backgroundColor: '#003366', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    continueButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    scheduleButton: { width: '100%', height: 40, backgroundColor: '#003366', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
})
