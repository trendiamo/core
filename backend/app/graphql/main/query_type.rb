Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :products, !types[Types::ProductType] do
    description "List products"
    argument :productRefs, !types[types.String]
    resolve ->(_obj, args, ctx) {
      ctx[:shopify_products] = ShopifyAPI::Product.where(ids: args[:productRefs] * ",") unless ctx[:headers]["INCLUDE-SHOPIFY"].nil?
      Product.where(product_ref: args[:productRefs])
    }
  end

  field :comments, !types[Types::CommentType] do
    description "List comments of a product"
    argument :productId, !types.ID
    resolve ->(_obj, args, _ctx) {
      order = "pinned desc,upvotes_count desc,created_at asc"
      Comment.where(product_id: args[:productId], removed_at: nil).order(order)
    }
  end

  field :collection, !Types::CollectionType do
    description "Obtain a collection by its handle"
    argument :handle, !types.String
    resolve ->(_obj, args, _ctx) {
      Collection.find_by(handle: args[:handle])
    }
  end

  field :fencedCollection, Types::FencedCollectionType do
    description "Obtain a fenced collection by its domain name"
    argument :domainName, !types.String
    resolve ->(_obj, args, _ctx) {
      FencedCollection.find_by(domain_name: args[:domainName])
    }
  end
end
