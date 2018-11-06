Fields::WebsiteField = GraphQL::Field.define do
  name "website"
  description "Show website"
  type Types::WebsiteType
  resolve ->(_obj, _args, ctx) {
    ctx[:website]
  }
end
