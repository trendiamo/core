TrendiamoSchema = GraphQL::Schema.define do
  mutation(Main::MutationType)
  query(Main::QueryType)
end
