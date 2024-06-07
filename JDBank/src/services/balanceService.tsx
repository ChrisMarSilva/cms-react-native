import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const getBalance = async (urlDefault: string, agencia: string, conta: string) => {
    try {
        const url = urlDefault + CONSTANTE.URL_BALANCE + '/' + agencia + '/' + conta

        //currentUser.agencia, currentUser.conta

        console.log('balanceService.getBalance')
        console.log('url:', url)

        const response = await api.get<any>(url)

        const data = response.data
        // const data = { id: '1', username: 'clientpay1',  balance: '1234.56'}
        // const data = 1000000.0
        // const data = Array.isArray(response.data) ? (response?.data[0]?.balance ? response.data[0].balance : response.data[0]) : response?.data?.balance ? response.data.balance : response.data

        console.log('data:', data)
        console.log('-----------------------------')

        return data
    } catch (error: any) {
        console.error('getBalance:', error)
        throw error
    }
}
