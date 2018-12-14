// adapted from https://github.com/lodash/lodash/issues/723#issuecomment-443403094
// changed so that second param is a method
const omitDeep = (input, excludesFn) => {
  return Object.entries(input).reduce((nextInput, [key, value]) => {
    const shouldExclude = excludesFn(key)
    if (shouldExclude) return nextInput

    if (Array.isArray(value)) {
      const arrValue = value
      const nextValue = arrValue.map(arrItem => {
        if (typeof arrItem === 'object') {
          return omitDeep(arrItem, excludesFn)
        }
        return arrItem
      })
      nextInput[key] = nextValue
      return nextInput
    } else if (typeof value === 'object') {
      nextInput[key] = omitDeep(value, excludesFn)
      return nextInput
    }

    nextInput[key] = value

    return nextInput
  }, {})
}

export default omitDeep
