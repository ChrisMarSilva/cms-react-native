/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useState, useEffect } from 'react'
import { Alert, Keyboard } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { getLogin } from '@/src/services/loginService'
import { payQrCode } from '@/src/services/qrcodeService'
import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderTitle, HeaderRight } from '@/src/components/header'

const useSendPayQrCodeView = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    const [isLoadingPay, setIsLoadingPay] = useState<boolean>(false)
    const [value, setValue] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [info, setInfo] = useState<string>('')
    const [chave, setChave] = useState<string>('')

    useEffect(() => {
        _clearData()

        return () => {
            _clearData()
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Review & Send'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={handleHome} icone={'close'} />,
        })
    }, [navigation])

    const _clearData = () => {
        Keyboard.dismiss()
        setIsLoadingPay(false)
        setValue(HelperNumero.convertToCurrency(params.value?.toString() || '0'))
        setName(params.name?.toString() || '')
        setInfo(params.info?.toString() || '')
        setChave(params.chave?.toString() || '')
    }

    const handleHome = () => router.navigate({ pathname: '/home', params: { value: '0', name: '', info: '', chave: '' } })

    const handleSend = async () => {
        try {
            Keyboard.dismiss()
            setIsLoadingPay(true)

            if (value <= 0) {
                Alert.alert('Payment Amount not Informed!')
                setIsLoadingPay(false)
                return false
            }

            try {
                const data = await getLogin(currentUser.url, chave)

                const ispbRec = parseInt(data?.ispb)
                const agenciaRec = data?.agencia
                const tipoContaRec = parseInt(data?.tipoConta)
                const contaRec = data?.conta
                const tipoPessoaRec = parseInt(data?.tipoPessoa)
                const documentoRec = parseInt(data?.documento)
                const nameRec = data?.name

                try {
                    await payQrCode(currentUser.url, currentUser.ispb, currentUser.agencia, 0, currentUser.conta, 0, currentUser.documento, currentUser.name, ispbRec, agenciaRec, tipoContaRec, contaRec, tipoPessoaRec, documentoRec, nameRec, info, value)
                } catch (error: any) {
                    setIsLoadingPay(false)
                    const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
                    const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
                    console.error('useSendPayQrCodeView.handleSend.payQrCode', msgErroStatus + ' - ' + msgErroMessage)
                    const msgErro = msgErroStatus == '404' ? 'Pay not found.' : '(' + msgErroStatus + ') Failed to pay' // 404 Not Found
                    Alert.alert(msgErro)
                    return
                }
            } catch (error: any) {
                setIsLoadingPay(false)
                const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
                const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
                console.error('useSendPayQrCodeView.handleSend.getLogin', msgErroStatus + ' - ' + msgErroMessage)
                const msgErro = msgErroStatus == '404' ? 'FedNow Key not found.' : '(' + msgErroStatus + ') Failed to verify FedNow Key' // 404 Not Found
                Alert.alert(msgErro)
                return
            }

            setIsLoadingPay(false)
            router.navigate({ pathname: '/send_pay_qrcode_done', params: { value: value, name: name } })
        } catch (error: any) {
            setIsLoadingPay(false)
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.error('useSendPayQrCodeView.handleSend', msgErroStatus + ' - ' + msgErroMessage)
            const msgErro = msgErroStatus == '404' ? 'FedNow Key not found!' : '(' + msgErroStatus + ') Failed to verify FedNow Key' // 404 Not Found
            Alert.alert(msgErro)
        }
    }

    return {
        isLoadingPay,
        name,
        value,
        handleHome,
        handleSend,
    }
}

export default useSendPayQrCodeView
