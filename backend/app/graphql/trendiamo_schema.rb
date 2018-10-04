TrendiamoSchema = GraphQL::Schema.define do
  mutation(Main::MutationType)
  query(Main::QueryType)
end

GraphQL::Errors.configure(TrendiamoSchema) do
  rescue_from Pundit::NotAuthorizedError do
    GraphQL::ExecutionError.new(ERROR_MESSAGE)
  end
end
