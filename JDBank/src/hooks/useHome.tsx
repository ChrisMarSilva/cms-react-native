import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { Audio } from 'expo-av'
import FontAwesome from '@expo/vector-icons/FontAwesome'
//import * as signalR from '@microsoft/signalr'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'
import { getSaldo } from '@/src/services/saldoService'

const useHome = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [isVisiblePagRec, setIsVisiblePagRec] = useState(false)
    // const [tipoPessoaPagRec, setTipoPessoaPagRec] = useState('')
    // const [documentoPagRec, setDocumentoPagRec] = useState('')
    // const [agenciaPagRec, setAgenciaPagRec] = useState('')
    // const [contaPagRec, setContaPagRec] = useState('')
    // const [nomePagRec, setNomePagRec] = useState('')
    // const [valorPagRec, setValorPagRec] = useState(0)

    useEffect(() => {
        currentUser.setSaldo(0)
        setIsVisiblePagRec(false)

        _getDadosSessao()
        _getDadosSaldo()
        _getDadosRecebimentoSignalR()
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={currentUser.nomeBanco} />,
            headerRight: () => <HeaderRight isVisible={isVisiblePagRec} onPress={_onPressNotificacao} icone={'bell-o'} />,
        })
    }, [navigation, isVisiblePagRec])

    const _getDadosSessao = async () => {
        // currentUser.setUrl(await HelperSessao.GetUserURL())
        // currentUser.setChave(await HelperSessao.GetUserChave())
        // currentUser.setTipoPessoa(await HelperSessao.GetUserTipoPessoa())
        // currentUser.setNome(await HelperSessao.GetUserNome())
        // currentUser.setDocumento(await HelperSessao.GetUserDocumento())
        // currentUser.setCidade(await HelperSessao.GetUserCidade())
        // currentUser.setIspb(await HelperSessao.GetUserIspb())
        // currentUser.setNomeBanco(await HelperSessao.GetUserNomeBanco())
        // currentUser.setAgencia(await HelperSessao.GetUserAgencia())
        // currentUser.setTipoConta(await HelperSessao.GetUserTipoConta())
        // currentUser.setConta(await HelperSessao.GetUserConta())
        // currentUser.setIcon(await HelperSessao.GetUserIcon())
        // currentUser.setBgColor(await HelperSessao.GetUserBGColor())
    }

    const _getDadosSaldo = async () => {
        try {
            const data = await getSaldo(currentUser.url, currentUser.agencia, currentUser.conta)

            currentUser.setSaldo(HelperNumero.isNumber(data) ? parseFloat(data) : 0)
        } catch (error: any) {
            console.error(error)
            Alert.alert('Erro(Geral): ' + error.message)
        }
    }

    const _getDadosRecebimentoSignalR = async () => {
        setTimeout(() => {
            setIsVisiblePagRec(true)
        }, 2000)

        // let connection = new signalR.HubConnectionBuilder()
        // 	.withUrl(userURL + CONSTANTE.URL_RECEBE_PAGTO, { transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling, 'content-type': 'application/json' })
        // 	.configureLogging(signalR.LogLevel.None)
        // 	.build()
        // connection.on('AtualizarSaldo', (agencia, conta, valor) => {
        // 	if (currentUser.agencia == agencia && currentUser.conta == conta) urrentUser.setSaldo(HelperNumero.isNumber(valor) ? parseFloat(valor) : 0)
        // })
        // connection.on('ReceivePayment', (agencia, conta, documento, tipoPessoa, nome, valor) => {
        // 	_getTocarSom()
        // setIsVisiblePagRec(true)
        // setTipoPessoaPagRec(tipoPessoa)
        // setDocumentoPagRec(documento)
        // setAgenciaPagRec(agencia)
        // setContaPagRec(conta)
        // setNomePagRec(nome)
        // setValorPagRec(HelperNumero.isNumber(valor) ? parseFloat(valor) : 0)
        // 	_getDadosSaldo()
        // })
        // connection
        // 	.start()
        // 	.then(() => (this.initalAttemptForChat = true))
        // 	.catch((err) => (this.initalAttemptForChat = false))
        // connection.onclose(() => connection.start())
    }

    const _getTocarSom = async () => {
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
        } catch (error) {
            //sound.unloadAsync()
            alert('Erro ao tocar som: ' + error)
        }
    }

    const _onPressPagarTransferir = () => router.navigate('/pagar_transferir')
    const _onPressCobrarAlguem = () => router.navigate('/cobrar_alguem')
    const _onPressColocarDinheiro = () => router.navigate('/colocar_dinheiro')
    const _onPressMovimentacao = () => router.navigate('/movimentacao')
    const _onPressPerfil = () => router.navigate('/perfil')

    const _onPressNotificacao = () => {
        setIsVisiblePagRec(false)

        router.navigate({
            pathname: '/cobrar_alguem_recibo',
            params: {
                tipoPessoaPagRec: 'F',
                documentoPagRec: '111.111.111-11',
                agenciaPagRec: '8553',
                contaPagRec: '05245-8',
                nomePagRec: 'Fulando de Tal',
                valorPagRec: parseFloat('1234.55'),
            },
        })

        // router.navigate({
        // 	pathname: '/cobrar_alguem_recibo',
        // 	params: {
        // 		tipoPessoaPagRec: tipoPessoaPagRec,
        // 		documentoPagRec: documentoPagRec,
        // 		agenciaPagRec: agenciaPagRec,
        // 		contaPagRec: contaPagRec,
        // 		nomePagRec: nomePagRec,
        // 		valorPagRec: HelperNumero.isNumber(valorPagRec || '0,00') ? parseFloat(valorPagRec || '0,00') : 0,
        // 	},
        // })
    }

    return {
        currentUser,
        _onPressPerfil,
        _onPressPagarTransferir,
        _onPressCobrarAlguem,
        _onPressColocarDinheiro,
        _onPressMovimentacao,
    }
}

export default useHome
