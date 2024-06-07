import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const getLogin = async (urlDefault: string, username: string) => {
    try {

        username = username.replace('( ', '').replace(') ', '').replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace(' ', '')
        console.log('loginService.getLogin - username:', username)

        const url = urlDefault + CONSTANTE.URL_LOGIN + '?chave=' + encodeURIComponent(escape(username))
        console.log('loginService.getLogin - url:', url)

        const response = await api.get<any>(url)

        const data = Array.isArray(response.data) ? response.data[0] : response.data
        console.log('loginService.getLogin - data:', data)

        const result = {
            id: '1',
            username: username,
            password: '123',
            name: data?.nome || '',
            email: 'client@gmail.com',
            phone: '(949) 402-4538',
            socialSecurity: '000–00–0000',
            birth: '01/01/2020',
            country: 'United States',
            citizen: 'Yes',
            address: '123 Main St, Anytown',
            cardOrAccount: '1111112222',
            ispb: data?.ispb || '',
            bank: data?.nomeBanco || '',
            tipoPessoa: data?.tipoPessoa || '',
            documento: data?.documento || '',
            agencia: data?.agencia || '',
            conta: data?.conta || '',
            tipoConta: data?.tipoConta || '',
        }

        console.log('loginService.getLogin - result:', result)

        return result
    } catch (error: any) {
        console.error('getLogin:', error)
        throw error
    }
}

export const createLogin = async (urlDefault: string, name: string, address: string, phone: string, email: string, cardOrAccount: string, socialSecurity: string, username: string, password: string) => {
    try {
        const url = urlDefault + CONSTANTE.URL_ENROLL
        // JSON.stringify({"garcom": garcom.toString()}),
        const body = { name: name, address: address, phone: phone, email: email, cardOrAccount: cardOrAccount, socialSecurity: socialSecurity, username: username, password: password }
        //const response = await api.post<any>(url, body)

        // console.log('1-body: ', typeof body, body)
        // console.log('2-parse: ', typeof JSON.parse(body), JSON.parse(body))
        // console.log('3-stringify: ', typeof JSON.stringify(body), JSON.stringify(body))

        //const data = response.data

        const data = {
            id: '123',
            username: username,
            password: password,
            name: name,
            email: email,
            phone: phone,
            socialSecurity: socialSecurity,
            birth: '01/01/2020',
            country: 'United States',
            citizen: 'Yes',
            address: address,
            cardOrAccount: cardOrAccount,
        }

        return data
    } catch (error: any) {
        console.error('createChave:', error)
        throw error
    }
}
