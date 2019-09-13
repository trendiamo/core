module Api
  module V1
    class RestAdminController < RestController
      before_action :current_tenant
      protect_from_forgery with: :exception, prepend: true

      private

      def current_tenant
        session_account = Account.find_by(slug: request.headers["X-Session-Account"])
        set_current_tenant(session_account)
      end

      def current_user_is_seller?
        current_user&.affiliate_role == "seller"
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
        column, direction = *(begin
                                JSON.parse(params[:sort])
                              rescue JSON::ParserError, TypeError
                                return chain
                              end)
        handle_sorting(chain, direction, column)
      end

      def handle_sorting(chain, direction, column)
        case column.underscore
        when "active"
          sorting_by_active_state(chain, direction)
        when "brand"
          sorting_by_brand_name(chain, direction)
        else
          sorting_by_column(chain, direction, column)
        end
      end

      def sorting_by_active_state(chain, direction)
        return chain if params[:controller] == "api/v1/images"

        direction = direction == "desc" ? "asc" : "desc"
        chain.left_joins(:triggers).group(:id).order("account_id, count(triggers.id) #{direction}")
      end

      def sorting_by_brand_name(chain, direction)
        direction = direction == "desc" ? "asc" : "desc"
        chain.left_joins(:brand).order("brands.name #{direction}")
      end

      def sorting_by_column(chain, direction, column)
        column = ActiveRecord::Base.connection.quote_column_name(column.underscore)
        direction = direction == "asc" ? "asc" : "desc"
        chain.order("#{column} #{direction}")
      end
    end
  end
end
