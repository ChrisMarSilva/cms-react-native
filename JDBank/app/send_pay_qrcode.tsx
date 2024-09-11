import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import useSendPayQrCode from '@/src/hooks/useSendPayQrCode'

export default function SendPayQrCodeScreen() {
    const { handlSendQRCodeByManual, handlSendQRCodeByCamera, handlHistory, handlReceipts } = useSendPayQrCode()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>FedNow</Text>
                <View style={styles.fedNowActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={handlSendQRCodeByManual}>
                        <Ionicons name="send" size={32} color="#ff6600" style={styles.iconLeftTop} />
                        <Text style={styles.actionTextLeft}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={handlSendQRCodeByCamera}>
                        <Ionicons name="qr-code-outline" size={32} color="#ff6600" style={styles.iconLeftTop} />
                        <Text style={styles.actionTextLeft}>QR Code</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.activityContainer}>
                <Text style={styles.sectionTitle}>Activity</Text>
                <TouchableOpacity style={styles.activityItem} onPress={handlHistory}>
                    <Ionicons name="list-outline" size={24} color="black" />
                    <Text style={styles.activityText}>History</Text>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.activityItem} onPress={handlReceipts}>
                    <Ionicons name="document-outline" size={24} color="black" />
                    <Text style={styles.activityText}>Receipts</Text>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
    sectionContainer: { marginTop: 5 },
    sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    fedNowActions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    actionButton: { width: '45%', backgroundColor: '#f2f2f2', padding: 20, borderRadius: 10, alignItems: 'flex-start' },
    iconLeftTop: { marginBottom: 10 },
    actionTextLeft: { marginTop: 'auto', fontSize: 16, textAlign: 'left', fontWeight: 'bold' },
    activityContainer: { marginTop: 'auto', marginBottom: 20 },
    activityItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f2f2f2', padding: 15, borderRadius: 10, marginTop: 10 },
    activityText: { fontSize: 16, flex: 1, marginLeft: 10 },
})
