import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const getBalance = async (urlDefault: string, username: string) => {
    try {
        const url = urlDefault + CONSTANTE.URL_BALANCE + '?username=' + encodeURIComponent(escape(username.trim()))
        // const response = await api.get<any>(url)

        // const data = Array.isArray(response.data)
        //     ? response?.data[0]?.balance
        //         ? response.data[0].balance
        //         : response.data[0]
        //     : response?.data?.balance
        //         ? response.data.balance
        //         : response.data

        // const data = { id: '1', username: 'clientpay1',  balance: '1234.56'}
        const data = 1000000.0

        return data
    } catch (error: any) {
        console.error('getBalance:', error)
        throw error
    }
}
