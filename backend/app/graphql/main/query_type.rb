Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :me, Fields::MeField
  field :products, Fields::ProductsField
  field :comments, Fields::CommentsField
  field :collection, Fields::CollectionField
  field :fencedCollection, Fields::FencedCollectionField
  field :shopifyCollection, Fields::ShopifyCollectionField

  field :expositions, Fields::ExpositionsField
  field :exposition, Fields::ExpositionField
  connection :expositionsConnection, Connections::ExpositionsConnection do
    resolve ->(_obj, _args, _ctx) {
      result = GraphCMS::Client.query(ExpositionsQuery)
      result.data.expositions
    }
  end

  field :videos, Fields::VideosField
  field :video, Fields::VideoField
  connection :videosConnection, Connections::VideosConnection do
    resolve ->(_obj, _args, _ctx) {
      result = GraphCMS::Client.query(VideosQuery)
      result.data.videos
    }
  end
end
