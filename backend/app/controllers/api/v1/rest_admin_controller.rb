module Api
  module V1
    class RestAdminController < RestController
      before_action :current_tenant
      protect_from_forgery with: :exception, prepend: true

      private

      def current_tenant
        session_account = if request.headers["X-Session-Account"].to_i.zero?
                            Account.find_by(slug: request.headers["X-Session-Account"])
                          else
                            Account.find_by(id: request.headers["X-Session-Account"])
                          end
        set_current_tenant(session_account)
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
        return sorting_by_active_state(chain, direction) if column.underscore == "active"
        return sorting_by_pictures_state(chain, direction) if column.underscore == "status"
        return sorting_by_pictures_type(chain, direction) if column.underscore == "type"

        sorting_by_column(chain, direction, column)
      end

      def sorting_by_column(chain, direction, column)
        column = ActiveRecord::Base.connection.quote_column_name(column.underscore)
        direction = direction == "asc" ? "asc" : "desc"
        chain.order("#{column} #{direction}")
      end

      def sorting_by_active_state(chain, direction)
        return chain if params[:controller] == "api/v1/pictures"

        direction = direction == "desc" ? "asc" : "desc"
        chain.left_joins(:triggers).group(:id).order("count(triggers.id) #{direction}")
      end

      def sorting_by_pictures_state(chain, direction)
        return chain if params[:controller] != "api/v1/pictures"

        sorted_chain = chain.sort_by do |picture|
          picture.personas.count + picture.product_picks.count + picture.simple_chat_messages.count
        end
        return sorted_chain.reverse if direction == "asc"

        sorted_chain
      end

      def sorting_by_pictures_type(chain, direction)
        return chain if params[:controller] != "api/v1/pictures"

        sorted_chain = chain.sort_by { |picture| picture.url.split(".").pop }
        return sorted_chain.reverse if direction == "desc"

        sorted_chain
      end
    end
  end
end
