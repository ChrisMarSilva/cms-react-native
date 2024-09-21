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

    const handleSendQRCodeByManual = () => router.navigate('/send_pay_qrcode_manual')
    const handleSendQRCodeByCamera = () => router.navigate('/send_pay_qrcode_camera')
    const handleTransactionHistory = () => router.navigate('/transaction_history')
    const handleRecipients = () => router.navigate('/recipients')

    return {
        handleSendQRCodeByManual,
        handleSendQRCodeByCamera,
        handleTransactionHistory,
        handleRecipients,
    }
}

export default useSendPayQrCode
