import { useEffect } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'

const useSplash = () => {
    const currentUser = useCurrentUser()

    useEffect(() => {
        _clearCurrentUser()
        _loadSessionUser() //setTimeout(() => { //}, 3000)
    }, [])

    const _clearCurrentUser = async () => {
        currentUser.setUrl('')
        currentUser.setUsername('')
        currentUser.setBank('')
    }

    const _loadSessionUser = async () => {
        // AsyncStorage.getItem(CONSTANTE.SESSAO_URL).then((value) => currentUser.setUrl(value || CONSTANTE.PAYMENT_BANK_URL))
        // AsyncStorage.getItem(CONSTANTE.SESSAO_USERNAME).then((value) => currentUser.setUsername(value || ''))
        // AsyncStorage.getItem(CONSTANTE.SESSAO_BANK).then((value) => currentUser.setBank(value || CONSTANTE.PAYMENT_BANK_NAME))

        const url = await HelperSessao.GetUrl()
        const username = await HelperSessao.GetUsername()
        const bank = await HelperSessao.GetBank()

        currentUser.setUrl(url || CONSTANTE.PAYMENT_BANK_URL)
        currentUser.setUsername(username || '')
        currentUser.setBank(bank || CONSTANTE.PAYMENT_BANK_NAME)

        router.replace('/login') // login // page1 - para testes
    }

    return {
        currentUser,
    }
}

export default useSplash
