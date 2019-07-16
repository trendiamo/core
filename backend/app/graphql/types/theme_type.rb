Types::ThemeType = GraphQL::ObjectType.define do
  name "theme"

  field :id, !types.ID
  field :roundEdges, types.Boolean do
    resolve ->(obj, _args, _ctx) { obj[:round_edges] }
  end
  field :themeColor, types.String do
    resolve ->(obj, _args, _ctx) { obj[:theme_color] }
  end
  field :textColor, types.String do
    resolve ->(obj, _args, _ctx) { obj[:text_color] }
  end
end
