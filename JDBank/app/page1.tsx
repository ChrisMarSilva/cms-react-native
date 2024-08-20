import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { CameraView } from 'expo-camera'

import useSendPayQrCode from '@/src/hooks/useSendPayQrCode'

export default function SendPayQrCodeScreen() {
    const { hasCameraPermission, hasScanned, setHasScanned, handlSendQRCode } = useSendPayQrCode()

    return (
        <View style={styles.container}>
            {hasCameraPermission == null || hasCameraPermission == false ? (
                <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>No camera access</Text>
            ) : (
                <CameraView onBarcodeScanned={hasScanned ? undefined : handlSendQRCode} style={styles.camera} facing={'back'} barcodeScannerSettings={{ barcodeTypes: ['qr', 'pdf417'] }}>
                    <View style={styles.overlay}>
                        <View style={styles.topOverlay} />
                        <View style={styles.middleOverlay}>
                            <View style={styles.sideOverlay} />
                            <View style={styles.qrFrame}>
                                <View style={[styles.corner, styles.topLeft]} />
                                <View style={[styles.corner, styles.topRight]} />
                                <View style={[styles.corner, styles.bottomLeft]} />
                                <View style={[styles.corner, styles.bottomRight]} />
                            </View>
                            <View style={styles.sideOverlay} />
                        </View>
                        <View style={styles.bottomOverlay}>
                            <Text style={styles.textMessage}>To pay, point the camera to the QR Code</Text>
                            {hasScanned && (
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2a5ab2', borderRadius: 15, width: '80%', height: 40, marginTop: 20 }} onPress={() => setHasScanned(false)}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Read QR code again</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2a5ab2', borderRadius: 15, width: '80%', height: 40, marginTop: 20 }} onPress={() => setHasScanned(false)}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Transfer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </CameraView>
            )}
        </View>
    )
}

const { width } = Dimensions.get('window')
const qrSize = width * 0.8

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    camera: { flex: 1, width: '100%' },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
    topOverlay: { flex: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    middleOverlay: { flexDirection: 'row', alignItems: 'center' },
    sideOverlay: { flex: 1, height: qrSize, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    qrFrame: { width: qrSize, height: qrSize, justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' },
    corner: { position: 'absolute', width: 60, height: 60, borderColor: '#138a17' },
    topLeft: { borderLeftWidth: 6, borderTopWidth: 6, top: 0, left: 0 },
    topRight: { borderRightWidth: 6, borderTopWidth: 6, top: 0, right: 0 },
    bottomLeft: { borderLeftWidth: 6, borderBottomWidth: 6, bottom: 0, left: 0 },
    bottomRight: { borderRightWidth: 6, borderBottomWidth: 6, bottom: 0, right: 0 },
    bottomOverlay: { flex: 1, alignItems: 'center', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' },

    textMessage: { marginTop: 20, color: '#fff', fontSize: 16, fontWeight: 'bold' },
})
