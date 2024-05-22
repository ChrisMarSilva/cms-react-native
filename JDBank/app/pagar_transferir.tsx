import { Text, View, TouchableOpacity } from 'react-native'
import { CameraView } from 'expo-camera'

import usePagarTransferir from '@/src/hooks/usePagarTransferir'

export default function PagarTransferirScreen() {
    const { currentUser, hasCameraPermission, hasScanned, setHasScanned, _PostEnviarQRCode, _PostEnviarQRCodeFake } = usePagarTransferir()

    return (
        <View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
            <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                <View style={{ width: '80%', height: '70%', alignItems: 'center', backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue' }}>
					{hasCameraPermission == null || hasCameraPermission == false 
					? <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 200 }}>Sem acesso à Câmera</Text> 
					: <CameraView onBarcodeScanned={hasScanned ? undefined : _PostEnviarQRCode} style={{ height: '100%', width: '100%' }} facing={'back'} barcodeScannerSettings={{ barcodeTypes: ['qr', 'pdf417'] }} />}
				</View>

                <Text style={{ marginTop: 15, color: '#fff', fontSize: 15 }}>aponte a câmera para código ou</Text>

                <Text style={{ marginTop: 2, color: '#fff', fontSize: 15 }}>pague via transferência</Text>

                {hasScanned && (
                    <TouchableOpacity style={{ marginTop: 30, borderRadius: 15, width: '70%', height: 40, padding: 10, backgroundColor: '#fff' }} onPress={() => setHasScanned(false)}>
                        <Text style={{ textAlign: 'center', color: currentUser.bgColor, fontWeight: 'bold', fontSize: 16 }}>ler código novamente</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 15, marginRight: 15, borderWidth: 0, borderColor: 'blue' }}>
                <TouchableOpacity style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 60, padding: 10, backgroundColor: '#fff' }} onPress={_PostEnviarQRCodeFake}>
                    <Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}>pagar via transferência</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
