import React from 'react'
import { useEffect } from 'react'
import { useNavigation, router } from 'expo-router'

import { HeaderBackground, HeaderTitle } from '@/src/components/header'

const useNotification = () => {
    const navigation = useNavigation()

    const notifications = [
        { id: '1', amount: '50.00', sender: 'João Silva', date: '01/06/2024 14:30' },
        { id: '2', amount: '100.00', sender: 'Maria Souza', date: '02/06/2024 16:45' },
        { id: '3', amount: '200.00', sender: 'Carlos Lima', date: '03/06/2024 18:00' },
    ]

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Notifications'} />,
        })
    }, [navigation])

    const handleDetail = () => router.navigate('/notification_detail')

    return {
        notifications,
        handleDetail,
    }
}

export default useNotification
