import { useEffect } from 'react'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

const usePersonalInfo = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    // useEffect(() => {
    //     _clearData()

    //     // return () => {
    //     //     _clearData()
    //     // }
    // }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            //headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo="Personal Info" />,
        })
    }, [navigation])

    const imgPerson = currentUser.bank == currentUser.namePaymentBank ? imgBluePerson : imgRedPerson

    const handleLogout = () => router.replace('/login')

    return {
        currentUser,
        imgPerson,
        handleLogout,
    }
}

export default usePersonalInfo
