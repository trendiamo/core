const assessProducts = (products, tags) =>
  products.filter(product => product.tags && !tags.map(tag => !!product.tags[tag]).includes(false))

export default assessProducts
