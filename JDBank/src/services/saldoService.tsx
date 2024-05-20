import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const getSaldo = async (urlDefault: string, agencia: string, conta: string) => {
	try {
		//const url = urlDefault + CONSTANTE.URL_GET_SALDO + '/' + agencia + '/' + conta // CERTO
		const url = urlDefault + CONSTANTE.URL_GET_SALDO + '/' + encodeURIComponent(escape(agencia + '+' + conta)) // DESENV
		const response = await api.get(url)

		const data = response?.data?.saldo ? response.data.saldo : response.data
		return data
	} catch (error: any) {
		console.error('getSaldo:', error)
		throw error
	}
}
