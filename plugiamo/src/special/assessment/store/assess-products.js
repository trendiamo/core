const assessProducts = (products, tagsArrays) => {
  const productsResult = []
  const tags = tagsArrays.map(tagsArray => tagsArray.join('/'))
  tags
    .map(tag => products.filter(product => product.tag && tag === product.tag))
    .forEach(productArray => productsResult.push(...productArray))

  return productsResult.sort((a, b) => !!b.highlight - !!a.highlight)
}

export default assessProducts
