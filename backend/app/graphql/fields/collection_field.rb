Fields::CollectionField = GraphQL::Field.define do
  name "collection"
  description "Obtain a collection by its handle"
  type !Types::CollectionType
  argument :handle, !types.String
  resolve ->(_obj, args, _ctx) {
    Collection.find_by(handle: args[:handle])
  }
end
