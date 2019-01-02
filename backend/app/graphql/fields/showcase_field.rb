Fields::ShowcaseField = GraphQL::Field.define do
  name "showcase"
  description "Show showcase"
  type Types::ShowcaseType
  argument :id, !types.ID
  resolve ->(_obj, args, _ctx) {
    if args[:id].scan(/^\d+$/).any?
      Showcase.find(args[:id])
    else
      Showcase.find_by!(graphcms_ref: args[:id])
    end
  }
end
