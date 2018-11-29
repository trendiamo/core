class GraphqlController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :ensure_hash_variables
  before_action :ensure_website

  def execute
    options = {
      context: { website: @website },
      operation_name: params[:operationName],
      variables: @variables,
    }
    render json: TrendiamoSchema.execute(params[:query], options)
  rescue ArgumentError
    head :bad_request
  end

  private

  def ensure_website
    @website = website_from_request
    return render json: { error: "no website found for hostname #{hostname}" }, status: :bad_request unless @website
    ActsAsTenant.default_tenant = @website.account
  end

  def hostname
    hostname = (request.origin || "").gsub(%r{https?://|:\d+}, "")
    hostname = request.headers["Override-Hostname"] if !Rails.env.production? && request.headers["Override-Hostname"]
    @hostname ||= hostname
  end

  def website_from_request
    hostname.present? ? Website.find_by_hostname(hostname) : nil
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
