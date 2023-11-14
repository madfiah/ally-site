export const setColorStatus = (status: string) => {
  switch (status) {
    case 'new':
      return 'blue'
      break
    case 'reviewing':
      return 'orange'
      break
    case 'approved':
      return 'green'
      break
    case 'rejected':
      return 'red'
      break
    case 'blacklisted':
      return 'red'
      break

    default:
      return 'magenta'
      break
  }
}
