import { useEffect, useState } from 'react'
import { router } from 'expo-router'
//import * as Updates from 'expo-updates'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'

const useSplash = () => {
    const currentUser = useCurrentUser()

    const [txtStatusAtualizacao, setTxtStatusAtualizacao] = useState<string>('')

    useEffect(() => {
        _clearCurrentUser()
        _loadSessionUser()

        // return () => {  _clearData() } //setTimeout(() => { //}, 3000)
    }, [])

    const _clearCurrentUser = async () => {
        currentUser.setIspbReceiveBank(0)
        currentUser.setNameReceiveBank('')
        currentUser.setUrlReceiveBank('')
        currentUser.setIspbPaymentBank(0)
        currentUser.setNamePaymentBank('')
        currentUser.setUrlPaymentBank('')
        currentUser.setUrl('')
        currentUser.setUsername('')
        currentUser.setName('')
        currentUser.setTipoPessoa(0)
        currentUser.setDocumento(0)
        currentUser.setEmail('')
        currentUser.setPhone('')
        currentUser.setSocialSecurity('')
        currentUser.setBirth('')
        currentUser.setCountry('')
        currentUser.setCitizen('')
        currentUser.setAddress('')
        currentUser.setIspb(0)
        currentUser.setBank('')
        currentUser.setAgencia('')
        currentUser.setConta('')
        currentUser.setBalance(0)
    }

    const _loadSessionUser = async () => {
        //await _verificarAtualizacao()

        const url = await HelperSessao.GetUrl()
        const bank = await HelperSessao.GetBank()
        const ispb = await HelperSessao.GetIspb()
        const username = await HelperSessao.GetUsername()
        const ispbReceive = await HelperSessao.GetReceiveIspb()
        const bankReceive = await HelperSessao.GetReceiveBank()
        const urlReceive = await HelperSessao.GetReceiveUrl()
        const ispbPayment = await HelperSessao.GetPaymentIspb()
        const bankPayment = await HelperSessao.GetPaymentBank()
        const urlPayment = await HelperSessao.GetPaymentUrl()

        console.log('')
        console.log('useSplash._loadSessionUser')
        console.log('ispb:', ispb, ', bank:', bank, ', username:', username, ', url:', url)
        console.log('ispbReceive:', ispbReceive, ', bankReceive:', bankReceive, ', urlReceive:', urlReceive)
        console.log('ispbPayment:', ispbPayment, ', bankPayment:', bankPayment, ', urlPayment:', urlPayment)
        console.log('-----------------------------')
        console.log('')

        currentUser.setUrl(url.toString().trim() || '')
        currentUser.setIspb(parseInt(ispb) || 0)
        currentUser.setBank(bank.toString().trim() || '')
        currentUser.setUsername(username || '')
        currentUser.setIspbReceiveBank(parseInt(ispbReceive) || 0)
        currentUser.setNameReceiveBank(bankReceive.toString().trim() || '')
        currentUser.setUrlReceiveBank(urlReceive.toString().trim() || '')
        currentUser.setIspbPaymentBank(parseInt(ispbPayment) || 0)
        currentUser.setNamePaymentBank(bankPayment.toString().trim() || '')
        currentUser.setUrlPaymentBank(urlPayment.toString().trim() || '')

        router.replace('/login') // login // page1 - para testes
    }

    // const _verificarAtualizacao = async () => {
    //     try {
    //         setTxtStatusAtualizacao('')

    //         if (__DEV__) {
    //             console.log('Modo de desenvolvimento, ignorando a verificação de atualizações')
    //             setTxtStatusAtualizacao('Development mode, skipping check for updates...')
    //             return // NAO PODE TER ATUALIZAÇOES EM MODE DE DESENVOLVIMENTO
    //         }

    //         console.log('Verificando atualizações')
    //         setTxtStatusAtualizacao('Checking for updates...')
    //         const update = await Updates.checkForUpdateAsync()

    //         if (!update.isAvailable) {
    //             console.log('Nenhuma atualização disponível')
    //             setTxtStatusAtualizacao('No updates available!')
    //             return
    //         }

    //         console.log('Nova atualização disponível, baixando...')
    //         setTxtStatusAtualizacao('New update available, downloading...')
    //         await Updates.fetchUpdateAsync()

    //         console.log('Atualização baixada, reiniciando o aplicativo')
    //         setTxtStatusAtualizacao('Update downloaded, restarting app...')
    //         await Updates.reloadAsync()

    //         console.log('App restarted!')
    //     } catch (error: any) {
    //         console.error(error)
    //         setTxtStatusAtualizacao(error)
    //     }
    // }

    return {
        txtStatusAtualizacao,
    }
}

export default useSplash
