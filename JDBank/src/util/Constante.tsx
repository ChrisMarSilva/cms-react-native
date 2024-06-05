// URLs
export const URL_TIMEOUT = 10 * 1000 // 10 Seg
export const URL_LOGIN = 'login'
export const URL_ENROLL = 'login'
export const URL_BALANCE = 'balance'
export const URL_QRCODE_GENERATE = 'qr-code-generate'
export const URL_QRCODE_SEND = 'qr-code-send'
export const URL_QRCODE_PAY = 'api' // 'qr-code-pay'
//export const URL_RECEBE_SALDO  = 'hubs/receive/payment';  // SignaR ao Atualizar o Saldo
export const URL_RECEBE_PAGTO = 'receive-payment' // 'hubs/receive/payment';  // SignaR ao Receber um Credio

// RECEIVE BANK
export const RECEIVE_BANK_NAME = 'J3 Bank'
export const RECEIVE_BANK_URL = 'https://5e54-67-159-235-142.ngrok-free.app/' // 'http://192.168.1.107:3001/'

// PAYMENT BANK
export const PAYMENT_BANK_NAME = 'JD Bank'
export const PAYMENT_BANK_URL = 'https://5e54-67-159-235-142.ngrok-free.app/' // 'http://192.168.1.107:3002/'

// SESSAO
export const SESSAO_PADRAO = '@JDSPI:'
export const SESSAO_URL = SESSAO_PADRAO + 'Url'
export const SESSAO_USERNAME = SESSAO_PADRAO + 'Username'
export const SESSAO_BANK = SESSAO_PADRAO + 'Bank'
export const SESSAO_RECIPIENTS = SESSAO_PADRAO + 'Recipients'

// export const VERSAO_APP = '1.0.14'; // Constants.manifest?.version ||
