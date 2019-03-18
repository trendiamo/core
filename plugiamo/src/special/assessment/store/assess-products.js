const assessProducts = (products, tagsArrays) => {
  const productsResult = []
  tagsArrays
    .map(tags => products.filter(product => product.tags && !tags.map(tag => !!product.tags[tag]).includes(false)))
    .forEach(productArray => productsResult.push(...productArray))
  return productsResult
}

export default assessProducts
