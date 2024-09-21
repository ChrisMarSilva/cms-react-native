/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'
import * as signalR from '@microsoft/signalr'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'
import { getBalance } from '@/src/services/balanceService'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

const useHome = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const imgPerson = currentUser.ispb == parseInt(CONSTANTE.ISPB_JD) ? imgBluePerson : imgRedPerson

    const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(false)
    const [isActiveNotification, setIsActiveNotification] = useState<boolean>(false)

    useEffect(() => {
        _cleaData()
        _loadData()

        return () => {
            _cleaData()
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={currentUser.bank} />,
            headerRight: () => (isActiveNotification ? <HeaderRight isVisible={true} onPress={handleNotification} icone={'notifications-on'} color={'#138a17'} /> : null),
        })
    }, [navigation])

    const _cleaData = () => {
        setIsActiveNotification(false)
        setIsLoadingBalance(false)
    }

    const _loadData = () => {
        //handleBalance()
        _getNotificationsBySignalR()
    }

    const handleBalance = async () => {
        try {
            setIsLoadingBalance(true)

            const data = await getBalance(currentUser.url, currentUser.agencia, currentUser.conta)

            currentUser.setBalance(parseFloat(data.toString()) || 0)
            setIsLoadingBalance(false)
        } catch (error: any) {
            setIsLoadingBalance(false)
            const msgErroStatus = error.response ? error.response.status : '400' // 400 Bad Request
            const msgErroMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            console.error('useHome.handleBalance', msgErroStatus + ' - ' + msgErroMessage)
            const msgErro = msgErroStatus == '404' ? 'Balance not found.' : '(' + msgErroStatus + ') Failed to verify balance' // 404 Not Found
            Alert.alert(msgErro)
        }
    }

    const _getNotificationsBySignalR = async () => {
        try {
            const url = currentUser.url + CONSTANTE.URL_RECEBE_PAGTO

            const options = {
                headers: { 'content-type': 'application/json;charset=UTF-8' },
                transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
                logMessageContent: true,
                logger: signalR.LogLevel.None, // Trace // Information
            }

            const connection = new signalR.HubConnectionBuilder().withUrl(url, options).configureLogging(signalR.LogLevel.None).build()

            connection.on('ReceivePayment', (agencia, conta, documento, tipoPessoa, nome, valor, tipoOperacao) => {
                //_playSound()
                handleBalance()

                if (tipoOperacao.toString() == '0') {
                    // 0-Credito // 1-Debito
                    setIsActiveNotification(true)
                    const d = new Date()
                    handleNotification(parseFloat(valor), nome, `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
                }
            })

            connection.on('AtualizarSaldo', (agencia, conta, valor) => {
                if (parseInt(currentUser.agencia) == parseInt(agencia) && parseInt(currentUser.conta) == parseInt(conta)) currentUser.setBalance(parseFloat(valor))
            })

            connection
                .start()
                //.then(() => { console.log('Conectado!') })
                .catch((error) => console.error(error.toString()))

            connection.onclose(() => {
                // console.warn('connection.onclose')
                connection.start()
            })
        } catch (error: any) {
            console.error(error)
        }
    }

    const handleSendPayQrCode = () => router.navigate('/send_pay_qrcode')
    const handleRequestPayQrCode = () => router.navigate('/request_pay_qrcode')
    const handleRecipients = () => router.navigate('/recipients')
    const handleTransactionHistory = () => router.navigate('/transaction_history')
    const handlePersonalInfo = () => router.navigate('/personal_info')

    const handleNotification = (value: number, name: string, datetime: string) => {
        router.navigate({ pathname: '/notification_detail', params: { value: value, name: name, datetime: datetime } })
    }

    return {
        currentUser,
        imgPerson,
        isLoadingBalance,
        handleBalance,
        handlePersonalInfo,
        handleSendPayQrCode,
        handleRequestPayQrCode,
        handleRecipients,
        handleTransactionHistory,
    }
}

export default useHome
