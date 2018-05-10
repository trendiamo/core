Types::FencedCollectionType = GraphQL::ObjectType.define do
  name "FencedCollectionType"

  field :id, !types.ID
  field :collection, !Types::CollectionType do
    resolve ->(obj, _args, _ctx) { obj.collection }
  end
  field :domainName, !types.String do
    resolve ->(obj, _args, _ctx) { obj.domain_name }
  end
  field :faviconUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.favicon_url }
  end
end
