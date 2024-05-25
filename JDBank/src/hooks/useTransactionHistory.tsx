import { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useTransactionHistory = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [isBtnAllSelected, setIsBtnAllSelected] = useState(true)
    const [isBtnReceivedSelected, setIsBtnReceivedSelected] = useState(false)
    const [isBtnSentSelected, setIsBtnSentSelected] = useState(false)
    const [dataPrinc, setDataPrinc] = useState<any>(null)
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        setIsBtnAllSelected(true)
        setIsBtnReceivedSelected(false)
        setIsBtnSentSelected(false)
        setDataPrinc(null)
        setData(null)

        setTimeout(() => {
            handleBtnAll()
        }, 200)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Transaction History'} />,
        })
    }, [navigation])

    const handleBtnAll = () => {
        const dt = new Date()
        //const dataAtual = ('0' + (dt.getMonth() + 1)).substr(-2) + '/' + ('0' + dt.getDate()).substr(-2) + '/' + dt.getFullYear()
        const dataAtual = (dt.getMonth() + 1).toString().padStart(2, '0') + '/' + dt.getDate().toString().padStart(2, '0') + '/' + dt.getFullYear()

        const result = [
            { time: dataAtual, title: 'Received', description: 'Person 1', lineColor: 'transparent', type: 'R', value: 123456.99 },
            { time: dataAtual, title: 'Sent', description: 'Person 2', lineColor: 'transparent', type: 'R', value: -200 },
            { time: dataAtual, title: 'Pending Request for Pay', description: 'Person 3', lineColor: 'transparent', type: 'R', value: 500 },
            { time: dataAtual, title: 'Received', description: 'Person 1', lineColor: 'transparent', type: 'R', value: 1000 },
            { time: dataAtual, title: 'Sent', description: 'Person 2', lineColor: 'transparent', type: 'R', value: -1500 },
            { time: dataAtual, title: 'Received Request for Pay', description: 'Person 3', lineColor: 'transparent', type: 'P', value: 2000 },
            { time: dataAtual, title: 'Received Request for Pay', description: 'Person 4', lineColor: 'transparent', type: 'P', value: 3000 },
            { time: dataAtual, title: 'Sent', description: 'Person 5', lineColor: 'transparent', type: 'P', value: -4000 },
            { time: dataAtual, title: 'Received Request for Pay', description: 'Person 4', lineColor: 'transparent', type: 'P', value: 5000 },
            { time: dataAtual, title: 'Sent', description: 'Person 5', lineColor: 'transparent', type: 'P', value: -6000.99 },
        ]

        setIsBtnAllSelected(true)
        setIsBtnReceivedSelected(false)
        setIsBtnSentSelected(false)
        setData(result)
        setDataPrinc(result)
    }

    const handleBtnReceived = () => {
        setIsBtnAllSelected(false)
        setIsBtnReceivedSelected(true)
        setIsBtnSentSelected(false)
        setData(dataPrinc.filter((item: any) => item.type == 'R'))
    }

    const handleBtnSent = () => {
        setIsBtnAllSelected(false)
        setIsBtnReceivedSelected(false)
        setIsBtnSentSelected(true)
        setData(dataPrinc.filter((item: any) => item.type == 'P'))
    }

    return {
        currentUser,
        isBtnAllSelected,
        isBtnReceivedSelected,
        isBtnSentSelected,
        data,
        handleBtnAll,
        handleBtnReceived,
        handleBtnSent,
    }
}

export default useTransactionHistory
