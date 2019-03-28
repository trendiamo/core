const assessProducts = (products, tags) => {
  const productsResult = tags.map(tag => products.filter(product => product.tag && tag === product.tag)).flat()
  return productsResult.sort((a, b) => !!b.highlight - !!a.highlight)
}

export default assessProducts
