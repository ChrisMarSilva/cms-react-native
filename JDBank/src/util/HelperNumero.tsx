export const colcarFormacataoInteiro = (nr: string) => {
    return String(nr)
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

export const MascaraValor = (valor: number) => {
    return valor
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
}

export const isNumber = (n: string) => {
    return !isNaN(parseFloat(n)) && isFinite(parseFloat(n))
}

export const GetValorDecimal = (Valor: string) => {
    try {
        const resultado = parseFloat(Valor.replace(/\./g, '').replace(',', '.').replace('R$ ', '').replace('R$', '')).toFixed(2) || 0
        if (!isNumber(resultado.toString())) return 0
        return resultado
    } catch (e) {
        return 0
    }
}

export const GetValorInteiro = (Valor: string) => {
    try {
        const resultado = parseInt(Valor.replace(/\./g, '')) || 0
        if (!isNumber(resultado.toString())) return 0
        return resultado
    } catch (e) {
        return 0
    }
}

export const GetMascaraValorDecimal = (Valor: number) => {
    try {
        return Valor.toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
    } catch (e) {
        return 0
    }
}

export const GetMascaraValorMaiorDecimal = (Valor: number) => {
    try {
        return Valor.toFixed(10)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
    } catch (e) {
        return 0
    }
}

export const GetMascaraTelefone = (Valor: string) => {
    try {
        let cleaned = ('' + Valor).replace(/\D/g, '')
        let match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/)

        if (match) {
            let intlCode = match[1] ? '+55 ' : ''
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }

        return Valor
    } catch (e) {
        return Valor
    }
}

export const GetMascaraCPF = (Valor: string) => {
    try {
        return Valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
    } catch (e) {
        return Valor
    }
}
