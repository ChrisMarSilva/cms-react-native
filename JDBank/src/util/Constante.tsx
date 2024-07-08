// URLs
export const URL_TIMEOUT = 1000 * 10
export const URL_LOGIN = 'spi/api/chave'
export const URL_ENROLL = 'spi/api/chave'
export const URL_BALANCE = 'api/saldo'
export const URL_QRCODE_GENERATE = 'spi/api/qrcode/estatico/GerarQRCode'
export const URL_QRCODE_SEND = 'api/qrcode'
export const URL_QRCODE_PAY = 'api'
export const URL_RECEBE_PAGTO = 'hubs/receive/payment' // SignaR ao Receber um Credio
export const URL_LANCAMENTO = 'extrato/atual'

// SESSAO
export const SESSAO_PADRAO = '@JDSPI:'
export const SESSAO_URL = SESSAO_PADRAO + 'Url'
export const SESSAO_BANK = SESSAO_PADRAO + 'Bank'
export const SESSAO_ISPB = SESSAO_PADRAO + 'Ispb'
export const SESSAO_USERNAME = SESSAO_PADRAO + 'Username'
export const SESSAO_RECIPIENTS = SESSAO_PADRAO + 'Recipients'

// ISPBs
export const ISPB_JD = '04358798'
export const ISPB_JJ4 = '84701762'

// export const VERSAO_APP = '1.0.14'; // Constants.manifest?.version ||
