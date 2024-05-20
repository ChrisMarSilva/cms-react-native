import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const getChave = async (urlDefault: string, chave: string) => {
	try {
		const url = urlDefault + CONSTANTE.URL_GET_CHAVE + '?chave=' + encodeURIComponent(escape(chave))
		const response = await api.get(url)

		const data = Array.isArray(response.data) ? response.data[0] : response.data
		return data
	} catch (error: any) {
		console.error('getChave:', error)
		throw error
	}
}

export const createChave = async (urlDefault: string, ispb: string, tipoPessoa, documento: string, agencia: string, conta: string, tipoConta: string, nome: string, tipoChave: string, chave: string) => {
	try {
		const url = urlDefault + CONSTANTE.URL_POST_CHAVE
		// const body = JSON.parse(`{"recebedor":{"ispb":${ispb},"tipoPessoa":${tipoPessoa},"documento":${documento},"agencia":"${agencia}","conta":"${conta}","tipoConta":${tipoConta},"nome":"${nome}"},"tipoChave":${tipoChave},"chave":"${chave}"}`)
		const body = { recebedor: { ispb: ispb, tipoPessoa: tipoPessoa, documento: documento, agencia: agencia, conta: conta, tipoConta: tipoConta, nome: nome }, tipoChave: tipoChave, chave: chave }
		const response = await api.post(url, body)

		//const data = response.data // CERTO
		const data = { statusCode: '200', message: { descricao: 'Chave criada com sucesso!' } } // DESENV

		return data
	} catch (error: any) {
		console.error('createChave:', error)
		throw error
	}
}

// type UserProps = {
// 	id: number
// 	userId: number
// 	title: string
// 	body: string
// }

// export const fetchLogin = async(userId: string): Promise<UserProps> {
// export const fetchLogin = async (): Promise<UserProps[]> => {

// if (!data) return { ok: false, data: null, error: 'Erro geral' }
// if (data.error) return { ok: false, data: null, error: data.error }
// return { ok: true, data: data, error: null }

// const response = await api.get<PostProps[]>(`posts?userId=${userId}`)
// const body = { id: formData.id, name: formData.name, email: formData.email }
// const res = await api.post<User>('user', body)
// const res = await api.delete<UserProps>(`user/${id}`)

//return error.message // return { ok: false, data: null, error: error }
// throw error // throw new Error('Failed to fetch user')
// return error
