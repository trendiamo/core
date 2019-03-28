export const assessmentHack = () =>
  process.env.ASSESSMENT || localStorage.getItem('trnd-plugin-account') === 'PierreCardinGermany'

export const rememberPersona = persona => sessionStorage.setItem('trnd-remembered-persona', JSON.stringify(persona))

export const recallPersona = () => JSON.parse(sessionStorage.getItem('trnd-remembered-persona'))
