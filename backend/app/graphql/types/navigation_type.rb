Types::NavigationType = GraphQL::ObjectType.define do
  name "Navigation"

  field :id, !types.ID
  field :navigationItems, types[Types::NavigationItemType] do
    resolve ->(obj, _args, _ctx) {
      obj.navigation_items
    }
  end
end
