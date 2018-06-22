Types::OptionType = GraphQL::ObjectType.define do
  name "OptionType"

  field :id,   types.ID
  field :presentation, types.String
  field :name, types.String
  field :position, types.Int
  field :optionValues, types[Types::OptionValueType] do
    resolve ->(obj, _args, _ctx) {
      obj.option_values
    }
  end
end
