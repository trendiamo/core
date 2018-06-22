Types::VariantType = GraphQL::ObjectType.define do
  name "Variant"

  field :id,   types.ID
  field :sku,  types.String
  field :name, types.String

  field :price, Types::PriceType do
    resolve ->(obj, _args, _ctx) {
      obj.prices.first
    }
  end

  field :optionValues, types[Types::OptionValueType] do
    resolve ->(obj, _args, _ctx) {
      obj.option_values
    }
  end
end
