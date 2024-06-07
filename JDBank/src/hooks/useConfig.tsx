import { useEffect, useState, useRef } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router } from 'expo-router'
import * as Updates from 'expo-updates'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
//import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useConfig = () => {
    const currentUser = useCurrentUser()
    //const navigation = useNavigation()

    const [ispbReceiveBank, setIspbReceiveBank] = useState<string>('')
    const [nameReceiveBank, setNameReceiveBank] = useState<string>('')
    const [urlReceiveBank, setUrlReceiveBank] = useState<string>('')
    const [ispbPaymentBank, setIspbPaymentBank] = useState<string>('')
    const [namePaymentBank, setNamePaymentBank] = useState<string>('')
    const [urlPaymentBank, setUrlPaymentBank] = useState<string>('')
    const [updateAppStatus, setUpdateAppStatus] = useState<string>('')

    const refIspbReceiveBank = useRef(null)
    const refNameReceiveBank = useRef(null)
    const refUrlReceiveBank = useRef(null)
    const refIspbPaymentBank = useRef(null)
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
        setIspbReceiveBank('')
        setNameReceiveBank('')
        setUrlReceiveBank('')
        setIspbPaymentBank('')
        setNamePaymentBank('')
        setUrlPaymentBank('')
        Keyboard.dismiss()
    }

    const _loadData = () => {
        setIspbReceiveBank(currentUser.ispbReceiveBank.toString())
        setNameReceiveBank(currentUser.nameReceiveBank.toString().trim())
        setUrlReceiveBank(currentUser.urlReceiveBank.toString().trim())

        setIspbPaymentBank(currentUser.ispbPaymentBank.toString())
        setNamePaymentBank(currentUser.namePaymentBank.toString().trim())
        setUrlPaymentBank(currentUser.urlPaymentBank.toString().trim())

        console.log('')
        console.log('useConfig._loadData')
        console.log('ispb:', currentUser.ispb, ', bank:', currentUser.bank, ', username:', currentUser.username, ', url:', currentUser.url)
        console.log('ispbReceive:', currentUser.ispbReceiveBank, ', bankReceive:', currentUser.nameReceiveBank, ', urlReceive:', currentUser.urlReceiveBank)
        console.log('ispbPayment:', currentUser.ispbPaymentBank, ', bankPayment:', currentUser.namePaymentBank, ', urlPayment:', currentUser.urlPaymentBank)
        console.log('-----------------------------')
        console.log('')

        refIspbReceiveBank.current.focus()
    }

    const ensureTrailingSlash = (text) => {
        text = text.trim()
        if (!text.endsWith('/')) text += '/'
        return text
    }

    const handleSave = async () => {
        if (ispbReceiveBank == '' || nameReceiveBank == '' || urlReceiveBank == '' || namePaymentBank == '' || urlPaymentBank == '' || ispbPaymentBank == '') {
            if (ispbReceiveBank == '') {
                Alert.alert('Warning', 'ISPB Receive Bank is required')
                refIspbReceiveBank.current.focus()
            } else if (nameReceiveBank == '') {
                Alert.alert('Warning', 'Name Receive Bank is required')
                refNameReceiveBank.current.focus()
            } else if (urlReceiveBank == '') {
                Alert.alert('Warning', 'Url Receive Bank is required')
                refUrlReceiveBank.current.focus()
            } else if (ispbPaymentBank == '') {
                Alert.alert('Warning', 'ISPB Payment Bank is required')
                refIspbPaymentBank.current.focus()
            } else if (namePaymentBank == '') {
                Alert.alert('Warning', 'Name Payment Bank is required')
                refNamePaymentBank.current.focus()
            } else if (urlPaymentBank == '') {
                Alert.alert('Warning', 'Url Payment Bank is required')
                refUrlPaymentBank.current.focus()
            }
            return
        }

        console.log('')
        console.log('useConfig.handleSave')
        console.log('ispbReceive:', ispbReceiveBank, ', bankReceive:', nameReceiveBank, ', urlReceive:', urlReceiveBank)
        console.log('ispbPayment:', ispbPaymentBank, ', bankPayment:', namePaymentBank, ', urlPayment:', urlPaymentBank)
        console.log('-----------------------------')
        console.log('')

        currentUser.setIspbReceiveBank(parseInt(ispbReceiveBank || '0'))
        currentUser.setNameReceiveBank(nameReceiveBank.toString().trim())
        currentUser.setUrlReceiveBank(ensureTrailingSlash(urlReceiveBank.toString().trim()))
        currentUser.setIspbPaymentBank(parseInt(ispbPaymentBank || '0'))
        currentUser.setNamePaymentBank(namePaymentBank.toString().trim())
        currentUser.setUrlPaymentBank(ensureTrailingSlash(urlPaymentBank.toString().trim()))
        currentUser.setIspb(parseInt(ispbPaymentBank || '0'))
        currentUser.setBank(namePaymentBank.toString().trim())
        currentUser.setUrl(ensureTrailingSlash(urlPaymentBank.toString().trim()))

        await HelperSessao.SetReceiveIspb(ispbReceiveBank)
        await HelperSessao.SetReceiveBank(nameReceiveBank.toString().trim())
        await HelperSessao.SetReceiveUrl(urlReceiveBank.toString().trim())
        await HelperSessao.SetPaymentIspb(ispbPaymentBank)
        await HelperSessao.SetPaymentBank(namePaymentBank.toString().trim())
        await HelperSessao.SetPaymentUrl(urlPaymentBank)
        await HelperSessao.SetIspb(ispbPaymentBank)
        await HelperSessao.SetBank(namePaymentBank.toString().trim())
        await HelperSessao.SetUrl(urlPaymentBank.toString().trim())

        Keyboard.dismiss()
        router.replace('/login')
    }

    const handleCancel = () => router.replace('/login')

    const handleUpdateApp = async () => {
        if (__DEV__) {
            setUpdateAppStatus('Development mode, skipping check for updates...')
            return // NAO PODE TER ATUALIZAÇOES EM MODE DE DESENVOLVIMENTO
        }

        setUpdateAppStatus('Checking for updates...')
        Updates.checkForUpdateAsync()
            .then((update) => {
                if (update.isAvailable) {
                    setUpdateAppStatus('New update available, downloading...')
                    Updates.fetchUpdateAsync()
                        .then(() => {
                            setUpdateAppStatus('Update downloaded, restarting app...')
                            Updates.reloadAsync()
                                .then(() => {
                                    setUpdateAppStatus('App restarted!')
                                })
                                .catch((error: any) => {
                                    setUpdateAppStatus('reloadAsync: ' + error.toString())
                                })
                        })
                        .catch((error: any) => {
                            setUpdateAppStatus('fetchUpdateAsync: ' + error.toString())
                        })
                } else {
                    setUpdateAppStatus('No updates available!')
                }
            })
            .catch((error: any) => {
                setUpdateAppStatus('checkForUpdateAsync: ' + error.toString())
            })
            .finally(() => {
                setTimeout(() => {
                    setUpdateAppStatus('')
                }, 5000)
            })
    }

    return {
        refIspbReceiveBank,
        refNameReceiveBank,
        refUrlReceiveBank,
        refIspbPaymentBank,
        refNamePaymentBank,
        refUrlPaymentBank,
        ispbReceiveBank,
        setIspbReceiveBank,
        nameReceiveBank,
        setNameReceiveBank,
        urlReceiveBank,
        setUrlReceiveBank,
        ispbPaymentBank,
        setIspbPaymentBank,
        namePaymentBank,
        setNamePaymentBank,
        urlPaymentBank,
        setUrlPaymentBank,
        updateAppStatus,
        handleSave,
        handleCancel,
        handleUpdateApp,
    }
}

export default useConfig
