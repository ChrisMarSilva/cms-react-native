import { useEffect, useState, useRef } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router } from 'expo-router'
import * as Updates from 'expo-updates'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'

const useConfig = () => {
    const currentUser = useCurrentUser()

    const [ispb, setIspb] = useState<string>('')
    const [bank, setBank] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [status, setStatus] = useState<string>('')

    const refIspb = useRef(null)
    const refBank = useRef(null)
    const refUrl = useRef(null)

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
        setIspb('')
        setBank('')
        setUrl('')

        Keyboard.dismiss()
    }

    const _loadData = () => {
        setIspb(currentUser.ispb.toString())
        setBank(currentUser.bank.toString().trim())
        setUrl(currentUser.url.toString().trim())
        console.log('useConfig._loadData - ispb:', currentUser.ispb, ', bank:', currentUser.bank, ', username:', currentUser.username, ', url:', currentUser.url)

        refIspb?.current?.focus()
    }

    const ensureTrailingSlash = (text) => {
        text = text.trim()
        if (!text.endsWith('/')) text += '/'
        return text
    }

    const handleSave = async () => {
        if (ispb == '' || bank == '' || url == '') {
            if (ispb == '') {
                Alert.alert('Warning', 'ISPB is required')
                refIspb?.current?.focus()
            } else if (bank == '') {
                Alert.alert('Warning', 'Bank is required')
                refBank?.current?.focus()
            } else if (url == '') {
                Alert.alert('Warning', 'Url is required')
                refUrl?.current?.focus()
            }
            return
        }

        console.log('useConfig.handleSave - ispb:', ispb, ', bank:', bank, ', url:', url)

        currentUser.setIspb(parseInt(ispb || '0'))
        currentUser.setBank(bank.toString().trim())
        currentUser.setUrl(ensureTrailingSlash(url.toString().trim()))

        await HelperSessao.SetIspb(ispb)
        await HelperSessao.SetBank(bank.toString().trim())
        await HelperSessao.SetUrl(url.toString().trim())

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
        refIspb,
        refBank,
        refUrl,
        ispb,
        setIspb,
        bank,
        setBank,
        url,
        setUrl,
        status,
        handleSave,
        handleCancel,
        handleUpdateApp,
    }
}

export default useConfig
