Types::TaxonType = GraphQL::ObjectType.define do
  name "Taxon"

  field :id,   types.ID
  field :position,  types.Int
  field :name, types.String
  field :permalink, types.String
  field :parent_id, types.ID
  field :taxonomy_id, types.ID
  field :lft, types.Int
  field :rgt, types.Int
  field :icon_file_name, types.String
  field :icon_content_type, types.String
  field :icon_file_size, types.String
  field :meta_title, types.String
  field :meta_description, types.String
  field :meta_keywords, types.String

  connection :products, Types::ProductType.connection_type do
    name          "products"
    description   "List of products"

    resolve ->(obj, _args, _ctx) {
      obj.products
    }
  end
end
