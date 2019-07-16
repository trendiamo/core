Types::WebsiteType = GraphQL::ObjectType.define do
  name "Website"

  field :id, !types.ID
  field :name, types.String
  field :previewMode, types.Boolean do
    resolve ->(obj, _args, _ctx) { obj[:preview_mode] }
  end

  field :theme, Types::ThemeType do
    resolve ->(obj, _args, _ctx) { obj.website_settings.first }
  end
end
