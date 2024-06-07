import api from '@/src/services/api'

import * as CONSTANTE from '@/src/util/Constante'

export const createQrCode = async (urlDefault: string, chave: string, name: string, value: number) => {
    try {
        const url = urlDefault + CONSTANTE.URL_QRCODE_GENERATE
        console.log('qrcodeService.createQrCode - url:', url)

        console.log('qrcodeService.createQrCode - chave:', chave)
        chave = chave.replace('( ', '').replace(') ', '').replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace(' ', '')
        console.log('qrcodeService.createQrCode - chave:', chave)

        const body = JSON.parse(` {"chaveIdentificacao":"${chave}","nomeRecebedor":"${name}","cidade":"São Paulo","valor":${value}}`)
        console.log('qrcodeService.createQrCode - body:', body)

        const response = await api.post(url, body)

        const data = response.data
        //console.log('qrcodeService.createQrCode - data:', data)

        return data
    } catch (error: any) {
        console.error('createQrCode:', error)
        throw error
    }
}

export const sendQrCode = async (urlDefault: string, qrcode: string) => {
    try {
        console.log('qrcodeService.sendQrCode - qrcode:', qrcode)

        const url = urlDefault + CONSTANTE.URL_QRCODE_SEND
        console.log('qrcodeService.sendQrCode - url:', url)

        const body = JSON.stringify({ emv: qrcode })
        console.log('qrcodeService.sendQrCode - body:', body)

        const response = await api.post(url, body)

        // 00020101021126360014br.gov.bcb.spi0114+5511942120001520400005303986540512.335802BR5913Client Pay 016009São Paulo6304177C
        const data = { value: parseFloat(response.data.transactionAmount), name: response.data.merchantName, info: response.data.additionalDataField, chave: response.data.merchantAccountInformation.itens[1].descricao }
        // {"additionalDataField": "", "countryCode": "BR", "merchantAccountInformation": {"id": "26", "itens": [[Object], [Object]]}, "merchantCategoryCode": "0000", "merchantCity": "São Paulo", "merchantName": "Client Pay 01", "payloadFormatIndicator": "01", "pointInitiationMethod": 11, "transactionAmount": 12.33, "transactionCurrency": 986, "unreservedTemplate": {"itens": []}}

        console.log('qrcodeService.sendQrCode - response:', response.data)
        console.log('qrcodeService.sendQrCode - data:', data)

        return data
    } catch (error: any) {
        console.error('sendQrCode:', error)
        throw error
    }
}

export const payQrCode = async (urlDefault: string, ispbPay: number, agenciaPay: string, tipoContaPay: number, contaPay: string, tipoPessoaPay: number, documentoPay: number, namePay: string, ispbRec: number, agenciaRec: string, tipoContaRec: number, contaRec: string, tipoPessoaRec: number, documentoRec: number, nameRec: string, infoRec: string, value: number) => {
    try {
        const url = urlDefault + CONSTANTE.URL_QRCODE_PAY
        console.log('qrcodeService.payQrCode - url:', url)

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

        console.log('qrcodeService.payQrCode - body:', body)

        const response = await api.post(url, body)

        const data = response.data

        console.log('qrcodeService.payQrCode - data:', data)

        return data
    } catch (error: any) {
        console.error('payQrCode:', error)
        throw error
    }
}
