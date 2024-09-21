/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'
import useLogErrors from '@/src/hooks/useLogErrors'

export const getBalance = async (urlDefault: string, agencia: string, conta: string) => {
    const { handleAddLogErrors } = useLogErrors()

    const url = urlDefault + CONSTANTE.URL_BALANCE + '/' + agencia + '/' + conta
    const params = {}
    //console.log('balanceService.getBalance - url:', url)

    try {
        const response = await api.get<any>(url)

        const data = response.data
        return data
    } catch (error: any) {
        //console.error('getBalance:', error)
        const statuscod = error.response ? error.response.status : '400' // 400 Bad Request
        const message = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
        handleAddLogErrors('getBalance', url, params, statuscod, message)
        throw error
    }
}
