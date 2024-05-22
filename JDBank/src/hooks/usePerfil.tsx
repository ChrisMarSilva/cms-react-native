import { useEffect } from 'react'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
//import * as HelperSessao from '@/src/util/HelperSessao'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const usePerfil = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Perfil'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
        })
    }, [navigation])

    const _onPressLogout = async () => {
        // await HelperSessao.ClearAllSessao()
        // await HelperSessao.SetUserURL(currentUser.url)
        // await HelperSessao.SetUserIspb(currentUser.ispb)
        // await HelperSessao.SetUserNomeBanco(currentUser.nomeBanco)
        // await HelperSessao.SetUserIcon(currentUser.icon)
        // await HelperSessao.SetUserBGColor(currentUser.bgColor)
        router.replace('/login')
    }

    const _onPressHome = () => router.replace('/home')

    return {
        currentUser,
        _onPressLogout,
        _onPressHome,
    }
}

export default usePerfil
