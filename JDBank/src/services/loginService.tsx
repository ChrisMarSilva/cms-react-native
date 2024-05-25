import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const getLogin = async (urlDefault: string, username: string, password: string) => {
    try {
        //const url = urlDefault + CONSTANTE.URL_LOGIN + '?username=' + encodeURIComponent(escape(username.trim())) + '&password=' + encodeURIComponent(escape(password.trim()))
        const url = urlDefault + CONSTANTE.URL_LOGIN + '?username=' + encodeURIComponent(escape(username.trim()))
        const response = await api.get<any>(url)

        const data = Array.isArray(response.data) ? response.data[0] : response.data
        return data
    } catch (error: any) {
        console.error('getLogin:', error)
        throw error
    }
}

export const createLogin = async (urlDefault: string, name: string, address: string, phone: string, email: string, cardOrAccount: string, socialSecurity: string, username: string, password: string) => {
    try {
        const url = urlDefault + CONSTANTE.URL_ENROLL
        const body = { name: name, address: address, phone: phone, email: email, cardOrAccount: cardOrAccount, socialSecurity: socialSecurity, username: username, password: password }
        const response = await api.post<any>(url, body)

        // console.log('1-body: ', typeof body, body)
        // console.log('2-parse: ', typeof JSON.parse(body), JSON.parse(body))
        // console.log('3-stringify: ', typeof JSON.stringify(body), JSON.stringify(body))

        const data = response.data
        // const data = { statusCode: '200', message: { descricao: 'Chave criada com sucesso!' } } // DESENV

        return data
    } catch (error: any) {
        console.error('createChave:', error)
        throw error
    }
}
