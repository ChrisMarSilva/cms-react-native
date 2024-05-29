import axios from 'axios'

import * as CONSTANTE from '@/src/util/Constante'

const api = axios.create({
	baseURL: '',
	timeout: CONSTANTE.URL_TIMEOUT,
    // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
	headers: {
		'Cache-Control': 'no-cache',
		'Content-Type': 'application/json; charset=utf-8',
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

// request interceptor
api.interceptors.request.use(
	async (config) => {
		//console.info(config);
		return config
	},
	(error) => {
		console.error('api.interceptors.request.error')
		console.error(error)
		return Promise.reject(error)
	}
)

// response interceptor
api.interceptors.response.use(
	async (response) => {
		//console.info(response);
		return response
	},
	(error) => {
		console.error('api.interceptors.response.error')
		console.error(error)
		return Promise.reject(error)
	}
)

export default api
