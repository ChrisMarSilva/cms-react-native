import 'react-native-console-time-polyfill'

const printDate = () => {
    const d = new Date()
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const seconds = d.getSeconds()
    const milliseconds = d.getMilliseconds()
    return `${hours}:${minutes}:${seconds},${milliseconds}`
}

export const entrada = (nome: string) => {
    try {
        console.time(nome)
        console.log(`${nome}.Inicio: ${printDate()}`)
    } catch (error: any) {
        console.log(nome + '.Erro:', error.message)
    }
}

export const saida = (nome: string) => {
    try {
        console.timeEnd(nome)
        console.log(`${nome}.Fim: ${printDate()}`)
    } catch (error: any) {
        console.log(nome + '.Erro:', error.message)
    }
}

export const erro = (nome: string, erro: string) => {
    try {
        console.log(`${nome}.Erro: ${printDate()}: ${erro}`)
    } catch (error: any) {
        console.log(nome + '.Erro:', error.message)
    }
}

export const texto = (nome: string, texto: string) => {
    try {
        console.log(`${nome}.Texto: ${printDate()}: ${texto}`)
    } catch (error: any) {
        console.log(nome + '.Erro:', error.message)
    }
}

export const datahora = (nome: string) => {
    try {
        console.log(`${nome}.DataHora: ${printDate()}`)
    } catch (error: any) {
        console.log(nome + '.Erro:', error.message)
    }
}
