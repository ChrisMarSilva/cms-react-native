import { useEffect, useState, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import { router } from 'expo-router'
import { TextInputMask } from 'react-native-masked-text'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'
import { createChave } from '@/src/services/chaveService'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

export default function LoginCadastroScreen() {
	const currentUser = useContext(UserContext)

	const [txtIspb, setTxtIspb] = useState(CONSTANTE.ISPB_RECEBEDOR)
	const [txtIspbNm, setTxtIspbNm] = useState(CONSTANTE.NOME_RECEBEDOR)
	const [txtTipoPessoa, setTxtTipoPessoa] = useState('0')
	const [txtDocumento, setTxtDocumento] = useState('')
	const [txtAgencia, setTxtAgencia] = useState('')
	const [txtConta, setTxtConta] = useState('')
	const [txtTipoConta, setTxtTipoConta] = useState('0')
	const [txtNome, setTxtNome] = useState('')
	const [txtTipoChave, setTxtTipoChave] = useState('0')
	const [txtChave, setTxtChave] = useState('')
	const [isLoadingCadastro, setIsLoadingCadastro] = useState(false)

	useEffect(() => {
		//setTxtIspb(CONSTANTE.ISPB_RECEBEDOR)
		//setTxtIspbNm(CONSTANTE.NOME_RECEBEDOR)
		//txtTipoPessoa('0')
		setTxtDocumento('1')
		setTxtAgencia('x')
		setTxtConta('')
		// setTxtTipoConta('0')
		setTxtNome('')
		// setTxtTipoChave('0')
		setTxtChave('')
		setIsLoadingCadastro(false)
	}, [])

	const _onPressCriaConta = async () => {
		try {
			Keyboard.dismiss

			setIsLoadingCadastro(true)

			if (txtNome == null || txtNome == '') {
				Alert.alert('Informe o Nome...')
				setIsLoadingCadastro(false)
				return
			}

			if (txtDocumento == null || txtDocumento == '') {
				Alert.alert('Informe o CPF...')
				setIsLoadingCadastro(false)
				return
			}

			if (txtChave == null || txtChave == '') {
				Alert.alert('Informe o Telefone...')
				setIsLoadingCadastro(false)
				return
			}

			if (txtAgencia == null || txtAgencia == '') {
				Alert.alert('Informe a Agência...')
				setIsLoadingCadastro(false)
				return
			}

			if (txtConta == null || txtConta == '') {
				Alert.alert('Informe a Conta...')
				setIsLoadingCadastro(false)
				return
			}

			const nome = txtNome
			const documento = txtDocumento.replace('.', '').replace('.', '').replace('-', '').replace(' ', '')
			const chave = txtChave.replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace(' ', '')
			const agencia = txtAgencia
			const conta = txtConta
			const ispb = txtIspb
			const nomeBanco = txtIspbNm
			const tipoPessoa = txtTipoPessoa
			const tipoConta = txtTipoConta
			const tipoChave = txtTipoChave

			const data = await createChave(currentUser.url, ispb, tipoPessoa, documento, agencia, conta, tipoConta, nome, tipoChave, chave)

			if (data.statusCode != '200') {
				Alert.alert('Erro(Cadastro): ' + data.statusCode + ' - ' + data.message.descricao)
				return
			}

			await HelperSessao.ClearAllSessao()
			await HelperSessao.SetUserChave(chave)
			await HelperSessao.SetUserIspb(ispb)
			await HelperSessao.SetUserNomeBanco(nomeBanco)
			await HelperSessao.SetUserTipoPessoa(tipoPessoa)
			await HelperSessao.SetUserDocumento(documento)
			await HelperSessao.SetUserAgencia(agencia)
			await HelperSessao.SetUserConta(conta)
			await HelperSessao.SetUserTipoConta(tipoConta)
			await HelperSessao.SetUserNome(nome)
			await HelperSessao.SetUserCidade('São Paulo')
			await HelperSessao.SetUserBGColor(currentUser.bgColor)
			await HelperSessao.SetUserIcon(currentUser.icon)

			currentUser.setChave(chave)
			currentUser.setTipoPessoa(tipoPessoa)
			currentUser.setNome(nome)
			currentUser.setDocumento(documento)
			currentUser.setCidade('São Paulo')
			currentUser.setIspb(ispb)
			currentUser.setNomeBanco(nomeBanco)
			currentUser.setAgencia(agencia)
			currentUser.setTipoConta(tipoConta)
			currentUser.setConta(conta)
			currentUser.setSaldo(0)
			currentUser.setLogo(currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3)

			setIsLoadingCadastro(false)
			// Alert.alert('Cadastro ralizado com Sucesso')

			router.replace('/home')
		} catch (err) {
			console.error(err)
			setIsLoadingCadastro(false)
			Alert.alert('Erro(Geral): ' + err.messag)
		} finally {
		}
	}

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'blue' }}>
				<Image source={currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3} style={{ width: 190, height: 90, borderWidth: 0, borderColor: 'red' }} />
			</View>

			<KeyboardAvoidingView style={{ flex: 4, width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 0, borderColor: 'red' }} scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }} behavior="padding" enabled>
				<Text style={{ width: '95%', paddingTop: 5, fontSize: 18, color: currentUser.bgColor, textAlign: 'center', fontWeight: 'bold' }}>Cadastro</Text>

				<TextInput
					editable={true}
					placeholder="Nome"
					autoCapitalize={'none'}
					maxLength={100}
					underlineColorAndroid="transparent"
					returnKeyType={'next'}
					value={txtNome}
					onChangeText={(value) => setTxtNome(value)}
					onEndEditing={() => {
						Keyboard.dismiss
					}}
					style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 5, width: '88%', height: 30 }}
				/>

				<TextInputMask
					type={'cpf'}
					editable={true}
					autoFocus={false}
					placeholder="CPF"
					maxLength={14}
					autoCapitalize={'none'}
					underlineColorAndroid="transparent"
					returnKeyType={'next'}
					value={txtDocumento}
					onChangeText={(value) => {
						setTxtDocumento(value)
					}}
					onEndEditing={() => {
						Keyboard.dismiss
					}}
					style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 5, width: '88%', height: 30 }}
				/>

				<TextInputMask
					type={'cel-phone'}
					options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
					autoFocus={false}
					editable={true}
					placeholder="Telefone"
					autoCorrect={false}
					autoCapitalize={'none'}
					returnKeyType={'next'}
					underlineColorAndroid="transparent"
					value={txtChave}
					onChangeText={(value) => {
						setTxtChave(value)
					}}
					onEndEditing={() => {
						Keyboard.dismiss
					}}
					style={{
						fontSize: 16,
						color: '#000',
						borderBottomWidth: 1,
						borderBottomColor: '#555',
						marginTop: 5,
						marginBottom: 5,
						width: '88%',
						height: 30,
					}}
				/>

				<View style={{ flexDirection: 'row', width: '88%', marginBottom: 10 }}>
					<TextInput
						autoFocus={false}
						editable={true}
						placeholder="Agência"
						maxLength={4}
						autoCorrect={false}
						autoCapitalize={'none'}
						returnKeyType={'next'}
						keyboardType={'numeric'}
						underlineColorAndroid="transparent"
						value={txtAgencia}
						onChangeText={(value) => {
							setTxtAgencia(value)
						}}
						onEndEditing={() => {
							Keyboard.dismiss
						}}
						style={{
							fontSize: 16,
							color: '#000',
							borderBottomWidth: 1,
							borderBottomColor: '#555',
							marginRight: 20,
							marginTop: 5,
							marginBottom: 5,
							width: '35%',
							height: 30,
						}}
					/>

					<TextInput
						autoFocus={false}
						editable={true}
						placeholder="Conta"
						maxLength={20}
						autoCorrect={false}
						autoCapitalize={'none'}
						returnKeyType={'done'}
						keyboardType={'number-pad'}
						underlineColorAndroid="transparent"
						value={txtConta}
						onChangeText={(value) => {
							setTxtConta(value)
						}}
						onEndEditing={() => {
							Keyboard.dismiss
						}}
						style={{
							fontSize: 16,
							color: '#000',
							borderBottomWidth: 1,
							borderBottomColor: '#555',
							marginTop: 5,
							marginBottom: 6,
							width: '60%',
							height: 30,
						}}
					/>
				</View>

				{isLoadingCadastro ? (
					<ActivityIndicator color="#009688" size="large" tyle={{ color: '#fff', fontSize: 18, textAlign: 'center' }} />
				) : (
					<TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 10, marginTop: 10, marginBottom: 7, width: '95%', backgroundColor: currentUser.bgColor }} activeOpacity={0.7} onPress={_onPressCriaConta}>
						<Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>CADASTRAR</Text>
					</TouchableOpacity>
				)}

				<Text style={{ marginTop: 10, textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 16, color: '#6E7B8B', textAlign: 'right' }} onPress={() => router.replace('/login')}>
					Voltar para Login
				</Text>
			</KeyboardAvoidingView>
		</View>
	)
}
