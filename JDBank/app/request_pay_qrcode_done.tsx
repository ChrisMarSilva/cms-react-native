import { View, Text, StyleSheet, Image } from 'react-native'
import LottieView from 'lottie-react-native'

import useCobrarAlguemQrCode from '@/src/hooks/useRequestPayQrCodeDone'
import * as HelperNumero from '@/src/util/HelperNumero'

import imgLoader from '@/src/assets/lottie/201-simple-loader.json'

export default function RequestPayQrCodeDoneScreen() {
    const { animation, value, isLoading, encodedData } = useCobrarAlguemQrCode()

    return (
        <View style={styles.container}>
            {/* {value > 0 && <Text />} */}
            <Text style={styles.textValue}>{HelperNumero.FormatCurrency(value)}</Text>

            {/*<Text> {isLoading ?'': 'message'} </Text>*/}
            <Text style={styles.textMessage}>Show the QR Code to receive the payment</Text>

            <View style={styles.containerQRCode}>
                {isLoading ? (
                    <LottieView style={styles.loadQRCode} ref={animation} source={imgLoader} autoPlay loop />
                ) : (
                    /*jpeg // gif // png */
                    <Image source={{ uri: `data:image/png;base64,${encodedData}` }} style={styles.imgQRCode} />
                )}
            </View>

            {/* 
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginLeft: 15, marginRight: 15, marginBottom: 15, borderWidth: 0, borderColor: 'blue' }}>
                <TouchableOpacity style={{ borderRadius: 10, width: 300, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_goToOpenScreenCobrarAlguemAgain}  disabled={isLoading}>
                    <Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontSize: 18 }}> criar novo Código QR </Text>
                </TouchableOpacity>
            </View>
            */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },

    textValue: { color: '#1550b7', fontWeight: 'bold', fontSize: 35, marginBottom: 10 },
    textMessage: { color: '#7f7f7f', fontSize: 16, marginBottom: 40 },

    containerQRCode: { alignItems: 'center', width: 300, height: 300, backgroundColor: '#fff', padding: 5, borderRadius: 10, marginTop: 0, shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.21, shadowRadius: 6.65, elevation: 9 },
    loadQRCode: { width: '100%', height: '100%' },
    imgQRCode: { width: '100%', height: '100%' },
})
