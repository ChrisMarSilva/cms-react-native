import { useEffect, useState } from 'react'
import { router } from 'expo-router'
//import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Updates from 'expo-updates'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'

const useSplash = () => {
    const currentUser = useCurrentUser()

    const [txtStatusAtualizacao, setTxtStatusAtualizacao] = useState<string>('')

    useEffect(() => {
        _clearCurrentUser()
        _loadSessionUser() //setTimeout(() => { //}, 3000)
        _verificarAtualizacao()
    }, [])

    const _clearCurrentUser = async () => {
        currentUser.setUrl('')
        currentUser.setUsername('')
        currentUser.setName('')
        currentUser.setEmail('')
        currentUser.setPhone('')
        currentUser.setSocialSecurity('')
        currentUser.setBirth('')
        currentUser.setCountry('')
        currentUser.setCitizen('')
        currentUser.setAddress('')
        currentUser.setBank('')
        currentUser.setBalance(0)
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

    const _verificarAtualizacao = async () => {
        try {
            console.log('Verificando atualizações...')
            if (__DEV__) {
                // NAO PODE TER ATUALIZAÇOES EM MODE DE DESENVOLVIMENTO

                console.log('saiu')
                return
            }
            console.log('entrou')

            // setTxtStatusAtualizacao("Verificando atualizações...")
            const update = await Updates.checkForUpdateAsync()

            if (!update.isAvailable) return // setTxtStatusAtualizacao("Você já está com a versão mais atual!!!")

            setTxtStatusAtualizacao('NOVA VERSÃO DISPONÍVEL')
            await Updates.fetchUpdateAsync() //setTxtStatusAtualizacao("Baixando nova versão...")
            await Updates.reloadAsync() // setTxtStatusAtualizacao("Reiniciando aplicativo...")

            //<Text style={{ fontSize: 12, color: colors.cinza_escuro, }}>{txtStatusAtualizacao}  </Text>
        } catch (error: any) {
            setTxtStatusAtualizacao(error) // alert(`Error fetching latest Expo update: ${error}`)
        }
    }

    return {
        currentUser,
    }
}

export default useSplash
