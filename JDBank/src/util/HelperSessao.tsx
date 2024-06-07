import AsyncStorage from '@react-native-async-storage/async-storage'

import * as CONSTANTE from '@/src/util/Constante'

export const GetUrl = async () => await GetSessao(CONSTANTE.SESSAO_URL)
export const GetBank = async () => await GetSessao(CONSTANTE.SESSAO_BANK)
export const GetIspb = async () => await GetSessao(CONSTANTE.SESSAO_ISPB)
export const GetUsername = async () => await GetSessao(CONSTANTE.SESSAO_USERNAME)
export const GetRecipients = async () => await GetSessao(CONSTANTE.SESSAO_RECIPIENTS)
export const GetReceiveIspb = async () => await GetSessao(CONSTANTE.SESSAO_RECEIVE_BANK_ISPB)
export const GetReceiveBank = async () => await GetSessao(CONSTANTE.SESSAO_RECEIVE_BANK_URL)
export const GetReceiveUrl = async () => await GetSessao(CONSTANTE.SESSAO_RECEIVE_BANK_NAME)
export const GetPaymentIspb = async () => await GetSessao(CONSTANTE.SESSAO_PAYMENT_BANK_ISPB)
export const GetPaymentBank = async () => await GetSessao(CONSTANTE.SESSAO_PAYMENT_BANK_NAME)
export const GetPaymentUrl = async () => await GetSessao(CONSTANTE.SESSAO_PAYMENT_BANK_URL)

export const SetUrl = async (value: string) => await SetSessao(CONSTANTE.SESSAO_URL, value)
export const SetBank = async (value: string) => await SetSessao(CONSTANTE.SESSAO_BANK, value)
export const SetIspb = async (value: string) => await SetSessao(CONSTANTE.SESSAO_ISPB, value)
export const SetUsername = async (value: string) => await SetSessao(CONSTANTE.SESSAO_USERNAME, value)
export const SetRecipients = async (value: string) => await SetSessao(CONSTANTE.SESSAO_RECIPIENTS, value)
export const SetReceiveIspb = async (value: string) => await SetSessao(CONSTANTE.SESSAO_RECEIVE_BANK_ISPB, value)
export const SetReceiveBank = async (value: string) => await SetSessao(CONSTANTE.SESSAO_RECEIVE_BANK_URL, value)
export const SetReceiveUrl = async (value: string) => await SetSessao(CONSTANTE.SESSAO_RECEIVE_BANK_NAME, value)
export const SetPaymentIspb = async (value: string) => await SetSessao(CONSTANTE.SESSAO_PAYMENT_BANK_ISPB, value)
export const SetPaymentBank = async (value: string) => await SetSessao(CONSTANTE.SESSAO_PAYMENT_BANK_NAME, value)
export const SetPaymentUrl = async (value: string) => await SetSessao(CONSTANTE.SESSAO_PAYMENT_BANK_URL, value)

export const RemoveUserURL = async () => await ClearSessao(CONSTANTE.SESSAO_URL)
export const RemoveBank = async () => await ClearSessao(CONSTANTE.SESSAO_BANK)
export const RemoveIspb = async () => await ClearSessao(CONSTANTE.SESSAO_ISPB)
export const RemoveUsername = async () => await ClearSessao(CONSTANTE.SESSAO_USERNAME)
export const RemoveRecipients = async () => await ClearSessao(CONSTANTE.SESSAO_RECIPIENTS)
export const RemoveReceiveIspb = async () => await ClearSessao(CONSTANTE.SESSAO_RECEIVE_BANK_ISPB)
export const RemoveReceiveBank = async () => await ClearSessao(CONSTANTE.SESSAO_RECEIVE_BANK_URL)
export const RemoveReceiveUrl = async () => await ClearSessao(CONSTANTE.SESSAO_RECEIVE_BANK_NAME)
export const RemovePaymentIspb = async () => await ClearSessao(CONSTANTE.SESSAO_PAYMENT_BANK_ISPB)
export const RemovePaymentBank = async () => await ClearSessao(CONSTANTE.SESSAO_PAYMENT_BANK_NAME)
export const RemovePaymentUrl = async () => await ClearSessao(CONSTANTE.SESSAO_PAYMENT_BANK_URL)

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
