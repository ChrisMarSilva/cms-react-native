/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { getExtract } from '@/src/services/transactionService'
import { HeaderBackground, HeaderTitle } from '@/src/components/header'

const useTransactionHistory = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [isBtnAllSelected, setIsBtnAllSelected] = useState<boolean>(false)
    const [isBtnReceivedSelected, setIsBtnReceivedSelected] = useState<boolean>(false)
    const [isBtnSentSelected, setIsBtnSentSelected] = useState<boolean>(false)
    const [data, setData] = useState<any[]>([])
    const [dataPrinc, setDataPrinc] = useState<any[]>([])

    useEffect(() => {
        _cleaData()
        _loadData()

        // return () => {
        //     _clearData()
        // }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Transaction History'} />,
        })
    }, [navigation])

    const _cleaData = () => {
        setIsBtnAllSelected(false)
        setIsBtnReceivedSelected(false)
        setIsBtnSentSelected(false)
        setData([])
        setDataPrinc([])
    }

    const _loadData = async () => {
        try {
            const result = await getExtract(currentUser.url)

            setDataPrinc(result)
            setData(result)
            setIsBtnAllSelected(true)
            setIsBtnReceivedSelected(false)
            setIsBtnSentSelected(false)
        } catch (error: any) {
            console.error(error)
            Alert.alert(error.message)
        }
    }

    const handleBtnAll = () => {
        setIsBtnAllSelected(true)
        setIsBtnReceivedSelected(false)
        setIsBtnSentSelected(false)
        setData(dataPrinc)
    }
    const handleBtnReceived = () => {
        setIsBtnAllSelected(false)
        setIsBtnReceivedSelected(true)
        setIsBtnSentSelected(false)
        setData(dataPrinc.filter((item: any) => item.tipoOperacao == 0)) // 0 Received
    }
    const handleBtnSent = () => {
        setIsBtnAllSelected(false)
        setIsBtnReceivedSelected(false)
        setIsBtnSentSelected(true)
        setData(dataPrinc.filter((item: any) => item.tipoOperacao == 1)) // 1 - sent
    }

    return {
        currentUser,
        data,
        isBtnAllSelected,
        isBtnReceivedSelected,
        isBtnSentSelected,
        handleBtnAll,
        handleBtnReceived,
        handleBtnSent,
    }
}

export default useTransactionHistory
