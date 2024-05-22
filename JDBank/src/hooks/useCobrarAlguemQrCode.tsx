import { useRef, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
//import * as HelperNumero from '@/src/util/HelperNumero'
import { createQrCode } from '@/src/services/qrcodeService'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useCobrarAlguemQrCode = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    const animation = useRef(null)
    const [encodedData, setEncodedData] = useState<any>(null)
    const [isLoadingGerarQRCode, setIsLoadingGerarQRCode] = useState<boolean>(true)

    //const valor = HelperNumero.isNumber(params.valorReceber || '0') ? parseFloat(params.valorReceber || '0') : 0
    const valor = parseFloat(params.valorReceber?.toString() || '0')

    useEffect(() => {
        setEncodedData(null)
        setIsLoadingGerarQRCode(true)

        _GetGerarQRCode()
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Cobrar com Código QR'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
        })
    }, [navigation])

    const _onPressHome = async () => router.replace('/home')

    const _GetGerarQRCode = async () => {
        try {
            setEncodedData(null)
            setIsLoadingGerarQRCode(true)

            const data = await createQrCode(currentUser.url, currentUser.chave, currentUser.nome, currentUser.cidade, valor)

            setEncodedData(data)
            setIsLoadingGerarQRCode(false)
        } catch (error: any) {
            console.error('_GetGerarQRCode:', error)
            Alert.alert('Erro Geral: ' + error.messag)
        }
    }

    const _goToOpenScreenCobrarAlguemAgain = () => {
        router.navigate({
            pathname: '/cobrar_alguem',
            params: { valorReceber: '0' },
        })
    }

    return {
        currentUser,
        animation,
        valor,
        isLoadingGerarQRCode,
        encodedData,
        _goToOpenScreenCobrarAlguemAgain,
    }
}

export default useCobrarAlguemQrCode
