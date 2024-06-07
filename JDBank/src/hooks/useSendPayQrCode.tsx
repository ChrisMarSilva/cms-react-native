import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useCameraPermissions } from 'expo-camera'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { sendQrCode } from '@/src/services/qrcodeService'
import { HeaderBlackBackground, HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useSendPayQrCode = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasScanned, setHasScanned] = useState(false)
    const [permission, requestPermission] = useCameraPermissions()

    useEffect(() => {
        _clearData()
        router.setParams({ value: '0', name: '' })
        _requestCameraPermission() //setTimeout(() => { }, 150)

        return () => {
            _clearData()
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBlackBackground />,
            //headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Pay through QR Code'} />,
            //headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
        })
    }, [navigation])

    const _clearData = () => {
        setHasScanned(false)
    }

    const _requestCameraPermission = async () => {
        //const { status } = await Camera.requestCameraPermissionsAsync()
        //setHasCameraPermission(status === 'granted')
        if (!permission || !permission.granted) requestPermission()
        setHasCameraPermission(true)
    }

    const handlSendQRCode = async ({ type, data }: { type: any; data: any }) => {
        try {
            // remove this line
            //data = '00020101021126360014br.gov.bcb.spi0114+551194212333352040000530398654040.005802BR5919JD VERMELHO PAGADOR6009São Paulo630416DC'

            // setHasScanned(false)
            if (data.trim() == '') return
            setHasScanned(true)

            const result = await sendQrCode(currentUser.url, data)

            setHasScanned(false)

            router.navigate({
                pathname: '/send_pay_qrcode_view',
                params: {
                    value: parseFloat(result.value.toString() || '0'),
                    name: result.name.toString() || '',
                    info: result.info.toString() || '',
                    chave: result.chave.toString() || '',
                },
            })
        } catch (error: any) {
            Alert.alert(error.messag)
        }
    }

    return {
        hasCameraPermission,
        hasScanned,
        setHasScanned,
        handlSendQRCode,
    }
}

export default useSendPayQrCode
