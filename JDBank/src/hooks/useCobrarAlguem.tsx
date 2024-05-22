import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useCobrarAlguem = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [valor, setValor] = useState<string>('0')

    useEffect(() => {
        setValor('0')
        router.setParams({ valorReceber: '0' }) // Convert the number to a string
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

    const _goToOpenScreenCobrarAlguemQrCode = () => {
        Keyboard.dismiss()

        router.navigate({
            pathname: '/cobrar_alguem_qrcode',
            params: { valorReceber: HelperNumero.GetValorDecimal(valor) },
        })
    }

    return {
        currentUser,
        valor,
        setValor,
        _goToOpenScreenCobrarAlguemQrCode,
    }
}

export default useCobrarAlguem
