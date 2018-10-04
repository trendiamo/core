class GraphqlController < ApplicationController
  # before_action :authenticate_user!

  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = { current_user: current_user, headers: request.headers, variables: variables }
    result = TrendiamoSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    check_permission(result) ? (render json: result) : (render json: { errors: ERROR_MESSAGE }, status: :forbidden)
  end

  private

  def check_permission(result)
    !(result.to_h["errors"] && result.to_h["errors"].first["message"] == ERROR_MESSAGE)
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      convert_string(ambiguous_param)
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def convert_string(ambiguous_param)
    if ambiguous_param.present?
      ensure_hash(JSON.parse(ambiguous_param))
    else
      {}
    end
  end
end
