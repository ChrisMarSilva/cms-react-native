// URLs
export const URL_TIMEOUT = 1000 * 10
export const URL_LOGIN = 'spi/api/chave'
export const URL_ENROLL = 'spi/api/chave'
export const URL_BALANCE = 'api/saldo'
export const URL_QRCODE_GENERATE = 'spi/api/qrcode/estatico/GerarQRCode'
export const URL_QRCODE_SEND = 'api/qrcode'
export const URL_QRCODE_PAY = 'api'
export const URL_RECEBE_PAGTO = 'hubs/receive/payment' // SignaR ao Receber um Credio

// SESSAO
export const SESSAO_PADRAO = '@JDSPI:'
export const SESSAO_URL = SESSAO_PADRAO + 'Url'
export const SESSAO_BANK = SESSAO_PADRAO + 'Bank'
export const SESSAO_ISPB = SESSAO_PADRAO + 'Ispb'
export const SESSAO_USERNAME = SESSAO_PADRAO + 'Username'
export const SESSAO_RECIPIENTS = SESSAO_PADRAO + 'Recipients'
export const SESSAO_RECEIVE_BANK_ISPB = SESSAO_PADRAO + 'RecIspb'
export const SESSAO_RECEIVE_BANK_NAME = SESSAO_PADRAO + 'RecBank'
export const SESSAO_RECEIVE_BANK_URL = SESSAO_PADRAO + 'RecUrl'
export const SESSAO_PAYMENT_BANK_ISPB = SESSAO_PADRAO + 'PayIspb'
export const SESSAO_PAYMENT_BANK_NAME = SESSAO_PADRAO + 'PayBank'
export const SESSAO_PAYMENT_BANK_URL = SESSAO_PADRAO + 'PayUrl'

// export const VERSAO_APP = '1.0.14'; // Constants.manifest?.version ||

// // RECEIVE BANK
// export const RECEIVE_BANK_NAME = 'J3 Bank'
// export const RECEIVE_BANK_URL = 'https://5e54-67-159-235-142.ngrok-free.app/' // 'http://192.168.1.107:3001/'

// // PAYMENT BANK
// export const PAYMENT_BANK_NAME = 'JD Bank'
// export const PAYMENT_BANK_URL = 'https://5e54-67-159-235-142.ngrok-free.app/' // 'http://192.168.1.107:3002/'
