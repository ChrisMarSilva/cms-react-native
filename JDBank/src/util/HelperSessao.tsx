import AsyncStorage from '@react-native-async-storage/async-storage'

import * as CONSTANTE from '@/src/util/Constante'

export const GetUrl = async () => await GetSessao(CONSTANTE.SESSAO_URL)
export const GetBank = async () => await GetSessao(CONSTANTE.SESSAO_BANK)
export const GetIspb = async () => await GetSessao(CONSTANTE.SESSAO_ISPB)
export const GetUsername = async () => await GetSessao(CONSTANTE.SESSAO_USERNAME)
export const GetRecipients = async () => await GetSessao(CONSTANTE.SESSAO_RECIPIENTS)
export const GetLogErrors = async () => await GetSessao(CONSTANTE.SESSAO_LOG_ERROS)

export const SetUrl = async (value: string) => await SetSessao(CONSTANTE.SESSAO_URL, value)
export const SetBank = async (value: string) => await SetSessao(CONSTANTE.SESSAO_BANK, value)
export const SetIspb = async (value: string) => await SetSessao(CONSTANTE.SESSAO_ISPB, value)
export const SetUsername = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USERNAME, value)
export const SetRecipients = async (value: string) => await SetSessao(CONSTANTE.SESSAO_RECIPIENTS, value)
export const SetLogErrors = async (value: string) => await SetSessao(CONSTANTE.SESSAO_LOG_ERROS, value)

export const RemoveUserURL = async () => await ClearSessao(CONSTANTE.SESSAO_URL)
export const RemoveBank = async () => await ClearSessao(CONSTANTE.SESSAO_BANK)
export const RemoveIspb = async () => await ClearSessao(CONSTANTE.SESSAO_ISPB)
export const RemoveUsername = async () => await ClearSessao(CONSTANTE.SESSAO_USERNAME)
export const RemoveRecipients = async () => await ClearSessao(CONSTANTE.SESSAO_RECIPIENTS)

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
