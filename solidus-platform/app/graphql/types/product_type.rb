Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  field :id,          types.ID
  field :name,        types.String
  field :description, types.String
  field :slug,        types.String

  connection :variants, Types::VariantType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.variants.all
    }
  end

  connection :optionTypes, Types::OptionType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.option_types.all
    }
  end
end
