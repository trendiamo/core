Types::VariantType = GraphQL::ObjectType.define do
  name "Variant"

  field :id,   types.ID
  field :sku,  types.String
  field :name, types.String

  connection :prices, Types::PriceType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.prices.all
    }
  end

  connection :optionValues, Types::OptionValueType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.option_values.all
    }
  end
end
