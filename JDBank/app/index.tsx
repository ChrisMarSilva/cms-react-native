import { useEffect, useContext } from 'react'
import { Text, View, Image } from 'react-native'
import { router } from 'expo-router'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/splash.png'

export default function IndexScreen() {
	const currentUser = useContext(UserContext)

	useEffect(() => {
		_limparDadosUsuario()
		//_inicarSessaoUsuarioPagador()
		//_inicarSessaoUsuarioRecebedor()

		//setTimeout(() => {
		_verificarSessaoUsuario()
		//}, 3000)
	}, [])

	const _limparDadosUsuario = async () => {
		currentUser.setUrl('')
		currentUser.setChave('')
		currentUser.setTipoPessoa('')
		currentUser.setNome('')
		currentUser.setDocumento('')
		currentUser.setCidade('')
		currentUser.setIspb('')
		currentUser.setNomeBanco('')
		currentUser.setAgencia('')
		currentUser.setTipoConta('')
		currentUser.setConta('')
		currentUser.setSaldo('0')
		currentUser.setIcon('')
		currentUser.setLogo('')
		currentUser.setBgColor('')
	}

	const _inicarSessaoUsuarioPagador = async () => {
		//const userURL = await HelperSessao.GetUserURL()
		//if (userURL == null || userURL == '' || userURL == 'undefined') {
		await HelperSessao.ClearAllSessao()
		await HelperSessao.SetUserURL(CONSTANTE.URL_PAGADOR)
		await HelperSessao.SetUserIspb(CONSTANTE.ISPB_PAGADOR)
		await HelperSessao.SetUserNomeBanco(CONSTANTE.NOME_PAGADOR)
		await HelperSessao.SetUserBGColor(CONSTANTE.BG_VERMELHO)
		await HelperSessao.SetUserIcon(CONSTANTE.ICON_PAGADOR)

		currentUser.setUrl(CONSTANTE.URL_PAGADOR)
		currentUser.setIspb(CONSTANTE.ISPB_PAGADOR)
		currentUser.setNomeBanco(CONSTANTE.NOME_PAGADOR)
		currentUser.setLogo(CONSTANTE.BG_VERMELHO)
		currentUser.setBGColor(CONSTANTE.ICON_PAGADOR)
		//}
	}

	const _inicarSessaoUsuarioRecebedor = async () => {
		//const userURL = await HelperSessao.GetUserURL()
		//if (userURL == null || userURL == '' || userURL == 'undefined') {
		await HelperSessao.ClearAllSessao()
		await HelperSessao.SetUserURL(CONSTANTE.URL_RECEBEDOR)
		await HelperSessao.SetUserIspb(CONSTANTE.ISPB_RECEBEDOR)
		await HelperSessao.SetUserNomeBanco(CONSTANTE.NOME_RECEBEDOR)
		await HelperSessao.SetUserBGColor(CONSTANTE.BG_AZUL)
		await HelperSessao.SetUserIcon(CONSTANTE.ICON_RECEBEDOR)

		currentUser.setUrl(CONSTANTE.URL_RECEBEDOR)
		currentUser.setIspb(CONSTANTE.ISPB_RECEBEDOR)
		currentUser.setNomeBanco(CONSTANTE.NOME_RECEBEDOR)
		currentUser.setLogo(CONSTANTE.BG_AZUL)
		currentUser.setBGColor(CONSTANTE.ICON_RECEBEDOR)
		//}
	}

	const _verificarSessaoUsuario = async () => {
		currentUser.setUrl(await HelperSessao.GetUserURL())
		currentUser.setChave(await HelperSessao.GetUserChave())
		currentUser.setIspb(await HelperSessao.GetUserIspb())
		currentUser.setNomeBanco(await HelperSessao.GetUserNomeBanco())
		currentUser.setIcon(await HelperSessao.GetUserIcon())
		currentUser.setBgColor(await HelperSessao.GetUserBGColor())

		router.replace('/login')
		// router.replace('/page1') // para testes
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#fff',
			}}
		>
			<Image
				source={imglogoJD}
				style={{
					width: '100%',
					height: '100%',
					borderWidth: 0,
					borderColor: 'red',
				}}
			/>
		</View>
	)
}
