export const assessmentHack = () => {
  return process.env.ASSESSMENT || (location.hostname === 'www.pierre-cardin.de' && location.pathname === '/')
}
