Fields::ProductsField = GraphQL::Field.define do
  name "products"
  description "List products"
  type !types[Types::ProductType]
  argument :productRefs, !types[types.String]
  resolve ->(_obj, args, ctx) {
    if ctx[:headers]["INCLUDE-SHOPIFY"]
      ctx[:shopify_products] = ShopifyAPI::Product.where(ids: args[:productRefs] * ",")
    end
    Product.where(product_ref: args[:productRefs])
  }
end
