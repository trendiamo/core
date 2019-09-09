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

const convertToDigits = selector => {
  if (!selector) return 0
  return Number(selector.replace(/\D/g, ''))
}

export { setAffiliateToken, getAffiliateToken, convertToDigits }
