Fields::PersonaField = GraphQL::Field.define do
  name "persona"
  description "Show persona"
  type Types::PersonaType
  argument :id, types.ID
  resolve ->(_obj, args, _ctx) {
    if args[:id].scan(/^\d+$/).any?
      Persona.find(args[:id])
    else
      Persona.find_by!(graphcms_ref: args[:id])
    end
  }
end
