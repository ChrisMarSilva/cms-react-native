import { useRef, useState, useEffect } from 'react'
import { Alert, Keyboard } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
//import * as HelperNumero from '@/src/util/HelperNumero'
import { getChave } from '@/src/services/chaveService'
import { payQrCode } from '@/src/services/qrcodeService'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const usePagarTransferirConfirma = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    const animation = useRef(null)
    const [isLoadingRecebedor, setIsLoadingRecebedor] = useState<boolean>(true)
    const [isLoadingPagamento, setIsLoadingPagamento] = useState<boolean>(false)
    const [chave, setChave] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [banco, setBanco] = useState<string>('')
    const [agencia, setAgencia] = useState<string>('')
    const [conta, setConta] = useState<string>('')
    const [valor, setValor] = useState<string>('0')

    useEffect(() => {
        setIsLoadingRecebedor(true)
        setIsLoadingPagamento(false)
        setChave(params.chaveRecebedor?.toString() || '')
        setNome('')
        setBanco('')
        setAgencia('')
        setConta('')
        setValor(params.valorRecebedor?.toString() || '0')

        setTimeout(() => {
            _buscarDadosRecebedor()
        }, 200)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Confirmação de Pagamento'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
        })
    }, [navigation])

    const _onPressHome = async () => router.replace('/home')

    const _buscarDadosRecebedor = async () => {
        try {
            setIsLoadingRecebedor(true)

            const data = await getChave(currentUser.url, chave || params.chaveRecebedor?.toString() || '')

            setNome(data?.ispb)
            setBanco(data?.nomeBanco)
            setAgencia(data?.agencia)
            setConta(data?.conta)

            router.setParams({
                chaveRecebedor: chave || params.chaveRecebedor?.toString() || '',
                ispbRecebedor: data?.ispb,
                nomeBancoRecebedor: data?.nomeBanco,
                tipoPessoaRecebedor: data?.tipoPessoa,
                documentoRecebedor: data?.documento,
                agenciaRecebedor: data?.agencia,
                contaRecebedor: data?.conta,
                tipoContaRecebedor: data?.tipoConta,
                nomeRecebedor: data?.nome,
            })

            setIsLoadingRecebedor(false)
        } catch (error: any) {
            console.error(error)
            setIsLoadingRecebedor(false)
            Alert.alert('Erro(Geral): ' + error.message)

            // router.setParams({
            //     chaveRecebedor: chave || params.chaveRecebedor?.toString() || '',
            //     ispbRecebedor: '',
            //     nomeBancoRecebedor: '',
            //     tipoPessoaRecebedor: '',
            //     documentoRecebedor: '',
            //     agenciaRecebedor: '',
            //     contaRecebedor: '',
            //     tipoContaRecebedor: '',
            //     nomeRecebedor: '',
            // })

            router.navigate('/pagar_transferir')
        }
    }

    const _onPressAgendarPagtoQRCode = () => {
        Keyboard.dismiss()
        Alert.alert('Pagto Agendado!')
        router.replace('/home')
    }

    const _onPressEfetuarPagtoQRCode = async () => {
        try {
            Keyboard.dismiss()
            setIsLoadingPagamento(true)

            if (currentUser.chave.trim() == '') {
                Alert.alert('Dados do Pagador Vazio.')
                setIsLoadingPagamento(false)
                return false
            }

            if (chave.trim() == '') {
                Alert.alert('Dados do Recebedor Vazio.')
                setIsLoadingPagamento(false)
                return false
            }

            if (parseFloat(params.valorRecebedor?.toString() || '') <= 0) {
                Alert.alert('Valor do Pagamento não Informado.')
                setIsLoadingPagamento(false)
                return false
            }

            await payQrCode(currentUser.url, currentUser.ispb, currentUser.tipoPessoa, currentUser.tipoConta, currentUser.agencia, currentUser.conta, currentUser.documento, currentUser.nome, params.ispbRecebedor?.toString() || '', params.tipoPessoaRecebedor?.toString() || '', params.documentoRecebedor?.toString() || '', params.agenciaRecebedor?.toString() || '', params.contaRecebedor?.toString() || '', params.tipoContaRecebedor?.toString() || '', params.nomeRecebedor?.toString() || '', params.valorRecebedor?.toString() || '0', params.infoRecebedor?.toString() || '')

            setIsLoadingPagamento(false)

            router.navigate({
                pathname: '/pagar_transferir_recibo',
                params: {
                    chaveRecebedor: params.chaveRecebedor,
                    ispbRecebedor: params.ispbRecebedor,
                    nomeBancoRecebedor: params.nomeBancoRecebedor,
                    tipoPessoaRecebedor: params.tipoPessoaRecebedor,
                    documentoRecebedor: params.documentoRecebedor,
                    agenciaRecebedor: params.agenciaRecebedor,
                    contaRecebedor: params.contaRecebedor,
                    tipoContaRecebedor: params.tipoContaRecebedor,
                    nomeRecebedor: params.nomeRecebedor,
                    valorRecebedor: params.valorRecebedor,
                },
            })
        } catch (error: any) {
            setIsLoadingPagamento(false)
            Alert.alert('Erro(Geral): ' + error.message)
        }
    }

    return {
        currentUser,
        animation,
        isLoadingRecebedor,
        isLoadingPagamento,
        chave,
        nome,
        banco,
        agencia,
        conta,
        valor,
        setValor,
        _onPressEfetuarPagtoQRCode,
        _onPressAgendarPagtoQRCode,
    }
}

export default usePagarTransferirConfirma
