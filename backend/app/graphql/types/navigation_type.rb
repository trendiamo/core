Types::NavigationType = GraphQL::ObjectType.define do
  name "Navigation"

  field :id, !types.ID
  field :title, types.String
  field :navigationItems, types[Types::NavigationItemType] do
    resolve ->(obj, _args, _ctx) {
      obj.navigation_items.order(:order)
    }
  end
end
