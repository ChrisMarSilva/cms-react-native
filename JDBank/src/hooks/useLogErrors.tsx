/* eslint-disable @typescript-eslint/no-explicit-any */
import * as HelperSessao from '@/src/util/HelperSessao'

const useLogErrors = () => {
    const handleAddLogErrors = async (tela = '', url = '', params = {}, statuscod = '', message = '') => {
        try {
            //console.error('')
            //console.error('useLogErrors.handleAddLogErrors')
            //console.error('tela:', tela)
            //console.error('url:', url)
            //console.error('params:', params)
            //console.error('statuscod:', statuscod)
            //console.error('message:', message)

            const logErrorSession = await HelperSessao.GetLogErrors()
            //console.error('logErrorSession:', logErrorSession)

            const lista = logErrorSession ? JSON.parse(logErrorSession) : []
            //console.error('lista:', lista)

            if (lista.length >= 100) lista.shift() // verifica se a lista eh maior que o limite de registros // removendo o primeiro item da lista
            //console.error('lista.length:', lista.length)

            const today = new Date()
            const datetime = (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getDate().toString().padStart(2, '0') + '/' + today.getFullYear() + ' ' + today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0') + ':' + today.getSeconds().toString().padStart(2, '0')
            //console.error('datetime:', datetime)

            const item = { datahora: datetime, tela: tela, url: url, params: JSON.stringify(params), statuscod: statuscod, message: JSON.stringify(message) }
            //console.error('item:', item)

            lista.push(item) // push-ultimo // unshift-primeiro

            await HelperSessao.SetLogErrors(JSON.stringify(lista))
        } catch (error) {
            console.error('useLogErrors.handleAddLogErrors', error)
        }
    }

    return {
        handleAddLogErrors,
    }
}

export default useLogErrors
