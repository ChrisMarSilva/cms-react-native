import { useEffect, useState, useRef } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
//import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useConfig = () => {
    const currentUser = useCurrentUser()
    //const navigation = useNavigation()

    const [nameReceiveBank, setNameReceiveBank] = useState<string>('')
    const [urlReceiveBank, setUrlReceiveBank] = useState<string>('')
    const [namePaymentBank, setNamePaymentBank] = useState<string>('')
    const [urlPaymentBank, setUrlPaymentBank] = useState<string>('')

    const refNameReceiveBank = useRef(null)
    const refUrlReceiveBank = useRef(null)
    const refNamePaymentBank = useRef(null)
    const refUrlPaymentBank = useRef(null)

    useEffect(() => {
        _clearData()
        _loadData()

        // return () => { }
    }, [])

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerBackground: () => <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1 }} />,
    //         //headerTitle: () => <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold' }}>Configuration</Text>,
    //     })
    // }, [navigation])

    const _clearData = () => {
        Keyboard.dismiss()

        setNameReceiveBank('')
        setUrlReceiveBank('')
        setNamePaymentBank('')
        setUrlPaymentBank('')
    }

    const _loadData = () => {
        setNameReceiveBank(currentUser.nameReceiveBank)
        setUrlReceiveBank(currentUser.urlReceiveBank)
        setNamePaymentBank(currentUser.namePaymentBank)
        setUrlPaymentBank(currentUser.urlPaymentBank)

        refNameReceiveBank.current.focus()
    }

    const handleSave = async () => {
        if (nameReceiveBank == '' || urlReceiveBank == '' || namePaymentBank == '' || urlPaymentBank == '') {
            if (nameReceiveBank == '') {
                Alert.alert('Warning', 'Name Receive Bank is required')
                refNameReceiveBank.current.focus()
            } else if (urlReceiveBank == '') {
                Alert.alert('Warning', 'Url Receive Bank is required')
                refUrlReceiveBank.current.focus()
            } else if (namePaymentBank == '') {
                Alert.alert('Warning', 'Name Payment Bank is required')
                refNamePaymentBank.current.focus()
            } else if (urlPaymentBank == '') {
                Alert.alert('Warning', 'Url Payment Bank is required')
                refUrlPaymentBank.current.focus()
            }
            return
        }

        currentUser.setNameReceiveBank(nameReceiveBank)
        currentUser.setUrlReceiveBank(urlReceiveBank)
        currentUser.setNamePaymentBank(namePaymentBank)
        currentUser.setUrlPaymentBank(urlPaymentBank)
        currentUser.setBank(namePaymentBank)
        currentUser.setUrl(urlPaymentBank)

        await HelperSessao.SetReceiveBank(nameReceiveBank)
        await HelperSessao.SetReceiveUrl(urlReceiveBank)
        await HelperSessao.SetPaymentBank(namePaymentBank)
        await HelperSessao.SetPaymentUrl(urlPaymentBank)
        await HelperSessao.SetBank(namePaymentBank)
        await HelperSessao.SetUrl(urlPaymentBank)

        Keyboard.dismiss()
        router.replace('/login')
    }

    return {
        nameReceiveBank,
        setNameReceiveBank,
        urlReceiveBank,
        setUrlReceiveBank,
        namePaymentBank,
        setNamePaymentBank,
        urlPaymentBank,
        setUrlPaymentBank,
        refNameReceiveBank,
        refUrlReceiveBank,
        refNamePaymentBank,
        refUrlPaymentBank,
        handleSave,
    }
}

export default useConfig
