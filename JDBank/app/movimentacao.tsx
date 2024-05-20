import { useEffect, useState, useContext } from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { router, useNavigation } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import Timeline from 'react-native-timeline-flatlist'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as HelperDate from '@/src/util/HelperDate'
import * as CONSTANTE from '@/src/util/Constante'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

export default function MovimentacaoScreen() {
	const currentUser = useContext(UserContext)
	const navigation = useNavigation()

	const [isBtnTodosSelected, setIsBtnTodosSelected] = useState(true)
	const [isBtnRectoSelected, setIsBtnRectoSelected] = useState(false)
	const [isBtnPagtoSelected, setIsBtnPagtoSelected] = useState(false)
	const [dataPrinc, setDataPrinc] = useState(null)
	const [data, setData] = useState(null)

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
		setData(dataPrinc.filter((item) => item.type == 'R'))
	}

	const _onButtonPagamentos = () => {
		setIsBtnTodosSelected(false)
		setIsBtnRectoSelected(false)
		setIsBtnPagtoSelected(true)
		setData(dataPrinc.filter((item) => item.type == 'P'))
	}

	const _renderDetail = (rowData, sectionID, rowID) => {
		return (
			<View style={{ flex: 1, borderWidth: 0, borderColor: '#fff' }}>
				<Text style={{ fontSize: 13, fontWeight: 'bold', color: '#fff' }}>{rowData.title}</Text>
				<Text style={{ fontSize: 15, color: '#fff' }}>{rowData.description}</Text>
				<Text style={{ fontSize: 17, color: '#fff' }}>R$ {HelperNumero.isNumber(rowData.value) ? HelperNumero.GetMascaraValorDecimal(parseFloat(rowData.value)) : HelperNumero.GetMascaraValorDecimal(0)}</Text>
			</View>
		)
	}

	return (
		<View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
			<View style={{ flex: 1, backgroundColor: currentUser.bgColor, flexDirection: 'row', justifyContent: 'center', paddingTop: 20, borderWidth: 0, borderColor: 'blue' }}>
				<TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: isBtnTodosSelected ? '#fff' : currentUser.bgColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onButtonTodas}>
					<Text style={{ fontSize: 16, paddingLeft: 5, textAlign: 'left', color: isBtnTodosSelected ? currentUser.bgColor : '#fff', fontWeight: 'bold' }}> todas </Text>
				</TouchableOpacity>
				<TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: isBtnRectoSelected ? '#fff' : currentUser.bgColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} onPress={_onButtonRecebimentos}>
					<Text style={{ fontSize: 16, paddingLeft: 5, textAlign: 'left', color: isBtnRectoSelected ? currentUser.bgColor : '#fff', fontWeight: 'bold' }}> recebimentos </Text>
				</TouchableOpacity>
				<TouchableOpacity style={{ marginRight: 0, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: isBtnPagtoSelected ? '#fff' : currentUser.bgColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} onPress={_onButtonPagamentos}>
					<Text style={{ fontSize: 16, paddingLeft: 5, textAlign: 'left', color: isBtnPagtoSelected ? currentUser.bgColor : '#fff', fontWeight: 'bold' }}> pagamentos </Text>
				</TouchableOpacity>
			</View>

			<View style={{ flex: 12, borderWidth: 0, borderColor: 'blue' }}>
				<Timeline
					data={data}
					circleColor={'transparent'}
					columnFormat={'single-column-right'}
					showTime={true}
					timeStyle={{ backgroundColor: 'transparent', color: '#fff', fontSize: 12, paddingRight: 10, paddingTop: 10, borderWidth: 0, borderColor: 'blue' }}
					options={{
						style: { paddingTop: 10, paddingLeft: 10, borderWidth: 0, borderColor: 'blue' },
					}}
					renderDetail={_renderDetail}
				/>
			</View>
		</View>
	)
}
