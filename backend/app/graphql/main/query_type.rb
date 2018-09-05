Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :me, Fields::MeField
  field :products, Fields::ProductsField
  field :comments, Fields::CommentsField
  field :collection, Fields::CollectionField
  field :fencedCollection, Fields::FencedCollectionField
  field :shopifyCollection, Fields::ShopifyCollectionField
end
