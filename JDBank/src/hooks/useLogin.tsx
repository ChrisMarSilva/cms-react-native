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
        setTxtPassword('123')
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

            // currentUser.setUrl(currentUser.url)
            currentUser.setUsername(data?.username || '')
            currentUser.setName(data?.name || '')
            currentUser.setEmail(data?.email || '')
            currentUser.setPhone(data?.phone || '')
            currentUser.setSocialSecurity(data?.socialSecurity || '')
            currentUser.setBirth(data?.birth || '')
            currentUser.setCountry(data?.country || '')
            currentUser.setCitizen(data?.citizen || '')
            currentUser.setAddress(data?.address || '')
            // currentUser.setBank(currentUser.bank)
            currentUser.setBalance(0)

            setIsLoading(false)
            router.replace('/home')
        } catch (error: any) {
            setIsLoading(false)
            Alert.alert(error?.message)
        }
    }

    const handleEnroll = () => router.navigate('/enrollment')

    const handleChangeBank = async () => {
        Keyboard.dismiss()

        let url = ''
        let bank = ''

        if ((currentUser as any).url == CONSTANTE.PAYMENT_BANK_URL) {
            url = CONSTANTE.RECEIVE_BANK_URL
            bank = CONSTANTE.RECEIVE_BANK_NAME
            imglogo = imglogoJD
        } else {
            url = CONSTANTE.PAYMENT_BANK_URL
            bank = CONSTANTE.PAYMENT_BANK_NAME
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
        handleChangeBank,
    }
}

export default useLogin
