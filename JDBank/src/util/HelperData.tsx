export const FormatDate = (dateString: string) => {
    const date = new Date(dateString)
    // const options = { year: 'numeric', month: 'short', day: 'numeric' }
    // return date.toLocaleDateString('en-US', options)
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
