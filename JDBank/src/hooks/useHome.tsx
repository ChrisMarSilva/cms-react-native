import { useEffect } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'
import { getBalance } from '@/src/services/balanceService'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

const useHome = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    let imgPerson = (currentUser as any).url == CONSTANTE.PAYMENT_BANK_URL ? imgBluePerson : imgRedPerson

    useEffect(() => {
        _getBalance()
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={currentUser.bank} />,
        })
    }, [navigation])

    const _getBalance = async () => {
        try {
            const data = await getBalance(currentUser.url, currentUser.username)

            currentUser.setBalance(HelperNumero.isNumber(data) ? parseFloat(data) : 0)
        } catch (error: any) {
            console.error(error)
            Alert.alert(error.message)
        }
    }

    const handleSend = () => router.navigate('/pagar_transferir')
    const handleRequestForPay = () => router.navigate('/cobrar_alguem')
    const handleRecipients = () => router.navigate('/colocar_dinheiro')
    const handleTransactionHistory = () => router.navigate('/movimentacao')
    const handlePerfil = () => router.navigate('/perfil')

    return {
        currentUser,
        imgPerson,
        handlePerfil,
        handleSend,
        handleRequestForPay,
        handleRecipients,
        handleTransactionHistory,
    }
}

export default useHome
