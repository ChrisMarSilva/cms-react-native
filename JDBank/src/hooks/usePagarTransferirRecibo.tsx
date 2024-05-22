import { useRef, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { Audio } from 'expo-av'

import useCurrentUser from '@/src/hooks/useCurrentUser'
//import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const usePagarTransferirRecibo = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const animation = useRef(null)

    const [chave, setChave] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [banco, setBanco] = useState<string>('')
    const [agencia, setAgencia] = useState<string>('')
    const [conta, setConta] = useState<string>('')
    const [valor, setValor] = useState<string>('0')

    useEffect(() => {
        _getTocarSom()

        setChave(params.chaveRecebedor?.toString() || '')
        setNome(params.nomeRecebedor?.toString() || '')
        setBanco(params.nomeBancoRecebedor?.toString() || '')
        setAgencia(params.agenciaRecebedor?.toString() || '')
        setConta(params.contaRecebedor?.toString() || '')
        setValor(params.valorRecebedor?.toString() || '0')
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Pagamento Feito!'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={_OnPressVerComprovante} icone={'close'} />,
        })
    }, [navigation])

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
            // sound.unloadAsync()
            Alert.alert('Erro ao tocar som: ' + error)
        }
    }

    const _OnPressVerComprovante = () => {
        currentUser.setSaldo(currentUser.saldo - parseFloat(valor))
        router.replace('/home')
    }

    return {
        currentUser,
        animation,
        chave,
        nome,
        banco,
        agencia,
        conta,
        valor,
        _OnPressVerComprovante,
    }
}

export default usePagarTransferirRecibo
