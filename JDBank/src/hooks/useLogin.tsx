import { useEffect, useState, useRef } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { getLogin } from '@/src/services/loginService'
import * as CONSTANTE from '@/src/util/Constante'
import * as HelperSessao from '@/src/util/HelperSessao'

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

    const imglogo = currentUser.ispb == parseInt(CONSTANTE.ISPB_JD) ? imglogoJD : imglogoJ3

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
        setTxtPassword('')

       // console.log('useLogin._loadCurrentUser - ispb:', currentUser.ispb, ', bank:', currentUser.bank, ', username:', currentUser.username, ', url:', currentUser.url)

        if (currentUser.username == '') refTxtUsername?.current?.focus() // if (refTxtUsername && refTxtUsername.current)  refTxtUsername.current.focus()
        if (currentUser.username != '') refTxtPassword?.current?.focus()
    }

    const toggleSwitch = () => setIsEnabledFaceID((previousState) => !previousState)

    const handleLogin = async () => {
        try {
            Keyboard.dismiss()
            setIsLoading(true)

            if (txtUsername == '' /*|| txtPassword == '' */) {
                setIsLoading(false)
                if (txtUsername == '') {
                    Alert.alert('Enter the Username!')
                    refTxtUsername?.current?.focus()
                } /*else if (txtPassword == '') {
                    Alert.alert('Enter the Password!')
                    refTxtPassword.current.focus()
                } */
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
            // currentUser.setIspb(data?.ispb || '')
            // currentUser.setBank(data?.nomeBanco || '')
            // currentUser.setTipoConta(data?.tipoConta || '')

            setIsLoading(false)
            router.replace('/home')
        } catch (error: any) {
            setIsLoading(false)
            Alert.alert(error?.message)
        }
    }

    const handleEnroll = () => router.navigate('/enrollment')
    const handleConfig = () => router.navigate('/config')

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
    }
}

export default useLogin
