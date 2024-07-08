import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'
import * as signalR from '@microsoft/signalr'
//import { Audio } from 'expo-av'

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

    const [nameRec, setNameRec] = useState<string>('')
    const [valueRec, setValueRec] = useState<number>(0)
    const [datetimeRec, setDatetimeRec] = useState<string>('')
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
            //headerRight: () => <HeaderRight isVisible={true} onPress={handleLogout} icone={'logout'} />,
            headerRight: () => (isActiveNotification ? <HeaderRight isVisible={true} onPress={handleNotification} icone={'notifications-on'} color={'#138a17'} /> : null),
        })
    }, [navigation])

    const _cleaData = () => {
        setNameRec('')
        setValueRec(0)
        setDatetimeRec('')
        setIsActiveNotification(false)
    }

    const _loadData = () => {
        //console.log('useHome._loadData - ispb:', currentUser.ispb, ', bank:', currentUser.bank, ', username:', currentUser.username, ', url:', currentUser.url)

        _getBalance()
        _getNotificationsBySignalR()
    }

    const _getBalance = async () => {
        try {
            //console.log('useHome._getBalance - agencia:', currentUser.agencia)
            //console.log('useHome._getBalance - conta:', currentUser.conta)

            const data = await getBalance(currentUser.url, currentUser.agencia, currentUser.conta)
            //console.log('useHome._getBalance - data:', data)

            currentUser.setBalance(parseFloat(data.toString()) || 0)
        } catch (error: any) {
            console.error(error)
            Alert.alert(error.message)
        }
    }

    const _getNotificationsBySignalR = async () => {
        try {
            const url = currentUser.url + CONSTANTE.URL_RECEBE_PAGTO
            //console.log('useHome._getNotificationsBySignalR - url:', url)

            const options = {
                headers: { 'content-type': 'application/json;charset=UTF-8' },
                transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
                logMessageContent: true,
                logger: signalR.LogLevel.None, // Trace // Information
            }

            const connection = new signalR.HubConnectionBuilder().withUrl(url, options).configureLogging(signalR.LogLevel.None).build()

            connection.on('ReceivePayment', (agencia, conta, documento, tipoPessoa, nome, valor, tipoOperacao) => {
                // console.log('useHome._getNotificationsBySignalR.ReceivePayment - agencia: ', agencia, ', conta: ', conta, ', documento: ', documento, ', tipoPessoa: ', tipoPessoa, ', nome: ', nome, ', valor: ', valor, ', balanceOld: ', currentUser.balance)

                //_playSound()
                _getBalance()

                // setTimeout(() => {  }, 900)
                if (tipoOperacao.toString() == '0') {
                    // 0-Credito // 1-Debito

                    const d = new Date()
                    setDatetimeRec(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
                    setNameRec(nome)
                    setValueRec(parseFloat(valor))
                    setIsActiveNotification(true)

                    handleNotification(parseFloat(valor), nome, `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
                }
            })

            connection.on('AtualizarSaldo', (agencia, conta, valor) => {
                //console.log('useHome._getNotificationsBySignalR.AtualizarSaldo - agencia: ', agencia, ', conta: ', conta, ', valor: ', valor, ', currentUser.agencia: ', currentUser.agencia, ', currentUser.conta: ', currentUser.conta)
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

    // const _playSound = async () => {
    //     try {
    //         const source = require('@/src/assets/sounds/02.mp3')

    //         await Audio.setAudioModeAsync({
    //             allowsRecordingIOS: false,
    //             interruptionModeIOS: 1, // Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //             playsInSilentModeIOS: true,
    //             interruptionModeAndroid: 2, // Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    //             shouldDuckAndroid: true,
    //             playThroughEarpieceAndroid: false,
    //         })

    //         const initialStatus = {
    //             shouldPlay: true, // Play by default
    //             rate: 1.0, // Control the speed
    //             shouldCorrectPitch: true, // Correct the pitch
    //             volume: 1.0, // Control the Volume
    //             isMuted: false, // mute the Audio
    //         }

    //         const { sound } = await Audio.Sound.createAsync(source, initialStatus)

    //         await sound.playAsync() //  Play the Music
    //     } catch (error: any) {
    //         // sound.unloadAsync()
    //         // Alert.alert(error)
    //         console.log(error)
    //     }
    // }

    const handleSendPayQrCode = () => router.navigate('/send_pay_qrcode')
    const handleRequestPayQrCode = () => router.navigate('/request_pay_qrcode')
    const handleRecipients = () => router.navigate('/recipients')
    const handleTransactionHistory = () => router.navigate('/transaction_history')
    const handlePersonalInfo = () => router.navigate('/personal_info')
    const handleLogout = () => router.replace('/login')

    const handleNotification = (value: number, name: string, datetime: string) => {
        // console.log('useHome.handleNotification - datetime: ', datetimeRec, ', name: ', nameRec, ', value: ', valueRec)

        //if (nameRec.toString().trim() != '' && nameRec != 'undefined' && nameRec != undefined) {
        router.navigate({ pathname: '/notification_detail', params: { value: value, name: name, datetime: datetime } })
        //}

        //setIsActiveNotification(false)
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
