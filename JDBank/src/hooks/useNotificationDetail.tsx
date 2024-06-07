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

    console.log('')
    console.log('useNotificationDetail')
    console.log('datetime: ', params.datetime)
    console.log('name: ', params.name)
    console.log('value: ', params.value)
    console.log('-----------------------------')
    console.log('')

    return {
        params,
        handleSeeReceipt,
    }
}

export default useNotificationDetail
