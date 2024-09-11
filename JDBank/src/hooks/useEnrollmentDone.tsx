/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { createLogin } from '@/src/services/loginService'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

const useEnrollmentDone = () => {
    const currentUser = useCurrentUser()
    const params = useLocalSearchParams()

    const [txtUsername, setTxtUsername] = useState<string>('')
    const [txtPassword, setTxtPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const refTxtUsername = useRef(null)
    const refTxtPassword = useRef(null)

    const imglogo = currentUser.ispb == parseInt(CONSTANTE.ISPB_JD) ? imglogoJD : imglogoJ3

    useEffect(() => {
        _clearData()

        // return () => { _clearData() }
    }, [])

    const _clearData = () => {
        Keyboard.dismiss()

        setTxtUsername('')
        setTxtPassword('')
        setIsLoading(false)

        router.setParams({
            enrollUsername: '',
            enrolPassword: '',
        })

        refTxtUsername.current.focus()
    }

    const handleBackToLogin = () => router.replace('/login')

    const handleEnrollDone = async () => {
        try {
            Keyboard.dismiss()
            setIsLoading(true)

            const txtName = params.enrollName?.toString() || ''
            const txtAddress = params.enrollAddress?.toString() || ''
            const txtPhone = params.enrollPhone?.toString() || ''
            const txtEmail = params.enrollEmail?.toString() || ''
            const txtCardOrAccount = params.enrollCardOrAccount?.toString() || ''
            const txtSocialSecurity = params.enrollSocialSecurity?.toString() || ''

            if (txtName == '' || txtAddress == '' || txtPhone == '' || txtEmail == '' || txtCardOrAccount == '' || txtSocialSecurity == '' || txtUsername == '' || txtPassword == '') {
                setIsLoading(false)
                if (txtName == '') Alert.alert('Enter the Legal Name!')
                else if (txtAddress == '') Alert.alert('Enter the Physical Address!')
                else if (txtPhone == '') Alert.alert('Enter the Phone!')
                else if (txtEmail == '') Alert.alert('Enter the Email!')
                else if (txtCardOrAccount == '') Alert.alert('Enter the Card or Account Number!')
                else if (txtSocialSecurity == '') Alert.alert('Enter the Social Security Number(SSN)/Tax ID Number(TIN)!')
                else if (txtUsername == '') Alert.alert('Enter the Username!')
                else if (txtPassword == '') Alert.alert('Enter the Password!')
                return
            }

            const data = await createLogin(currentUser.url, txtName, txtAddress, txtPhone, txtEmail, txtCardOrAccount, txtSocialSecurity, txtUsername, txtPassword)

            console.log(data)

            await HelperSessao.SetUrl(currentUser.url)
            await HelperSessao.SetUsername(data?.username)

            currentUser.setName(data?.username)
            currentUser.setName(data?.name)
            currentUser.setBalance(0)

            setIsLoading(false)
            router.replace('/home')
        } catch (error: any) {
            setIsLoading(false)
            Alert.alert(error?.message)
        }
    }

    return {
        imglogo,
        txtUsername,
        setTxtUsername,
        txtPassword,
        setTxtPassword,
        isLoading,
        refTxtUsername,
        refTxtPassword,
        handleBackToLogin,
        handleEnrollDone,
    }
}

export default useEnrollmentDone
