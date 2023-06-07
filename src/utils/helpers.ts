export const truncate = (str: string, limit?: number) => {
  const text_limit = limit ? limit : 20
  return str.length > text_limit ? str.substring(0, limit) + '...' : str
}

export const currency = (num: any) => {
  return (
    '$' +
    parseFloat(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  )
}

export const maskCurrency = (number: string) => {
  const formatted = new Intl.NumberFormat('zh-SG', {
    style: 'currency',
    currency: 'SGD',
  }).format(parseFloat(number))

  return formatted
}
