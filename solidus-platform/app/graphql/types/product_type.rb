Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  field :id,          types.ID
  field :name,        types.String
  field :description, types.String
  field :slug,        types.String

  field :variants, types[Types::VariantType] do
    resolve ->(obj, _args, _ctx) {
      obj.variants.all
    }
  end

  field :optionTypes, types[Types::OptionType] do
    resolve ->(obj, _args, _ctx) {
      obj.option_types
    }
  end
end
