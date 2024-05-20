import AsyncStorage from '@react-native-async-storage/async-storage'

import * as CONSTANTE from '@/src/util/Constante'

export const GetUserChave = async () => await GetSessao(CONSTANTE.SESSAO_USER_CHAVE)
export const GetUserIspb = async () => await GetSessao(CONSTANTE.SESSAO_USER_ISPB_IF)
export const GetUserNomeBanco = async () => await GetSessao(CONSTANTE.SESSAO_USER_NOME_IF)
export const GetUserTipoPessoa = async () => await GetSessao(CONSTANTE.SESSAO_USER_DOC_TP)
export const GetUserDocumento = async () => await GetSessao(CONSTANTE.SESSAO_USER_DOC_NRO)
export const GetUserAgencia = async () => await GetSessao(CONSTANTE.SESSAO_USER_AGENCIA)
export const GetUserConta = async () => await GetSessao(CONSTANTE.SESSAO_USER_CONTA_NRO)
export const GetUserTipoConta = async () => await GetSessao(CONSTANTE.SESSAO_USER_CONTA_TP)
export const GetUserNome = async () => await GetSessao(CONSTANTE.SESSAO_USER_NOME)
export const GetUserCidade = async () => await GetSessao(CONSTANTE.SESSAO_USER_CIDADE)
export const GetUserURL = async () => await GetSessao(CONSTANTE.SESSAO_USER_URL)
export const GetUserBGColor = async () => await GetSessao(CONSTANTE.SESSAO_USER_BGCOLOR)
export const GetUserBGColorScreen = async () => await GetSessao(CONSTANTE.SESSAO_USER_BGCOLOR_SCREEN)
export const GetUserIcon = async () => await GetSessao(CONSTANTE.SESSAO_USER_ICON)

export const SetUserURL = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_URL, Value)
export const SetUserChave = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_CHAVE, Value)
export const SetUserIspb = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_ISPB_IF, Value)
export const SetUserNomeBanco = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_NOME_IF, Value)
export const SetUserTipoPessoa = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_DOC_TP, Value)
export const SetUserDocumento = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_DOC_NRO, Value)
export const SetUserAgencia = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_AGENCIA, Value)
export const SetUserConta = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_CONTA_NRO, Value)
export const SetUserTipoConta = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_CONTA_TP, Value)
export const SetUserNome = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_NOME, Value)
export const SetUserCidade = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_CIDADE, Value)
export const SetUserBGColor = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_BGCOLOR, Value)
export const SetUserBGColorScreen = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_BGCOLOR_SCREEN, Value)
export const SetUserIcon = async (Value) => await SetSessao(CONSTANTE.SESSAO_USER_ICON, Value)

export const RemoveUserURL = async () => await ClearSessao(CONSTANTE.SESSAO_USER_URL)
export const RemoveUserChave = async () => await ClearSessao(CONSTANTE.SESSAO_USER_CHAVE)
export const RemoveUserIspb = async () => await ClearSessao(CONSTANTE.SESSAO_USER_ISPB_IF)
export const RemoveUserNomeBanco = async () => await ClearSessao(CONSTANTE.SESSAO_USER_NOME_IF)
export const RemoveUserTipoPessoa = async () => await ClearSessao(CONSTANTE.SESSAO_USER_DOC_TP)
export const RemoveUserDocumento = async () => await ClearSessao(CONSTANTE.SESSAO_USER_DOC_NRO)
export const RemoveUserAgencia = async () => await ClearSessao(CONSTANTE.SESSAO_USER_AGENCIA)
export const RemoveUserConta = async () => await ClearSessao(CONSTANTE.SESSAO_USER_CONTA_NRO)
export const RemoveUserTipoConta = async () => await ClearSessao(CONSTANTE.SESSAO_USER_CONTA_TP)
export const RemoveUserNome = async () => await ClearSessao(CONSTANTE.SESSAO_USER_NOME)
export const RemoveUserCidade = async () => await ClearSessao(CONSTANTE.SESSAO_USER_CIDADE)
export const RemoveUserBGColor = async () => await ClearSessao(CONSTANTE.SESSAO_USER_BGCOLOR)
export const RemoveUserBGColoScreenr = async () => await ClearSessao(CONSTANTE.SESSAO_USER_BGCOLOR_SCREEN)
export const RemoveUserIcon = async () => await ClearSessao(CONSTANTE.SESSAO_USER_ICON)

export const GetSessao = async (Chave) => {
	try {
		const value = await AsyncStorage.getItem(Chave)

		return value || ''
	} catch (error) {
		return ''
	}
}

export const SetSessao = async (Chave, Value) => {
	try {
		return await AsyncStorage.setItem(Chave, Value.toString())
	} catch (error) {
		return false
	}
}

export const ClearSessao = async (Chave) => {
	try {
		return await AsyncStorage.removeItem(Chave)
	} catch (error) {
		return false
	}
}

export const ClearAllSessao = async () => {
	try {
		await AsyncStorage.clear()
	} catch (error) {
		return false
	}
}
