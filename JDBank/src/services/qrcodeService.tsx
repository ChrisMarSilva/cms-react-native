import api from '@/src/services/api'
import * as CONSTANTE from '@/src/util/Constante'

export const createQrCode = async (urlDefault: string, username: string, value: number) => {
    try {
        const url = urlDefault + CONSTANTE.URL_QRCODE_GENERATE
        const body = { username: username.trim(), value: value }
        const response = await api.post(url, body)

        // const data = response.data // certo
        // const data = 'iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAY1SURBVO3BQY4cy5LAQDLQ978yR0tfJZCoar34GjezP1jrEoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS7yw4dU'
        // const data = '00020101021126360014br.gov.bcb.spi0114+55119421246815204000053039865802BR5906Fulano6009São Paulo63041689' //  0,00 ok
        // const data = '00020101021126360014br.gov.bcb.spi0114+55119421200015204000053039865406100.005802BR5913Fulano de Tal6009São Paulo63041A9B' // 100,00 ok
        // const data = '00020101021126360014br.gov.bcb.spi0114+55119421200055204000053039865406100.005802BR5909Anderson 6009São Paulo63040CB1' // 100,00 ok
        // const data = '00020101021126360014br.gov.bcb.spi0114+55119421255555204000053039865406100.005802BR5917J3 AZUL RECEBEDOR6009São Paulo630417AC'
        // const data = '00020101021126360014br.gov.bcb.spi0114+551194212333352040000530398654040.005802BR5919JD VERMELHO PAGADOR6009São Paulo630416DC'
        // const data = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII='
        // const data = 'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
        const data = 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABGUlEQVR42u2YSw7DIAxEzYpjcFM+N+UYrErtMUkjpd2WWQQlyudtLI89JpH5a8lDHvJnUkVXmkMPKcMeAg1peo70inrpRbm/ISFDwkhNX4NUSWxEo26WVFKisgc2ArWncSO3OthJvEs0nTju/bOT+NJKzJK++c5OovJWRIob2AwNsf6YXWJ3eFGbgXS4skgEGafaDGSifVONS/ZCQ/Q2YI5l8BdSS0ImwtTezehjiM9C3FG8fbVdykft/URTeEY918hlIZZFC9Yq0Rw6ns63nyxXtkTCYK6VuJv4NKvmMdgFMBHfBbRjb8JFxgoWW04RPmKfEaY2pgcZcT/OsL3GQ5baFrUN23iZZrvJ6pKjDJFXFvL8P3jIfvIGvNX7jsCaJvEAAAAASUVORK5CYII='

        return data
    } catch (error: any) {
        console.error('createQrCode:', error)
        throw error
    }
}

export const sendQrCode = async (urlDefault: string, username: string, qrcode: string) => {
    try {
        const url = urlDefault + CONSTANTE.URL_QRCODE_SEND
        const body = JSON.stringify({ username: username.trim(), data: qrcode })
        const response = await api.post(url, body)

        // const data = response.data
        const data = { value: 12346.99, name: 'Allieeee' }

        return data
    } catch (error: any) {
        console.error('sendQrCode:', error)
        throw error
    }
}

export const payQrCode = async (urlDefault: string, username: string, value: number, name: string) => {
    try {
        const url = urlDefault + CONSTANTE.URL_QRCODE_PAY
        const body = JSON.stringify({ username: username.trim(), value: value, name: name })

        const response = await api.post(url, body)

        const data = response.data
        return data
    } catch (error: any) {
        console.error('payQrCode:', error)
        throw error
    }
}
