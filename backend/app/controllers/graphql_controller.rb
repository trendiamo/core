class GraphqlController < ApplicationController
  set_current_tenant_through_filter
  before_action :ensure_hash_variables
  before_action :set_tenant

  def execute
    options = {
      operation_name: params[:operationName],
      variables: @variables,
    }
    render json: TrendiamoSchema.execute(params[:query], options)
  rescue ArgumentError
    head :bad_request
  end

  private

  def set_tenant
    account = find_account_from_override || find_account_from_request
    return render json: { error: "no content found" }, status: :bad_request unless account
    set_current_tenant(account)
  end

  def find_account_from_override
    override_account_name = request.headers["Override-Account"]
    return unless override_account_name
    Account.find_by(name: override_account_name)
  end

  def find_account_from_request
    hostname = (request.origin || "").gsub(%r{https?://|:\d+}, "")
    hostname.present? ? Website.find_by_hostname(hostname)&.account : nil
  end

  def ensure_hash_variables
    @variables = ensure_hash(params[:variables])
  rescue ArgumentError => e
    render json: { error: e }, status: :bad_request
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
