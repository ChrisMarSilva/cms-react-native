export const FormatDate = (dateString: string) => {
    const date = new Date(dateString)
    //return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    // const month = (date.getMonth() + 1).toString().padStart(2, '0')
    // const day = date.getDate().toString().padStart(2, '0')
    // const year = date.getFullYear()
    // const hours = date.getHours().toString().padStart(2, '0')
    // const minutes = date.getMinutes().toString().padStart(2, '0')
    // const seconds = date.getSeconds().toString().padStart(2, '0')
    // return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`

    const options = { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
    return date.toLocaleString('en-US', options).replace(',', '')
}
