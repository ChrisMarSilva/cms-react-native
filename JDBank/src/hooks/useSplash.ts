import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import * as Updates from 'expo-updates'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'

const useSplash = () => {
    const currentUser = useCurrentUser()

    const [txtStatusAtualizacao, setTxtStatusAtualizacao] = useState<string>('')

    useEffect(() => {
        _clearCurrentUser()
        _loadSessionUser()
        _verificarAtualizacao()

        // return () => {  _clearData() } //setTimeout(() => { //}, 3000)
    }, [])

    const _clearCurrentUser = async () => {
        currentUser.setNameReceiveBank('')
        currentUser.setUrlReceiveBank('')
        currentUser.setNamePaymentBank('')
        currentUser.setUrlPaymentBank('')
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
        const url = await HelperSessao.GetUrl()
        const bank = await HelperSessao.GetBank()
        const username = await HelperSessao.GetUsername()
        const bankReceive = await HelperSessao.GetReceiveBank()
        const urlReceive = await HelperSessao.GetReceiveUrl()
        const bankPayment = await HelperSessao.GetPaymentBank()
        const urlPayment = await HelperSessao.GetPaymentUrl()

        currentUser.setUrl(url || '')
        currentUser.setBank(bank || '')
        currentUser.setUsername(username || '')
        currentUser.setNameReceiveBank(bankReceive || '')
        currentUser.setUrlReceiveBank(urlReceive || '')
        currentUser.setNamePaymentBank(bankPayment || '')
        currentUser.setUrlPaymentBank(urlPayment || '')

        router.replace('/login') // login // page1 - para testes
    }

    const _verificarAtualizacao = async () => {
        try {
            setTxtStatusAtualizacao('')

            if (__DEV__) {
                console.log('Modo de desenvolvimento, ignorando a verificação de atualizações')
                setTxtStatusAtualizacao('Development mode, skipping check for updates...')
                return // NAO PODE TER ATUALIZAÇOES EM MODE DE DESENVOLVIMENTO
            }

            console.log('Verificando atualizações')
            setTxtStatusAtualizacao('Checking for updates...')
            const update = await Updates.checkForUpdateAsync()

            if (!update.isAvailable) {
                console.log('Nenhuma atualização disponível')
                setTxtStatusAtualizacao('No updates available!')
                return
            }

            console.log('Nova atualização disponível, baixando...')
            setTxtStatusAtualizacao('New update available, downloading...')
            await Updates.fetchUpdateAsync()

            console.log('Atualização baixada, reiniciando o aplicativo')
            setTxtStatusAtualizacao('Update downloaded, restarting app...')
            await Updates.reloadAsync()

            console.log('App restarted!')
        } catch (error: any) {
            console.error(error)
            setTxtStatusAtualizacao(error)
        }
    }

    return {
        txtStatusAtualizacao,
    }
}

export default useSplash
