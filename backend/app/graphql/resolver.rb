class Resolver
  def initialize(resolve_func)
    @resolve_func = resolve_func
  end

  def call(obj, args, ctx)
    @resolve_func.call(obj, args, ctx)
  rescue ActiveRecord::RecordNotFound
    nil
  rescue Pundit::NotAuthorizedError
    GraphQL::ExecutionError.new("You are not authorized to perform this action")
  rescue ActiveRecord::RecordInvalid => error
    messages = error.record.errors.full_messages.join(", ")
    GraphQL::ExecutionError.new("Validation failed: #{messages}")
  rescue StandardError => error
    GraphQL::ExecutionError.new("Unexpected error: #{error.message}")
  end
end
