module Api
  module V1
    module Users
      class GoogleOauthStrategy < OmniAuth::Strategies::GoogleOauth2
        # Rewriting this method because of need to use google and youtube scopes separately.
        def get_scope(params)
          raw_scope = params[:scope] || DEFAULT_SCOPE
          scope_list = raw_scope.split(" ").map { |item| item.split(",") }.flatten
          scope_list.delete("youtube.readonly") unless request.params["youtube"]
          scope_list.map! { |s| s =~ %r{^https?://} || BASE_SCOPES.include?(s) ? s : "#{BASE_SCOPE_URL}#{s}" }
          scope_list.join(" ")
        end
      end
    end
  end
end
