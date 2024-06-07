import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
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
    const params = useLocalSearchParams()

    const imgPerson = currentUser.bank == currentUser.namePaymentBank ? imgBluePerson : imgRedPerson

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
            headerRight: () => (isActiveNotification ? <HeaderRight isVisible={true} onPress={handleNotification} icone={'notifications-on'} color={'#138a17'} /> : <HeaderRight isVisible={true} onPress={handleLogout} icone={'logout'} />),
        })
    }, [navigation, isActiveNotification])

    const _cleaData = () => {
        setNameRec('')
        setValueRec(0)
        setDatetimeRec('')
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

        console.log('')
        console.log('useHome._loadData')
        console.log('ispb:', currentUser.ispb, ', bank:', currentUser.bank, ', username:', currentUser.username, ', url:', currentUser.url)
        console.log('ispbReceive:', currentUser.ispbReceiveBank, ', bankReceive:', currentUser.nameReceiveBank, ', urlReceive:', currentUser.urlReceiveBank)
        console.log('ispbPayment:', currentUser.ispbPaymentBank, ', bankPayment:', currentUser.namePaymentBank, ', urlPayment:', currentUser.urlPaymentBank)
        console.log('-----------------------------')
        console.log('')
    }

    const _getBalance = async () => {
        try {
            console.log('')
            console.log('useHome._getBalance')

            console.log('agencia:', currentUser.agencia)
            console.log('conta:', currentUser.conta)

            const data = await getBalance(currentUser.url, currentUser.agencia, currentUser.conta)

            console.log('data:', data)
            console.log('-----------------------------')
            console.log('')

            currentUser.setBalance(parseFloat(data.toString()) || 0)
        } catch (error: any) {
            console.error(error)
            Alert.alert(error.message)
        }
    }

    const _getNotificationsBySignalR = async () => {
        try {
            const urlDefault = currentUser.url //  == currentUser.urlPaymentBank ? currentUser.urlReceiveBank : currentUser.urlPaymentBank
            const url = urlDefault + CONSTANTE.URL_RECEBE_PAGTO

            console.log('')
            console.log('useHome._getNotificationsBySignalR')
            console.log('urlAtual:', currentUser.url)
            console.log('urlDefault:', urlDefault)
            console.log('url:', url)
            console.log('-----------------------------')
            console.log('')

            const options = {
                headers: { 'content-type': 'application/json;charset=UTF-8' },
                transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
                logMessageContent: true,
                logger: signalR.LogLevel.Information, // Trace // Information
            }

            const connection = new signalR.HubConnectionBuilder().withUrl(url, options).configureLogging(signalR.LogLevel.Information).build()

            connection.on('ReceivePayment', (agencia, conta, documento, tipoPessoa, nome, valor) => {
                console.log('')
                console.log('useHome._getNotificationsBySignalR.ReceivePayment')
                console.log('agencia: ', agencia)
                console.log('conta: ', conta)
                console.log('documento: ', documento)
                console.log('tipoPessoa: ', tipoPessoa)
                console.log('nome: ', nome)
                console.log('valor: ', valor)
                console.log('balanceOld: ', currentUser.balance)
                console.log('-----------------------------')
                console.log('')

                const d = new Date()

                setDatetimeRec(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
                setNameRec(nome)
                setValueRec(parseFloat(valor))
                setIsActiveNotification(true)

                // router.setParams({
                //     personType: tipoPessoa,
                //     document: documento,
                //     agency: agencia,
                //     account: conta,
                //     name: nome,
                //     value: parseFloat(valor),
                //     datetime: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
                // })

                //_playSound()
                // currentUser.setBalance(currentUser.balance - parseFloat(valor))
                _getBalance()
            })

            connection.on('AtualizarSaldo', (agencia, conta, valor) => {
                console.log('')
                console.log('useHome._getNotificationsBySignalR.AtualizarSaldo')
                console.log('agencia: ', agencia)
                console.log('conta: ', conta)
                console.log('valor: ', valor)
                console.log('currentUser.agencia: ', currentUser.agencia)
                console.log('currentUser.conta: ', currentUser.conta)
                console.log('-----------------------------')
                console.log('')

                if (parseInt(currentUser.agencia) == parseInt(agencia) && parseInt(currentUser.conta) == parseInt(conta)) currentUser.setBalance(parseFloat(valor))
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

    const handleNotification = () => {
        setIsActiveNotification(false)

        console.log('')
        console.log('useHome.handleNotification')
        console.log('datetime: ', datetimeRec) // params.datetime
        console.log('name: ', nameRec) // params.name
        console.log('value: ', valueRec) // params.value
        console.log('-----------------------------')
        console.log('')

        if (nameRec.toString().trim() != '' && nameRec != 'undefined' && nameRec != undefined) {
            // params.name != '' && params.name != 'undefined' && params.name != undefined
            router.navigate({ pathname: '/notification_detail', params: { value: valueRec, name: nameRec, datetime: datetimeRec } })
            // value: params.value, name: params.name, datetime: params.datetime
        }
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
