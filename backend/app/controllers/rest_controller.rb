class RestController < ApplicationController
  include ActionController::Cookies
  include Pundit
  set_current_tenant_through_filter
  before_action :current_tenant
  include ActionController::RequestForgeryProtection
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  protect_from_forgery with: :exception, prepend: true

  private

  def current_tenant
    manage_account = current_user&.admin && Account.find_by(id: request.headers["X-Manage-Account"])
    set_current_tenant(manage_account || current_user&.account)
  end

  def ensure_tenant
    render json: { errors: [{ title: "Tenant must be set" }] }, status: :forbidden unless current_tenant
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
    rescue JSON::ParserError, TypeError
      return chain
    end
    add_pagination_headers(chain, pagination_hash[:range])
    chain.page(pagination_hash[:page_number]).per(pagination_hash[:total_per_page])
  end

  def sorting(chain)
    sort_params = begin
      JSON.parse(params[:sort])
    rescue JSON::ParserError, TypeError
      return chain
    end
    column, direction = *sort_params
    return sorting_by_active_state(chain, direction) if column.underscore == "active"
    return sorting_by_pictures_state(chain, direction) if column.underscore == "status"

    column = ActiveRecord::Base.connection.quote_column_name(column.underscore)
    chain.order("#{column} #{direction}")
  end

  def sorting_by_active_state(chain, direction)
    direction = direction == "desc" ? "asc" : "desc"
    chain.left_joins(:triggers).group(:id).order("count(triggers.id) #{direction}")
  end

  def sorting_by_pictures_state(chain, direction)
    sorted_chain = chain.sort_by do |picture|
      picture.navigation_items.count + picture.personas_with_profile_pic.count +
        picture.personas_with_animation_pic.count + picture.product_picks.count
    end
    return sorted_chain.reverse if direction == "asc"

    sorted_chain
  end
end
