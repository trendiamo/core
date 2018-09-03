Fields::FencedCollectionField = GraphQL::Field.define do
  name "fenced_collection"
  description "Obtain a fenced collection by its domain name"
  type Types::FencedCollectionType
  argument :domainName, !types.String
  resolve ->(_obj, args, _ctx) {
    FencedCollection.find_by(domain_name: args[:domainName])
  }
end
