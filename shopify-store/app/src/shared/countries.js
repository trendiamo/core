import countryList from 'country-list'

const priorityCountries = ['Austria', 'Germany', 'Portugal', 'Spain', 'Netherlands', 'United Kingdom']

const otherCountries = countryList()
  .getNames()
  .filter(e => !priorityCountries.includes(e))

export const countrySeparator = '──────────'

const countries = [...priorityCountries, countrySeparator, ...otherCountries]

export default countries
