Fields::OutroField = GraphQL::Field.define do
  name "outro"
  description "Show outro"
  type Types::OutroType
  argument :id, !types.ID
  resolve ->(_obj, args, _ctx) {
    if args[:id].scan(/^\d+$/).any?
      Outro.find(args[:id])
    else
      Outro.find_by!(graphcms_ref: args[:id])
    end
  }
end
