import { useEffect, useState, useRef } from 'react'
import { Keyboard } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useRequestPayQrCode = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [value, setValue] = useState<string>('0')
    const refValue = useRef(null)

    useEffect(() => {
        _clearData()
        router.setParams({ value: '0' })

        return () => {
            _clearData()
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Request for Pay through QR Code'} />,
        })
    }, [navigation])

    const _clearData = () => {
        // Keyboard.dismiss()
        setValue('0')
        // if (refValue && refValue.current) refValue.current.focus()
    }

    const handleCancel = async () => {
        _clearData()
        router.setParams({ value: '0' })
        router.replace('/home')
    }

    const handleContinue = () => {
        Keyboard.dismiss()

        router.navigate({
            pathname: '/request_pay_qrcode_done',
            params: { value: HelperNumero.convertToCurrency(value) },
        })

        _clearData()
    }

    return {
        currentUser,
        value,
        setValue,
        refValue,
        handleCancel,
        handleContinue,
    }
}

export default useRequestPayQrCode
