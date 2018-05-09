Types::FencedShopType = GraphQL::ObjectType.define do
  name "FencedShopType"

  field :id, !types.ID
  field :domainName, !types.String do
    resolve ->(obj, _args, _ctx) { obj.domain_name }
  end
  field :logoPicUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.logo_pic_url }
  end
  field :coverPicUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.cover_pic_url }
  end
  field :title, types.String
  field :text, types.String
  field :ctaText, types.String do
    resolve ->(obj, _args, _ctx) { obj.cta_text }
  end
  field :faviconUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.favicon_url }
  end
end
