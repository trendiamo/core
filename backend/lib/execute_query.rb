module ExecuteQuery
  def self.execute(gql_query, variables, hash_key)
    GraphCMS::Client.query(gql_query, variables).data.send(hash_key)
  rescue Graphlient::Errors::ServerError => e
    errors = e.inner_exception.response[:body]["errors"].map do |error|
      error["message"]
    end
    GraphQL::ExecutionError.new(errors.join("; "))
  end
end
