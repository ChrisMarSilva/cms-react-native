import { useEffect, useState } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useColocarDinheiro = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [valor, setValor] = useState<string>('0')

    useEffect(() => {
        setValor('0')
        router.setParams({ valorReceber: '0' })
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Colocar Dinheiro'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
        })
    }, [navigation])

    const _onPressHome = async () => router.replace('/home')

    const _goToOpenScreenCobrarAlguemQrCode = () => {
        Keyboard.dismiss()
        Alert.alert('Dinheiro adicionado!')
        router.replace('/home')
    }

    return {
        currentUser,
        valor,
        setValor,
        _goToOpenScreenCobrarAlguemQrCode,
    }
}

export default useColocarDinheiro
