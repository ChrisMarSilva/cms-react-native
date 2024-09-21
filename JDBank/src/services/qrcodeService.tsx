/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'
import useLogErrors from '@/src/hooks/useLogErrors'

export const createQrCode = async (urlDefault: string, chave: string, name: string, value: number) => {
    const { handleAddLogErrors } = useLogErrors()

    const url = urlDefault + CONSTANTE.URL_QRCODE_GENERATE
    chave = chave.replace('( ', '').replace(') ', '').replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace(' ', '')
    const body = JSON.parse(` {"chaveIdentificacao":"${chave}","nomeRecebedor":"${name}","cidade":"São Paulo","valor":${value}}`)
    //console.log('qrcodeService.createQrCode - data:', data)

    try {
        const response = await api.post(url, body)

        const data = response.data
        //console.log('qrcodeService.createQrCode - data:', data)

        return data
    } catch (error: any) {
        //console.error('createQrCode:', error)
        const statuscod = error.response ? error.response.status : '400' // 400 Bad Request
        const message = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
        handleAddLogErrors('createQrCode', url, body, statuscod, message)
        throw error
    }
}

export const sendQrCode = async (urlDefault: string, qrcode: string) => {
    const { handleAddLogErrors } = useLogErrors()

    const url = urlDefault + CONSTANTE.URL_QRCODE_SEND
    const body = JSON.stringify({ emv: qrcode })
    //console.log('qrcodeService.sendQrCode - data:', data)

    try {
        const response = await api.post(url, body)

        const data = {
            value: parseFloat(response.data.transactionAmount),
            name: response.data.merchantName,
            info: response.data.additionalDataField,
            chave: response.data.merchantAccountInformation.itens[1].descricao,
            //
        }

        return data
    } catch (error: any) {
        //console.error('sendQrCode:', error)
        const statuscod = error.response ? error.response.status : '400' // 400 Bad Request
        const message = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
        handleAddLogErrors('sendQrCode', url, body, statuscod, message)
        throw error
    }
}

export const payQrCode = async (urlDefault: string, ispbPay: number, agenciaPay: string, tipoContaPay: number, contaPay: string, tipoPessoaPay: number, documentoPay: number, namePay: string, ispbRec: number, agenciaRec: string, tipoContaRec: number, contaRec: string, tipoPessoaRec: number, documentoRec: number, nameRec: string, infoRec: string, value: number) => {
    const { handleAddLogErrors } = useLogErrors()

    const url = urlDefault + CONSTANTE.URL_QRCODE_PAY
    const body = JSON.stringify({
        pagador: {
            ispb: ispbPay || 0,
            tipoPessoa: tipoPessoaPay || 0,
            tipoConta: tipoContaPay || 0,
            agencia: agenciaPay || '',
            conta: contaPay || '',
            documento: documentoPay || 0,
            nome: namePay || '',
        },
        recebedor: {
            ispb: ispbRec || 0,
            tipoPessoa: tipoPessoaRec || 0,
            documento: documentoRec || 0,
            agencia: agenciaRec || '',
            conta: contaRec || '',
            tipoConta: tipoContaRec || 0,
            nome: nameRec || '',
        },
        valor: value || 0,
        customInformation: infoRec || '',
    })
    //console.log('qrcodeService.sendQrCode - data:', data)

    try {
        const response = await api.post(url, body)

        const data = response.data

        return data
    } catch (error: any) {
        //console.error('payQrCode:', error)
        const statuscod = error.response ? error.response.status : '400' // 400 Bad Request
        const message = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
        handleAddLogErrors('payQrCode', url, body, statuscod, message)
        throw error
    }
}
