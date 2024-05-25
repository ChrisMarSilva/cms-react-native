import { useState, useEffect } from 'react'
import { Alert, Keyboard } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { payQrCode } from '@/src/services/qrcodeService'
import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useSendPayQrCodeView = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    //const animation = useRef(null)
    //const [isLoadingClient, setIsLoadingClient] = useState<boolean>(true)
    const [isLoadingPay, setIsLoadingPay] = useState<boolean>(false)
    const [value, setValue] = useState<number>(0)
    const [name, setName] = useState<string>('')

    useEffect(() => {
        _clearData()
        _loadClient() // setTimeout(() => { }, 200)

        return () => {
            _clearData()
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            //headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Review & Send'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={handleHome} icone={'close'} />,
        })
    }, [navigation])

    const _clearData = () => {
        Keyboard.dismiss()
        //setIsLoadingClient(true)
        setIsLoadingPay(false)
        setValue(HelperNumero.convertToCurrency(params.value?.toString() || '0'))
        setName(params.name?.toString() || '')
    }

    const _loadClient = async () => {
        // try {
        //     setIsLoadingClient(true)
        //     const data = await getCliente(currentUser.url, currentUser.username)
        //     setName(data?.name)
        //     router.setParams({ name: data?.name || ''})
        //     setIsLoadingClient(false)
        // } catch (error: any) {
        //     setIsLoadingClient(false)
        //     Alert.alert(error.message)
        //     router.navigate('/send_pay_qrcode')
        // }
    }

    const handleHome = () => router.navigate({ pathname: '/home', params: { value: '0', name: '' } })

    const handleSchedule = () => {
        Keyboard.dismiss()
        Alert.alert('Scheduled payment!')
        router.navigate({ pathname: '/home', params: { value: '0', name: '' } })
    }

    const handleSend = async () => {
        try {
            Keyboard.dismiss()
            setIsLoadingPay(true)

            if (value <= 0) {
                Alert.alert('Payment Amount not Informed!')
                setIsLoadingPay(false)
                return false
            }

            await payQrCode(currentUser.url, currentUser.username, value, name)

            setIsLoadingPay(false)
            currentUser.setBalance(currentUser.balance - value)

            router.navigate({ pathname: '/send_pay_qrcode_done', params: { value: value, name: name } })
        } catch (error: any) {
            setIsLoadingPay(false)
            Alert.alert(error.message)
        }
    }

    return {
        isLoadingPay,
        name,
        value,
        handleHome,
        handleSend,
        handleSchedule,
    }
}

export default useSendPayQrCodeView
