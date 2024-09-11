/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Alert, Keyboard } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { getLogin } from '@/src/services/loginService'
import { HeaderBackground, HeaderTitle } from '@/src/components/header'

const useSendPayQrCodeManual = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const refValue = useRef(null)

    useEffect(() => {
        _clearData()

        // return () => { _clearData() }
    }, [])

    const _clearData = () => {
        Keyboard.dismiss()
        setIsLoading(false)
        setValue('')
        router.setParams({ documentoRec: '', nameRec: '' })
    }

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={''} />,
        })
    }, [navigation])

    const handleContinue = async () => {
        Keyboard.dismiss()
        setIsLoading(true)

        if (value == '') {
            Alert.alert('FedNow Key not Informed!')
            setIsLoading(false)
            return false
        }

        try {
            const data = await getLogin(currentUser.url, value)

            setIsLoading(false)

            // console.log('')
            // console.log('useSendPayQrCodeManual.handleContinue')
            // console.log('documento: ', data?.documento)
            // console.log('name: ', data?.name)

            router.navigate({
                pathname: '/send_pay_qrcode_manual_value',
                params: { documentoRec: data?.documento, nameRec: data?.name },
            })
        } catch (error: any) {
            setIsLoading(false)
            Alert.alert('FedNow Key not found!')
        }
    }

    return {
        value,
        setValue,
        refValue,
        isLoading,
        handleContinue,
    }
}

export default useSendPayQrCodeManual
