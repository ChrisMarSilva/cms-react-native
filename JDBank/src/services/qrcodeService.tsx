import api from '@/src/services/api'

import * as CONSTANTE from '@/src/util/Constante'

export const createQrCode = async (urlDefault: string, chave: string, name: string, value: number) => {
    try {
        console.log('')
        console.log('qrcodeService.createQrCode')

        const url = urlDefault + CONSTANTE.URL_QRCODE_GENERATE
        console.log('url:', url)

        console.log('chave:', chave)
        chave = chave.replace('( ', '').replace(') ', '').replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace(' ', '')
        console.log('chave:', chave)

        const body = JSON.parse(` {"chaveIdentificacao":"${chave}","nomeRecebedor":"${name}","cidade":"São Paulo","valor":${value}}`)
        console.log('body:', body)

        const response = await api.post(url, body)

        const data = response.data // certo

        //const body = `{"bank": "${bank}", "name": "${name}", "username": "${username}", "value": ${value}}`
        //const data = btoa(unescape(encodeURIComponent(body))) // btoa(unescape(encodeURIComponent(JSON.stringify(body))))

        //console.log('data:', data)
        // console.log('certo: eyJiYW5rIjogIkpEIEJhbmsiLCAibmFtZSI6ICJDbGllbnQgUGF5IDAxIiwgInVzZXJuYW1lIjogImNsaWVudHBheTEiLCAidmFsdWUiOiAxMH0=')
        // console.log('status:', data == 'eyJiYW5rIjogIkpEIEJhbmsiLCAibmFtZSI6ICJDbGllbnQgUGF5IDAxIiwgInVzZXJuYW1lIjogImNsaWVudHBheTEiLCAidmFsdWUiOiAxMH0=')
        console.log('-----------------------------')
        console.log('')

        return data
    } catch (error: any) {
        console.error('createQrCode:', error)
        throw error
    }
}

export const sendQrCode = async (urlDefault: string, qrcode: string) => {
    try {
        const url = urlDefault + CONSTANTE.URL_QRCODE_SEND
        const body = JSON.stringify({ emv: qrcode })

        console.log('')
        console.log('qrcodeService.sendQrCode')
        console.log('qrcode:', qrcode)
        console.log('body:', body)

        const response = await api.post(url, body)

        // 00020101021126360014br.gov.bcb.spi0114+5511942120001520400005303986540512.335802BR5913Client Pay 016009São Paulo6304177C
        const data = { value: parseFloat(response.data.transactionAmount), name: response.data.merchantName, info: response.data.additionalDataField, chave: response.data.merchantAccountInformation.itens[1].descricao }
        // {"additionalDataField": "", "countryCode": "BR", "merchantAccountInformation": {"id": "26", "itens": [[Object], [Object]]}, "merchantCategoryCode": "0000", "merchantCity": "São Paulo", "merchantName": "Client Pay 01", "payloadFormatIndicator": "01", "pointInitiationMethod": 11, "transactionAmount": 12.33, "transactionCurrency": 986, "unreservedTemplate": {"itens": []}}

        console.log('response:', response.data)
        console.log('data:', data)
        console.log('-----------------------------')
        console.log('')

        return data
    } catch (error: any) {
        console.error('sendQrCode:', error)
        throw error
    }
}

export const payQrCode = async (urlDefault: string, ispbPay: number, agenciaPay: string, tipoContaPay: number, contaPay: string, tipoPessoaPay: number, documentoPay: number, namePay: string, ispbRec: number, agenciaRec: string, tipoContaRec: number, contaRec: string, tipoPessoaRec: number, documentoRec: number, nameRec: string, infoRec: string, value: number) => {
    try {
        const url = urlDefault + CONSTANTE.URL_QRCODE_PAY

        console.log('')
        console.log('qrcodeService.payQrCode')
        console.log('url:', url)

        const body = JSON.stringify({
            pagador: {
                ispb: ispbPay,
                tipoPessoa: tipoPessoaPay,
                tipoConta: tipoContaPay,
                agencia: agenciaPay,
                conta: contaPay,
                documento: documentoPay,
                nome: namePay,
            },
            recebedor: {
                ispb: ispbRec,
                tipoPessoa: tipoPessoaRec,
                documento: documentoRec,
                agencia: agenciaRec,
                conta: contaRec,
                tipoConta: tipoContaRec,
                nome: nameRec,
            },
            valor: value,
            customInformation: infoRec,
        })

        console.log('body:', body)

        const response = await api.post(url, body)

        const data = response.data

        console.log('data:', data)
        console.log('-----------------------------')
        console.log('')

        return data
    } catch (error: any) {
        console.error('payQrCode:', error)
        throw error
    }
}
