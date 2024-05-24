import { useEffect, useState, useContext } from 'react'
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

    let imglogo = (currentUser as any).url == CONSTANTE.PAYMENT_BANK_URL ? imglogoJD : imglogoJ3

    useEffect(() => {
        _loadCurrentUser()
    }, [])

    const _loadCurrentUser = async () => {
        setTxtUsername(currentUser.username)
        setTxtPassword('')
        setIsLoading(false)
    }

    const toggleSwitch = () => setIsEnabledFaceID((previousState) => !previousState)

    const handleLogin = async () => {
        try {
            Keyboard.dismiss()
            setIsLoading(true)

            if (txtUsername == '') {
                setIsLoading(false)
                Alert.alert('Enter the username!')
                return
            }

            if (txtPassword == '') {
                setIsLoading(false)
                Alert.alert('Enter the password!')
                return
            }

            const data = await getLogin(currentUser.url, txtUsername, txtPassword)

            await HelperSessao.SetUrl(currentUser.url)
            await HelperSessao.SetUsername(data?.username)

            currentUser.setName(data?.username)
            currentUser.setName(data?.name)
            currentUser.setBalance(0)

            setIsLoading(false)
            Alert.alert('ok') //router.replace('/home')
        } catch (error: any) {
            setIsLoading(false)
            Alert.alert(error?.message)
        }
    }

    const handleEnroll = () => {
        Keyboard.dismiss()

        setTxtUsername('')
        setTxtPassword('')
        setIsLoading(false)

        router.navigate('/enrollment')
    }

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
        toggleSwitch,
        handleLogin,
        handleEnroll,
        handleChangeBank,
    }
}

export default useLogin
