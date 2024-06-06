import { useEffect } from 'react'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useNotificationDetail = () => {
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Notifications'} />,
        })
    }, [navigation])

    const handleSeeReceipt = () => router.navigate({ pathname: '/home', params: { value: '0', name: '' } })

    return {
        params,
        handleSeeReceipt,
    }
}

export default useNotificationDetail