Types::OptionValueType = GraphQL::ObjectType.define do
  name "OptionValueType"

  field :id,   types.ID
  field :presentation, types.String
  field :name, types.String
  field :position, types.Int
  field :option_type_id, types.ID
  connection :optionTypes, Types::OptionType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.option_types.all
    }
  end
end
