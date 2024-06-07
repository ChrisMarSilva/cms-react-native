import { useRef, useEffect, useState } from 'react'
//import { Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import LottieView from 'lottie-react-native'
//import { Audio } from 'expo-av'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useSendPayQrCodeDone = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const animation = useRef<LottieView>(null)

    const [value, setValue] = useState<number>(0)
    const [name, setName] = useState<string>('')

    useEffect(() => {
        _clearData() //  setTimeout(() => {}, 200)
        //_playSound()

        return () => {
            _clearData()
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            //headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Payment sent'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={handleHome} icone={'close'} />,
        })
    }, [navigation])

    const _clearData = () => {
        animation.current?.reset()
        animation.current?.play() // animation.current?.play(30, 120)

        setValue(HelperNumero.convertToCurrency(params.value?.toString() || '0'))
        setName(params.name?.toString() || '')
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

    const handleHome = () => router.navigate({ pathname: '/home', params: { value: '0', name: '' } })

    const handleSeeReceipt = () => {
        // currentUser.setBalance(currentUser.balance - value)
        router.navigate({ pathname: '/home', params: { value: '0', name: '' } })
    }

    return {
        animation,
        name,
        value,
        handleSeeReceipt,
    }
}

export default useSendPayQrCodeDone
