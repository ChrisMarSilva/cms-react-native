/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const [logError, setLogError] = useState<any[]>([])

    const refIspb = useRef(null)
    const refBank = useRef(null)
    const refUrl = useRef(null)

    useEffect(() => {
        _clearData()
        _loadData()

        // return () => { }
    }, [])

    const _clearData = () => {
        setIspb('')
        setBank('')
        setUrl('')
        setLogError([])

        Keyboard.dismiss()
    }

    const _loadData = async () => {
        setIspb(currentUser.ispb.toString())
        setBank(currentUser.bank.toString().trim())
        setUrl(currentUser.url.toString().trim())

        refIspb?.current?.focus()

        const logErrorSession = await HelperSessao.GetLogErrors()
        const lista = logErrorSession != null ? JSON.parse(logErrorSession) : []
        setLogError(lista)
    }

    const ensureTrailingSlash = (text: string) => {
        text = text.trim()
        if (!text.endsWith('/')) text += '/'
        return text
    }

    const handleSave = async () => {
        if (ispb == '' || bank == '' || url == '') {
            if (ispb == '') {
                Alert.alert('Warning', 'Clearing System Member ID is required')
                refIspb?.current?.focus()
            } else if (bank == '') {
                Alert.alert('Warning', 'Financial Institution Name is required')
                refBank?.current?.focus()
            } else if (url == '') {
                Alert.alert('Warning', 'Url is required')
                refUrl?.current?.focus()
            }
            return
        }

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
            setStatus('Development mode, skipping check for updates...')
            return // NAO PODE TER ATUALIZAÇOES EM MODE DE DESENVOLVIMENTO
        }

        setStatus('Checking for updates...')
        Updates.checkForUpdateAsync()
            .then((update) => {
                if (update.isAvailable) {
                    setStatus('New update available, downloading...')
                    Updates.fetchUpdateAsync()
                        .then(() => {
                            setStatus('Update downloaded, restarting app...')
                            Updates.reloadAsync()
                                .then(() => {
                                    setStatus('App restarted!')
                                })
                                .catch((error: any) => {
                                    setStatus('reloadAsync: ' + error.toString())
                                })
                        })
                        .catch((error: any) => {
                            setStatus('fetchUpdateAsync: ' + error.toString())
                        })
                } else {
                    setStatus('No updates available!')
                }
            })
            .catch((error: any) => {
                setStatus('checkForUpdateAsync: ' + error.toString())
            })
            .finally(() => {
                setTimeout(() => {
                    setStatus('')
                }, 5000)
            })
    }

    const handleDelLogErrors = async () => {
        setLogError([])
        await HelperSessao.SetLogErrors(JSON.stringify([]))
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
        setStatus,
        logError,
        handleSave,
        handleCancel,
        handleUpdateApp,
        handleDelLogErrors,
    }
}

export default useConfig
