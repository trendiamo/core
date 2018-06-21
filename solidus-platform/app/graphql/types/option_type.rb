Types::OptionType = GraphQL::ObjectType.define do
  name "OptionType"

  field :id,   types.ID
  field :presentation,  types.String
  field :name, types.String
  field :position, types.Int

  connection :optionValues, Types::OptionValueType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.option_values.all
    }
  end
end
