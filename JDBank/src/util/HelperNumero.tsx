export const isNumber = (value: string) => !isNaN(parseFloat(value)) && isFinite(parseFloat(value))

export const GetValorDecimal = (value: string) => {
    try {
        const resultado = parseFloat(value.replace(/\./g, '').replace('$ ', '').replace('$', '')).toFixed(2) || 0
        if (!isNumber(resultado.toString())) return 0
        return resultado
    } catch (e) {
        return 0
    }
}

export const GetValorInteiro = (value: string) => {
    try {
        const resultado = parseInt(value.replace(/\./g, '')) || 0
        if (!isNumber(resultado.toString())) return 0
        return resultado
    } catch (e) {
        return 0
    }
}

//export const GetMascaraValorDecimal = (value: number) => value.toFixed(2).replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
export const GetMascaraValorDecimal = (value: number) => new Intl.NumberFormat('en-IN').format(value)

export const colcarFormacataoInteiro = (value: string) => {
    return String(value)
        .split('')
        .reverse()
        .join('')
        .split(/(\d{3})/)
        .filter(Boolean)
        .join('.')
        .split('')
        .reverse()
        .join('')
}
