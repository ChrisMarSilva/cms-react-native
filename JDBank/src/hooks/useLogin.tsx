import { useEffect, useState, useRef } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'
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

    let imglogo = (currentUser as any).url == CONSTANTE.PAYMENT_BANK_URL ? imglogoJD : imglogoJ3

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
        setTxtPassword('1231111111')
        setIsLoading(false)
    }

    const _loadCurrentUser = () => {
        setTxtUsername(currentUser.username)

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

            const data = await getLogin(currentUser.url, txtUsername, txtPassword)

            await HelperSessao.SetUrl(currentUser.url)
            await HelperSessao.SetUsername(data?.username)

            currentUser.setUsername(data?.username?.toString().trim() || '')
            currentUser.setName(data?.name?.toString().trim() || '')
            currentUser.setEmail(data?.email || '')
            currentUser.setPhone(data?.phone || '')
            currentUser.setSocialSecurity(data?.socialSecurity || '')
            currentUser.setBirth(data?.birth || '')
            currentUser.setCountry(data?.country || '')
            currentUser.setCitizen(data?.citizen || '')
            currentUser.setAddress(data?.address || '')
            currentUser.setBalance(0)

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
        Keyboard.dismiss()

        let url = ''
        let bank = ''

        if (currentUser.url == currentUser.urlPaymentBank) {
            url = currentUser.urlReceiveBank
            bank = currentUser.nameReceiveBank
            imglogo = imglogoJD
        } else {
            url = currentUser.urlPaymentBank
            bank = currentUser.namePaymentBank
            imglogo = imglogoJ3
        }

        await HelperSessao.SetUrl(url)
        await HelperSessao.SetBank(bank)

        currentUser.setUrl(url)
        currentUser.setBank(bank)
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
