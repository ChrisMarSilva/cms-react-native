import { Text, View, Image, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

import useCobrarAlguemQrCode from '@/src/hooks/useCobrarAlguemQrCode'
import * as HelperNumero from '@/src/util/HelperNumero'

export default function CobrarAlguemQrCodeScreen() {
    const { currentUser, animation, valor, isLoadingGerarQRCode, encodedData, _goToOpenScreenCobrarAlguemAgain } = useCobrarAlguemQrCode()

    return (
        <View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
            <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                {valor > 0 && <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, marginBottom: 10 }}>R$ {HelperNumero.GetMascaraValorDecimal(valor)} </Text>}

                {isLoadingGerarQRCode ? <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}> </Text> : <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>mostre o Código QR para receber </Text>}

                <View style={{ width: 300, height: 300, backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue' }}>
                    {isLoadingGerarQRCode ? (
                        <LottieView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} ref={animation} source={require('@/src/assets/lottie/201-simple-loader.json')} autoPlay loop />
                    ) : (
                        /*jpeg // gif // png */
                        <Image source={{ uri: `data:image/png;base64,${encodedData}` }} style={{ width: '100%', height: '100%', borderWidth: 0, borderColor: '#000' }} />
                    )}
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginLeft: 15, marginRight: 15, marginBottom: 15, borderWidth: 0, borderColor: 'blue' }}>
                <TouchableOpacity style={{ borderRadius: 10, width: 300, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_goToOpenScreenCobrarAlguemAgain}>
                    <Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontSize: 18 }}> criar novo Código QR </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
