import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'
//import AntDesign from '@expo/vector-icons/AntDesign'

import useSendPayQrCodeDone from '@/src/hooks/useSendPayQrCodeDone'
import * as HelperNumero from '@/src/util/HelperNumero'

import imgSuccess from '@/src/assets/lottie/1127-success.json'

export default function SendPayQrCodeViewScreen() {
    const { animation, name, value, handleSeeReceipt } = useSendPayQrCodeDone()

    return (
        <View style={styles.container}>
            {/* 
            <AntDesign style={styles.icon} name="checkcircleo" size={110} color="green" />
            <LottieView style={styles.animation} ref={animation} source={imgSuccess} autoPlay loop />
            */}

            <LottieView style={styles.animation} ref={animation} source={imgSuccess} autoPlay loop />

            <Text style={styles.sentAmount}>Sent {HelperNumero.FormatCurrency(value)}</Text>
            <Text style={styles.toText}>to</Text>
            <Text style={styles.recipient}>{name}</Text>

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.doneButton} onPress={handleSeeReceipt}>
                    <Text style={styles.doneButtonText}>SEE RECEIPT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#fff' },

    icon: { marginTop: 130 },
    animation: { marginTop: 50, height: 200, width: 500, borderWidth: 0 },

    sentAmount: { fontSize: 24, fontWeight: 'bold', marginTop: 50 },
    toText: { fontSize: 18, color: '#888', marginTop: 10 },
    recipient: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },

    containerButton: { width: '100%', backgroundColor: '#f7f7f7', position: 'absolute', bottom: 0, alignItems: 'center' },
    doneButton: { backgroundColor: '#003366', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, marginVertical: 30 },
    doneButtonText: { color: '#fff', fontSize: 18 },
})
