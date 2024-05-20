// URL
export const URL_TIMEOUT = 10 * 1000 // 10Segundos
export const URL_LOGIN = 'login' //  'spi/api/login'
export const URL_GERAR_QRCODE = 'qrcode-gerar' // 'spi/api/qrcode/estatico/GerarQRCode'
export const URL_ENVIAR_QRCODE = 'qrcode-enviar' // 'api/qrcode'
export const URL_GET_CHAVE = 'chave' // 'spi/api/chave'
export const URL_POST_CHAVE = 'chave' // 'spi/api/chave'
export const URL_PAGAR_QRCODE = 'qrcode' // 'api'
export const URL_GET_SALDO = 'saldo' // 'api/saldo'
export const URL_RECEBE_PAGTO = 'payment-receive-pagto' // 'hubs/receive/payment' // SignaR ao Receber um Credio
export const URL_RECEBE_SALDO = 'payment-receive-saldo' // 'hubs/receive/payment'  // SignaR ao Atualizar o Saldo

// IF RECEBEDORA - AZUL
export const ISPB_RECEBEDOR = '84701762'
export const NOME_RECEBEDOR = 'J3 Bank'
export const URL_RECEBEDOR = 'http://192.168.1.107:3001/' // 'http://j3spi.azurewebsites.net/'
export const ICON_RECEBEDOR = 'person-blue.jpg'

// IF PAGADORA - VERMELHO
export const ISPB_PAGADOR = '4358798'
export const NOME_PAGADOR = 'JD Bank'
export const URL_PAGADOR = 'http://192.168.1.107:3002/' // 'http://jdspi.azurewebsites.net/'
export const ICON_PAGADOR = 'person-red.jpg'

// SESSAO
export const SESSAO_PADRAO = '@JDSPI:'
export const SESSAO_USER_URL = SESSAO_PADRAO + 'UserURL'
export const SESSAO_USER_CHAVE = SESSAO_PADRAO + 'UserChave'
export const SESSAO_USER_ISPB_IF = SESSAO_PADRAO + 'UserIspbIF'
export const SESSAO_USER_NOME_IF = SESSAO_PADRAO + 'UserNomeIF'
export const SESSAO_USER_DOC_TP = SESSAO_PADRAO + 'UserDocTp'
export const SESSAO_USER_DOC_NRO = SESSAO_PADRAO + 'UserDocNro'
export const SESSAO_USER_AGENCIA = SESSAO_PADRAO + 'UserAgencia'
export const SESSAO_USER_CONTA_NRO = SESSAO_PADRAO + 'UserContaNro'
export const SESSAO_USER_CONTA_TP = SESSAO_PADRAO + 'UserContaTp'
export const SESSAO_USER_NOME = SESSAO_PADRAO + 'UserNome'
export const SESSAO_USER_CIDADE = SESSAO_PADRAO + 'UserCidade'
export const SESSAO_USER_BGCOLOR = SESSAO_PADRAO + 'UserBackgroundColor'
export const SESSAO_USER_BGCOLOR_SCREEN = SESSAO_PADRAO + 'UserBackgroundColorScreen'
export const SESSAO_USER_ICON = SESSAO_PADRAO + 'UserIcon'

// COR
export const BG_BRANCO = '#fff'

// COR Vermelha
export const BG_VERMELHO = '#800000' // #800000 // #8B0000 // #B22222 // #A52A2A //#801515  #AA3939  #D46A6A #FFAAAA
export const BG_HEADER_MEIO_VERMELHO = '#B22222'
export const BG_HEADER_INI_VERMELHO = '#c64747'
export const BG_VERMELHO_FRACO = '#fff8f8'
export const BG_VERMELHO_FORTE = '#A52A2A'
// COR Azul
export const BG_AZUL = '#19275B'
export const BG_HEADER_MEIO_AZUL = '#3b5998'
export const BG_HEADER_INI_AZUL = '#4c669f'
export const BG_AZUL_FRACO = '#f0f8ff'
export const BG_AZUL_FORTE = '#303F76'
