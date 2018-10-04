Types::AggregateType = GraphQL::ObjectType.define do
  name "aggregate"
  field :count, !types.Int do
    resolve ->(obj, _args, _ctx) { obj.nodes.count }
  end
end
