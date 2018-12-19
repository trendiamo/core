Fields::NavigationField = GraphQL::Field.define do
  name "navigation"
  description "Show navigation"
  type Types::NavigationType
  argument :id, !types.ID
  resolve ->(_obj, args, _ctx) {
    Navigation.find(args[:id])
  }
end
