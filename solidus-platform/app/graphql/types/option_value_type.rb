Types::OptionValueType = GraphQL::ObjectType.define do
  name "OptionValueType"

  field :id,   types.ID
  field :presentation, types.String
  field :name, types.String
  field :position, types.Int
  field :optionTypeId, types.ID do
    resolve ->(obj, _args, _ctx) { obj.option_type_id }
  end
  field :optionTypes, Types::OptionType do
    resolve ->(obj, _args, _ctx) {
      obj.option_type
    }
  end
end
