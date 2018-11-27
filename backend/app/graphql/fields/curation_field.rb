Fields::CurationField = GraphQL::Field.define do
  name "curation"
  description "Show curation"
  type Types::CurationType
  argument :id, !types.ID
  resolve ->(_obj, args, _ctx) {
    if args[:id].scan(/^\d+$/).any?
      Curation.find(args[:id])
    else
      Curation.find_by!(graphcms_ref: args[:id])
    end
  }
end
