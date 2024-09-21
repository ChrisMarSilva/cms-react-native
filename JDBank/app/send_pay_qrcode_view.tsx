/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
//import LottieView from 'lottie-react-native'
//import FontAwesome from '@expo/vector-icons/FontAwesome'

import useSendPayQrCodeView from '@/src/hooks/useSendPayQrCodeView'
import * as HelperNumero from '@/src/util/HelperNumero'

//import imgLoader from '@/src/assets/lottie/201-simple-loader.json'

export default function SendPayQrCodeViewScreen() {
    const { isLoadingPay, name, value, handleHome, handleSend } = useSendPayQrCodeView()

    return (
        <View style={styles.container}>
            {/* {isLoadingClient ? ( <LottieView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} ref={animation} source={imgLoader} autoPlay loop /> ) : ( */}
            <View style={styles.profileContainer}>
                <View style={styles.profileImagePlaceholder}>
                    <Text style={styles.profileInitial}>{name?.charAt(0).toUpperCase()}</Text>
                    {/* <View style={styles.zelleIconPlaceholder}> <Text style={styles.zelleText}>Z</Text> </View> */}
                </View>
                <Text style={styles.amountText}>Send {HelperNumero.FormatCurrency(value)}</Text>
                <Text style={styles.toText}>to</Text>
                <Text style={styles.nameText}>{name}</Text>
            </View>
            {/*   )} */}

            <TouchableOpacity>
                <Text style={styles.addMessageText}>
                    Add message <Text style={styles.addMessageOptionalText}>(Optional)</Text>
                </Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Make sure you're sending to someone you trust, and their information is correct. Money is typically available in their account in seconds.</Text>
                <Text style={styles.warningText}>Once you've sent money, you can't cancel it.</Text>
            </View>

            <View style={styles.containerBtns}>
                {/* {isLoadingClient ? null : ( */}
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleHome} disabled={isLoadingPay}>
                        <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.continueButton} onPress={handleSend} disabled={isLoadingPay}>
                        {isLoadingPay ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.continueButtonText}>SEND</Text>}
                    </TouchableOpacity>
                </View>
                {/* )} */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },

    profileContainer: { alignItems: 'center', marginBottom: 140, marginTop: 100 },
    profileImagePlaceholder: { width: 90, height: 90, borderRadius: 50, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: 22 },
    profileInitial: { fontSize: 38, color: '#FFF' },
    //zelleIconPlaceholder: { position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    //zelleText: { color: '#8a2be2', fontSize: 14, fontWeight: 'bold' },

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
