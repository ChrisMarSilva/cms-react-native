import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useCameraPermissions } from 'expo-camera'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperNumero from '@/src/util/HelperNumero'
import { sendQrCode } from '@/src/services/qrcodeService'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const usePagarTransferir = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasScanned, setHasScanned] = useState(false)
    const [permission, requestPermission] = useCameraPermissions()

    useEffect(() => {
        setHasScanned(false)
        setHasCameraPermission(false)

        //setTimeout(() => {
        _requestCameraPermission()
        //}, 150)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Pagar com Código QR'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
        })
    }, [navigation])

    const _onPressHome = async () => router.replace('/home')

    const _requestCameraPermission = async () => {
        //const { status } = await Camera.requestCameraPermissionsAsync()
        //setHasCameraPermission(status === 'granted')
        if (!permission || !permission.granted) requestPermission()
        setHasCameraPermission(true)
    }

    const _PostEnviarQRCode = async ({ type, data }: { type: any; data: any }) => {
        try {
            // setHasScanned(false)
            if (data.trim() == '') return
            setHasScanned(true)

            const result = await sendQrCode(currentUser.url, data)

            const valor = HelperNumero.isNumber(result.transactionAmount.toString()) ? parseFloat(result.transactionAmount.toString() || '0') : 0
            const info = result.additionalDataField ? result.additionalDataField : '123'
            const chave = result.merchantAccountInformation.itens[1].descricao

            router.navigate({
                pathname: '/pagar_transferir_confirma',
                params: {
                    chaveRecebedor: chave,
                    infoRecebedor: info,
                    valorRecebedor: valor,
                },
            })
        } catch (error: any) {
            console.error('Erro(Geral): ', error)
            Alert.alert('Erro(Geral): ' + error.messag)
        }
    }

    const _PostEnviarQRCodeFake = async () => {
        const type = ''
        //const data = '00020101021126360014br.gov.bcb.spi0114+55119421246815204000053039865802BR5906Fulano6009São Paulo63041689'; //  0,00 ok
        //const data = "00020101021126360014br.gov.bcb.spi0114+55119421200015204000053039865406100.005802BR5913Fulano de Tal6009São Paulo63041A9B"; // 100,00 ok
        //const data = "00020101021126360014br.gov.bcb.spi0114+55119421200055204000053039865406100.005802BR5909Anderson 6009São Paulo63040CB1"; // 100,00 ok
        //const data = '00020101021126360014br.gov.bcb.spi0114+55119421255555204000053039865406100.005802BR5917J3 AZUL RECEBEDOR6009São Paulo630417AC';
        const data = '00020101021126360014br.gov.bcb.spi0114+551194212333352040000530398654040.005802BR5919JD VERMELHO PAGADOR6009São Paulo630416DC'

        await _PostEnviarQRCode({ type, data })
    }

    return {
        currentUser,
        hasCameraPermission,
        hasScanned,
        setHasScanned,
        _PostEnviarQRCode,
        _PostEnviarQRCodeFake,
    }
}

export default usePagarTransferir
