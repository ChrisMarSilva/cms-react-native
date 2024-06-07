import { useEffect, useState, useRef } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

const useEnrollment = () => {
    const currentUser = useCurrentUser()

    const [txtName, setTxtName] = useState<string>('')
    const [txtAddress, setTxtAddress] = useState<string>('')
    const [txtPhone, setTxtPhone] = useState<string>('')
    const [txtEmail, setTxtEmail] = useState<string>('')
    const [txtCardOrAccount, setTxtCardOrAccount] = useState<string>('')
    const [txtSocialSecurity, setTxtSocialSecurity] = useState<string>('')

    const refTxtName = useRef(null)
    const refTxtAddress = useRef(null)
    const refTxtPhone = useRef(null)
    const refTxtEmail = useRef(null)
    const refTxtCardOrAccount = useRef(null)
    const refTxtSocialSecurity = useRef(null)

    let imglogo = currentUser.bank == currentUser.namePaymentBank ? imglogoJD : imglogoJ3

    useEffect(() => {
        _clearData()

        // return () => {  _clearData() }
    }, [])

    const _clearData = () => {
        Keyboard.dismiss()

        setTxtName('')
        setTxtAddress('')
        setTxtPhone('')
        setTxtEmail('')
        setTxtCardOrAccount('')
        setTxtSocialSecurity('')

        router.setParams({
            enrollName: '',
            enrollAddress: '',
            enrollPhone: '',
            enrollEmail: '',
            enrollCardOrAccount: '',
            enrollSocialSecurity: '',
            enrollUsername: '',
            enrolPassword: '',
        })

        refTxtName.current.focus()
    }

    const handleBackToLogin = () => router.replace('/login')

    const handleEnrollNext = async () => {
        Keyboard.dismiss

        if (txtName == '' || txtAddress == '' || txtPhone == '' || txtEmail == '' || txtCardOrAccount == '' || txtSocialSecurity == '') {
            if (txtName == '') Alert.alert('Enter the Legal Name!')
            else if (txtAddress == '') Alert.alert('Enter the Physical Address!')
            else if (txtPhone == '') Alert.alert('Enter the Phone!')
            else if (txtEmail == '') Alert.alert('Enter the Email!')
            else if (txtCardOrAccount == '') Alert.alert('Enter the Card or Account Number!')
            else if (txtSocialSecurity == '') Alert.alert('Enter the Social Security Number(SSN)/Tax ID Number(TIN)!')
            return
        }

        router.navigate({
            pathname: '/enrollment_done',
            params: {
                enrollName: txtName,
                enrollAddress: txtAddress,
                enrollPhone: txtPhone,
                enrollEmail: txtEmail,
                enrollCardOrAccount: txtCardOrAccount,
                enrollSocialSecurity: txtSocialSecurity,
            },
        })
    }

    return {
        imglogo,
        txtName,
        setTxtName,
        txtAddress,
        setTxtAddress,
        txtPhone,
        setTxtPhone,
        txtEmail,
        setTxtEmail,
        txtCardOrAccount,
        setTxtCardOrAccount,
        txtSocialSecurity,
        setTxtSocialSecurity,
        refTxtName,
        refTxtAddress,
        refTxtPhone,
        refTxtEmail,
        refTxtCardOrAccount,
        refTxtSocialSecurity,
        handleBackToLogin,
        handleEnrollNext,
    }
}

export default useEnrollment
