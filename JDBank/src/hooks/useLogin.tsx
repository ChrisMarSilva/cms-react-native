import { useEffect, useState, useRef } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
import { getLogin } from '@/src/services/loginService'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

const useLogin = () => {
    const currentUser = useCurrentUser()

    const [txtUsername, setTxtUsername] = useState<string>('')
    const [txtPassword, setTxtPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isEnabledFaceID, setIsEnabledFaceID] = useState<boolean>(false)

    const refTxtUsername = useRef(null)
    const refTxtPassword = useRef(null)

    let imglogo = currentUser.bank == currentUser.namePaymentBank ? imglogoJD : imglogoJ3

    useEffect(() => {
        _clearCurrentUser()
        _loadCurrentUser()

        return () => {
            _clearCurrentUser()
        }
    }, [])

    const _clearCurrentUser = () => {
        Keyboard.dismiss()

        setTxtUsername('')
        setTxtPassword('')
        setIsLoading(false)
    }

    const _loadCurrentUser = () => {
        setTxtUsername(currentUser.username)
        setTxtPassword('123')

        console.log('')
        console.log('useLogin._loadCurrentUser')
        console.log('ispb:', currentUser.ispb, ', bank:', currentUser.bank, ', username:', currentUser.username, ', url:', currentUser.url)
        console.log('ispbReceive:', currentUser.ispbReceiveBank, ', bankReceive:', currentUser.nameReceiveBank, ', urlReceive:', currentUser.urlReceiveBank)
        console.log('ispbPayment:', currentUser.ispbPaymentBank, ', bankPayment:', currentUser.namePaymentBank, ', urlPayment:', currentUser.urlPaymentBank)
        console.log('-----------------------------')
        console.log('')

        if (currentUser.username == '') refTxtUsername.current.focus()
        //if (refTxtUsername && refTxtUsername.current)  refTxtUsername.current.focus()
        if (currentUser.username != '') refTxtPassword.current.focus()
    }

    const toggleSwitch = () => setIsEnabledFaceID((previousState) => !previousState)

    const handleLogin = async () => {
        try {
            Keyboard.dismiss()
            setIsLoading(true)

            if (txtUsername == '' || txtPassword == '') {
                setIsLoading(false)
                if (txtUsername == '') {
                    Alert.alert('Enter the Username!')
                    refTxtUsername.current.focus()
                } else if (txtPassword == '') {
                    Alert.alert('Enter the Password!')
                    refTxtPassword.current.focus()
                }
                return
            }

            const data = await getLogin(currentUser.url, txtUsername)

            await HelperSessao.SetUrl(currentUser.url)
            await HelperSessao.SetUsername(data?.username)

            currentUser.setUsername(data?.username?.toString().trim() || '')
            currentUser.setName(data?.name?.toString().trim() || '')
            currentUser.setTipoPessoa(parseInt(data?.tipoPessoa || '0'))
            currentUser.setDocumento(parseInt(data?.documento || '0'))
            currentUser.setEmail(data?.email || '')
            currentUser.setPhone(data?.phone || '')
            currentUser.setSocialSecurity(data?.socialSecurity || '')
            currentUser.setBirth(data?.birth || '')
            currentUser.setCountry(data?.country || '')
            currentUser.setCitizen(data?.citizen || '')
            currentUser.setAddress(data?.address || '')
            currentUser.setAgencia(data?.agencia || '')
            currentUser.setConta(data?.conta || '')
            currentUser.setBalance(0)
            // data?.ispb
            // data?.nomeBanco
            // data?.tipoConta

            setIsLoading(false)
            router.replace('/home')
        } catch (error: any) {
            setIsLoading(false)
            Alert.alert(error?.message)
        }
    }

    const handleEnroll = () => router.navigate('/enrollment')
    const handleConfig = () => router.navigate('/config')

    const handleChangeBank = async () => {
        let url = ''
        let ispb = 0
        let bank = ''
        let username = 'client'

        if (currentUser.bank == currentUser.namePaymentBank) {
            imglogo = imglogoJD
            url = currentUser.urlReceiveBank.toString().trim()
            ispb = currentUser.ispbReceiveBank
            bank = currentUser.nameReceiveBank.toString().trim()
            //username = 'clientrec1'
        } else {
            imglogo = imglogoJ3
            url = currentUser.urlPaymentBank.toString().trim()
            ispb = currentUser.ispbPaymentBank
            bank = currentUser.namePaymentBank.toString().trim()
            //username = 'clientpay1'
        }

        console.log('')
        console.log('useLogin.handleChangeBank')
        console.log('ispb:', ispb, ', bank:', bank, ', username:', username, ', url:', url)
        console.log('-----------------------------')
        console.log('')

        setTxtUsername(username)

        await HelperSessao.SetUrl(url)
        await HelperSessao.SetIspb(ispb.toString())
        await HelperSessao.SetBank(bank)

        currentUser.setUrl(url)
        currentUser.setIspb(ispb)
        currentUser.setBank(bank)

        Keyboard.dismiss()
    }

    return {
        imglogo,
        txtUsername,
        setTxtUsername,
        txtPassword,
        setTxtPassword,
        isLoading,
        isEnabledFaceID,
        refTxtUsername,
        refTxtPassword,
        toggleSwitch,
        handleLogin,
        handleEnroll,
        handleConfig,
        handleChangeBank,
    }
}

export default useLogin
