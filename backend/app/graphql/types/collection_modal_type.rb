Types::CollectionModalType = GraphQL::ObjectType.define do
  name "CollectionModalType"

  field :id, !types.ID
  field :collection, !Types::CollectionType do
    resolve ->(obj, _args, _ctx) { obj.collection }
  end
  field :logoPicUrl, !types.String do
    resolve ->(obj, _args, _ctx) { obj.logo_pic_url }
  end
  field :coverPicUrl, !types.String do
    resolve ->(obj, _args, _ctx) { obj.cover_pic_url }
  end
  field :title, !types.String
  field :text, !types.String
  field :ctaText, !types.String do
    resolve ->(obj, _args, _ctx) { obj.cta_text }
  end
end
