import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperNumero from '@/src/util/HelperNumero' 
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useMovimentacao = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const [isBtnTodosSelected, setIsBtnTodosSelected] = useState(true)
    const [isBtnRectoSelected, setIsBtnRectoSelected] = useState(false)
    const [isBtnPagtoSelected, setIsBtnPagtoSelected] = useState(false)
    const [dataPrinc, setDataPrinc] = useState<any>(null)
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        setIsBtnTodosSelected(true)
        setIsBtnRectoSelected(false)
        setIsBtnPagtoSelected(false)
        setDataPrinc(null)
        setData(null)

        setTimeout(() => {
            _onButtonTodas()
        }, 200)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => <HeaderTitle titulo={'Movimentações'} />,
            headerRight: () => <HeaderRight isVisible={true} onPress={_onPressHome} icone={'close'} />,
        })
    }, [navigation])

    const _onPressHome = async () => router.replace('/home')

    const _onButtonTodas = () => {
        const dt = new Date()
        const dataAtual = ('0' + dt.getDate()).substr(-2) + '/' + ('0' + (dt.getMonth() + 1)).substr(-2) + '/' + dt.getFullYear()

        const dataPrinc = [
            { time: dataAtual, title: 'Transferência recebida', description: 'Fulano de Tal #1', lineColor: 'transparent', type: 'R', value: 100 },
            { time: dataAtual, title: 'Transferência enviada', description: 'Fulano de Tal #2', lineColor: 'transparent', type: 'R', value: 200 },
            { time: dataAtual, title: 'Cobrança em aberta', description: 'Fulano de Tal #3', lineColor: 'transparent', type: 'R', value: 500 },
            { time: dataAtual, title: 'Transferência recebida', description: 'Fulano de Tal #1', lineColor: 'transparent', type: 'R', value: 1000 },
            { time: dataAtual, title: 'Transferência enviada', description: 'Fulano de Tal #2', lineColor: 'transparent', type: 'R', value: 1500 },
            { time: dataAtual, title: 'Cobrança em aberta', description: 'Fulano de Tal #3', lineColor: 'transparent', type: 'R', value: 2000 },
            { time: dataAtual, title: 'Cobrança recebida', description: 'Fulano de Tal #4', lineColor: 'transparent', type: 'P', value: 3000 },
            { time: dataAtual, title: 'Pagamento feito', description: 'Fulano de Tal #5', lineColor: 'transparent', type: 'P', value: 4000 },
            { time: dataAtual, title: 'Cobrança recebida', description: 'Fulano de Tal #4', lineColor: 'transparent', type: 'P', value: 5000 },
            { time: dataAtual, title: 'Pagamento feito', description: 'Fulano de Tal #5', lineColor: 'transparent', type: 'P', value: 6000 },
        ]

        setIsBtnTodosSelected(true)
        setIsBtnRectoSelected(false)
        setIsBtnPagtoSelected(false)
        setDataPrinc(dataPrinc)
        setData(dataPrinc)
    }

    const _onButtonRecebimentos = () => {
        setIsBtnTodosSelected(false)
        setIsBtnRectoSelected(true)
        setIsBtnPagtoSelected(false)
        setData(dataPrinc.filter((item: any) => item.type == 'R'))
    }

    const _onButtonPagamentos = () => {
        setIsBtnTodosSelected(false)
        setIsBtnRectoSelected(false)
        setIsBtnPagtoSelected(true)
        setData(dataPrinc.filter((item: any) => item.type == 'P'))
    }

    const _renderDetail = (rowData: any, sectionID: any, rowID: any) => {
        return (
            <View style={{ flex: 1, borderWidth: 0, borderColor: '#fff' }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#fff' }}>{rowData.title}</Text>
                <Text style={{ fontSize: 15, color: '#fff' }}>{rowData.description}</Text>
                <Text style={{ fontSize: 17, color: '#fff' }}>R$ {HelperNumero.isNumber(rowData.value) ? HelperNumero.GetMascaraValorDecimal(parseFloat(rowData.value)) : HelperNumero.GetMascaraValorDecimal(0)}</Text>
            </View>
        )
    }

    return {
        currentUser,
        isBtnTodosSelected,
        isBtnRectoSelected,
        isBtnPagtoSelected,
        data,
        _renderDetail,
        _onButtonTodas,
        _onButtonRecebimentos,
        _onButtonPagamentos,
    }
}

export default useMovimentacao
