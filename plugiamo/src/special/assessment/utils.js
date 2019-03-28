export const assessmentHack = () =>
  process.env.ASSESSMENT || localStorage.getItem('trnd-plugin-account') === 'PierreCardinGermany'
