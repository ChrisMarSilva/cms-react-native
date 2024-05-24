import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const getLogin = async (urlDefault: string, username: string, password: string) => {
    try {
        //const url = urlDefault + CONSTANTE.URL_LOGIN + '?username=' + encodeURIComponent(escape(username.trim())) + '&password=' + encodeURIComponent(escape(password.trim()))
        const url = urlDefault + CONSTANTE.URL_LOGIN + '?username=' + encodeURIComponent(escape(username.trim()))
        const response = await api.get(url)

        const data = Array.isArray(response.data) ? response.data[0] : response.data
        return data
    } catch (error: any) {
        console.error('getLogin:', error)
        throw error
    }
}
