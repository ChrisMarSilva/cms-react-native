import { useEffect } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'
import { getBalance } from '@/src/services/balanceService'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

const useHome = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const imgPerson = (currentUser as any).url == CONSTANTE.PAYMENT_BANK_URL ? imgBluePerson : imgRedPerson

    useEffect(() => {
        _getBalance()

        // return () => {
        //     _clearData()
        // }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={currentUser.bank} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={handleLogout} icone={'logout'} />,
        })
    }, [navigation])

    const _getBalance = async () => {
        try {
            const data = await getBalance(currentUser.url, currentUser.username)

            currentUser.setBalance(parseFloat(data) || 0)
        } catch (error: any) {
            console.error(error)
            Alert.alert(error.message)
        }
    }

    const handleSendPayQrCode = () => router.navigate('/send_pay_qrcode')
    const handleRequestPayQrCode = () => router.navigate('/request_pay_qrcode')
    const handleRecipients = () => router.navigate('/recipients')
    const handleTransactionHistory = () => router.navigate('/transaction_history')
    const handlePersonalInfo = () => router.navigate('/personal_info')
    const handleLogout = () => router.replace('/login')

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
