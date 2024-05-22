import { useRef, useEffect, useState } from 'react'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
//import * as HelperNumero from '@/src/util/HelperNumero'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useCobrarAlguemRecibo = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const animation = useRef(null)

    const [isLoadingRecebimento, setIsLoadingRecebimento] = useState(true)
    const [agencia, setAgencia] = useState<string>('')
    const [conta, setConta] = useState<string>('')
    const [valor, setValor] = useState<number>(0)

    useEffect(() => {
        setIsLoadingRecebimento(true)
        //animation.current?.reset()
        //animation.current?.play(30, 120)

        setTimeout(() => {
            setAgencia(params.agenciaPagRec?.toString() || '') // Provide a default value for the state setter function
            setConta(params.contaPagRec?.toString() || '')
            setValor(parseFloat(params.valorPagRec?.toString() || '0')) // HelperNumero.isNumber(valorPagRec || '0,00') ? parseFloat(valorPagRec || '0,00') : 0
            setIsLoadingRecebimento(false)
        }, 200)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Pagamento Recebido!'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={_OnPressHome} icone={'close'} />,
        })
    }, [navigation])

    const _OnPressHome = async () => {
        currentUser.setSaldo(currentUser.saldo + valor)
        router.replace('/home')
    }

    const _OnPressVerComprovante = async () => router.replace('/home')

    return {
        currentUser,
        animation,
        isLoadingRecebimento,
        agencia,
        conta,
        valor,
        _OnPressVerComprovante,
    }
}

export default useCobrarAlguemRecibo
