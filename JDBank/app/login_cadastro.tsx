import { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'

import * as HelperSessao from '@/util/HelperSessao'
import * as CONSTANTE from '@/util/Constante'

import imglogoJD from '@/assets/imgs/logo-red.png'
import imglogoJ3 from '@/assets/imgs/logo-blue.png'

export default function LoginCadastroScreen() {
	const navigation = useNavigation()
	const params = useLocalSearchParams()

	useEffect(() => {
		navigation.setOptions({ headerShown: false })
	}, [navigation])

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

	let { userURL, userChave, userIspb, userNomeBanco, userDocumento, userAgencia, userConta, userNome, userBGColor, userIcon } = useLocalSearchParams()
	const userBGColorScreen = '#fff'
	const userlogo = userBGColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3

	const _onPressCriaConta = async () => {
		try {
			if (txtNome == null || txtNome == '') {
				Alert.alert('Informe o Nome...')
				return
			}

			if (txtDocumento == null || txtDocumento == '') {
				Alert.alert('Informe o CPF...')
				return
			}

			if (txtChave == null || txtChave == '') {
				Alert.alert('Informe o Telefone...')
				return
			}

			if (txtAgencia == null || txtAgencia == '') {
				Alert.alert('Informe a Agência...')
				return
			}

			if (txtConta == null || txtConta == '') {
				Alert.alert('Informe a Conta...')
				return
			}

			setIsLoadingCadastro(true)

			_cadastrarChaveUsuario(txtIspb, txtIspbNm, txtTipoPessoa, txtDocumento, txtAgencia, txtConta, txtTipoConta, txtNome, txtTipoChave, txtChave)
		} catch (err) {
			Alert.alert('Erro(Geral): ' + err.messag)
		} finally {
		}
	}

	const _cadastrarChaveUsuario = async (ispb, IspbNm, tipoPessoa, documento, agencia, conta, tipoConta, nome, tipoChave, chave) => {
		try {
			documento = documento.replace('.', '').replace('.', '').replace('-', '').replace(' ', '')
			chave = chave.replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace(' ', '')

			axios({
				method: 'post',
				url: (userURL || CONSTANTE.URL_PAGADOR) + CONSTANTE.URL_POST_CHAVE,
				timeout: CONSTANTE.URL_TIMEOUT,
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				data: JSON.parse(`{"recebedor":{"ispb":${ispb},"tipoPessoa":${tipoPessoa},"documento":${documento},"agencia":"${agencia}","conta":"${conta}","tipoConta":${tipoConta},"nome":"${nome}"},"tipoChave":${tipoChave},"chave":"${chave}"}`),
			})
				.then((response) => {
					setIsLoadingCadastro(false)
					try {
						if (response.data.statusCode == '200') {
							Alert.alert('Cadastro ralizado com Sucesso')
							_realizarLogin(chave, ispb, IspbNm, tipoPessoa, documento, agencia, conta, tipoConta, nome)
						} else {
							Alert.alert('Erro(Cadastro): ' + response.data.statusCode + ' - ' + response.data.message.descricao)
						}
					} catch (err) {
						Alert.alert('Erro(Response): ' + err.message)
					}
				})
				.catch((err) => {
					setIsLoadingCadastro(false)
					if (err.response) {
						Alert.alert(JSON.parse(err.response.data.message).descricao)
					} else if (err.request) {
						Alert.alert('Erro na Requição')
					} else {
						Alert.alert(err.message)
					}
				})
		} catch (err) {
			setIsLoadingCadastro(false)
			Alert.alert('Erro(Geral): ' + err.messag)
		}
	}

	const _realizarLogin = async (chave, ispb, nomeBanco, tipoPessoa, documento, agencia, conta, tipoConta, nome) => {
		await HelperSessao.ClearAllSessao()
		await HelperSessao.SetUserURL(userURL.toString())
		await HelperSessao.SetUserChave(chave.toString())
		await HelperSessao.SetUserIspb(userIspb.toString())
		await HelperSessao.SetUserNomeBanco(userNomeBanco.toString())
		await HelperSessao.SetUserTipoPessoa(tipoPessoa.toString())
		await HelperSessao.SetUserDocumento(documento.toString())
		await HelperSessao.SetUserAgencia(agencia.toString())
		await HelperSessao.SetUserConta(conta.toString())
		await HelperSessao.SetUserTipoConta(tipoConta.toString())
		await HelperSessao.SetUserNome(nome.toString())
		await HelperSessao.SetUserCidade('São Paulo')
		await HelperSessao.SetUserBGColor(userBGColor)
		await HelperSessao.SetUserIcon(userIcon)

		setIsLoadingCadastro(false)

		router.navigate({
			pathname: '/home',
			params: {
				userURL: userURL,
				userChave: chave,
				userIspb: userIspb,
				userNomeBanco: userNomeBanco,
				userTipoPessoa: tipoPessoa,
				userDocumento: documento,
				userAgencia: agencia,
				userConta: conta,
				userTipoConta: tipoConta,
				userNome: nome,
				userCidade: 'São Paulo',
				userBGColor: userBGColor || CONSTANTE.BG_VERMELHO,
				userIcon: userIcon || CONSTANTE.ICON_PAGADOR,
				userSaldo: '0',
			},
		})
	}

	return (
		<View style={{ flex: 1, backgroundColor: userBGColorScreen }}>
			<View
				style={{
					flex: 2,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 0,
					borderColor: 'blue',
				}}
			>
				<Image source={userlogo} style={{ width: 190, height: 90, borderWidth: 0, borderColor: 'red' }} />
			</View>
			<KeyboardAvoidingView
				style={{
					flex: 4,
					width: '100%',
					justifyContent: 'flex-start',
					alignItems: 'center',
					borderWidth: 0,
					borderColor: 'red',
				}}
				scrollEnabled={false}
				resetScrollToCoords={{ x: 0, y: 0 }}
				behavior="padding"
				enabled
			>
				<Text
					style={{
						width: '95%',
						paddingTop: 5,
						fontSize: 18,
						color: userBGColor,
						textAlign: 'center',
						fontWeight: 'bold',
					}}
				>
					Cadastro
				</Text>

				<TextInput
					//ref="TextInputNome"
					editable={true}
					placeholder="Nome"
					autoCapitalize={'none'}
					maxLength={100}
					underlineColorAndroid="transparent"
					returnKeyType={'next'}
					value={txtNome}
					onChangeText={(value) => setTxtNom(value)}
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

				<TextInputMask
					//ref="TextInputDocumento"
					type={'cpf'}
					editable={true}
					autoFocus={false}
					placeholder="CPF"
					maxLength={11}
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

				<TextInputMask
					// ref="TextInputChave"
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
						//ref="TextInputAgencia"
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
						//ref="TextInputConta"
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
					<TouchableOpacity
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							borderRadius: 10,
							marginTop: 10,
							marginBottom: 7,
							width: '95%',
							backgroundColor: userBGColor,
						}}
						activeOpacity={0.7}
						onPress={() => {
							Keyboard.dismiss
							_onPressCriaConta()
						}}
					>
						<Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>CADASTRAR</Text>
					</TouchableOpacity>
				)}

				<Text
					style={{
						marginTop: 10,
						textDecorationLine: 'underline',
						fontWeight: 'bold',
						fontSize: 16,
						color: '#6E7B8B',
						textAlign: 'right',
					}}
					onPress={() => {
						router.replace('/login')
					}}
				>
					Voltar para Login
				</Text>
			</KeyboardAvoidingView>
		</View>
	)
}
