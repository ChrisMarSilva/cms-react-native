import { useEffect } from 'react'
import { Text } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

const usePerfil = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo="Personal Info" />,
        })
    }, [navigation])

    const imgPerson = (currentUser as any).url == CONSTANTE.PAYMENT_BANK_URL ? imgBluePerson : imgRedPerson

    const handleLogout = () => router.replace('/login')

    return {
        currentUser,
        imgPerson,
        handleLogout,
    }
}

export default usePerfil
