import { useEffect } from 'react'
import { Text, View, Image } from 'react-native'
import { router } from 'expo-router'

import * as HelperSessao from '@/util/HelperSessao'
import * as CONSTANTE from '@/util/Constante'

import imglogoJD from '@/assets/imgs/splash.png'

export default function IndexScreen() {
	useEffect(() => {
		//_inicarSessaoUsuarioPagador()
		//_inicarSessaoUsuarioRecebedor()
		//setTimeout(() => {
		_verificarSessaoUsuario()
		//}, 3000)
	}, [])

	const _inicarSessaoUsuarioPagador = async () => {
		//const userURL = await HelperSessao.GetUserURL()
		//if (userURL == null || userURL == '' || userURL == 'undefined') {
		await HelperSessao.ClearAllSessao()
		await HelperSessao.SetUserURL(CONSTANTE.URL_PAGADOR)
		await HelperSessao.SetUserIspb(CONSTANTE.ISPB_PAGADOR)
		await HelperSessao.SetUserNomeBanco(CONSTANTE.NOME_PAGADOR)
		await HelperSessao.SetUserBGColor(CONSTANTE.BG_VERMELHO)
		await HelperSessao.SetUserIcon(CONSTANTE.ICON_PAGADOR)
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
		//}
	}

	const _verificarSessaoUsuario = async () => {
		const userURL = await HelperSessao.GetUserURL()
		const userChave = await HelperSessao.GetUserChave()
		const userIspb = await HelperSessao.GetUserIspb()
		const userNomeBanco = await HelperSessao.GetUserNomeBanco()
		const userBGColor = await HelperSessao.GetUserBGColor()
		const userIcon = await HelperSessao.GetUserIcon()

		router.replace({
			pathname: '/login',
			params: {
				userURL: userURL || CONSTANTE.URL_PAGADOR,
				userChave: userChave || '',
				userIspb: userIspb || CONSTANTE.ISPB_PAGADOR,
				userNomeBanco: userNomeBanco || CONSTANTE.NOME_PAGADOR,
				userBGColor: userBGColor || CONSTANTE.BG_VERMELHO,
				userIcon: userIcon || CONSTANTE.ICON_PAGADOR,
			},
		})
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
