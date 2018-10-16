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
    resolve ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
      authorize(:nil)
      variables = { domains: [current_user.exposition_hostname] }
      ExecuteQuery.execute(ExpositionsQuery, variables, :expositions)
    }
  end

  field :websites, Fields::WebsitesField
  field :website, Fields::WebsiteField
  connection :websitesConnection, Connections::WebsitesConnection do
    resolve ->(_obj, _args, _ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
      authorize(:nil)
      variables = { ids: [current_user.website_ref] }
      ExecuteQuery.execute(WebsitesQuery, variables, :websites)
    }
  end
end
