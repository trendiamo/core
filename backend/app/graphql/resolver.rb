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
  rescue ActiveRecord::RecordInvalid => e
    messages = e.record.errors.full_messages.join(", ")
    GraphQL::ExecutionError.new("Validation failed: #{messages}")
  rescue StandardError => e
    GraphQL::ExecutionError.new("Unexpected error: #{e.message}")
  end
end
