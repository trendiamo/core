class ApplicationController < ActionController::API
  include Pundit
  set_current_tenant_through_filter
  before_action :current_tenant

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def current_tenant
    set_current_tenant(current_user.account) if current_user
  end

  def user_not_authorized
    errors = [{ title: "You are not authorized to perform this action." }]
    render json: { errors: errors }, status: :forbidden
  end

  def add_pagination_headers(chain, range)
    response.headers["Content-Range"] = "#{chain.name.downcase.pluralize} #{range[0]}-#{range[1]}/#{chain.count}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
  end

  def pagination_vars(range_params)
    range = JSON.parse(range_params)
    total_per_page = range[1] - range[0] + 1
    page_number = (range[0] / total_per_page) + 1
    {
      range: range,
      total_per_page: total_per_page,
      page_number: page_number,
    }
  end

  def pagination(chain)
    pagination_hash = begin
      pagination_vars(params[:range])
    rescue JSON::ParserError
      return []
    end
    add_pagination_headers(chain, pagination_hash[:range])
    chain.page(pagination_hash[:page_number]).per(pagination_hash[:total_per_page])
  end

  def sorting(chain)
    begin
      sort_params = JSON.parse(params[:sort])
    rescue JSON::ParserError
      return []
    end
    chain.order(sort_params[0].underscore.concat(" #{sort_params[1]}"))
  end
end
