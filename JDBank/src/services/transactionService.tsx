import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const getExtract = async (urlDefault: string) => {
    try {
        const url = urlDefault + CONSTANTE.URL_LANCAMENTO
        const response = await api.get<any>(url)

        const data = response.data
        return data
    } catch (error: any) {
        console.error('transactionService.getExtract:', error)
        throw error
    }
}
