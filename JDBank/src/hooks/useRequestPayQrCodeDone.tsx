/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { createQrCode } from '@/src/services/qrcodeService'
import { HeaderBackground, HeaderTitle, HeaderRight } from '@/src/components/header'

const useRequestPayQrCodeDone = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    const animation = useRef(null)
    const [encodedData, setEncodedData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const value = parseFloat(params.value?.toString() || '0')

    useEffect(() => {
        _clearData()
        _loadData()

        return () => {
            _clearData()
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Request for Pay through QR Code'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={handleHome} icone={'close'} />,
        })
    }, [navigation])

    const _clearData = async () => {
        setEncodedData(null)
        setIsLoading(true)
    }

    const _loadData = async () => {
        try {
            const data = await createQrCode(currentUser.url, currentUser.username, currentUser.name, value)

            setEncodedData(data)
            setIsLoading(false)
        } catch (error: any) {
            setIsLoading(false)
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.error('useRequestPayQrCodeDone._loadData', msgErroStatus + ' - ' + msgErroMessage)
            const msgErro = msgErroStatus == '404' ? 'Qr Code not created!' : '(' + msgErroStatus + ') Failed to create qr code' // 404 Not Found
            Alert.alert(msgErro)
        }
    }

    const handleHome = () => router.navigate({ pathname: '/home', params: { value: 0 } })

    return {
        animation,
        value,
        isLoading,
        encodedData,
    }
}

export default useRequestPayQrCodeDone
