import React from 'react'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'

import { HeaderBackground, HeaderTitle } from '@/src/components/header'

const useSendPayQrCode = () => {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={''} />,
        })
    }, [navigation])

    const handlSendQRCodeByManual = () => router.navigate('/send_pay_qrcode_manual')
    const handlSendQRCodeByCamera = () => router.navigate('/send_pay_qrcode_camera')
    const handlHistory = () => Alert.alert('Not implemented')
    const handlReceipts = () => Alert.alert('Not implemented')

    return {
        handlSendQRCodeByManual,
        handlSendQRCodeByCamera,
        handlHistory,
        handlReceipts,
    }
}

export default useSendPayQrCode
