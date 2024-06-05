import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import * as signalR from '@microsoft/signalr'
import { Audio } from 'expo-av'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'
import { getBalance } from '@/src/services/balanceService'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

const useHome = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    const [isActiveNotification, setIsActiveNotification] = useState<boolean>(false)
    const imgPerson = (currentUser as any).url == CONSTANTE.PAYMENT_BANK_URL ? imgBluePerson : imgRedPerson

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
            headerRight: () => (isActiveNotification ? <HeaderRight isVisible={true} onPress={handleNotification} icone={'notifications-on'} color={'#138a17'} /> : <HeaderRight isVisible={true} onPress={handleLogout} icone={'logout'} />),
        })
    }, [navigation, isActiveNotification])

    const _cleaData = () => {
        setIsActiveNotification(false)

        // router.setParams({
        //     //personType: tipoPessoa,
        //     //document: documento,
        //     //agency: agencia,
        //     //account: conta,
        //     name: '',
        //     value: 0,
        //     datetime: '',
        // })
    }

    const _loadData = () => {
        _getBalance()
        _getNotificationsBySignalR()
    }

    const _getBalance = async () => {
        try {
            const data = await getBalance(currentUser.url, currentUser.username)

            currentUser.setBalance(parseFloat(data) || 0)
        } catch (error: any) {
            console.error(error)
            Alert.alert(error.message)
        }
    }

    const _getNotificationsBySignalR = async () => {
        try {
            const url = currentUser.url + CONSTANTE.URL_RECEBE_PAGTO // 'https://89e6-67-159-235-142.ngrok-free.app/hubs/receive/payment' // 'https://192.168.1.107:41557/chat' // 'https://localhost:41557/chat' //
            console.log('url:', url)

            const options = {
                headers: { 'content-type': 'application/json;charset=UTF-8' },
                transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
                logMessageContent: true,
                logger: signalR.LogLevel.Trace,
            }

            const connection = new signalR.HubConnectionBuilder().withUrl(url, options).configureLogging(signalR.LogLevel.Trace).build()

            connection.on('ReceivePayment', (agencia, conta, documento, tipoPessoa, nome, valor) => {
                console.log('connection.ReceivePayment - agencia: ', agencia, ' - conta: ', conta, ' - documento: ', documento, ' - tipoPessoa: ', tipoPessoa, ' - nome: ', nome, ' - valor: ', valor)
                setIsActiveNotification(true)

                const d = new Date()
                router.setParams({
                    //personType: tipoPessoa,
                    //document: documento,
                    //agency: agencia,
                    //account: conta,
                    name: nome,
                    value: parseFloat(valor).toString() || '0.0',
                    datetime: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
                })

                _playSound()
                currentUser.setBalance(currentUser.balance - (parseFloat(valor) || 0)) //_getBalance()
            })

            connection.on('AtualizarSaldo', (agencia, conta, valor) => {
                console.log('AtualizarSaldo - agencia: ', agencia, ' - conta: ', conta, ' - valor: ', valor)
                // if ((props.navigation.getParam('userAgencia', '') == agencia) && ( props.navigation.getParam('userConta', '') == conta))
                currentUser.setBalance(parseFloat(valor) || 0)
            })

            connection
                .start()
                .then(() => console.log('Conectado!'))
                .catch((error) => console.error(error.toString()))

            connection.onclose(() => {
                console.warn('connection.onclose')
                connection.start()
            })
        } catch (error: any) {
            console.error(error)
        }
    }

    const _playSound = async () => {
        try {
            const source = require('@/src/assets/sounds/02.mp3')

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: 1, // Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: 2, // Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            })

            const initialStatus = {
                shouldPlay: true, // Play by default
                rate: 1.0, // Control the speed
                shouldCorrectPitch: true, // Correct the pitch
                volume: 1.0, // Control the Volume
                isMuted: false, // mute the Audio
            }

            const { sound } = await Audio.Sound.createAsync(source, initialStatus)

            await sound.playAsync() //  Play the Music
        } catch (error: any) {
            // sound.unloadAsync()
            // Alert.alert(error)
            console.log(error)
        }
    }

    const handleSendPayQrCode = () => router.navigate('/send_pay_qrcode')
    const handleRequestPayQrCode = () => router.navigate('/request_pay_qrcode')
    const handleRecipients = () => router.navigate('/recipients')
    const handleTransactionHistory = () => router.navigate('/transaction_history')
    const handlePersonalInfo = () => router.navigate('/personal_info')
    const handleLogout = () => router.replace('/login')
    const handleNotification = () => {
        setIsActiveNotification(false)
        router.navigate({ pathname: '/notification_detail', params: { value: params.value, name: params.name, datetime: params.datetime } })
        // router.navigate('/notification_detail') // notification
    }

    return {
        currentUser,
        imgPerson,
        handlePersonalInfo,
        handleSendPayQrCode,
        handleRequestPayQrCode,
        handleRecipients,
        handleTransactionHistory,
    }
}

export default useHome
