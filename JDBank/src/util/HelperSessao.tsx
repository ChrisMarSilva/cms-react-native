import AsyncStorage from '@react-native-async-storage/async-storage'

import * as CONSTANTE from '@/src/util/Constante'

export const GetUrl = async () => await GetSessao(CONSTANTE.SESSAO_URL)
export const GetUsername = async () => await GetSessao(CONSTANTE.SESSAO_USERNAME)
export const GetBank = async () => await GetSessao(CONSTANTE.SESSAO_BANK)
// export const GetUserChave = async () => await GetSessao(CONSTANTE.SESSAO_USER_CHAVE)
// export const GetUserIspb = async () => await GetSessao(CONSTANTE.SESSAO_USER_ISPB_IF)
// export const GetUserNomeBanco = async () => await GetSessao(CONSTANTE.SESSAO_USER_NOME_IF)
// export const GetUserTipoPessoa = async () => await GetSessao(CONSTANTE.SESSAO_USER_DOC_TP)
// export const GetUserDocumento = async () => await GetSessao(CONSTANTE.SESSAO_USER_DOC_NRO)
// export const GetUserAgencia = async () => await GetSessao(CONSTANTE.SESSAO_USER_AGENCIA)
// export const GetUserConta = async () => await GetSessao(CONSTANTE.SESSAO_USER_CONTA_NRO)
// export const GetUserTipoConta = async () => await GetSessao(CONSTANTE.SESSAO_USER_CONTA_TP)
// export const GetUserNome = async () => await GetSessao(CONSTANTE.SESSAO_USER_NOME)
// export const GetUserCidade = async () => await GetSessao(CONSTANTE.SESSAO_USER_CIDADE)
// export const GetUserBGColor = async () => await GetSessao(CONSTANTE.SESSAO_USER_BGCOLOR)
// export const GetUserBGColorScreen = async () => await GetSessao(CONSTANTE.SESSAO_USER_BGCOLOR_SCREEN)
// export const GetUserIcon = async () => await GetSessao(CONSTANTE.SESSAO_USER_ICON)

export const SetUrl = async (value: string) => await SetSessao(CONSTANTE.SESSAO_URL, value)
export const SetUsername = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USERNAME, value)
export const SetBank = async (value: string) => await SetSessao(CONSTANTE.SESSAO_BANK, value)
// export const SetUserChave = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_CHAVE, value)
// export const SetUserIspb = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_ISPB_IF, value)
// export const SetUserNomeBanco = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_NOME_IF, value)
// export const SetUserTipoPessoa = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_DOC_TP, value)
// export const SetUserDocumento = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_DOC_NRO, value)
// export const SetUserAgencia = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_AGENCIA, value)
// export const SetUserConta = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_CONTA_NRO, value)
// export const SetUserTipoConta = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_CONTA_TP, value)
// export const SetUserNome = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_NOME, value)
// export const SetUserCidade = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_CIDADE, value)
// export const SetUserBGColor = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_BGCOLOR, value)
// export const SetUserBGColorScreen = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_BGCOLOR_SCREEN, value)
// export const SetUserIcon = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USER_ICON, value)

export const RemoveUserURL = async () => await ClearSessao(CONSTANTE.SESSAO_URL)
export const RemoveUsername = async () => await ClearSessao(CONSTANTE.SESSAO_USERNAME)
export const RemoveBank = async () => await ClearSessao(CONSTANTE.SESSAO_BANK)
// export const RemoveUserChave = async () => await ClearSessao(CONSTANTE.SESSAO_USER_CHAVE)
// export const RemoveUserIspb = async () => await ClearSessao(CONSTANTE.SESSAO_USER_ISPB_IF)
// export const RemoveUserNomeBanco = async () => await ClearSessao(CONSTANTE.SESSAO_USER_NOME_IF)
// export const RemoveUserTipoPessoa = async () => await ClearSessao(CONSTANTE.SESSAO_USER_DOC_TP)
// export const RemoveUserDocumento = async () => await ClearSessao(CONSTANTE.SESSAO_USER_DOC_NRO)
// export const RemoveUserAgencia = async () => await ClearSessao(CONSTANTE.SESSAO_USER_AGENCIA)
// export const RemoveUserConta = async () => await ClearSessao(CONSTANTE.SESSAO_USER_CONTA_NRO)
// export const RemoveUserTipoConta = async () => await ClearSessao(CONSTANTE.SESSAO_USER_CONTA_TP)
// export const RemoveUserNome = async () => await ClearSessao(CONSTANTE.SESSAO_USER_NOME)
// export const RemoveUserCidade = async () => await ClearSessao(CONSTANTE.SESSAO_USER_CIDADE)
// export const RemoveUserBGColor = async () => await ClearSessao(CONSTANTE.SESSAO_USER_BGCOLOR)
// export const RemoveUserBGColoScreenr = async () => await ClearSessao(CONSTANTE.SESSAO_USER_BGCOLOR_SCREEN)
// export const RemoveUserIcon = async () => await ClearSessao(CONSTANTE.SESSAO_USER_ICON)

export const GetSessao = async (Chave: string) => {
    try {
        const value = await AsyncStorage.getItem(Chave)

        return value || ''
    } catch (error) {
        return ''
    }
}

export const SetSessao = async (Chave: string, value: string) => {
    try {
        return await AsyncStorage.setItem(Chave, value.toString())
    } catch (error) {
        return false
    }
}

export const ClearSessao = async (Chave: string) => {
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
