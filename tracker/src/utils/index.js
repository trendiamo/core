const affiliateTokenFromSearchParams = () => {
  const match = location.search.match(/aftk=([^&]*)/)
  if (match && match.length > 1) {
    return match[1]
  }
}

const setAffiliateToken = () => {
  const affiliateToken = affiliateTokenFromSearchParams()
  affiliateToken && localStorage.setItem('aftk', affiliateToken)
}

const getAffiliateToken = () => localStorage.getItem('aftk')

const convertToDigits = text => {
  if (!text) return 0
  return Number(text.replace(/\D/g, ''))
}

export { setAffiliateToken, getAffiliateToken, convertToDigits }
