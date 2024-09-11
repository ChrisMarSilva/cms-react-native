/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Alert, Keyboard } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderTitle } from '@/src/components/header'

const useSendPayQrCodeManualValue = () => {
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    const [value, setValue] = useState<string>('0')
    const refValue = useRef(null)

    useEffect(() => {
        _clearData()

        // return () => { _clearData() }
    }, [])

    const _clearData = () => {
        Keyboard.dismiss()
        setValue('0')
        router.setParams({ value: '0', name: '', chave: '', info: '' })
        // console.log('')
        // console.log('useSendPayQrCodeManualValue.useEffect')
        // console.log('documentoRec: ', params.documentoRec?.toString())
        // console.log('nameRec: ', params.nameRec?.toString())
    }

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={''} />,
        })
    }, [navigation])

    const handleContinue = () => {
        Keyboard.dismiss()

        if (value == '' || value == '0') {
            Alert.alert('Request Amount not Informed!')
            return false
        }

        // console.log('')
        // console.log('useSendPayQrCodeManualValue.handleContinue')
        // console.log('documentoRec: ', params.documentoRec?.toString())
        // console.log('nameRec: ', params.nameRec?.toString())

        router.navigate({
            pathname: '/send_pay_qrcode_view',
            params: {
                value: HelperNumero.convertToCurrency(value),
                name: params.nameRec?.toString() || '',
                info: '',
                chave: params.documentoRec?.toString() || '',
            },
        })
    }

    return {
        value,
        setValue,
        refValue,
        handleContinue,
    }
}

export default useSendPayQrCodeManualValue
