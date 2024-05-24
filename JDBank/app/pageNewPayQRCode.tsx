import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { CameraView } from 'expo-camera'
import { useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function Page1Screen() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ flex: 1 }} />,
            headerTitle: () => (
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, color: '#888', fontSize: 16, fontWeight: 'bold' }}>Pay through QR Code</Text>
                </View>
            ),
        })
    }, [navigation])

    const handleHome = () => console.log('Home')

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera}>
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
                    </View>
                </View>
            </CameraView>
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
    bottomOverlay: { flex: 1, alignItems: 'center', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    corner: { position: 'absolute', width: 60, height: 60, borderColor: '#138a17' },
    topLeft: { borderLeftWidth: 6, borderTopWidth: 6, top: 0, left: 0 },
    topRight: { borderRightWidth: 6, borderTopWidth: 6, top: 0, right: 0 },
    bottomLeft: { borderLeftWidth: 6, borderBottomWidth: 6, bottom: 0, left: 0 },
    bottomRight: { borderRightWidth: 6, borderBottomWidth: 6, bottom: 0, right: 0 },
    textMessage: { marginTop: 20, color: '#fff', fontSize: 16, fontWeight: 'bold' },
})
