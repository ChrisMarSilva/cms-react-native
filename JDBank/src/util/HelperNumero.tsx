// export const isNumber = (value: string) => !isNaN(parseFloat(value)) && isFinite(parseFloat(value))

export const convertToCurrency = (value: string) => parseFloat(value.replace(/[,$]/g, '')).toFixed(2)

export const FormatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2, // Define o número mínimo de casas decimais
        maximumFractionDigits: 2, // Define o número máximo de casas decimais
        style: 'currency', // Define o estilo como moeda
        currency: 'USD', // Define a moeda como Dólar Americano (USD)
    }).format(value)
