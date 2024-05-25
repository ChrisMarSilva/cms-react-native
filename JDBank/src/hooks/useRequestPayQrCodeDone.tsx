import { useRef, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { createQrCode } from '@/src/services/qrcodeService'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

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
            const data = await createQrCode(currentUser.url, currentUser.username, value)

            setEncodedData(data)
            setIsLoading(false)
        } catch (error: any) {
            setIsLoading(false)
            Alert.alert(error.messag)
        }
    }

    const handleHome = async () => {
        router.replace({
            pathname: '/home',
            params: { value: 0 },
        })
    }

    return {
        animation,
        value,
        isLoading,
        encodedData,
    }
}

export default useRequestPayQrCodeDone
