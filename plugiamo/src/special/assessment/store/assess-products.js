import flatten from 'lodash.flatten'

const assessProducts = (products, tags) => {
  const productsResult = flatten(tags.map(tag => products.filter(product => product.tag && tag === product.tag)))
  return productsResult.sort((a, b) => !!b.highlight - !!a.highlight)
}

export default assessProducts
